ALTER TABLE public.vendor ADD COLUMN comment text;

ALTER TABLE public.vendor ADD COLUMN vendor_posting_group_id integer;

ALTER TABLE public.vendor ADD COLUMN product_group_id integer;

ALTER TABLE public.vendor ADD COLUMN structure_id integer;

ALTER TABLE public.vendor ADD COLUMN payment_term_id integer;

ALTER TABLE public.vendor ADD COLUMN priority text;

ALTER TABLE public.vendor ADD COLUMN general_bus_posting_group text;

ALTER TABLE public.vendor ADD COLUMN vat_bus_posting_group text;

ALTER TABLE public.vendor ADD COLUMN approval_date date;

ALTER TABLE public.vendor ADD COLUMN invoicing text;

ALTER TABLE public.vendor ADD COLUMN application_method text;

ALTER TABLE public.vendor ADD COLUMN vat_registeration_number text;