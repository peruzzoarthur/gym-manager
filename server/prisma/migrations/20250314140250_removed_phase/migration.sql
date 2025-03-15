/*
  Warnings:

  - You are about to drop the column `phase` on the `TrainingGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key,trainingId,number]` on the table `TrainingGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TrainingGroup_key_trainingId_phase_number_key";

-- AlterTable
ALTER TABLE "TrainingGroup" DROP COLUMN "phase";

-- DropEnum
DROP TYPE "Phase";

-- CreateIndex
CREATE UNIQUE INDEX "TrainingGroup_key_trainingId_number_key" ON "TrainingGroup"("key", "trainingId", "number");
