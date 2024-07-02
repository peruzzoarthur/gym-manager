/*
  Warnings:

  - You are about to drop the column `group` on the `Exercice` table. All the data in the column will be lost.
  - You are about to drop the `ExerciceName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercice" DROP CONSTRAINT "Exercice_nameId_fkey";

-- AlterTable
ALTER TABLE "Exercice" DROP COLUMN "group";

-- DropTable
DROP TABLE "ExerciceName";

-- CreateTable
CREATE TABLE "ExerciceReference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groups" "Group"[],

    CONSTRAINT "ExerciceReference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercice" ADD CONSTRAINT "Exercice_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "ExerciceReference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
