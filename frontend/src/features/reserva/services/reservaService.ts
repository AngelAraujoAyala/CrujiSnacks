

const API_URL = import.meta.env.VITE_API_URL;

export const crearReservacion = async (datos: any) => {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
        throw new Error('Error al guardar la reserva');
    }

    return await respuesta.json();
};

