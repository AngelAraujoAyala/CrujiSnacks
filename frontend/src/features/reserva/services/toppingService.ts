const API_URL = import.meta.env.VITE_API_URL;

export interface Topping {
  id: number;
  nombre: string;
  iconURL?: string;
  stock: boolean;
}

export const getToppings = async (): Promise<Topping[]> => {
  const respuesta = await fetch(
    `${API_URL}/toppings`
  );

  if (!respuesta.ok) {
    throw new Error(
      "Error al obtener toppings"
    );
  }

  return await respuesta.json();
};