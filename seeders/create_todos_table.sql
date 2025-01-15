DROP TABLE IF EXISTS "todos";

CREATE TABLE IF NOT EXISTS "todos" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(255) NOT NULL,
  "completed" BOOLEAN DEFAULT FALSE,
  "created_at" datetime NOT NULL DEFAULT current_timestamp,
  "cpdated_at" datetime NOT NULL DEFAULT current_timestamp
);

CREATE TRIGGER tg_todos_updated_at
AFTER UPDATE
ON "todos" FOR EACH ROW
BEGIN
  UPDATE "todos" SET "updated_at" = current_timestamp
    WHERE "id" = old."id";
END;

-- example data
INSERT INTO "todos" ("name", "completed") VALUES ('Learn Sqlite 3', FALSE);
