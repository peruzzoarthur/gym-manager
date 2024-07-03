/*
  Warnings:

  - A unique constraint covering the columns `[key,trainingId,phase,number]` on the table `TrainingGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `TrainingGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TrainingGroup_key_trainingId_key";

-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TrainingGroup_key_trainingId_phase_number_key" ON "TrainingGroup"("key", "trainingId", "phase", "number");
