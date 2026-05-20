import { useEffect, useState } from "react";

import crujiApi from "../../../services/crujiApi";

import type { Reserva } from "../interfaces/reserva";

import type { BloqueoFecha } from "../interfaces/bloqueo";

import { ReservaAccordion } from "./ReservaAccordion";

import { ReservaCalendar } from "./ReservaCalendar";

import { BloqueoModal } from "./BloqueoModal";

export const GestionReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const [bloqueos, setBloqueos] = useState<BloqueoFecha[]>([]);

  const [showBloqueoModal, setShowBloqueoModal] = useState(false);

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
        <ReservaCalendar reservas={reservas} bloqueos={bloqueos} />
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

      {/* MODAL */}
      {showBloqueoModal && (
        <BloqueoModal
          onClose={() => setShowBloqueoModal(false)}
          onSave={createBloqueo}
        />
      )}
    </div>
  );
};
