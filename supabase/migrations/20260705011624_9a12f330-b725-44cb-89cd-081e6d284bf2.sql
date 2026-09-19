
-- 1) Storage: restrict listing on media bucket to admins (public URLs still bypass RLS)
DROP POLICY IF EXISTS "Anyone can view media" ON storage.objects;
CREATE POLICY "Admins can list media"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) contact_inquiries: replace WITH CHECK (true) with validation, add explicit admin SELECT
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.contact_inquiries;
CREATE POLICY "Anyone can submit inquiry"
  ON public.contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) > 0
    AND length(btrim(phone)) BETWEEN 6 AND 25
    AND (message IS NULL OR length(message) <= 5000)
  );

CREATE POLICY "Admins can view inquiries"
  ON public.contact_inquiries FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) user_roles: allow users to read their own roles (needed for INVOKER has_role)
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 4) has_role: switch from SECURITY DEFINER to SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
