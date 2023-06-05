CREATE TABLE public.log
(
    id integer NOT NULL DEFAULT nextval('log_id_seq'::regclass),
    user_id integer,
    entity_id integer,
    entity character varying(255) COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default" DEFAULT 'edit'::text,
    old_value jsonb,
    new_value jsonb,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT log_pkey PRIMARY KEY (id),
    CONSTRAINT log_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

CREATE TABLE public.notification
(
    id integer NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
    user_id integer NOT NULL,
    message text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    payload jsonb,
    has_read boolean DEFAULT false,
    type enum_notification_type DEFAULT 'other'::enum_notification_type,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT notification_pkey PRIMARY KEY (id)
)

CREATE TABLE public.question
(
    id integer NOT NULL DEFAULT nextval('question_id_seq'::regclass),
    question_category_id integer NOT NULL,
    label text COLLATE pg_catalog."default",
    help_text text COLLATE pg_catalog."default",
    answer_type text COLLATE pg_catalog."default" NOT NULL DEFAULT 'text'::text,
    multi boolean DEFAULT false,
    options text[] COLLATE pg_catalog."default",
    "order" integer,
    is_active boolean DEFAULT true,
    is_required boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT question_pkey PRIMARY KEY (id)
)

CREATE TABLE public.question_category
(
    id integer NOT NULL DEFAULT nextval('question_category_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT question_category_pkey PRIMARY KEY (id)
)

CREATE TABLE public.question_category_role
(
    id integer NOT NULL DEFAULT nextval('question_category_role_id_seq'::regclass),
    question_category_id integer NOT NULL,
    role_id integer NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT question_category_role_pkey PRIMARY KEY (id)
)

CREATE TABLE public.response
(
    id integer NOT NULL DEFAULT nextval('response_id_seq'::regclass),
    user_id integer NOT NULL,
    site_survey_id integer NOT NULL,
    question_id integer NOT NULL,
    question jsonb,
    role_id integer NOT NULL,
    response jsonb[],
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT response_pkey PRIMARY KEY (id)
)

CREATE TABLE public.role
(
    id integer NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    permission text[] COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id),
    CONSTRAINT role_name_key UNIQUE (name)
)

CREATE TABLE public.site_survey
(
    id integer NOT NULL DEFAULT nextval('site_survey_id_seq'::regclass),
    assigned_to_id integer NOT NULL,
    created_by_id integer NOT NULL,
    status text COLLATE pg_catalog."default" DEFAULT 'pending'::text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT site_survey_pkey PRIMARY KEY (id)
)

CREATE TABLE public.token
(
    id integer NOT NULL DEFAULT nextval('token_id_seq'::regclass),
    token text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    type text COLLATE pg_catalog."default" DEFAULT 'forgotpassword'::text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT token_pkey PRIMARY KEY (id),
    CONSTRAINT token_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    first_name text COLLATE pg_catalog."default",
    last_name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    role_id integer,
    password text COLLATE pg_catalog."default",
    salt text COLLATE pg_catalog."default",
    is_account_locked boolean DEFAULT false,
    is_email_verified boolean DEFAULT false,
    device text COLLATE pg_catalog."default" DEFAULT 'android'::text,
    device_token text COLLATE pg_catalog."default",
    employee_code text COLLATE pg_catalog."default",
    user_name text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    dob timestamp with time zone,
    joining_date timestamp with time zone,
    company_code text COLLATE pg_catalog."default",
    location_code text COLLATE pg_catalog."default",
    cluster text COLLATE pg_catalog."default",
    region text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    access_locations text[] COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_email_key UNIQUE (email),
    CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES public.role (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

