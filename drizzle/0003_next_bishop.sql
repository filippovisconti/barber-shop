ALTER TABLE "appointments" DROP CONSTRAINT "appointments_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" DROP COLUMN IF EXISTS "user_id";