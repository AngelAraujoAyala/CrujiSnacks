import { useState } from "react";
import type { Paquete } from "../../../interfaces/paquete.ts";

interface Props {
  pack: Paquete;
  onEdit: (pack: Paquete) => void;
  onDelete: (id: string) => void;
}

export const PaquetesCard = ({ pack, onEdit, onDelete }: Props) => {
  // Estado local para el sub-modal de confirmación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(pack.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* TARJETA PRINCIPAL DEL PAQUETE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 p-5 flex flex-col justify-between group min-h-[200px]">
        <div>
          {/* ENCABEZADO: TÍTULO Y BADGE DE ESTADO */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1 max-w-[70%]">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="text-xl group-hover:scale-110 transition-transform inline-block">
                  📦
                </span>
                <span className="truncate" title={pack.nombre}>
                  {pack.nombre}
                </span>
              </h2>
            </div>

            {/* Badge optimizado con Texto + Ícono */}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 transition-colors ${
                pack.activo
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-rose-50 text-rose-700 border-rose-100"
              }`}
            >
              <svg
                className="w-3.5 h-3.5 stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {pack.activo ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
              {pack.activo ? "Activo" : "Oculto"}
            </span>
          </div>

          {/* DESCRIPCIÓN */}
          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3 font-medium">
            {pack.descripcion ||
              "Sin descripción disponible para este paquete."}
          </p>
        </div>

        {/* PARTE INFERIOR: PRECIO Y ACCIONES REORGANIZADAS */}
        <div className="mt-5 space-y-4">
          {/* Divisor estético discreto */}
          <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Precio del Paquete
            </span>
            <p className="text-2xl font-black text-orange-500">
              <span className="text-sm font-bold mr-0.5">$</span>
              {pack.precio.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
              <span className="text-[10px] text-slate-400 font-bold ml-1">
                MXN
              </span>
            </p>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(pack)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition-colors border border-slate-200/40"
            >
              Editar paquete
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex-1 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 py-2.5 rounded-xl font-bold text-xs transition-all"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {/* MODAL INLINE DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center space-y-4 animate-scaleUp">
            {/* Icono de Peligro */}
            <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-xl border border-rose-100 shadow-sm">
              ⚠️
            </div>

            {/* Cuerpo del Mensaje */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                ¿Eliminar el paquete "{pack.nombre}"?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                Esta acción removerá el combo permanentemente. Los clientes ya
                no podrán seleccionarlo para futuras cotizaciones o reservas.
              </p>
            </div>

            {/* Acciones del Modal */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
              >
                No, mantenerlo
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-rose-600/10 active:scale-[0.98]"
              >
                Sí, eliminar combo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
