/*
  Warnings:

  - Added the required column `reps` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rounds` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "rounds" INTEGER NOT NULL;
