ALTER TABLE public.vendor DROP COLUMN show_ledger;

ALTER TABLE public.vendor ADD COLUMN show_ledger boolean default false;