-- ============================================
-- DIRECTORIO SALUDPRO - SCHEMA SQL COMPLETO
-- Sistema de Gestión de Perfiles de Salud con URLs Personalizadas
-- Fecha: 2025-11-23
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: companies
-- Almacena toda la información de perfiles profesionales
-- ============================================
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Datos básicos
  slug VARCHAR(100) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL CHECK (category IN ('especialista-salud', 'centro-medico', 'agente-digitalizador')),
  
  -- Información de contacto
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  website VARCHAR(255),
  
  -- Ubicación
  address TEXT,
  city VARCHAR(100),
  department VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Colombia',
  
  -- Descripción
  description TEXT,
  short_description VARCHAR(500),
  
  -- Información adicional
  year_founded INTEGER,
  employee_count VARCHAR(50),
  industry VARCHAR(100),
  
  -- Estado y visibilidad
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'draft')),
  
  -- Metadatos
  views_count INTEGER DEFAULT 0,
  profile_completeness INTEGER DEFAULT 0,
  
  -- Personalización
  theme_color VARCHAR(7),
  theme_style VARCHAR(20),
  custom_color VARCHAR(7),
  selected_theme VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Constraints
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT slug_length CHECK (LENGTH(slug) >= 3 AND LENGTH(slug) <= 100)
);

-- Índices para companies
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_category ON companies(category);
CREATE INDEX IF NOT EXISTS idx_companies_city ON companies(city);
CREATE INDEX IF NOT EXISTS idx_companies_is_active ON companies(is_active);
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON companies(created_at DESC);

-- Comentario de documentación
COMMENT ON TABLE companies IS 'Tabla principal que almacena perfiles de especialistas en salud, centros médicos y agentes digitalizadores del Directorio SaludPro';
COMMENT ON COLUMN companies.category IS 'Categoría del perfil: especialista-salud (profesionales independientes), centro-medico (clínicas y centros), agente-digitalizador (proveedores de servicios digitales)';

-- ============================================
-- TABLA: social_links
-- ============================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(company_id, platform)
);

CREATE INDEX IF NOT EXISTS idx_social_links_company_id ON social_links(company_id);

-- ============================================
-- TABLA: company_images
-- ============================================
CREATE TABLE IF NOT EXISTS company_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  image_type VARCHAR(20) NOT NULL CHECK (image_type IN ('logo', 'cover', 'gallery')),
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_company_images_company_id ON company_images(company_id);

-- ============================================
-- TABLA: company_stats
-- ============================================
CREATE TABLE IF NOT EXISTS company_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  profile_shares INTEGER DEFAULT 0,
  contact_clicks INTEGER DEFAULT 0,
  last_view_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_company_stats_company_id ON company_stats(company_id);

-- ============================================
-- TABLA: slug_history
-- ============================================
CREATE TABLE IF NOT EXISTS slug_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  old_slug VARCHAR(100) NOT NULL,
  new_slug VARCHAR(100) NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_slug_history_old_slug ON slug_history(old_slug);

-- ============================================
-- TABLA: business_hours
-- ============================================
CREATE TABLE IF NOT EXISTS business_hours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  opens_at TIME,
  closes_at TIME,
  is_closed BOOLEAN DEFAULT false,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(company_id, day_of_week)
);

CREATE INDEX IF NOT EXISTS idx_business_hours_company_id ON business_hours(company_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE slug_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;

-- Políticas para companies
DROP POLICY IF EXISTS "Companies are viewable by everyone when active" ON companies;
CREATE POLICY "Companies are viewable by everyone when active" 
ON companies FOR SELECT 
USING (is_active = true AND visibility = 'public');

DROP POLICY IF EXISTS "Users can view own companies" ON companies;
CREATE POLICY "Users can view own companies" 
ON companies FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own companies" ON companies;
CREATE POLICY "Users can create own companies" 
ON companies FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own companies" ON companies;
CREATE POLICY "Users can update own companies" 
ON companies FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own companies" ON companies;
CREATE POLICY "Users can delete own companies" 
ON companies FOR DELETE 
USING (auth.uid() = user_id);

-- Políticas para social_links
DROP POLICY IF EXISTS "Social links are viewable by everyone" ON social_links;
CREATE POLICY "Social links are viewable by everyone" 
ON social_links FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = social_links.company_id 
    AND companies.is_active = true 
    AND companies.visibility = 'public'
  )
);

