/*
  Warnings:

  - You are about to drop the `_TrainingToTrainingGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trainingId` to the `TrainingGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TrainingToTrainingGroup" DROP CONSTRAINT "_TrainingToTrainingGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingToTrainingGroup" DROP CONSTRAINT "_TrainingToTrainingGroup_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "sets" INTEGER;

-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "trainingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TrainingToTrainingGroup";

-- AddForeignKey
ALTER TABLE "TrainingGroup" ADD CONSTRAINT "TrainingGroup_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
