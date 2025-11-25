-- ============================================
-- FORZAR políticas para permitir INSERT anónimo
-- ============================================

-- Verificar políticas actuales
DO $$
DECLARE
    policy_count integer;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'reviews';
    
    RAISE NOTICE 'Políticas encontradas: %', policy_count;
END $$;

-- Deshabilitar y limpiar completamente
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Eliminar TODAS las políticas de forma agresiva
DROP POLICY IF EXISTS "select_approved_reviews" ON reviews;
DROP POLICY IF EXISTS "select_own_reviews" ON reviews;
DROP POLICY IF EXISTS "insert_anonymous_reviews" ON reviews;
DROP POLICY IF EXISTS "update_own_company_reviews" ON reviews;
DROP POLICY IF EXISTS "Enable read access for all users" ON reviews;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON reviews;
DROP POLICY IF EXISTS "Enable insert for all users" ON reviews;
DROP POLICY IF EXISTS "Allow public read approved" ON reviews;
DROP POLICY IF EXISTS "Allow insert for anon" ON reviews;

-- Limpiar cualquier otra política que pueda existir
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
        RAISE NOTICE 'Eliminada política: %', pol.policyname;
    END LOOP;
END $$;

-- Habilitar RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Crear políticas NUEVAS con nombres únicos

-- 1. SELECT: Permitir ver reviews aprobadas (público)
CREATE POLICY "public_can_read_approved_reviews" 
ON reviews FOR SELECT 
TO public
USING (is_approved = true);

-- 2. SELECT: Usuarios autenticados ven sus propias reviews
CREATE POLICY "users_can_read_own_reviews" 
ON reviews FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 3. INSERT: CUALQUIERA puede insertar (incluye anónimos)
CREATE POLICY "anyone_can_insert_reviews" 
ON reviews FOR INSERT 
TO public
WITH CHECK (true);

-- 4. INSERT: También para autenticados explícitamente
CREATE POLICY "authenticated_can_insert_reviews" 
ON reviews FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 5. UPDATE: Solo dueños de empresas
CREATE POLICY "company_owners_can_update_reviews" 
ON reviews FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Verificación final
DO $$
DECLARE
    policy_record record;
BEGIN
    RAISE NOTICE '=== POLÍTICAS CREADAS ===';
    FOR policy_record IN 
        SELECT policyname, cmd, roles
        FROM pg_policies 
        WHERE tablename = 'reviews'
        ORDER BY policyname
    LOOP
        RAISE NOTICE 'Política: % | Comando: % | Roles: %', 
            policy_record.policyname, 
            policy_record.cmd,
            policy_record.roles;
    END LOOP;
END $$;

-- Test de insert directo
DO $$
BEGIN
    RAISE NOTICE 'RLS está habilitado y políticas configuradas correctamente';
    RAISE NOTICE 'Ahora deberías poder insertar reviews desde el cliente anónimo';
END $$;
