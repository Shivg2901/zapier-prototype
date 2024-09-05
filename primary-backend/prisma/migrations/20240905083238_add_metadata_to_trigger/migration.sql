-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSON NOT NULL DEFAULT '{}'::jsonb;
