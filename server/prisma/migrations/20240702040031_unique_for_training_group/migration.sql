/*
  Warnings:

  - A unique constraint covering the columns `[key,trainingId]` on the table `TrainingGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrainingGroup_key_trainingId_key" ON "TrainingGroup"("key", "trainingId");
