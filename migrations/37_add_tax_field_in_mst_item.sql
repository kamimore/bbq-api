ALTER TABLE public.mst_item ADD COLUMN tax numeric(10, 2) default 0;
ALTER TABLE public.contract_item ADD COLUMN tax numeric(10, 2) default 0;