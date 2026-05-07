export interface Reserva {
    id?: string,
    nombreCliente: string,
    whatsapp: string,
    email: string,
    fecha: string,
    hora: string,
    ubicacion: string,
    paquete: string,
    toppings: string[],
    estado: 'pendiente' | 'confirmado',
}


