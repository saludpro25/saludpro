-- ============================================
-- MIGRATION 006: Allow anonymous reviews
-- Permite que usuarios no autenticados puedan crear reviews
-- ============================================

-- Deshabilitar RLS temporalmente para limpiar políticas
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can create anonymous reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON reviews;
DROP POLICY IF EXISTS "Users can view own reviews" ON reviews;
DROP POLICY IF EXISTS "Approved reviews are viewable by everyone" ON reviews;
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
DROP POLICY IF EXISTS "Company owners can respond to reviews" ON reviews;

-- Rehabilitar RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Política para ver reviews aprobadas (público)
CREATE POLICY "Public can view approved reviews" 
ON reviews FOR SELECT 
USING (is_approved = true);

-- Política para crear reviews anónimas (sin autenticación)
CREATE POLICY "Anyone can create anonymous reviews" 
ON reviews FOR INSERT 
WITH CHECK (user_id IS NULL);

-- Política para que usuarios autenticados vean sus propias reviews
CREATE POLICY "Users can view own reviews" 
ON reviews FOR SELECT 
USING (auth.uid() = user_id);

-- Política para que propietarios respondan a reviews
CREATE POLICY "Company owners can respond to reviews" 
ON reviews FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Nota: Las reviews requieren aprobación manual (is_approved = false por defecto)
-- por lo que no hay riesgo de spam sin moderación
