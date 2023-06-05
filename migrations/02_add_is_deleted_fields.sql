ALTER TABLE public.question_category ADD COLUMN is_deleted boolean;

ALTER TABLE public.question ADD COLUMN is_deleted boolean;

ALTER TABLE public.site_survey ADD COLUMN is_deleted boolean;

ALTER TABLE public.notification ADD COLUMN is_deleted boolean default false;