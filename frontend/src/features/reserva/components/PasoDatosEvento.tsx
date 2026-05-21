import { useEffect, useState } from "react";
import type { PasosReservaProps } from "../../../interfaces/pasosReservaProps";
import { getPackages, type Package} from "../services/packageService";

const PasoDatosEvento = ({ datos, setDatos, errores }: PasosReservaProps) => {
  const [packages, setPackages] = useState<Package[]>([]);

  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* FECHA INICIO */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          ¿Cuándo inicia tu evento?
        </label>

        <input
          type="datetime-local"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.fechaInicio ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.fechaInicio}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaInicio: e.target.value,
            })
          }
        />

        {errores.fechaInicio && (
          <p className="text-red-500 text-xs mt-1">{errores.fechaInicio}</p>
        )}
      </div>

      {/* FECHA FIN */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          ¿Cuándo termina tu evento?
        </label>

        <input
          type="datetime-local"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.fechaFin ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.fechaFin}
          onChange={(e) =>
            setDatos({
              ...datos,
              fechaFin: e.target.value,
            })
          }
        />

        {errores.fechaFin && (
          <p className="text-red-500 text-xs mt-1">{errores.fechaFin}</p>
        )}
      </div>

      {/* PAQUETES */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-3">
          Selecciona tu paquete
        </label>

        {loading ? (
          <div className="py-6 text-center">
            <p className="text-gray-500 text-sm">Cargando paquetes...</p>
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
                  px-4 py-4 rounded-2xl border-2 transition-all

                  ${
                    datos.packageId === paquete.id
                      ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                      : "border-gray-100 hover:border-orange-200 bg-white"
                  }
                `}
              >
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{paquete.nombre}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    {paquete.descripcion}
                  </p>
                </div>

                <p className="font-bold text-lg text-orange-600">
                  ${Number(paquete.precio).toLocaleString("es-MX")}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasoDatosEvento;
