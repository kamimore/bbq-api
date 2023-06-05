ALTER TABLE public.vendor ADD COLUMN is_ssi boolean default false;

ALTER TABLE public.vendor ADD COLUMN composition boolean default false;

ALTER TABLE public.vendor ADD COLUMN transporter boolean default false;

ALTER TABLE public.vendor ADD COLUMN ssi_validity date;

ALTER TABLE public.vendor ADD COLUMN sub_contractor boolean default false;