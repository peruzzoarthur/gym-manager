/*
  Warnings:

  - You are about to drop the column `phase` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `phase` to the `TrainingGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Phase" ADD VALUE 'UNCATEGORIZED';

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "phase";

-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "phase" "Phase" NOT NULL;
