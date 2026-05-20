import { useMemo, useState } from "react"; // 1. Agregamos useState
import { Calendar, momentLocalizer, type View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Reserva } from "../interfaces/reserva";
import type { BloqueoFecha } from "../interfaces/bloqueo";

const localizer = momentLocalizer(moment);

interface Props {
  reservas: Reserva[];
  bloqueos: BloqueoFecha[];
  onSelectReserva: (reserva: Reserva) => void;
  onSelectBloqueo: (bloqueo: BloqueoFecha) => void;
}

export const ReservaCalendar = ({
  reservas,
  bloqueos,
  onSelectReserva,
  onSelectBloqueo,
}: Props) => {
  // 2. Controlamos los estados de navegación del calendario
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<View>("week" as View);

  // EVENTOS RESERVAS
  const reservaEvents = useMemo(() => {
    return reservas
      .filter((r) => r.fechaInicio && r.fechaFin)
      .map((reserva) => ({
        title: reserva.nombreCliente,
        start: new Date(reserva.fechaInicio),
        end: new Date(reserva.fechaFin),
        resource: {
          type: "reserva",
          data: reserva,
        },
      }));
  }, [reservas]);

  // EVENTOS BLOQUEOS
  const bloqueoEvents = useMemo(() => {
    return bloqueos.map((bloqueo) => {
      const onlyDate = bloqueo.fecha.split("T")[0];
      const fecha = new Date(`${onlyDate}T00:00:00`);
      return {
        title: "Bloqueado",
        start: fecha,
        end: fecha,
        resource: {
          type: "bloqueo",
          data: bloqueo,
        },
      };
    });
  }, [bloqueos]);

  // EVENTOS TOTALES
  const events = useMemo(() => {
    return [...reservaEvents, ...bloqueoEvents];
  }, [reservaEvents, bloqueoEvents]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <Calendar
        key="reservation-calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        popup
        selectable
        
        // 3. Pasamos las propiedades de control de estado
        date={currentDate}
        view={currentView}
        
        // 4. Escuchamos los eventos de los botones para actualizar el estado
        onNavigate={(newDate) => setCurrentDate(newDate)}
        onView={(newView) => setCurrentView(newView)}
        
        views={["month", "week", "day", "agenda"]}
        onSelectEvent={(event: any) => {
          const resource = event.resource;
          if (resource.type === "reserva") {
            onSelectReserva(resource.data);
          }
          if (resource.resource?.type === "bloqueo" || resource.type === "bloqueo") {
            onSelectBloqueo(resource.data);
          }
        }}
        eventPropGetter={(event: any) => {
          const resource = event.resource;
          if (resource.type === "bloqueo") {
            return {
              style: {
                backgroundColor: "#ef4444",
                borderRadius: "10px",
                border: "none",
                color: "white",
              },
            };
          }

          const estado = resource.data.estado;
          let backgroundColor = "#facc15";

          if (estado === "CONFIRMADA") backgroundColor = "#22c55e";
          if (estado === "CANCELADA") backgroundColor = "#ef4444";
          if (estado === "COMPLETADA") backgroundColor = "#3b82f6";

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