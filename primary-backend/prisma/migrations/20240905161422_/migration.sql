/*
  Warnings:

  - You are about to drop the column `metadata` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSON NOT NULL DEFAULT '{}'::jsonb;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "metadata";
