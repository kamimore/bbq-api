ALTER TABLE public.contract ADD COLUMN type text default 'internal';
ALTER TABLE public.contract ALTER COLUMN created_by TYPE integer;
ALTER TABLE public.contract ALTER COLUMN created_by DROP NOT NULL;
ALTER TABLE public.contract DROP CONSTRAINT contract_created_by_fkey;