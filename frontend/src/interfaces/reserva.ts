export interface Reserva {
  nombreCliente: string;

  emailCliente: string;

  telefono: string;

  fechaInicio: string;

  fechaFin: string;

  lugar: string;

  packageId: number | null;

  toppingsIds: number[];

}
