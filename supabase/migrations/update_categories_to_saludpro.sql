-- ============================================
-- MIGRACIÓN: Actualizar categorías de SENA a SaludPro
-- Fecha: 2025-11-23
-- ============================================

-- PASO 1: Actualizar registros existentes con las nuevas categorías
-- Mapeo:
-- 'emprendimiento-egresado' -> 'especialista-salud'
-- 'empresa-fe' -> 'centro-medico'
-- 'agente-digitalizador' -> 'agente-digitalizador' (se mantiene)

UPDATE companies 
SET category = 'especialista-salud' 
WHERE category = 'emprendimiento-egresado';

UPDATE companies 
SET category = 'centro-medico' 
WHERE category = 'empresa-fe';

-- El agente-digitalizador se mantiene igual, no necesita actualización

-- PASO 2: Actualizar el constraint de CHECK si existe
-- Primero, eliminar el constraint antiguo si existe
ALTER TABLE companies DROP CONSTRAINT IF EXISTS companies_category_check;

-- Crear nuevo constraint con las categorías actualizadas
ALTER TABLE companies 
ADD CONSTRAINT companies_category_check 
CHECK (category IN ('especialista-salud', 'centro-medico', 'agente-digitalizador'));

-- PASO 3: Agregar comentarios para documentación
COMMENT ON COLUMN companies.category IS 'Categoría del perfil: especialista-salud (profesionales independientes), centro-medico (clínicas y centros), agente-digitalizador (proveedores de servicios digitales)';

-- PASO 4: Actualizar el campo industry si es necesario
-- Solo como referencia, no ejecutar automáticamente
-- UPDATE companies SET industry = 'Psicología' WHERE industry = 'Salud';
-- UPDATE companies SET industry = 'Nutrición' WHERE industry = 'Educación';

-- PASO 5: Verificar los cambios
-- SELECT category, COUNT(*) as total FROM companies GROUP BY category;

-- ============================================
-- OPCIONAL: Si quieres actualizar también la descripción de metadatos
-- ============================================
COMMENT ON TABLE companies IS 'Tabla principal que almacena perfiles de especialistas en salud, centros médicos y agentes digitalizadores del Directorio SaludPro';
