import { useEffect, useState } from "react";
import crujiApi from "../../../services/crujiApi";
import type { Topping } from "../../../interfaces/topping";
import { ToppingCard } from "./ToppingCard";
import { ToppingModal } from "./ToppingModal";

export const GestionToppings = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Estados de UI para mejorar la experiencia de usuario (UX)
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadToppings();
  }, []);

  // Auto-ocultar notificaciones después de 4 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadToppings = async () => {
    try {
      setLoading(true);
      const { data } = await crujiApi.get<Topping[]>("/toppings");
      setToppings(data);
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "No se pudo conectar con el servidor para cargar el inventario.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (id: number, currentStock: boolean) => {
    try {
      // Cambio de estado optimista en interfaz para respuesta instantánea
      setToppings((prev) =>
        prev.map((t) => (t.id === id ? { ...t, stock: !currentStock } : t)),
      );

      await crujiApi.patch(`/toppings/${id}`, {
        stock: !currentStock,
      });
    } catch (error) {
      console.error(error);
      loadToppings(); // Revertir cambios si la API falla
    }
  };

  const saveChanges = async () => {
    if (!selectedTopping) return;

    try {
      const payload = {
        nombre: selectedTopping.nombre,
        iconURL: selectedTopping.iconURL,
        stock: selectedTopping.stock,
      };

      if (isCreating) {
        await crujiApi.post("/toppings", selectedTopping);
        setNotification({
          type: "success",
          text: `"${selectedTopping.nombre}" fue creado con éxito.`,
        });
      } else {
        await crujiApi.patch(`/toppings/${selectedTopping.id}`, payload);
        setNotification({
          type: "success",
          text: "Cambios guardados correctamente.",
        });
      }

      loadToppings();
      setSelectedTopping(null);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "Ocurrió un error al intentar guardar los datos del topping.",
      });
    }
  };

  // 🔥 FUNCIÓN CORREGIDA: Sin confirm nativo y con actualización de estado limpia
  const deleteTopping = async (id: number) => {
  try {
    // 1. Enviamos la petición al backend
    await crujiApi.delete(`/toppings/${id}`);

    // 2. Si el servidor responde con éxito (2xx), limpiamos la UI de inmediato
    setToppings(prev => prev.filter(t => t.id !== id));
    setNotification({ 
      type: "success", 
      text: "El ingrediente ha sido removido del inventario con éxito." 
    });
  } catch (error: any) {
    console.error("Error detallado del servidor:", error);
    
    // Extraemos el mensaje real que manda tu API (.NET o Express)
    const backendMessage = error.response?.data?.message || "Error de conexión o restricción en la base de datos.";
    
    setNotification({ 
      type: "error", 
      text: `No se pudo eliminar: ${backendMessage}` 
    });
    
    // Forzamos recarga para asegurar que la UI sea idéntica a la DB
    loadToppings(); 
  }
};

  // 🔄 PANTALLA DE CARGA INICIAL
  if (loading && toppings.length === 0) {
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
          Sincronizando Inventario...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/40 p-4 sm:p-8 animate-fadeIn">
      {/* SECCIÓN NOTIFICACIONES DE ESCRITORIO */}
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

      {/* ENCABEZADO PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Gestión de Toppings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Controla existencias, añade complementos y actualiza el menú de la
            sucursal.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTopping({
              nombre: "",
              iconURL: "",
              stock: true,
            } as Topping);
            setIsCreating(true);
          }}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm shadow-orange-500/10 transition-colors active:scale-[0.98]"
        >
          + Nuevo Topping
        </button>
      </div>

      {/* REJILLA DE TARJETAS */}
      {toppings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <span className="text-4xl inline-block mb-2">📦</span>
          <p className="text-sm font-bold text-slate-400">
            No hay ingredientes registrados en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {toppings.map((topping) => (
            <ToppingCard
              key={topping.id}
              topping={topping}
              onEdit={setSelectedTopping}
              onDelete={deleteTopping}
              onToggleStock={toggleStock}
            />
          ))}
        </div>
      )}

      {/* VENTANA MODAL EDICIÓN / ALTA */}
      {selectedTopping && (
        <ToppingModal
          topping={selectedTopping}
          setTopping={setSelectedTopping}
          onClose={() => {
            setSelectedTopping(null);
            setIsCreating(false);
          }}
          onSave={saveChanges}
          isCreating={isCreating}
        />
      )}
    </div>
  );
};
