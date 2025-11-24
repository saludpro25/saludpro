-- ============================================
-- MIGRACIÓN: Agregar columnas faltantes y actualizar constraints
-- ============================================

-- Agregar columna whatsapp si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'whatsapp') THEN
    ALTER TABLE companies ADD COLUMN whatsapp VARCHAR(50);
  END IF;
END $$;

-- Agregar columna youtube_video_url si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'youtube_video_url') THEN
    ALTER TABLE companies ADD COLUMN youtube_video_url TEXT;
    COMMENT ON COLUMN companies.youtube_video_url IS 'URL completa del video de YouTube para mostrar en la ficha pública';
  END IF;
END $$;

-- Agregar columna entrepreneur_name si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'entrepreneur_name') THEN
    ALTER TABLE companies ADD COLUMN entrepreneur_name VARCHAR(255);
    COMMENT ON COLUMN companies.entrepreneur_name IS 'Nombre del emprendedor o fundador de la empresa';
  END IF;
END $$;

-- Agregar columna entrepreneur_image_url si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'entrepreneur_image_url') THEN
    ALTER TABLE companies ADD COLUMN entrepreneur_image_url TEXT;
    COMMENT ON COLUMN companies.entrepreneur_image_url IS 'URL de la imagen del emprendedor almacenada en Supabase Storage';
  END IF;
END $$;

-- Agregar columna custom_color si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'custom_color') THEN
    ALTER TABLE companies ADD COLUMN custom_color VARCHAR(7) DEFAULT '#40a356';
  END IF;
END $$;

-- Agregar columna selected_theme si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'companies' AND column_name = 'selected_theme') THEN
    ALTER TABLE companies ADD COLUMN selected_theme VARCHAR(50) DEFAULT 'saludpro-green';
  END IF;
END $$;

-- Actualizar valores por defecto para theme_color
ALTER TABLE companies ALTER COLUMN theme_color SET DEFAULT '#40a356';

-- Actualizar constraint de categorías a las nuevas de SaludPro
DO $$ 
BEGIN
  -- Eliminar constraint antiguo si existe
  ALTER TABLE companies DROP CONSTRAINT IF EXISTS companies_category_check;
  
  -- Agregar nuevo constraint con categorías de SaludPro
  ALTER TABLE companies ADD CONSTRAINT companies_category_check 
    CHECK (category IN ('especialista-salud', 'centro-medico', 'agente-digitalizador'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Actualizar empresas existentes con categorías antiguas a las nuevas
UPDATE companies 
SET category = 'especialista-salud' 
WHERE category IN ('egresado', 'emprendimiento-egresado', 'emprendimiento');

UPDATE companies 
SET category = 'centro-medico' 
WHERE category IN ('empresa', 'empresa-fe', 'empresa-formacion-emprendimiento');

UPDATE companies 
SET category = 'agente-digitalizador' 
WHERE category IN ('instructor', 'agente-digitalizacion');

-- Agregar comentarios de documentación
COMMENT ON TABLE companies IS 'Tabla principal que almacena perfiles de especialistas en salud, centros médicos y agentes digitalizadores del Directorio SaludPro';
COMMENT ON COLUMN companies.category IS 'Categoría del perfil: especialista-salud (profesionales independientes), centro-medico (clínicas y centros), agente-digitalizador (proveedores de servicios digitales)';
