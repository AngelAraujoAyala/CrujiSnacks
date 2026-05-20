-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "fechaFin" TIMESTAMP(3),
ADD COLUMN     "fechaInicio" TIMESTAMP(3),
ALTER COLUMN "fecha" DROP NOT NULL;
