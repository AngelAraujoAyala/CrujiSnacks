-- CreateTable
CREATE TABLE "BloqueoFecha" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaInicio" TEXT,
    "horaFin" TEXT,
    "motivo" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BloqueoFecha_pkey" PRIMARY KEY ("id")
);
