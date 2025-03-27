CREATE TABLE "usuario" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(120) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuario_email_unique" UNIQUE("email"),
	CONSTRAINT "usuario_password_unique" UNIQUE("password")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "usuario" USING btree ("email");