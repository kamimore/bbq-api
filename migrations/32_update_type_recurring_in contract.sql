ALTER TABLE public.contract ADD COLUMN type text;
	
update contract set type='recurring';

ALTER TABLE public.contract ADD COLUMN service text;
	
update contract set service='supply' ;

ALTER TABLE public.contract_item ADD COLUMN item_name text;
	
ALTER TABLE public.contract RENAME type TO contract_type;

ALTER TABLE public.contract RENAME service TO contract_service;
	
ALTER TABLE public.vendor ADD COLUMN cash_limit decimal(10, 2);