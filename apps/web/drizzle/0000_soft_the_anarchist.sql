CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
