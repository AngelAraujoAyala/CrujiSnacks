import { useEffect, useState } from "react";
import crujiApi from "../../../services/crujiApi";
import type { Reserva } from "../interfaces/reserva";
import type { BloqueoFecha } from "../interfaces/bloqueo";
import { ReservaAccordion } from "./ReservaAccordion";
import { ReservaCalendar } from "./ReservaCalendar";
import { BloqueoModal } from "./BloqueoModal";
import { ReservaDetailsModal } from "./ReservaDetailsModal";
import { BloqueoDetailsModal } from "./BloqueoDetailsModal";

export const GestionReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const [bloqueos, setBloqueos] = useState<BloqueoFecha[]>([]);

  const [showBloqueoModal, setShowBloqueoModal] = useState(false);

  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);

  const [selectedBloqueo, setSelectedBloqueo] = useState<BloqueoFecha | null>(
    null,
  );

  // LOAD RESERVAS
  const loadReservas = async () => {
    try {
      const { data } = await crujiApi.get("/reservations");

      setReservas(data);
    } catch (error) {
      console.error(error);
    }
  };

  // LOAD BLOQUEOS
  const loadBloqueos = async () => {
    try {
      const { data } = await crujiApi.get("/bloqueos");

      setBloqueos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    void loadReservas();

    void loadBloqueos();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id: number, estado: string) => {
    try {
      await crujiApi.patch(`/reservations/${id}/status`, { estado });

      await loadReservas();

      // refrescar modal abierto
      const updatedReserva = reservas.find((r) => r.id === id);

      if (updatedReserva) {
        setSelectedReserva({
          ...updatedReserva,
          estado: estado as
            | "PENDIENTE"
            | "CONFIRMADA"
            | "CANCELADA"
            | "COMPLETADA",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // CREATE BLOQUEO
  const createBloqueo = async (data: {
    fecha: string;
    horaInicio?: string;
    horaFin?: string;
    motivo?: string;
  }): Promise<void> => {
    try {
      await crujiApi.post("/bloqueos", data);

      await loadBloqueos();

      setShowBloqueoModal(false);
    } catch (error) {
      console.error(error);

      alert("Error creando bloqueo");
    }
  };

  const deleteBloqueo = async (id: number) => {
    try {
      await crujiApi.delete(`/bloqueos/${id}`);

      await loadBloqueos();

      setSelectedBloqueo(null);
    } catch (error) {
      console.error(error);

      alert("Error eliminando bloqueo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            text-gray-800
          "
        >
          Gestión de Reservas
        </h1>

        <p className="text-gray-500">Administra reservas y disponibilidad</p>
      </div>

      {/* BOTON BLOQUEAR */}
      <button
        onClick={() => setShowBloqueoModal(true)}
        className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-5 py-3
          rounded-xl
          mb-5
        "
      >
        + Bloquear fecha
      </button>

      {/* CALENDARIO */}
      <div className="mb-8">
        <ReservaCalendar
          reservas={reservas}
          bloqueos={bloqueos}
          onSelectReserva={setSelectedReserva}
          onSelectBloqueo={setSelectedBloqueo}
        />
      </div>

      {/* LISTA */}
      <div className="space-y-5">
        {reservas.map((reserva) => (
          <ReservaAccordion
            key={reserva.id}
            reserva={reserva}
            onUpdateStatus={updateStatus}
          />
        ))}
      </div>

      {/* MODAL BLOQUEO */}
      {showBloqueoModal && (
        <BloqueoModal
          onClose={() => setShowBloqueoModal(false)}
          onSave={createBloqueo}
        />
      )}

      {/* MODAL RESERVA */}
      {selectedReserva && (
        <ReservaDetailsModal
          reserva={selectedReserva}
          onClose={() => setSelectedReserva(null)}
          onUpdateStatus={updateStatus}
        />
      )}

      {/* MODAL BLOQUEO */}
      {selectedBloqueo && (
        <BloqueoDetailsModal
        bloqueo={selectedBloqueo}
        onClose={() =>
          setSelectedBloqueo(null)
        }
        onDelete={deleteBloqueo}
      />
      )}
    </div>
  );
};
