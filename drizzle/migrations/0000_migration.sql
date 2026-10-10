CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  business_name text CHECK (business_name IS NULL OR char_length(business_name) <= 150),
  service text NOT NULL CHECK (service IN ('New Website','Website Redesign','Digital Tool or Web Application','Automation / Workflow Improvement','Something Else')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  budget text CHECK (budget IS NULL OR budget IN ('Under $1,000','$1,000–$2,500','$2,500–$5,000','$5,000+','Not Sure Yet')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);