ALTER TABLE public.vendor ADD COLUMN bbq_vendor_id text;

ALTER TABLE public.vendor_location RENAME state_id TO state_id_1;

ALTER TABLE public.vendor_location ADD COLUMN state_id integer;

ALTER TABLE public.vendor_location DROP COLUMN state_id_1;