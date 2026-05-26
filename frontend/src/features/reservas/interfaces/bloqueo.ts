export interface BloqueoFecha {

    id: number;

    fecha: string;

    horaInicio?: string;

    horaFin?: string;

    motivo?: string;

    activo: boolean;
}