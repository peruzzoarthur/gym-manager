-- CreateEnum
CREATE TYPE "Tempo" AS ENUM ('ONE2ONE', 'ONE2TWO', 'ONE2THREE', 'ONE2FOUR');

-- CreateEnum
CREATE TYPE "Group" AS ENUM ('CHEST', 'BACK', 'TRICEPS', 'BICEPS', 'LEGS', 'CALVES', 'COMPLEX');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeTrainingId" TEXT;

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "tempo" "Tempo" NOT NULL,
    "daysInWeek" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingGroup" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "groups" "Group"[],

    CONSTRAINT "TrainingGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercice" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "load" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "group" "Group" NOT NULL,

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciceName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExerciceName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TrainingToTrainingGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TrainingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciceToTrainingGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingToTrainingGroup_AB_unique" ON "_TrainingToTrainingGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingToTrainingGroup_B_index" ON "_TrainingToTrainingGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TrainingToUser_AB_unique" ON "_TrainingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TrainingToUser_B_index" ON "_TrainingToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciceToTrainingGroup_AB_unique" ON "_ExerciceToTrainingGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciceToTrainingGroup_B_index" ON "_ExerciceToTrainingGroup"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeTrainingId_fkey" FOREIGN KEY ("activeTrainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercice" ADD CONSTRAINT "Exercice_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "ExerciceName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToTrainingGroup" ADD CONSTRAINT "_TrainingToTrainingGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToTrainingGroup" ADD CONSTRAINT "_TrainingToTrainingGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToUser" ADD CONSTRAINT "_TrainingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrainingToUser" ADD CONSTRAINT "_TrainingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciceToTrainingGroup" ADD CONSTRAINT "_ExerciceToTrainingGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciceToTrainingGroup" ADD CONSTRAINT "_ExerciceToTrainingGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
