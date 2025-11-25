-- ============================================
-- MIGRATION 006: Allow anonymous reviews
-- Permite que usuarios no autenticados puedan crear reviews
-- ============================================

-- Eliminar la política restrictiva de INSERT
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;

-- Crear nueva política que permite reviews anónimas
CREATE POLICY "Anyone can create reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);

-- Nota: Las reviews requieren aprobación manual (is_approved = false por defecto)
-- por lo que no hay riesgo de spam sin moderación
