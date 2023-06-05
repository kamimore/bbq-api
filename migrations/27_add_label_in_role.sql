ALTER TABLE public.role ADD COLUMN label text;

UPDATE role set label = name;

ALTER TABLE public.role ALTER COLUMN label SET NOT NULL;