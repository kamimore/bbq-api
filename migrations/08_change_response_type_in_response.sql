ALTER TABLE public.response RENAME response TO response_1;

ALTER TABLE public.response ADD COLUMN response text[];

ALTER TABLE public.response DROP COLUMN response_1;