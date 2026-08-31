import { useEffect, useState } from "react";
import type { PasosReservaProps } from "../../../interfaces/pasosReservaProps";
import { getPackages, type Package} from "../services/packageService";

const PasoDatosEvento = ({ datos, setDatos, errores }: PasosReservaProps) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Extraemos la fecha y las horas del estado actual (manejando persistencia de localStorage)
  const fechaActual = datos.fechaInicio ? datos.fechaInicio.split("T")[0] : "";
  const horaInicioActual = datos.fechaInicio ? datos.fechaInicio.split("T")[1] : "";
  const horaFinActual = datos.fechaFin ? datos.fechaFin.split("T")[1] : "";

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error cargando paquetes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Sincroniza el cambio de fecha para ambos extremos (Inicio y Fin)
  const manejarCambioFecha = (nuevaFecha: string) => {
    const hInicio = horaInicioActual || "18:00"; // Valores por defecto limpios si están vacíos
    const hFin = horaFinActual || "22:00";
    
    setDatos({
      ...datos,
      fechaInicio: `${nuevaFecha}T${hInicio}`,
      fechaFin: `${nuevaFecha}T${hFin}`,
    });
  };

  // Sincroniza solo la hora de inicio
  const manejarCambioHoraInicio = (nuevaHora: string) => {
    const fecha = fechaActual || new Date().toISOString().split("T")[0];
    setDatos({
      ...datos,
      fechaInicio: `${fecha}T${nuevaHora}`,
    });
  };

  // Sincroniza solo la hora de finalización
  const manejarCambioHoraFin = (nuevaHora: string) => {
    const fecha = fechaActual || new Date().toISOString().split("T")[0];
    setDatos({
      ...datos,
      fechaFin: `${fecha}T${nuevaHora}`,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* SECCIÓN DE FECHA Y HORARIOS */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Horario del Evento</h3>
        
        {/* 1. SELECCIÓN DEL DÍA */}
        <div className="space-y-1">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs font-bold text-slate-600 uppercase tracking-wide">
            ¿Qué día será tu evento?
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </span>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} // Evita seleccionar días del pasado visualmente
              className={`
                w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:ring-2
                ${errores.fechaInicio ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-orange-500 focus:ring-orange-500/20"}
              `}
              value={fechaActual}
              onChange={(e) => manejarCambioFecha(e.target.value)}
            />
          </div>
        </div>

        {/* 2. SELECCIÓN DE LAS HORAS */}
        <div className="grid grid-cols-2 gap-4">
          {/* HORA INICIO */}
          <div className="space-y-1">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs font-bold text-slate-600 uppercase tracking-wide">
              Hora Inicio
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <input
                type="time"
                className={`
                  w-full pl-10 pr-3 py-3 rounded-xl border outline-none transition-all font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:ring-2
                  ${errores.fechaInicio ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-orange-500 focus:ring-orange-500/20"}
                `}
                value={horaInicioActual}
                disabled={!fechaActual} // Bloqueado hasta elegir fecha
                onChange={(e) => manejarCambioHoraInicio(e.target.value)}
              />
            </div>
          </div>

          {/* HORA FIN */}
          <div className="space-y-1">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs font-bold text-slate-600 uppercase tracking-wide">
              Hora Término
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </span>
              <input
                type="time"
                className={`
                  w-full pl-10 pr-3 py-3 rounded-xl border outline-none transition-all font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:ring-2
                  ${errores.fechaFin ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-orange-500 focus:ring-orange-500/20"}
                `}
                value={horaFinActual}
                disabled={!fechaActual} // Bloqueado hasta elegir fecha
                onChange={(e) => manejarCambioHoraFin(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE SELECCIÓN DE PAQUETES */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-xs font-bold text-slate-600 uppercase tracking-wide mb-3 pl-1">
          Selecciona tu paquete
        </label>

        {loading ? (
          /* Skeleton Loader Minimalista */
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full h-20 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {packages.map((paquete) => (
              <button
                key={paquete.id}
                type="button"
                onClick={() =>
                  setDatos({
                    ...datos,
                    packageId: paquete.id,
                  })
                }
                className={`
                  flex justify-between items-center text-left
                  px-5 py-4 rounded-2xl border-2 transition-all duration-200 group
                  ${
                    datos.packageId === paquete.id
                      ? "border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-sm"
                      : "border-slate-200/80 hover:border-orange-300 bg-white hover:shadow-sm"
                  }
                `}
              >
                <div className="flex-1 pr-4">
                  <p className="font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {paquete.nombre}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {paquete.descripcion}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-black text-lg text-orange-600">
                    ${Number(paquete.precio).toLocaleString("es-MX")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasoDatosEvento;