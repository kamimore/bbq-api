ALTER TABLE public.vendor_approval_request ADD COLUMN can_review boolean DEFAULT true;

ALTER TABLE public.vendor_approval_request ADD COLUMN assigned_by integer;

UPDATE public.vendor_approval_request SET can_review = true ;