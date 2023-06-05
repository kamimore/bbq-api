ALTER TABLE public.vendor ADD COLUMN status text;

UPDATE public.vendor SET status = 'pending' ;