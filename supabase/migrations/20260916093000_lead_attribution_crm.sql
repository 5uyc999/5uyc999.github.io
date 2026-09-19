-- Marketing attribution + lightweight CRM lifecycle tracking
-- Created 2026-09-16

-- 1) Extend form leads with attribution and CRM outcome fields.
ALTER TABLE public.contact_inquiries
  ADD COLUMN IF NOT EXISTS form_type text,
  ADD COLUMN IF NOT EXISTS lead_status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS quoted_value numeric(12,2),
  ADD COLUMN IF NOT EXISTS sale_value numeric(12,2),
  ADD COLUMN IF NOT EXISTS unqualified_reason text,
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS reference_code text,
  ADD COLUMN IF NOT EXISTS first_source text,
  ADD COLUMN IF NOT EXISTS first_medium text,
  ADD COLUMN IF NOT EXISTS first_campaign text,
  ADD COLUMN IF NOT EXISTS first_term text,
  ADD COLUMN IF NOT EXISTS first_content text,
  ADD COLUMN IF NOT EXISTS first_gclid text,
  ADD COLUMN IF NOT EXISTS first_gbraid text,
  ADD COLUMN IF NOT EXISTS first_wbraid text,
  ADD COLUMN IF NOT EXISTS first_landing_page text,
  ADD COLUMN IF NOT EXISTS first_referrer text,
  ADD COLUMN IF NOT EXISTS last_source text,
  ADD COLUMN IF NOT EXISTS last_medium text,
  ADD COLUMN IF NOT EXISTS last_campaign text,
  ADD COLUMN IF NOT EXISTS last_term text,
  ADD COLUMN IF NOT EXISTS last_content text,
  ADD COLUMN IF NOT EXISTS last_gclid text,
  ADD COLUMN IF NOT EXISTS last_gbraid text,
  ADD COLUMN IF NOT EXISTS last_wbraid text,
  ADD COLUMN IF NOT EXISTS last_landing_page text,
  ADD COLUMN IF NOT EXISTS last_referrer text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_inquiries_lead_status_check'
  ) THEN
    ALTER TABLE public.contact_inquiries
      ADD CONSTRAINT contact_inquiries_lead_status_check
      CHECK (lead_status IN ('new', 'qualified', 'unqualified', 'quoted', 'won', 'lost'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_lead_status
  ON public.contact_inquiries (lead_status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_first_source
  ON public.contact_inquiries (first_source);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_reference_code
  ON public.contact_inquiries (reference_code);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at
  ON public.contact_inquiries (created_at DESC);

DROP TRIGGER IF EXISTS update_contact_inquiries_updated_at ON public.contact_inquiries;
CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public submissions may carry attribution, but may never self-mark as qualified/won
-- or set financial/admin-only fields.
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.contact_inquiries;
CREATE POLICY "Anyone can submit inquiry"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) > 0
    AND length(btrim(phone)) BETWEEN 6 AND 25
    AND (message IS NULL OR length(message) <= 5000)
    AND lead_status = 'new'
    AND quoted_value IS NULL
    AND sale_value IS NULL
    AND unqualified_reason IS NULL
    AND admin_notes IS NULL
  );

-- 2) Anonymous first-party interaction log. This measures clicks, not completed calls/sales.
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  form_type text,
  current_page text,
  session_id text,
  reference_code text,

  first_source text,
  first_medium text,
  first_campaign text,
  first_term text,
  first_content text,
  first_gclid text,
  first_gbraid text,
  first_wbraid text,
  first_landing_page text,
  first_referrer text,

  last_source text,
  last_medium text,
  last_campaign text,
  last_term text,
  last_content text,
  last_gclid text,
  last_gbraid text,
  last_wbraid text,
  last_landing_page text,
  last_referrer text,

  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT lead_interactions_event_type_check
    CHECK (event_type IN ('phone_click', 'whatsapp_click', 'get_quote_click', 'form_submit'))
);

ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.lead_interactions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.lead_interactions TO authenticated;

DROP POLICY IF EXISTS "Anyone can log lead interaction" ON public.lead_interactions;
CREATE POLICY "Anyone can log lead interaction"
  ON public.lead_interactions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    event_type IN ('phone_click', 'whatsapp_click', 'get_quote_click', 'form_submit')
    AND (current_page IS NULL OR length(current_page) <= 1000)
    AND (session_id IS NULL OR length(session_id) <= 120)
    AND (reference_code IS NULL OR length(reference_code) <= 40)
  );

DROP POLICY IF EXISTS "Admins can view lead interactions" ON public.lead_interactions;
CREATE POLICY "Admins can view lead interactions"
  ON public.lead_interactions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can delete lead interactions" ON public.lead_interactions;
CREATE POLICY "Admins can delete lead interactions"
  ON public.lead_interactions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE INDEX IF NOT EXISTS idx_lead_interactions_event_created
  ON public.lead_interactions (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_interactions_source_created
  ON public.lead_interactions (first_source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_interactions_reference
  ON public.lead_interactions (reference_code);
