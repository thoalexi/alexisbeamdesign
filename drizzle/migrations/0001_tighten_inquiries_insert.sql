DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit a valid inquiry" ON public.inquiries
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(service)) BETWEEN 1 AND 120
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
  AND (business_name IS NULL OR char_length(business_name) <= 200)
  AND (budget IS NULL OR char_length(budget) <= 120)
);