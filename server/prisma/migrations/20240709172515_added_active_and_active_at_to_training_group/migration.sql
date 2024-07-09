-- AlterTable
ALTER TABLE "TrainingGroup" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activeAt" TIMESTAMP(3);
