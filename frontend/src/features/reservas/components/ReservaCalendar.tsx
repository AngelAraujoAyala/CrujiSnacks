import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import type { Reserva } from "../interfaces/reserva";

import type { BloqueoFecha } from "../interfaces/bloqueo";

const localizer = momentLocalizer(moment);

interface Props {
  reservas: Reserva[];

  bloqueos: BloqueoFecha[];

  onSelectReserva: (
    reserva: Reserva
  ) => void;

  onSelectBloqueo: (
    bloqueo: BloqueoFecha
  ) => void;
}

export const ReservaCalendar = ({
  reservas,
  bloqueos,
  onSelectReserva,
  onSelectBloqueo,
}: Props) => {
  // RESERVAS
  const reservaEvents = reservas.map(
    (reserva) => ({
      title: `${reserva.nombreCliente}`,

      start: new Date(reserva.fecha),

      end: new Date(reserva.fecha),

      resource: {
        type: "reserva",
        data: reserva,
      },
    })
  );

  // BLOQUEOS
  const bloqueoEvents = bloqueos.map(
    (bloqueo) => {
      const onlyDate =
        bloqueo.fecha.split("T")[0];

      const fecha = new Date(
        `${onlyDate}T00:00:00`
      );

      return {
        title: "Bloqueado",

        start: fecha,

        end: fecha,

        resource: {
          type: "bloqueo",
          data: bloqueo,
        },
      };
    }
  );

  const events = [
    ...reservaEvents,
    ...bloqueoEvents,
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        popup
        selectable
        views={[
          "month",
          "week",
          "day",
          "agenda",
        ]}
        onSelectEvent={(event: any) => {
          const resource =
            event.resource;

          if (
            resource.type === "reserva"
          ) {
            onSelectReserva(
              resource.data
            );
          }

          if (
            resource.type === "bloqueo"
          ) {
            onSelectBloqueo(
              resource.data
            );
          }
        }}
        eventPropGetter={(event: any) => {
          const resource =
            event.resource;

          // BLOQUEO
          if (
            resource.type === "bloqueo"
          ) {
            return {
              style: {
                backgroundColor:
                  "#ef4444",
                borderRadius: "10px",
                border: "none",
                color: "white",
              },
            };
          }

          // RESERVA
          const estado =
            resource.data.estado;

          let backgroundColor =
            "#facc15";

          if (
            estado === "CONFIRMADA"
          ) {
            backgroundColor =
              "#22c55e";
          }

          if (
            estado === "CANCELADA"
          ) {
            backgroundColor =
              "#ef4444";
          }

          if (
            estado === "COMPLETADA"
          ) {
            backgroundColor =
              "#3b82f6";
          }

          return {
            style: {
              backgroundColor,
              borderRadius: "10px",
              border: "none",
              color: "white",
            },
          };
        }}
      />
    </div>
  );
};
