ALTER POLICY "Anyone can submit a valid inquiry" ON public.inquiries WITH CHECK (
char_length(btrim(name)) BETWEEN 1 AND 120
AND char_length(email) BETWEEN 3 AND 255
AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
AND char_length(btrim(service)) BETWEEN 0 AND 120
AND char_length(btrim(message)) BETWEEN 1 AND 5000
AND (business_name IS NULL OR char_length(business_name) <= 200)
AND (budget IS NULL OR char_length(budget) <= 120)
AND (website_url IS NULL OR (char_length(website_url) <= 255 AND website_url ~* '^https?://'))
AND (timeline IS NULL OR timeline IN ('As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'I''m flexible'))
);
COMMENT ON COLUMN public.inquiries.service IS 'Optional service interest. Empty string means the visitor did not select a service; historical values are preserved.';
COMMENT ON COLUMN public.inquiries.business_name IS 'Historical or detailed-intake information; no longer collected by the short public inquiry form.';
COMMENT ON COLUMN public.inquiries.budget IS 'Historical or detailed-intake information; no longer collected by the short public inquiry form.';
COMMENT ON COLUMN public.inquiries.timeline IS 'Historical or detailed-intake information; no longer collected by the short public inquiry form.';