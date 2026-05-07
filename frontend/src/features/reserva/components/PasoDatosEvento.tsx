import type { PasosReservaProps } from "../../../interfaces/pasosReservaProps";

const PAQUETES_DISPONIBLES = [
    { id: 'p30', nombre: '30 vasitos', descripcion: 'Ideal para reuniones pequeñas', precio: 1050 },
    { id: 'p50', nombre: '50 vasitos', descripcion: 'El favorito de las fiestas', precio: 1750 },
    { id: 'p100', nombre: '100 vasitos', descripcion: 'Para eventos grandes', precio: 3500 },
    { id: 'p-pers', nombre: 'Personalizado', descripcion: 'Tú eliges la cantidad', precio: 0 },
];

const PasoDatosEvento = ({ datos, setDatos, errores }: PasosReservaProps) => {

    return (
        <div className="space-y-4 animate-fadeIn">
            <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">¿Qué día es tu evento?</label>
                <input
                    type="date"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.fecha ? 'border-red-500' : 'border-gray-300'}`}
                    value={datos.fecha}
                    onChange={(e) => setDatos({ ...datos, fecha: e.target.value })}
                />
            </div>

            <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">¿A qué hora empezamos?</label>
                <input
                    type="time"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errores.hora ? 'border-red-500' : 'border-gray-300'}`}
                    value={datos.hora}
                    onChange={(e) => setDatos({ ...datos, hora: e.target.value })}
                />
                {errores.hora && <p className="text-red-500 text-xs mt-1">{errores.hora}</p>}
            </div>

            <div>
                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-semibold text-gray-700 mb-1">Selecciona tu paquete</label>
                <div className="grid grid-cols-1 gap-3">
                    {PAQUETES_DISPONIBLES.map((paquete) => (
                        <button
                            key={paquete.id}
                            type="button"
                            onClick={() => setDatos({ ...datos, paquete: paquete.nombre })}
                            className={`flex justify-between items-center text-left px-4 py-3 rounded-xl border-2 transition-all ${datos.paquete === paquete.nombre
                                ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500'
                                : 'border-gray-100 hover:border-orange-200 bg-white'
                                }`}
                        >
                            <div className="flex-1">
                                <p className="font-bold text-gray-800">{paquete.nombre}</p>
                                <p className="text-xs text-gray-500">{paquete.descripcion}</p>
                            </div>

                            <p className="font-bold text-lg">${paquete.precio}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default PasoDatosEvento;