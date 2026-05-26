// packageService.ts

const API_URL = import.meta.env.VITE_API_URL;

export interface Package {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  activo: boolean;
}

export const getPackages = async (): Promise<
  Package[]
> => {
  const respuesta = await fetch(
    `${API_URL}/packages`
  );

  if (!respuesta.ok) {
    throw new Error(
      "Error al obtener paquetes"
    );
  }

  const data = await respuesta.json();

  // SOLO paquetes activos
  return data.filter(
    (paquete: Package) => paquete.activo
  );
};