/*
  Warnings:

  - You are about to drop the `Exercice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExerciceReference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciceToTrainingGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercice" DROP CONSTRAINT "Exercice_nameId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciceToTrainingGroup" DROP CONSTRAINT "_ExerciceToTrainingGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciceToTrainingGroup" DROP CONSTRAINT "_ExerciceToTrainingGroup_B_fkey";

-- DropTable
DROP TABLE "Exercice";

-- DropTable
DROP TABLE "ExerciceReference";

-- DropTable
DROP TABLE "_ExerciceToTrainingGroup";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    "load" DOUBLE PRECISION,
    "reps" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseReference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groups" "Group"[],

    CONSTRAINT "ExerciseReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToTrainingGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToTrainingGroup_AB_unique" ON "_ExerciseToTrainingGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToTrainingGroup_B_index" ON "_ExerciseToTrainingGroup"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "ExerciseReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTrainingGroup" ADD CONSTRAINT "_ExerciseToTrainingGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTrainingGroup" ADD CONSTRAINT "_ExerciseToTrainingGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
