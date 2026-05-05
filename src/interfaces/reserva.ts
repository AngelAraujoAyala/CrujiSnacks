export interface Reserva {
    id?: string,
    nombreCliente: string,
    whatsapp: string,
    email?: string,
    fecha: string,
    hora: string,
    ubicacion: string,
    paquete: '30 vasitos' | '50 vasitos' | '80 vasitos' | '100 vasitos' | '150 vasitos' | '200 vasitos',
    toppings: string[],
    estado: 'pendiente' | 'confirmado',
}


