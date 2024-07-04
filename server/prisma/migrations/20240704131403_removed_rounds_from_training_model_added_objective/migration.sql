/*
  Warnings:

  - You are about to drop the column `rounds` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Training" DROP COLUMN "rounds",
ADD COLUMN     "objective" TEXT;
