/*
  Warnings:

  - You are about to drop the column `reps` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `rest` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "reps",
DROP COLUMN "rest",
DROP COLUMN "sets";
