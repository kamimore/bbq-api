ALTER TABLE public.role ADD COLUMN type text;

UPDATE public.role SET type = 'other' ;