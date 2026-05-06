import type { Reserva } from "./reserva";

export interface PasosReservaProps {
    datos: Reserva;
    setDatos: React.Dispatch<React.SetStateAction<Reserva>>;
    errores: Partial<Record<keyof Reserva, string>>;
}
