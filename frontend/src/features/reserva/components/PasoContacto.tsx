import type { PasosReservaProps } from "../../../interfaces/pasosReservaProps";

const PasoContacto = ({ datos, setDatos, errores }: PasosReservaProps) => {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* NOMBRE */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          ¿A nombre de quién?
        </label>

        <input
          type="text"
          placeholder="Nombre completo"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.nombreCliente ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.nombreCliente}
          onChange={(e) =>
            setDatos({
              ...datos,
              nombreCliente: e.target.value,
            })
          }
        />
      </div>

      {/* TELÉFONO */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          WhatsApp
        </label>

        <input
          type="tel"
          placeholder="662 000 0000"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.telefono ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.telefono}
          onChange={(e) =>
            setDatos({
              ...datos,
              telefono: e.target.value,
            })
          }
        />
      </div>

      {/* UBICACIÓN */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          Ubicación del evento
        </label>

        <input
          type="text"
          placeholder="Calle, salón o ubicación del evento"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.lugar ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.lugar}
          onChange={(e) =>
            setDatos({
              ...datos,
              lugar: e.target.value,
            })
          }
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">
          Correo electrónico
        </label>

        <input
          type="email"
          placeholder="correo@gmail.com"
          className={`
            w-full px-4 py-3 rounded-xl border outline-none transition-all

            ${errores.emailCliente ? "border-red-500" : "border-gray-300"}
          `}
          value={datos.emailCliente}
          onChange={(e) =>
            setDatos({
              ...datos,
              emailCliente: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default PasoContacto;
