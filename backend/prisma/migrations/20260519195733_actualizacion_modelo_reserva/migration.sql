-- CreateEnum
CREATE TYPE "ReservaEstado" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "estado" "ReservaEstado" NOT NULL DEFAULT 'PENDIENTE';
