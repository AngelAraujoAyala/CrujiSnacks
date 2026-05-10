-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "paquete" TEXT NOT NULL,
    "toppings" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
