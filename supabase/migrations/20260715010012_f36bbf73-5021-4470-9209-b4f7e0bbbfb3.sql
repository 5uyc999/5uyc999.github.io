
-- Allow public to submit testimonials (moderated: is_visible must be false on insert)
GRANT INSERT ON public.testimonials TO anon, authenticated;

CREATE POLICY "Anyone can submit testimonial for review"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (is_visible = false);
