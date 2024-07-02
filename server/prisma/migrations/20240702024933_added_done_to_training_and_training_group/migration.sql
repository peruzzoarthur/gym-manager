-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
