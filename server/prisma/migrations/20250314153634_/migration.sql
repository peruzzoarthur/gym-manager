/*
  Warnings:

  - You are about to drop the column `tempo` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "tempo" "Tempo";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "tempo";
