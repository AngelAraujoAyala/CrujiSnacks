import { useEffect, useState } from "react";
import crujiApi from "../../../services/crujiApi";
import type { Reserva } from "../interfaces/reserva";
import type { BloqueoFecha } from "../interfaces/bloqueo";
import { ReservaAccordion } from "./ReservaAccordion";
import { ReservaCalendar } from "./ReservaCalendar";
import { BloqueoModal } from "./BloqueoModal";
import { ReservaDetailsModal } from "./ReservaDetailsModal";
import { BloqueoDetailsModal } from "./BloqueoDetailsModal";

// Definición de estados válidos para el filtrado
type EstadoFiltro =
  | "TODAS"
  | "PENDIENTE"
  | "CONFIRMADA"
  | "COMPLETADA"
  | "CANCELADA";

export const GestionReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [bloqueos, setBloqueos] = useState<BloqueoFecha[]>([]);

  // 3️⃣ Estado para el filtro de la lista de acordeones
  const [filtroEstado, setFiltroEstado] = useState<EstadoFiltro>("TODAS");

  // Estados de control de Modales
  const [showBloqueoModal, setShowBloqueoModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [selectedBloqueo, setSelectedBloqueo] = useState<BloqueoFecha | null>(
    null,
  );

  // Estados de UI uniformes para consistencia de diseño
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Carga inicial coordinada de datos
  useEffect(() => {
    const initLayout = async () => {
      try {
        setLoading(true);
        await Promise.all([loadReservas(), loadBloqueos()]);
      } catch (error) {
        console.error(error);
        setNotification({
          type: "error",
          text: "No se pudo sincronizar el calendario ni las reservaciones.",
        });
      } finally {
        setLoading(false);
      }
    };
    initLayout();
  }, []);

  // Auto-ocultar notificaciones después de 4 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadReservas = async () => {
    try {
      const { data } = await crujiApi.get("/reservations");
      setReservas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadBloqueos = async () => {
    try {
      const { data } = await crujiApi.get("/bloqueos");
      setBloqueos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ACTUALIZACIÓN DE ESTADO OPTIMISTA Y REACTIVA
  const updateStatus = async (id: number, estado: string) => {
    try {
      await crujiApi.patch(`/reservations/${id}/status`, { estado });

      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: estado as any } : r)),
      );

      if (selectedReserva && selectedReserva.id === id) {
        setSelectedReserva((prev) =>
          prev ? { ...prev, estado: estado as any } : null,
        );
      }

      setNotification({
        type: "success",
        text: `La reserva #${id} cambió a estado: ${estado}.`,
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "Ocurrió un problema al actualizar el estado de la reserva.",
      });
      loadReservas();
    }
  };

  // 1️⃣ CREAR BLOQUEO DE AGENDA (CON SANITIZACIÓN PARA DÍA COMPLETO)
  const createBloqueo = async (data: {
    fecha: string;
    horaInicio?: string;
    horaFin?: string;
    motivo?: string;
  }): Promise<void> => {
    try {
      // Si vienen vacíos de los inputs tipo time (""), los transformamos en null explícito.
      const payload = {
        ...data,
        horaInicio: data.horaInicio?.trim() ? data.horaInicio : null,
        horaFin: data.horaFin?.trim() ? data.horaFin : null,
        motivo: data.motivo?.trim() ? data.motivo : undefined,
      };

      await crujiApi.post("/bloqueos", payload);
      await loadBloqueos();

      setShowBloqueoModal(false);
      setNotification({
        type: "success",
        text: "La fecha ha sido bloqueada en el calendario público.",
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "No se pudo guardar el bloqueo. Inténtalo de nuevo.",
      });
    }
  };

  // ELIMINAR BLOQUEO DE AGENDA
  const deleteBloqueo = async (id: number) => {
    try {
      await crujiApi.delete(`/bloqueos/${id}`);
      setBloqueos((prev) => prev.filter((b) => b.id !== id));
      setSelectedBloqueo(null);

      setNotification({
        type: "success",
        text: "Fecha liberada. El bloqueo se retiró con éxito.",
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "No se pudo remover el bloqueo de la agenda.",
      });
      loadBloqueos();
    }
  };

  // 3️⃣ Filtrado reactivo en tiempo de renderizado
  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtroEstado === "TODAS") return true;
    return reserva.estado === filtroEstado;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6">
        <svg
          className="animate-spin h-9 w-9 text-orange-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Sincronizando Agenda...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/40 p-4 sm:p-8 animate-fadeIn">
      {/* SECCIÓN NOTIFICACIONES FLOTANTES */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 p-4 rounded-xl border shadow-xl bg-white max-w-sm flex items-start gap-3 animate-slideIn ${
            notification.type === "success"
              ? "border-emerald-100 bg-emerald-50/30 text-emerald-800"
              : "border-rose-100 bg-rose-50/30 text-rose-800"
          }`}
        >
          <span className="text-base">
            {notification.type === "success" ? "✅" : "❌"}
          </span>
          <p className="text-xs sm:text-sm font-semibold flex-1 leading-tight">
            {notification.text}
          </p>
          <button
            onClick={() => setNotification(null)}
            className="text-xs font-bold opacity-40 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* ENCABEZADO PANEL DE CONTROL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Gestión de Reservas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Administra reservas activas, monitorea fechas solicitadas y bloquea
            excepciones del calendario.
          </p>
        </div>

        <button
          onClick={() => setShowBloqueoModal(true)}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm shadow-red-500/10 transition-colors active:scale-[0.98]"
        >
          + Bloquear Fecha
        </button>
      </div>

      {/* SECCIÓN PRINCIPAL: CALENDARIO DE DISPONIBILIDAD */}
      <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <ReservaCalendar
          reservas={reservas}
          bloqueos={bloqueos}
          onSelectReserva={setSelectedReserva}
          onSelectBloqueo={setSelectedBloqueo}
        />
      </div>

      {/* SECCIÓN SECUNDARIA: FILTRO Y ACORDEONES DETALLADOS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Historial y Flujo Continuo ({reservasFiltradas.length})
          </h2>

          {/* 3️⃣ Control de Filtros Estilizado (Píldoras de diseño limpio) */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            {(
              [
                "TODAS",
                "PENDIENTE",
                "CONFIRMADA",
                "COMPLETADA",
                "CANCELADA",
              ] as EstadoFiltro[]
            ).map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                  filtroEstado === estado
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {estado}
              </button>
            ))}
          </div>
        </div>

        {/* Mapeo condicional basado en las reservas ya filtradas */}
        {reservasFiltradas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm font-bold text-slate-400">
              No hay reservaciones con el estado "{filtroEstado}".
            </p>
          </div>
        ) : (
          reservasFiltradas.map((reserva) => (
            <ReservaAccordion
              key={reserva.id}
              reserva={reserva}
              onUpdateStatus={updateStatus}
            />
          ))
        )}
      </div>

      {/* VENTANAS MODALES */}
      {showBloqueoModal && (
        <BloqueoModal
          onClose={() => setShowBloqueoModal(false)}
          onSave={createBloqueo}
        />
      )}
      {selectedReserva && (
        <ReservaDetailsModal
          reserva={selectedReserva}
          onClose={() => setSelectedReserva(null)}
          onUpdateStatus={updateStatus}
        />
      )}
      {selectedBloqueo && (
        <BloqueoDetailsModal
          bloqueo={selectedBloqueo}
          onClose={() => setSelectedBloqueo(null)}
          onDelete={deleteBloqueo}
        />
      )}
    </div>
  );
};
