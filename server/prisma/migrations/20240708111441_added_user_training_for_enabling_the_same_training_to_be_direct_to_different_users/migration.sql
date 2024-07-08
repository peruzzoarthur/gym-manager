/*
  Warnings:

  - You are about to drop the `_TrainingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TrainingToUser" DROP CONSTRAINT "_TrainingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingToUser" DROP CONSTRAINT "_TrainingToUser_B_fkey";

-- DropTable
DROP TABLE "_TrainingToUser";

-- CreateTable
CREATE TABLE "UserTraining" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,

    CONSTRAINT "UserTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TrainingGroupToUserTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTraining_userId_trainingId_key" ON "UserTraining"("userId", "trainingId");

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingGroupToUserTraining_AB_unique" ON "_TrainingGroupToUserTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingGroupToUserTraining_B_index" ON "_TrainingGroupToUserTraining"("B");

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingGroupToUserTraining" ADD CONSTRAINT "_TrainingGroupToUserTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "TrainingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingGroupToUserTraining" ADD CONSTRAINT "_TrainingGroupToUserTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "UserTraining"("id") ON DELETE CASCADE ON UPDATE CASCADE;
