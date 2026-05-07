import type { PasosReservaProps } from "../../../interfaces/pasosReservaProps";

const PasoContacto = ({ datos, setDatos, errores }: PasosReservaProps) => {


  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">¿A nombre de quién?</label>
        <input
          type="text"
          placeholder="Nombre..."
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.nombreCliente ? 'border-red-500' : 'border-gray-300'}`}
          value={datos.nombreCliente}
          onChange={(e) => setDatos({ ...datos, nombreCliente: e.target.value })}
        />
      </div>

      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
        <input
          type="tel"
          placeholder="662 000 0000"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
          value={datos.whatsapp}
          onChange={(e) => setDatos({ ...datos, whatsapp: e.target.value })}
        />
      </div>

      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">Ubicación del evento</label>
        <input
          type="text"
          placeholder="Calle y número o salón de eventos"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.ubicacion ? 'border-red-500' : 'border-gray-300'}`}
          value={datos.ubicacion}
          onChange={(e) => setDatos({ ...datos, ubicacion: e.target.value })}
        />
      </div>

      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="text"
          placeholder="tu_email@gmail.com"
          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.email ? 'border-red-500' : 'border-gray-300'}`}
          value={datos.email}
          onChange={(e) => setDatos({ ...datos, email: e.target.value })}
        />
      </div>
    </div>
  );
};


export default PasoContacto;