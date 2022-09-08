CREATE TABLE "tasks" (
  "id" text,
  "content" text,
  "is_done" boolean,
  "created_at" text,
  "due_at" text,
  "project_id" text
);

CREATE TABLE "projects" (
  "id" text,
  "name" text,
  "user_id" text
);

CREATE TABLE "users" (
  "id" text,
  "name" text,
  "password" text
);
