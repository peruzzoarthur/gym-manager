/*
  Warnings:

  - You are about to drop the column `nameId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `refId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_nameId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "nameId",
ADD COLUMN     "refId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_refId_fkey" FOREIGN KEY ("refId") REFERENCES "ExerciseReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
