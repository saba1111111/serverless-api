CREATE TABLE IF NOT EXISTS "table" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
