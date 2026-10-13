ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS website_url text NULL, ADD COLUMN IF NOT EXISTS timeline text NULL;
DROP POLICY IF EXISTS "Anyone can submit a valid inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit a valid inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(service)) BETWEEN 1 AND 120
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND (business_name IS NULL OR char_length(business_name) <= 200)
  AND (budget IS NULL OR char_length(budget) <= 120)
  AND (website_url IS NULL OR (char_length(website_url) <= 255 AND website_url ~* '^https?://'))
  AND (timeline IS NULL OR timeline IN ('As soon as possible','Within 1–3 months','Within 3–6 months','I''m flexible'))
);