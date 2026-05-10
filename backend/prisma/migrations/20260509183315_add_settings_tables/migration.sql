-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(65,30) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "iconURL" TEXT,
    "stock" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);
