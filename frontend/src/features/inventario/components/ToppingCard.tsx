import { useState } from "react";
import type { Topping } from "../../../interfaces/topping";

interface Props {
  topping: Topping;
  onEdit: (topping: Topping) => void;
  onDelete: (id: number) => void;
  onToggleStock: (id: number, stock: boolean) => void;
}

export const ToppingCard = ({
  topping,
  onEdit,
  onDelete,
  onToggleStock,
}: Props) => {
  // Estado local para controlar el modal de confirmación de eliminación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Primero notificamos al padre para que dispare el Axios DELETE
  onDelete(topping.id); 
  
  // Luego cerramos el modal local de la tarjeta
  setShowDeleteConfirm(false); 
};

  return (
    <>
      {/* TARJETA PRINCIPAL DEL TOPPING */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 p-5 flex flex-col justify-between group">
        <div>
          {/* ENCABEZADO: IMAGEN + BADGE */}
          <div className="flex justify-between items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              {topping.iconURL ? (
                <img
                  src={topping.iconURL}
                  alt={topping.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl">🍬</span>
              )}
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                topping.stock
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-rose-50 text-rose-700 border-rose-100"
              }`}
            >
              {topping.stock ? "Disponible" : "Agotado"}
            </span>
          </div>

          {/* INFORMACIÓN */}
          <div className="mt-4 space-y-0.5">
            <h2
              className="text-lg font-bold text-slate-800 truncate"
              title={topping.nombre}
            >
              {topping.nombre}
            </h2>
            <p className="text-xs text-slate-400 font-medium tracking-wider">
              ID único: #{topping.id}
            </p>
          </div>
        </div>

        <div>
          {/* CONTROL DE STOCK (SWITCH INTERACTIVO) */}
          <div className="mt-5 flex items-center justify-between bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
              Disponibilidad
            </span>

            <button
              type="button"
              onClick={() => onToggleStock(topping.id, topping.stock)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none focus:ring-2 focus:ring-orange-500/20 ${
                topping.stock ? "bg-orange-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  topping.stock ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* ACCIONES DE EDICIÓN Y ELIMINACIÓN */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onEdit(topping)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs transition-colors border border-slate-200/40"
            >
              Editar
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

      {/* MODAL PREMIUM DE CONFIRMACIÓN (PORTAL INLINE) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 text-center space-y-4 animate-scaleUp">
            {/* Icono de Alerta */}
            <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-xl border border-rose-100 shadow-sm">
              ⚠️
            </div>

            {/* Mensaje Informativo */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                ¿Eliminar "{topping.nombre}"?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                Esta acción es destructiva. El ingrediente se removerá del
                inventario y dejará de aparecer como opción en los formularios
                de los clientes.
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
              >
                No, cancelar
              </button>

              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shadow-rose-600/10 active:scale-[0.98]"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
