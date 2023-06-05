ALTER TABLE public.notification ADD COLUMN is_deleted boolean default false;

UPDATE public.notification SET is_deleted = false;