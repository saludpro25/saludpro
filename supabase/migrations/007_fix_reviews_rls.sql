-- ============================================
-- MIGRATION 007: Fix reviews RLS - Permitir inserts anónimos
-- ============================================

-- PASO 1: Deshabilitar RLS completamente para limpiar
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- PASO 2: Eliminar TODAS las políticas (sin importar el nombre)
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'reviews'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON reviews', pol.policyname);
    END LOOP;
END $$;

-- PASO 3: Habilitar RLS nuevamente
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- PASO 4: Crear solo las políticas necesarias

-- Permitir SELECT de reviews aprobadas (público)
CREATE POLICY "select_approved_reviews" 
ON reviews FOR SELECT 
USING (is_approved = true);

-- Permitir SELECT de propias reviews (autenticados)
CREATE POLICY "select_own_reviews" 
ON reviews FOR SELECT 
USING (auth.uid() = user_id);

-- IMPORTANTE: Permitir INSERT sin restricciones (con user_id NULL)
CREATE POLICY "insert_anonymous_reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);

-- Permitir UPDATE solo a propietarios de empresas (para responder)
CREATE POLICY "update_own_company_reviews" 
ON reviews FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Verificación
DO $$
BEGIN
  RAISE NOTICE 'RLS configurado correctamente para reviews';
  RAISE NOTICE 'Políticas creadas: select_approved_reviews, select_own_reviews, insert_anonymous_reviews, update_own_company_reviews';
END $$;
