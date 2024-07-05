-- CreateTable
CREATE TABLE "CombinedExercise" (
    "id" TEXT NOT NULL,
    "index" INTEGER,

    CONSTRAINT "CombinedExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CombinedExerciseToExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CombinedExerciseToTrainingGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CombinedExerciseToExercise_AB_unique" ON "_CombinedExerciseToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_CombinedExerciseToExercise_B_index" ON "_CombinedExerciseToExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CombinedExerciseToTrainingGroup_AB_unique" ON "_CombinedExerciseToTrainingGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_CombinedExerciseToTrainingGroup_B_index" ON "_CombinedExerciseToTrainingGroup"("B");

-- AddForeignKey
ALTER TABLE "_CombinedExerciseToExercise" ADD CONSTRAINT "_CombinedExerciseToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "CombinedExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CombinedExerciseToExercise" ADD CONSTRAINT "_CombinedExerciseToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CombinedExerciseToTrainingGroup" ADD CONSTRAINT "_CombinedExerciseToTrainingGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "CombinedExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CombinedExerciseToTrainingGroup" ADD CONSTRAINT "_CombinedExerciseToTrainingGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
