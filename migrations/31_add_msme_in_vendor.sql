ALTER TABLE public.vendor ADD COLUMN is_msme boolean default false;

ALTER TABLE public.vendor ADD COLUMN msme_certificate jsonb;