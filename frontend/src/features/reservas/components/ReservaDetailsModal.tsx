import type { Reserva } from "../interfaces/reserva";

interface Props {
  reserva: Reserva;
  onClose: () => void;
  onUpdateStatus: (id: number, estado: string) => Promise<void>;
}

export const ReservaDetailsModal = ({
  reserva,
  onClose,
  onUpdateStatus,
}: Props) => {
  // Cálculo de duración del evento
  const horasDuracion = Math.round(
    (new Date(reserva.fechaFin).getTime() -
      new Date(reserva.fechaInicio).getTime()) /
      (1000 * 60 * 60),
  );

  // Helper para asignar colores dinámicos al selector de estado
  const getStatusColorClass = (estado: string) => {
    switch (estado) {
      case "PENDIENTE":
        return "bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500/20";
      case "CONFIRMADA":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500/20";
      case "CANCELADA":
        return "bg-rose-50 text-rose-700 border-rose-200 focus:ring-rose-500/20";
      case "COMPLETADA":
        return "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500/20";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 focus:ring-slate-500/20";
    }
  };

  // Formateador de teléfonos para enlace directo de WhatsApp (Prefijo +52 México)
  const whatsappLink = `https://wa.me/52${reserva.telefono.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all scale-100">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Detalles de la Reserva
            </h2>
            <p className="text-xs text-slate-500">
              ID de control: #{reserva.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-6 space-y-6">
          {/* BLOQUE 1: INFORMACIÓN DEL CLIENTE */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Datos de Contacto
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/60 border border-slate-100 p-4 rounded-xl">
              <div className="md:col-span-2">
                <p className="text-[11px] font-medium text-slate-400 uppercase">
                  Nombre Completo
                </p>
                <p className="font-bold text-slate-800 text-base">
                  {reserva.nombreCliente}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase mb-0.5">
                  Teléfono
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 text-sm">
                    {reserva.telefono}
                  </span>
                  {/* Botón UX Pro: Contactar directo por WhatsApp */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md hover:bg-emerald-200 transition-colors"
                  >
                    <span>💬</span> WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase">
                  Correo Electrónico
                </p>
                <p className="text-sm font-semibold text-slate-700 truncate">
                  {reserva.emailCliente}
                </p>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: DETALLES DE LA LOGÍSTICA */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              Logística del Evento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-100 p-4 rounded-xl shadow-sm">
              <div className="md:col-span-3">
                <p className="text-[11px] font-medium text-slate-400 uppercase mb-0.5">
                  Ubicación del Evento
                </p>
                <p className="text-sm font-bold text-slate-800 flex items-start gap-1">
                  <span className="text-orange-500 mt-0.5">📍</span>{" "}
                  {reserva.lugar}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase">
                  Horario de Inicio
                </p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  {new Date(reserva.fechaInicio).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  •{" "}
                  {new Date(reserva.fechaInicio).toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase">
                  Horario de Término
                </p>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">
                  {new Date(reserva.fechaFin).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  •{" "}
                  {new Date(reserva.fechaFin).toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase">
                  Tiempo Total
                </p>
                <div className="mt-0.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100">
                    ⏱️ {horasDuracion} {horasDuracion === 1 ? "hora" : "horas"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 3: CONTROL DE ESTADO INTERNO */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estado Actual de la Reserva
              </label>
              <p className="text-[11px] text-slate-400 leading-normal">
                Al cambiar el estado se reflejará de inmediato en las agendas
                globales.
              </p>
            </div>

            <div className="w-full sm:w-48 relative">
              <select
                value={reserva.estado}
                onChange={(e) =>
                  void onUpdateStatus(reserva.id, e.target.value)
                }
                className={`
                  w-full font-bold text-xs border rounded-xl px-3 py-2.5 outline-none transition-all cursor-pointer appearance-none ring-offset-1 focus:ring-2
                  ${getStatusColorClass(reserva.estado)}
                `}
              >
                <option
                  value="PENDIENTE"
                  className="bg-white text-amber-700 font-semibold"
                >
                  ⏳ PENDIENTE
                </option>
                <option
                  value="CONFIRMADA"
                  className="bg-white text-emerald-700 font-semibold"
                >
                  ✅ CONFIRMADA
                </option>
                <option
                  value="CANCELADA"
                  className="bg-white text-rose-700 font-semibold"
                >
                  ❌ CANCELADA
                </option>
                <option
                  value="COMPLETADA"
                  className="bg-white text-blue-700 font-semibold"
                >
                  🏁 COMPLETADA
                </option>
              </select>
              {/* Icono de flechita personalizado para el select */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* PIE DEL MODAL */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
};
