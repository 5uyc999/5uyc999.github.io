ALTER TABLE public.contact_inquiries 
ADD COLUMN from_neighborhood text,
ADD COLUMN to_neighborhood text,
ADD COLUMN moving_date date;