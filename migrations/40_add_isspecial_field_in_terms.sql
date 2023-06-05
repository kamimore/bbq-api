ALTER TABLE public.term_condition ADD COLUMN is_special boolean default false;

update public.term_condition set is_special=false;