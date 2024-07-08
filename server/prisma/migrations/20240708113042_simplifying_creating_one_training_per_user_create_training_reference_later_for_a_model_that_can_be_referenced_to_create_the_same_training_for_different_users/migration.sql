/*
  Warnings:

  - You are about to drop the `UserTraining` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrainingGroupToUserTraining` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingGroupToUserTraining" DROP CONSTRAINT "_TrainingGroupToUserTraining_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingGroupToUserTraining" DROP CONSTRAINT "_TrainingGroupToUserTraining_B_fkey";

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTraining";

-- DropTable
DROP TABLE "_TrainingGroupToUserTraining";

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
