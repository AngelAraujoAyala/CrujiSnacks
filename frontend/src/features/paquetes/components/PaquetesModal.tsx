import type { Paquete } from "../../../interfaces/paquete.ts";

interface Props {
  pack: Paquete;
  setPack: (pack: Paquete) => void;
  onClose: () => void;
  onSave: () => void;
  isCreating: boolean;
}

export const PaquetesModal = ({
  pack,
  setPack,
  onClose,
  onSave,
  isCreating,
}: Props) => {
  // Validación básica en caliente para asegurar consistencia operativa
  const botonDeshabilitado = !pack.nombre?.trim() || pack.precio < 0;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 transform transition-all scale-100 max-h-[90vh] overflow-y-auto JSON-scrollbar">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isCreating ? "Nuevo Paquete" : "Editar Paquete"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Administra las ofertas y combos del menú para los clientes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* CAMPOS DEL FORMULARIO */}
        <div className="space-y-4">
          {/* CAMPO: NOMBRE */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nombre del Paquete <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              value={pack.nombre}
              onChange={(e) =>
                setPack({
                  ...pack,
                  nombre: e.target.value,
                })
              }
              placeholder="Ej. Combo Fiesta, Paquete CrujiFamiliar..."
              className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white placeholder:text-slate-400"
            />
          </div>

          {/* CAMPO: DESCRIPCIÓN */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Descripción detallada
            </label>
            <textarea
              value={pack.descripcion || ""}
              onChange={(e) =>
                setPack({
                  ...pack,
                  descripcion: e.target.value,
                })
              }
              placeholder="¿Qué incluye este paquete? Detalla los snacks, porciones o toppings incluidos..."
              className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white placeholder:text-slate-400 min-h-25 resize-none"
            />
          </div>

          {/* CAMPO: PRECIO (CON CONTENEDOR DE DIVISA) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Precio al Público <span className="text-orange-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-slate-500 text-sm font-bold">$</span>
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pack.precio || ""}
                onChange={(e) =>
                  setPack({
                    ...pack,
                    precio: Math.max(0, Number(e.target.value)),
                  })
                }
                placeholder="0.00"
                className="w-full border border-slate-200 rounded-xl py-3 pl-7 pr-3 text-sm font-bold text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white placeholder:text-slate-400"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  MXN
                </span>
              </div>
            </div>
          </div>

          {/* CAMPO: SWITCH VISIBILIDAD / ESTADO ACTIVO */}
          <div className="flex items-center justify-between bg-slate-50/80 px-3.5 py-3 rounded-xl border border-slate-100">
            <div>
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Estado del Paquete
              </span>
              <p className="text-[11px] text-slate-400 font-medium">
                {pack.activo
                  ? "Visible para los clientes en la landing page"
                  : "Oculto temporalmente de la venta pública"}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setPack({
                  ...pack,
                  activo: !pack.activo,
                })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus:ring-2 focus:ring-orange-500/20 ${
                pack.activo ? "bg-orange-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pack.activo ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECCIÓN DE ACCIONES */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={botonDeshabilitado}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm shadow-orange-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            Guardar Paquete
          </button>
        </div>
      </div>
    </div>
  );
};
