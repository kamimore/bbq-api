ALTER TABLE public.vendor ADD COLUMN super_categories integer[];

ALTER TABLE public.vendor_approval_request ADD COLUMN reviewed_by integer;