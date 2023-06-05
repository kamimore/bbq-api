ALTER TABLE public.mst_payment_term ADD COLUMN is_active boolean;

UPDATE public.mst_payment_term SET is_active = true ;