import { useState } from "react";

import type { Reserva } from "../interfaces/reserva";

import { ReservaStatusBadge }
from "./ReservaStatusBadge";

interface Props {
    reserva: Reserva;

    onUpdateStatus: (
        id: number,
        estado: string
    ) => void;
}

export const ReservaAccordion = ({
    reserva,
    onUpdateStatus
}: Props) => {

    const [expanded, setExpanded] =
        useState(false);

    return (

        <div
            className="
                bg-white
                rounded-2xl
                shadow
                overflow-hidden
            "
        >

            {/* HEADER */}
            <button
                onClick={() =>
                    setExpanded(!expanded)
                }
                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-5
                    text-left
                "
            >

                <div>

                    <h3 className="font-bold text-lg">

                        {reserva.nombreCliente}

                    </h3>

                    <p className="text-gray-500">

                        {new Date(
                            reserva.fechaInicio
                            + " - " +
                            reserva.fechaFin
                        ).toLocaleString()}

                    </p>

                </div>

                <div className="flex items-center gap-3">

                    <ReservaStatusBadge
                        estado={reserva.estado}
                    />

                    <span className="text-xl">

                        {expanded
                            ? "▲"
                            : "▼"}

                    </span>

                </div>

            </button>

            {/* BODY */}
            {expanded && (

                <div className="border-t p-5">

                    <div className="space-y-3">

                        <p>
                            <strong>Email:</strong>
                            {" "}
                            {reserva.emailCliente}
                        </p>

                        <p>
                            <strong>Teléfono:</strong>
                            {" "}
                            {reserva.telefono}
                        </p>

                        <p>
                            <strong>Lugar:</strong>
                            {" "}
                            {reserva.lugar}
                        </p>

                        <div>

                            <strong>
                                Toppings:
                            </strong>

                            <ul className="mt-2 space-y-1">

                                {reserva.toppings.map(
                                    (item) => (

                                    <li key={item.id}>

                                        • {item.topping.nombre}

                                    </li>

                                ))}

                            </ul>

                        </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={() =>
                                onUpdateStatus(
                                    reserva.id,
                                    "CONFIRMADA"
                                )
                            }
                            className="
                                bg-blue-500
                                hover:bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                            "
                        >
                            Confirmar
                        </button>

                        <button
                            onClick={() =>
                                onUpdateStatus(
                                    reserva.id,
                                    "COMPLETADA"
                                )
                            }
                            className="
                                bg-green-500
                                hover:bg-green-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                            "
                        >
                            Completar
                        </button>

                        <button
                            onClick={() =>
                                onUpdateStatus(
                                    reserva.id,
                                    "CANCELADA"
                                )
                            }
                            className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                            "
                        >
                            Cancelar
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
};