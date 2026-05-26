import { useEffect, useState } from "react";
import crujiApi from "../../../services/crujiApi";
import type { Paquete } from "../../../interfaces/paquete.ts";
import { PaquetesCard } from "./PaquetesCard";
import { PaquetesModal } from "./PaquetesModal";

export const GestionPaquetes = () => {
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [selectedPaquete, setSelectedPaquete] = useState<Paquete | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Estados de UI uniformes para consistencia de diseño
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  // Auto-ocultar notificaciones después de 4 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const { data } = await crujiApi.get<Paquete[]>("/packages");

      setPaquetes(
        data.map((pack) => ({
          ...pack,
          precio: Number(pack.precio),
        })),
      );
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "No se pudo conectar con el servidor para cargar los paquetes.",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    if (!selectedPaquete) return;

    try {
      const payload = {
        nombre: selectedPaquete.nombre,
        descripcion: selectedPaquete.descripcion ?? "",
        precio: selectedPaquete.precio,
        activo: selectedPaquete.activo,
      };

      if (isCreating) {
        await crujiApi.post("/packages", payload);
        setNotification({
          type: "success",
          text: `El paquete "${selectedPaquete.nombre}" se creó correctamente.`,
        });
      } else {
        await crujiApi.patch(`/packages/${selectedPaquete.id}`, payload);
        setNotification({
          type: "success",
          text: "Cambios guardados en el paquete exitosamente.",
        });
      }

      loadPackages();
      setSelectedPaquete(null);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        text: "Ocurrió un error al intentar guardar los datos del paquete.",
      });
    }
  };

  // 🔥 DISEÑO DE ELIMINACIÓN UNIFORME: Sin bloqueos nativos y con manejo de excepciones de BD
  const deletePaquete = async (id: number) => {
    try {
      // 1. Petición directa al servidor
      await crujiApi.delete(`/packages/${id}`);

      // 2. Filtrado optimista e instantáneo en la UI
      setPaquetes((prev) => prev.filter((p) => p.id !== id));

      setNotification({
        type: "success",
        text: "El paquete ha sido removido del sistema.",
      });
    } catch (error: any) {
      console.error("Error al eliminar paquete:", error);

      // Capturamos si viene una restricción por FK de base de datos
      const backendMessage =
        error.response?.data?.message ||
        "No se pudo eliminar el paquete. Puede estar asociado a reservaciones activas.";

      setNotification({
        type: "error",
        text: backendMessage,
      });

      loadPackages(); // Revertimos cambios si falla
    }
  };

  // 🔄 PANTALLA DE CARGA UNIFORME
  if (loading && paquetes.length === 0) {
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
          Sincronizando Catálogo...
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

      {/* ENCABEZADO PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Gestión de Paquetes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Administra los combos base, precios públicos y disponibilidad de
            paquetes de la sucursal.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedPaquete({
              nombre: "",
              descripcion: "",
              precio: 0,
              activo: true,
            } as Paquete);
            setIsCreating(true);
          }}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm shadow-orange-500/10 transition-colors active:scale-[0.98]"
        >
          + Nuevo Paquete
        </button>
      </div>

      {/* REJILLA DE TARJETAS / EMPTY STATE */}
      {paquetes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <span className="text-4xl inline-block mb-2">🏷️</span>
          <p className="text-sm font-bold text-slate-400">
            No hay paquetes configurados actualmente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {paquetes.map((pack) => (
            <PaquetesCard
              key={pack.id}
              pack={pack}
              onEdit={(editedPack) =>
                setSelectedPaquete({
                  ...editedPack,
                  precio: Number(editedPack.precio),
                })
              }
              onDelete={deletePaquete}
            />
          ))}
        </div>
      )}

      {/* VENTANA MODAL EDICIÓN / ALTA */}
      {selectedPaquete && (
        <PaquetesModal
          pack={selectedPaquete}
          setPack={setSelectedPaquete}
          onClose={() => {
            setSelectedPaquete(null);
            setIsCreating(false);
          }}
          onSave={saveChanges}
          isCreating={isCreating}
        />
      )}
    </div>
  );
};
