-- ============================================
-- MIGRACIÓN: Configurar Storage Buckets y Políticas
-- ============================================

-- Crear bucket para imágenes de empresas si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-images', 'company-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Crear bucket para contenido de blogs si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-content', 'blog-content', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- POLÍTICAS DE STORAGE PARA company-images
-- ============================================

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Public can view company images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view company images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload company images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload company images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update company images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own company images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete company images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own company images" ON storage.objects;

-- Lectura pública de imágenes de empresas
CREATE POLICY "Public can view company images"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-images');

-- Usuarios autenticados pueden subir imágenes a sus carpetas
CREATE POLICY "Authenticated users can upload company images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'company-images' AND
  auth.role() = 'authenticated'
);

-- Usuarios autenticados pueden actualizar sus propias imágenes
CREATE POLICY "Authenticated users can update company images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'company-images' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'company-images' AND
  auth.role() = 'authenticated'
);

-- Usuarios autenticados pueden eliminar sus propias imágenes
CREATE POLICY "Authenticated users can delete company images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'company-images' AND
  auth.role() = 'authenticated'
);

-- ============================================
-- POLÍTICAS DE STORAGE PARA blog-content
-- ============================================

DROP POLICY IF EXISTS "Anyone can view blog content" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog content" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog content" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog content" ON storage.objects;

-- Lectura pública de contenido de blogs
CREATE POLICY "Anyone can view blog content"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-content');

-- Usuarios autenticados pueden subir contenido de blog
CREATE POLICY "Authenticated users can upload blog content"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-content' AND
  auth.role() = 'authenticated'
);

-- Usuarios autenticados pueden actualizar contenido de blog
CREATE POLICY "Authenticated users can update blog content"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-content' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'blog-content' AND
  auth.role() = 'authenticated'
);

-- Usuarios autenticados pueden eliminar contenido de blog
CREATE POLICY "Authenticated users can delete blog content"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-content' AND
  auth.role() = 'authenticated'
);
