ALTER TABLE public."user" DROP COLUMN region;

ALTER TABLE public."user" ADD COLUMN areas integer[];

ALTER TABLE public."user" ADD COLUMN regions integer[];

ALTER TABLE public."user" ADD COLUMN "super_categories" integer[];

ALTER TABLE public."user" ADD COLUMN "sourcing_type" text;

ALTER TABLE public."user" ADD COLUMN "user_type" text;