DROP POLICY IF EXISTS "Users can manage own social links" ON social_links;
CREATE POLICY "Users can manage own social links" 
ON social_links FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = social_links.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Políticas para company_images
DROP POLICY IF EXISTS "Images are viewable by everyone" ON company_images;
CREATE POLICY "Images are viewable by everyone" 
ON company_images FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = company_images.company_id 
    AND companies.is_active = true 
    AND companies.visibility = 'public'
  )
);

DROP POLICY IF EXISTS "Users can manage own images" ON company_images;
CREATE POLICY "Users can manage own images" 
ON company_images FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = company_images.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Políticas para company_stats
DROP POLICY IF EXISTS "Stats are viewable by company owner" ON company_stats;
CREATE POLICY "Stats are viewable by company owner" 
ON company_stats FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = company_stats.company_id 
    AND companies.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Stats can be updated by anyone (for view counting)" ON company_stats;
CREATE POLICY "Stats can be updated by anyone (for view counting)" 
ON company_stats FOR UPDATE 
USING (true);

-- Políticas para business_hours
DROP POLICY IF EXISTS "Business hours are viewable by everyone" ON business_hours;
CREATE POLICY "Business hours are viewable by everyone" 
ON business_hours FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = business_hours.company_id 
    AND companies.is_active = true 
    AND companies.visibility = 'public'
  )
);

DROP POLICY IF EXISTS "Users can manage own business hours" ON business_hours;
CREATE POLICY "Users can manage own business hours" 
ON business_hours FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = business_hours.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_social_links_updated_at ON social_links;
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_business_hours_updated_at ON business_hours;
CREATE TRIGGER update_business_hours_updated_at BEFORE UPDATE ON business_hours
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Función para verificar slug único
CREATE OR REPLACE FUNCTION check_slug_availability(slug_to_check VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM companies WHERE slug = slug_to_check
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para incrementar vistas
CREATE OR REPLACE FUNCTION increment_company_views(company_slug VARCHAR)
RETURNS void AS $$
DECLARE
  company_uuid UUID;
BEGIN
  SELECT id INTO company_uuid FROM companies WHERE slug = company_slug;
  
  IF company_uuid IS NOT NULL THEN
    UPDATE companies 
    SET views_count = views_count + 1 
    WHERE id = company_uuid;
    
    INSERT INTO company_stats (company_id, total_views, last_view_at)
    VALUES (company_uuid, 1, NOW())
    ON CONFLICT (company_id) 
    DO UPDATE SET 
      total_views = company_stats.total_views + 1,
      last_view_at = NOW();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función de búsqueda
CREATE OR REPLACE FUNCTION search_companies(search_query TEXT)
RETURNS TABLE (
  id UUID,
  slug VARCHAR,
  company_name VARCHAR,
  category VARCHAR,
  short_description VARCHAR,
  city VARCHAR,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.slug,
    c.company_name,
    c.category,
    c.short_description,
    c.city,
    ts_rank(to_tsvector('spanish', c.company_name || ' ' || COALESCE(c.description, '')), 
            plainto_tsquery('spanish', search_query)) AS relevance
  FROM companies c
  WHERE 
    c.is_active = true 
    AND c.visibility = 'public'
    AND to_tsvector('spanish', c.company_name || ' ' || COALESCE(c.description, '')) 
        @@ plainto_tsquery('spanish', search_query)
  ORDER BY relevance DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;
