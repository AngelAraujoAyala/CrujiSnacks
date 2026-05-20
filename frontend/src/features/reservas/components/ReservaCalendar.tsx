import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import type { Reserva } from "../interfaces/reserva";

import type { BloqueoFecha } from "../interfaces/bloqueo";

const localizer = momentLocalizer(moment);

interface Props {
  reservas: Reserva[];

  bloqueos: BloqueoFecha[];
}

export const ReservaCalendar = ({ reservas, bloqueos }: Props) => {
  // RESERVAS
  const reservaEvents = reservas.map((reserva) => {
    const start = new Date(reserva.fecha);

    const end = new Date(start.getTime() + 60 * 60 * 1000);

    return {
      title: reserva.nombreCliente,

      start,

      end,

      resource: {
        tipo: "reserva",
        ...reserva,
      },
    };
  });

  // BLOQUEOS
  const bloqueoEvents = bloqueos.map((bloqueo) => {
    // EXTRAER SOLO YYYY-MM-DD
    const onlyDate = bloqueo.fecha.split("T")[0];

    // CREAR FECHA LOCAL
    const fecha = new Date(`${onlyDate}T00:00:00`);

    const end = new Date(fecha.getTime() + 60 * 60 * 1000);

    return {
      title: "BLOQUEADO",

      start: fecha,

      end,

      resource: {
        tipo: "bloqueo",
        ...bloqueo,
      },
    };
  });

  // TODOS LOS EVENTOS
  const events = [...reservaEvents, ...bloqueoEvents];

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow
        p-5
        h-[700px]
      "
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "100%",
        }}
        popup
        views={["month", "week", "day"]}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        eventPropGetter={(event) => {
          // BLOQUEOS
          if (event.resource.tipo === "bloqueo") {
            return {
              style: {
                backgroundColor: "#dc2626",
                borderRadius: "8px",
                border: "none",
                color: "white",
              },
            };
          }

          // RESERVAS
          const reserva = event.resource as Reserva;

          let backgroundColor = "#facc15";

          switch (reserva.estado) {
            case "CONFIRMADA":
              backgroundColor = "#3b82f6";
              break;

            case "COMPLETADA":
              backgroundColor = "#22c55e";
              break;

            case "CANCELADA":
              backgroundColor = "#ef4444";
              break;
          }

          return {
            style: {
              backgroundColor,
              borderRadius: "8px",
              border: "none",
              color: "white",
            },
          };
        }}
      />
    </div>
  );
};
