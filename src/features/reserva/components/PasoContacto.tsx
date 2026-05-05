import type { Reserva } from "../../../interfaces/reserva";


// 1. Definimos qué "forma" tienen las propiedades que recibe este componente
interface PasoContactoProps {
  datos: Reserva;
  // Este es el tipo estándar para la función que actualiza el estado en React
  setDatos: React.Dispatch<React.SetStateAction<Reserva>>;
}

const PasoContacto = ({ datos, setDatos }: PasoContactoProps) => {


  return (
    <div className="space-y-4 animate-fadeIn">
      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">¿A nombre de quién?</label>
        <input 
          type="text"
          placeholder="Nombre..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          value={datos.nombreCliente}
          onChange={(e) => setDatos({...datos, nombreCliente: e.target.value})}
        />
      </div>

      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
        <input 
          type="tel"
          placeholder="662 000 0000"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          value={datos.whatsapp}
          onChange={(e) => setDatos({...datos, whatsapp: e.target.value})}
        />
      </div>

      <div>
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">Ubicación del evento</label>
        <input 
          type="text"
          placeholder="Calle y número o salón de eventos"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          value={datos.ubicacion}
          onChange={(e) => setDatos({...datos, ubicacion: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input 
          type="text"
          placeholder="tu_email@gmail.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          value={datos.email}
          onChange={(e) => setDatos({...datos, email: e.target.value})}
        />
      </div>
    </div>
  );
};


export default PasoContacto;