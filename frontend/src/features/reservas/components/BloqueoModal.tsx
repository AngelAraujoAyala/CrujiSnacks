import { useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (data: {
    fecha: string;
    horaInicio?: string;
    horaFin?: string;
    motivo?: string;
  }) => Promise<void>;
}

export const BloqueoModal = ({ onClose, onSave }: Props) => {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null); // ✨ Remplace para evitar alert() nativos

  const handleSave = async () => {
    if (loading) return;
    setErrorLocal(null);

    if (!fecha) {
      setErrorLocal("Por favor, selecciona la fecha que deseas restringir.");
      return;
    }

    try {
      setLoading(true);
      await onSave({
        fecha,
        horaInicio: horaInicio || undefined,
        horaFin: horaFin || undefined,
        motivo: motivo || undefined,
      });
      onClose(); // Cierra el modal automáticamente tras un éxito limpio
    } catch (error) {
      console.error(error);
      setErrorLocal(
        "Ocurrió un error en el servidor al intentar crear el bloqueo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 transform transition-all scale-100">
        {/* CABECERA DEL MODAL */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bloquear Fecha</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Los clientes no podrán agendar eventos durante el tiempo
              seleccionado.
            </p>
          </div>
        </div>

        {/* ALERTA DE ERROR LOCAL */}
        {errorLocal && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700 animate-shake">
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorLocal}</span>
          </div>
        )}

        {/* FORMULARIO */}
        <div className="space-y-4">
          {/* CAMPO: FECHA */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Fecha a Bloquear <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} // No permite bloquear fechas pasadas por error
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:bg-white"
            />
          </div>

          {/* CAMPOS: HORAS (EN PARALELO) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Desde{" "}
                <span className="text-slate-400 font-normal text-[10px]">
                  (Opcional)
                </span>
              </label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Hasta{" "}
                <span className="text-slate-400 font-normal text-[10px]">
                  (Opcional)
                </span>
              </label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:bg-white"
              />
            </div>
          </div>

          {/* TIP INFORMATIVO CONTEXTUAL */}
          <p className="text-[11px] text-slate-400 leading-normal bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            💡 <strong>Tip:</strong> Si dejas las horas vacías, el sistema
            asumirá que el día completo está ocupado y cerrará la fecha en la
            landing page.
          </p>

          {/* CAMPO: MOTIVO */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Motivo o Nota Interna{" "}
              <span className="text-slate-400 font-normal text-[10px]">
                (Opcional)
              </span>
            </label>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej. Falta de personal o mantenimiento..."
              rows={3}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/10 focus:bg-white resize-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* ACCIONES DEL BOTÓN */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm rounded-xl transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-sm shadow-red-600/10 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                {/* Spinner discreto durante carga */}
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Aplicando...
              </>
            ) : (
              "Confirmar Bloqueo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
