ALTER TABLE public.contract ADD COLUMN bbq_comment text;

ALTER TABLE public.contract ADD COLUMN vendor_comment text;
	
ALTER TABLE public.contract RENAME "term-condition" TO term_condition;