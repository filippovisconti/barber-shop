-- Adminer 4.8.1 PostgreSQL 16.2 (Debian 16.2-1.pgdg120+2) dump

DROP TABLE IF EXISTS "account";
CREATE TABLE "public"."account" (
    "userId" text NOT NULL,
    "type" text NOT NULL,
    "provider" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refresh_token" text,
    "access_token" text,
    "expires_at" integer,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY ("provider", "providerAccountId")
) WITH (oids = false);


DROP TABLE IF EXISTS "appointments";
CREATE TABLE "public"."appointments" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "service_id" uuid NOT NULL,
    "date" timestamp NOT NULL,
    "notes" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "status" status,
    "location_id" uuid NOT NULL,
    "user_email" text NOT NULL,
    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "locations";
CREATE TABLE "public"."locations" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "address" text NOT NULL,
    "city" text NOT NULL,
    "opening_at" timestamp NOT NULL,
    "closing_at" timestamp NOT NULL,
    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "locations" ("id", "name", "address", "city", "opening_at", "closing_at") VALUES
('a0303ef7-3333-451d-872b-ac84c94667f8',	'Barber Street',	'123 Barber Street',	'New York',	'2024-01-01 08:00:00',	'2024-01-01 17:00:00'),
('205d83f3-a597-41de-b8b2-2a54c003738e',	'Haircut Street',	'555 Haircut Street',	'Seattle',	'2024-01-01 08:30:00',	'2024-01-01 18:30:00');

DROP TABLE IF EXISTS "services";
CREATE TABLE "public"."services" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "price" real NOT NULL,
    "duration" integer DEFAULT '30' NOT NULL,
    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "services" ("id", "name", "description", "price", "duration") VALUES
('0f82f34f-c508-4b83-bc23-20ff14fc46a6',	'Haircut',	'Indulge in a tailored haircut that reflects your individual style.',	20,	30),
('afa5970b-9add-4d8c-a886-4d2599d4a947',	'Beard Trim',	'Elevate your facial hair game with our precision beard trims. ',	30,	30),
('6fb771d5-3e6b-4f97-a5d3-fb26b2702caa',	'Hair Styling',	'Transform your look with our expert hair styling services.',	25,	30),
('1cb819b2-d4db-4f1a-842f-cd1179383515',	'Hot Towel Shave',	'Relax and rejuvenate with our luxurious hot towel shave service.
',	40,	45);

DROP TABLE IF EXISTS "session";
CREATE TABLE "public"."session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sessionToken")
) WITH (oids = false);


DROP TABLE IF EXISTS "user";
CREATE TABLE "public"."user" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "name" text,
    "emailVerified" timestamp,
    "image" text,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "verificationToken";
CREATE TABLE "public"."verificationToken" (
    "identifier" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp NOT NULL,
    CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY ("identifier", "token")
) WITH (oids = false);


ALTER TABLE ONLY "public"."account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "appointments_location_id_locations_id_fk" FOREIGN KEY (location_id) REFERENCES locations(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "appointments_service_id_services_id_fk" FOREIGN KEY (service_id) REFERENCES services(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-03-03 15:50:45.898035+00
