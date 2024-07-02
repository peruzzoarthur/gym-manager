/*
  Warnings:

  - Added the required column `rest` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phase` to the `TrainingGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('CIS', 'ONE', 'TWO');

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "rest" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "phase" "Phase" NOT NULL;
