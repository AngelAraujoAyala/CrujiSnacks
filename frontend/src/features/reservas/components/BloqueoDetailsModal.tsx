import { useState } from "react";
import type { BloqueoFecha } from "../interfaces/bloqueo";

interface Props {
  bloqueo: BloqueoFecha;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
}

export const BloqueoDetailsModal = ({ bloqueo, onClose, onDelete }: Props) => {
  const [loading, setLoading] = useState(false);

  // Evaluamos si el bloqueo restringe todo el día o solo un rango de horas
  const esDiaCompleto = !bloqueo.horaInicio && !bloqueo.horaFin;

  const handleDelete = async () => {
    if (loading) return;

    // Confirmación rápida de seguridad para evitar clics accidentales en producción
    const confirmar = window.confirm(
      "¿Estás segura de que deseas eliminar este bloqueo? La fecha volverá a estar disponible para los clientes en la landing page.",
    );

    if (!confirmar) return;

    try {
      setLoading(true);
      await onDelete(bloqueo.id);
      onClose(); // Cierra el modal tras la eliminación exitosa
    } catch (error) {
      console.error("Error al eliminar el bloqueo:", error);
      alert("No se pudo eliminar el bloqueo. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Detalles del Bloqueo
              </h2>
              <p className="text-[11px] text-slate-500">
                Restricción activa en agenda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors text-sm disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 bg-slate-50/60 border border-slate-100 p-4 rounded-xl">
            {/* FECHA */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Fecha
              </p>
              <p className="font-semibold text-slate-800 text-sm mt-0.5">
                {new Date(bloqueo.fecha).toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>

            {/* HORARIO */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Horario
              </p>
              <div className="mt-0.5">
                {esDiaCompleto ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    🔒 Día completo
                  </span>
                ) : (
                  <p className="text-sm font-semibold text-slate-700">
                    ⏰ {bloqueo.horaInicio} - {bloqueo.horaFin}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* MOTIVO */}
          <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Motivo / Nota Interna
            </p>
            <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
              {bloqueo.motivo ? `"${bloqueo.motivo}"` : "Sin motivo registrado"}
            </p>
          </div>

          {/* ACCIÓN DESTRUCTORA SEGURA */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 hover:border-rose-300 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-rose-600"
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
                  Removiendo restricción...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Eliminar Bloqueo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
