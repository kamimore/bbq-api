ALTER TABLE public.vendor ADD COLUMN type text default 'external';

ALTER TABLE public.vendor ADD COLUMN registered_by_id integer;