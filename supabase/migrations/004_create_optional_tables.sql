-- ============================================
-- MIGRACIÓN: Crear tablas opcionales (products, blogs, reviews)
-- ============================================

-- ============================================
-- TABLA: products
-- Productos/servicios ofrecidos por cada empresa
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del producto
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'COP',
  
  -- Imágenes
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  
  -- Categorización
  category VARCHAR(100),
  tags TEXT[],
  
  -- Inventario
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR(100),
  
  -- Estado
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Opciones
  has_variations BOOLEAN DEFAULT false,
  variations JSONB DEFAULT '[]'::jsonb,
  
  -- Métricas
  views_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  
  -- Ordenamiento
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para products
CREATE INDEX IF NOT EXISTS idx_products_company_id ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);

-- ============================================
-- TABLA: blogs
-- Artículos/blogs de cada empresa
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  
  -- Información del blog
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  cover_image TEXT,
  content_path TEXT NOT NULL,
  
  -- Estado
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Métricas
  views INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Constraint
  UNIQUE(company_id, slug)
);

-- Índices para blogs
CREATE INDEX IF NOT EXISTS idx_blogs_company_id ON blogs(company_id);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published, published_at DESC);

-- ============================================
-- TABLA: reviews
-- Reseñas y calificaciones de empresas
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Información de la reseña
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  
  -- Contenido
  title VARCHAR(200) NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Estado
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Respuesta del propietario
  owner_response TEXT,
  owner_response_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadatos
  helpful_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para reviews
CREATE INDEX IF NOT EXISTS idx_reviews_company_id ON reviews(company_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- ============================================
-- TABLA: review_reports
-- Reportes de reseñas inapropiadas
-- ============================================
CREATE TABLE IF NOT EXISTS review_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  reporter_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Información del reporte
  reason VARCHAR(50) NOT NULL,
  comment TEXT,
  
  -- Estado
  status VARCHAR(20) DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  resolved_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraint
  UNIQUE(review_id, reporter_user_id)
);

-- Índices para review_reports
CREATE INDEX IF NOT EXISTS idx_review_reports_review_id ON review_reports(review_id);
CREATE INDEX IF NOT EXISTS idx_review_reports_status ON review_reports(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;

-- Políticas para products
DROP POLICY IF EXISTS "Productos activos son públicos" ON products;
CREATE POLICY "Productos activos son públicos"
ON products FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Usuarios gestionan sus productos" ON products;
CREATE POLICY "Usuarios gestionan sus productos"
ON products FOR ALL
USING (
  company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  )
);

-- Políticas para blogs
DROP POLICY IF EXISTS "Anyone can view published blogs" ON blogs;
CREATE POLICY "Anyone can view published blogs"
ON blogs FOR SELECT
USING (is_published = true);

DROP POLICY IF EXISTS "Company owners can view own blogs" ON blogs;
CREATE POLICY "Company owners can view own blogs"
ON blogs FOR SELECT
USING (
  company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Company owners can insert own blogs" ON blogs;
CREATE POLICY "Company owners can insert own blogs"
ON blogs FOR INSERT
WITH CHECK (
  company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Company owners can update own blogs" ON blogs;
CREATE POLICY "Company owners can update own blogs"
ON blogs FOR UPDATE
USING (
  company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Company owners can delete own blogs" ON blogs;
CREATE POLICY "Company owners can delete own blogs"
ON blogs FOR DELETE
USING (
  company_id IN (
    SELECT id FROM companies WHERE user_id = auth.uid()
  )
);

-- Políticas para reviews
DROP POLICY IF EXISTS "Approved reviews are viewable by everyone" ON reviews;
CREATE POLICY "Approved reviews are viewable by everyone" 
ON reviews FOR SELECT 
USING (is_approved = true);

DROP POLICY IF EXISTS "Users can view own reviews" ON reviews;
CREATE POLICY "Users can view own reviews" 
ON reviews FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews" 
ON reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews" 
ON reviews FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Company owners can respond to reviews" ON reviews;
CREATE POLICY "Company owners can respond to reviews" 
ON reviews FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = reviews.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Políticas para review_reports
DROP POLICY IF EXISTS "Users can create review reports" ON review_reports;
CREATE POLICY "Users can create review reports" 
ON review_reports FOR INSERT 
WITH CHECK (auth.uid() = reporter_user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para updated_at en products
DROP TRIGGER IF EXISTS update_products_updated_at_trigger ON products;
CREATE TRIGGER update_products_updated_at_trigger 
BEFORE UPDATE ON products
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();

-- Trigger para updated_at en blogs
DROP TRIGGER IF EXISTS blogs_updated_at ON blogs;
CREATE TRIGGER blogs_updated_at 
BEFORE UPDATE ON blogs
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();

-- Trigger para updated_at en reviews
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at 
BEFORE UPDATE ON reviews
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();

-- ============================================
-- FUNCIÓN PARA CALCULAR RATING
-- ============================================

-- Función para calcular promedio de calificación
CREATE OR REPLACE FUNCTION calculate_company_rating(company_uuid UUID)
RETURNS TABLE (
  average_rating NUMERIC,
  total_reviews BIGINT,
  rating_distribution JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ROUND(AVG(rating), 1) as average_rating,
    COUNT(*) as total_reviews,
    jsonb_build_object(
      '5', COUNT(*) FILTER (WHERE rating = 5),
      '4', COUNT(*) FILTER (WHERE rating = 4),
      '3', COUNT(*) FILTER (WHERE rating = 3),
      '2', COUNT(*) FILTER (WHERE rating = 2),
      '1', COUNT(*) FILTER (WHERE rating = 1)
    ) as rating_distribution
  FROM reviews
  WHERE company_id = company_uuid AND is_approved = true;
END;
$$ LANGUAGE plpgsql;
