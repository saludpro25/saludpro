-- ============================================
-- MIGRATION 005: Add social_links column to companies
-- Adds JSONB column for backward compatibility with registration flow
-- ============================================

-- Add social_links column as JSONB to store social media links directly
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' 
    AND column_name = 'social_links'
  ) THEN
    ALTER TABLE companies 
    ADD COLUMN social_links JSONB DEFAULT '[]'::jsonb;
    
    RAISE NOTICE 'Column social_links added to companies table';
  ELSE
    RAISE NOTICE 'Column social_links already exists in companies table';
  END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN companies.social_links IS 'Array JSON de enlaces a redes sociales. Formato: [{"platform": "instagram", "url": "https://..."}]';

-- Create index for faster JSONB queries
CREATE INDEX IF NOT EXISTS idx_companies_social_links ON companies USING GIN (social_links);
