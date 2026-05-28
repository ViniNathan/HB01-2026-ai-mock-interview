CREATE EXTENSION IF NOT EXISTS pg_trgm;

ALTER TABLE "resumes"
ADD COLUMN "storage_key" TEXT;

UPDATE "resumes"
SET "storage_key" = "pdf_url"
WHERE "storage_key" IS NULL;

ALTER TABLE "resumes"
ALTER COLUMN "storage_key" SET NOT NULL;

CREATE INDEX "resumes_storage_key_idx" ON "resumes"("storage_key");
