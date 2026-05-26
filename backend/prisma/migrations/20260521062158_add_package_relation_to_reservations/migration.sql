/*
  Warnings:

  - You are about to drop the column `fecha` on the `Reservation` table. All the data in the column will be lost.
  - Made the column `fechaFin` on table `Reservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicio` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "fecha",
ADD COLUMN     "packageId" INTEGER,
ALTER COLUMN "fechaFin" SET NOT NULL,
ALTER COLUMN "fechaInicio" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
