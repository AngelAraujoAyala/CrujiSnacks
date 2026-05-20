export interface Reserva {
    id: number;

    nombreCliente: string;
    emailCliente: string;
    telefono: string;

    fecha: string;

    lugar: string;

    estado:
    | "PENDIENTE"
    | "CONFIRMADA"
    | "CANCELADA"
    | "COMPLETADA";

    toppings: {
        id: number;

        topping: {
            id: number;
            nombre: string;
            iconURL?: string;
        };
    }[];

    createdAt: string;
}