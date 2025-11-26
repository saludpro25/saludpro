-- ============================================
-- MIGRATION 010: Crear tabla company_reviews y políticas RLS
-- ============================================

-- PASO 1: Crear la tabla company_reviews si no existe
CREATE TABLE IF NOT EXISTS company_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del review
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  
  -- Información del autor
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  
  -- Moderación
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Metadatos
  helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PASO 2: Crear índices
CREATE INDEX IF NOT EXISTS idx_company_reviews_company_id ON company_reviews(company_id);
CREATE INDEX IF NOT EXISTS idx_company_reviews_is_approved ON company_reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_company_reviews_rating ON company_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_company_reviews_created_at ON company_reviews(created_at DESC);

-- PASO 3: Habilitar RLS
ALTER TABLE company_reviews ENABLE ROW LEVEL SECURITY;

-- PASO 4: Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Los reviews aprobados son visibles públicamente" ON company_reviews;
DROP POLICY IF EXISTS "Cualquiera puede crear un review" ON company_reviews;
DROP POLICY IF EXISTS "Solo admins pueden actualizar reviews" ON company_reviews;
DROP POLICY IF EXISTS "Solo admins pueden eliminar reviews" ON company_reviews;
DROP POLICY IF EXISTS "Dueños pueden ver todas las reviews de su empresa" ON company_reviews;
DROP POLICY IF EXISTS "Dueños pueden actualizar reviews de su empresa" ON company_reviews;
DROP POLICY IF EXISTS "Dueños pueden eliminar reviews de su empresa" ON company_reviews;

-- PASO 5: Crear políticas RLS

-- SELECT: Reviews aprobadas son públicas
CREATE POLICY "Los reviews aprobados son visibles públicamente"
  ON company_reviews
  FOR SELECT
  USING (is_approved = true);

-- SELECT: Dueños ven TODAS las reviews de su empresa
CREATE POLICY "Dueños pueden ver todas las reviews de su empresa"
  ON company_reviews
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = company_reviews.company_id 
      AND companies.user_id = auth.uid()
    )
  );

-- INSERT: Cualquiera puede crear un review
CREATE POLICY "Cualquiera puede crear un review"
  ON company_reviews
  FOR INSERT
  WITH CHECK (true);

-- UPDATE: Dueños pueden aprobar/rechazar reviews
CREATE POLICY "Dueños pueden actualizar reviews de su empresa"
  ON company_reviews
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = company_reviews.company_id 
      AND companies.user_id = auth.uid()
    )
  );

-- DELETE: Dueños pueden eliminar reviews
CREATE POLICY "Dueños pueden eliminar reviews de su empresa"
  ON company_reviews
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = company_reviews.company_id 
      AND companies.user_id = auth.uid()
    )
  );

-- Verificación
DO $$
BEGIN
  RAISE NOTICE 'Tabla company_reviews creada y políticas RLS configuradas';
END $$;
