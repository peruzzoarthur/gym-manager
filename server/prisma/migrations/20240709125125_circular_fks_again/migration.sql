/*
  Warnings:

  - You are about to drop the `UserTraining` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[activeTrainingId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_userId_fkey";

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTraining";

-- CreateIndex
CREATE UNIQUE INDEX "User_activeTrainingId_key" ON "User"("activeTrainingId");

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
