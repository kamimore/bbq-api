ALTER TABLE public.vendor_bank_detail ADD COLUMN is_deleted boolean DEFAULT false;

ALTER TABLE public.vendor_location ADD COLUMN is_deleted boolean DEFAULT false;

UPDATE public.vendor_bank_detail SET is_deleted = false ;

UPDATE public.vendor_location SET is_deleted = false ;