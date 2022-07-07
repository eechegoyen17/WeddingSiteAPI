-- public.login definition

-- Drop table

-- DROP TABLE public.login;

CREATE TABLE public.login (
	id serial4 NOT NULL,
	email varchar(500) NULL,
	secret varchar(500) NULL,
	CONSTRAINT login_pkey PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" varchar(500) NULL,
	email varchar(500) NULL,
	"role" varchar(100) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
