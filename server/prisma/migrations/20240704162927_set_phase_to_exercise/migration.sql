/*
  Warnings:

  - You are about to drop the column `number` on the `TrainingGroup` table. All the data in the column will be lost.
  - You are about to drop the column `phase` on the `TrainingGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key,trainingId]` on the table `TrainingGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phase` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TrainingGroup_key_trainingId_phase_number_key";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "phase" "Phase" NOT NULL;

-- AlterTable
ALTER TABLE "TrainingGroup" DROP COLUMN "number",
DROP COLUMN "phase";

-- CreateIndex
CREATE UNIQUE INDEX "TrainingGroup_key_trainingId_key" ON "TrainingGroup"("key", "trainingId");
