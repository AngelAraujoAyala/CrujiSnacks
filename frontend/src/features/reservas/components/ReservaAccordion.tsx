import { useState } from "react";
import type { Reserva } from "../interfaces/reserva";
import { ReservaStatusBadge } from "./ReservaStatusBadge";

interface Props {
  reserva: Reserva;
  onUpdateStatus: (id: number, estado: string) => void;
}

export const ReservaAccordion = ({ reserva, onUpdateStatus }: Props) => {
  const [expanded, setExpanded] = useState(false);

  // Formateador express para el link directo de WhatsApp (+52)
  const whatsappLink = `https://wa.me/52${reserva.telefono.replace(/\D/g, "")}`;

  // Formatear fechas cortas para el encabezado visual
  const fechaTexto = new Date(reserva.fechaInicio).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className={`
        bg-white rounded-2xl border transition-all duration-200 overflow-hidden
        ${expanded ? "border-slate-300 shadow-md ring-1 ring-slate-300/10" : "border-slate-100 shadow-sm hover:border-slate-200"}
      `}
    >
      {/* ENCABEZADO (TRIGGER DEL ACORDEÓN) */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left bg-white hover:bg-slate-50/60 transition-colors outline-none"
      >
        <div className="space-y-1 max-w-[70%]">
          <h3 className="font-bold text-slate-800 text-base sm:text-lg truncate">
            {reserva.nombreCliente}
          </h3>
          {/* Info rápida contextual para no tener que abrir a ciegas */}
          <p className="text-xs text-slate-500 font-medium flex items-center gap-2 truncate">
            <span>📅 {fechaTexto}</span>
            <span className="text-slate-300">•</span>
            <span className="truncate">📍 {reserva.lugar}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ReservaStatusBadge estado={reserva.estado} />

          {/* Flecha SVG animada y fluida */}
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expanded ? "rotate-180 text-slate-600" : ""}`}
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
      </button>

      {/* CUERPO EXPANDIBLE */}
      {expanded && (
        <div className="border-t border-slate-100 p-5 bg-slate-50/30 space-y-5 animate-fadeIn">
          {/* GRID DE DATOS LOGÍSTICOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta de Contacto */}
            <div className="bg-white border border-slate-100 p-3.5 rounded-xl shadow-sm space-y-2.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Contacto del Cliente
              </p>

              <div className="space-y-1">
                <span className="block text-xs text-slate-400">Email</span>
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {reserva.emailCliente}
                </p>
              </div>

              <div className="space-y-1">
                <span className="block text-xs text-slate-400">Teléfono</span>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-800">
                    {reserva.telefono}
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded hover:bg-emerald-100 transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Tarjeta de Toppings / Extras */}
            <div className="bg-white border border-slate-100 p-3.5 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Toppings Seleccionados ({reserva.toppings.length})
                </p>
                {reserva.toppings.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {reserva.toppings.map((item) => (
                      <li
                        key={item.id}
                        className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1.5 truncate"
                      >
                        <span className="text-orange-400 shrink-0">✨</span>
                        <span className="truncate">{item.topping.nombre}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Sin toppings adicionales.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* BARRA DE ACCIONES INTELIGENTES RECONFIGURADA */}
          <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            {/* FLUJO PENDIENTE: Permite confirmar o cancelar */}
            {reserva.estado === "PENDIENTE" && (
              <>
                <button
                  onClick={() => onUpdateStatus(reserva.id, "CANCELADA")}
                  className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                >
                  Rechazar / Cancelar
                </button>
                <button
                  onClick={() => onUpdateStatus(reserva.id, "CONFIRMADA")}
                  className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm shadow-blue-600/10 transition-all active:scale-[0.98]"
                >
                  Confirmar Reserva
                </button>
              </>
            )}

            {/* FLUJO CONFIRMADA: Permite completar o cancelar de última hora */}
            {reserva.estado === "CONFIRMADA" && (
              <>
                <button
                  onClick={() => onUpdateStatus(reserva.id, "CANCELADA")}
                  className="px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Cancelar Evento
                </button>
                <button
                  onClick={() => onUpdateStatus(reserva.id, "COMPLETADA")}
                  className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm shadow-emerald-600/10 transition-all active:scale-[0.98]"
                >
                  Marcar como Completado 🏁
                </button>
              </>
            )}

            {/* FLUJOS TERMINALES (COMPLETADA / CANCELADA): Nota informativa en vez de botones */}
            {(reserva.estado === "COMPLETADA" ||
              reserva.estado === "CANCELADA") && (
              <p className="text-xs text-slate-400 italic bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60">
                Esta reserva se encuentra en estado terminal y no requiere
                acciones operativas.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
