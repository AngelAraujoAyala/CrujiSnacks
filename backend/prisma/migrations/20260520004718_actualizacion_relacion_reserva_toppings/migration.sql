/*
  Warnings:

  - You are about to drop the column `email` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `hora` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `paquete` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `toppings` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `ubicacion` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `emailCliente` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lugar` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fecha` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "email",
DROP COLUMN "hora",
DROP COLUMN "paquete",
DROP COLUMN "toppings",
DROP COLUMN "ubicacion",
DROP COLUMN "whatsapp",
ADD COLUMN     "emailCliente" TEXT NOT NULL,
ADD COLUMN     "lugar" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL,
DROP COLUMN "fecha",
ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ReservaTopping" (
    "id" SERIAL NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "toppingId" INTEGER NOT NULL,

    CONSTRAINT "ReservaTopping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservaTopping" ADD CONSTRAINT "ReservaTopping_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaTopping" ADD CONSTRAINT "ReservaTopping_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
