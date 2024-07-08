/*
  Warnings:

  - Added the required column `createdByUserId` to the `ExerciseReference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExerciseReference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseReference" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "ExerciseReference" ADD CONSTRAINT "ExerciseReference_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
