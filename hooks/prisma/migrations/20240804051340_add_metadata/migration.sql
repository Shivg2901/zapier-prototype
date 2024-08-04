/*
  Warnings:

  - Added the required column `metaData` to the `ZapRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "metaData" JSONB NOT NULL;
