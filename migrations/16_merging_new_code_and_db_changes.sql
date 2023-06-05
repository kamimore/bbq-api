ALTER TABLE public.role DROP COLUMN super_categories;

ALTER TABLE public.role DROP COLUMN regions;

ALTER TABLE public.role DROP COLUMN type;


ALTER TABLE public."user" DROP COLUMN company_code;

ALTER TABLE public."user" DROP COLUMN location_code;

ALTER TABLE public."user" DROP COLUMN cluster;

ALTER TABLE public."user" DROP COLUMN location;

ALTER TABLE public."user" DROP COLUMN access_locations;

ALTER TABLE public."user" DROP COLUMN areas;

ALTER TABLE public."user" DROP COLUMN regions;

ALTER TABLE public."user" DROP COLUMN super_categories;

ALTER TABLE public."user" DROP CONSTRAINT user_role_id_fkey;

UPDATE public.user SET role_id=0, user_type='employee' WHERE role_id = 22

UPDATE public.user SET role_id=0, user_type='vendor' WHERE role_id = 4

delete from public.role where id=4 OR id=22

delete from public.user where full_name IS NULL AND role_id IS NULL AND user_type IS NULL

UPDATE public.user set user_type='employee' where user_type IS NULL

