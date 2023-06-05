ALTER TABLE public.vendor ADD COLUMN vendor_type text;

ALTER TABLE public.contract_item ADD COLUMN brand text;

ALTER TABLE public.contract_item ADD COLUMN specification text;

ALTER TABLE public.vendor_location ADD COLUMN fssai_number text;