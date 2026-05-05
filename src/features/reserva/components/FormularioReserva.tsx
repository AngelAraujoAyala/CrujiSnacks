import { useState } from 'react';
import type { Reserva } from '../../../interfaces/reserva';
import PasoContacto from './PasoContacto';

export const FormularioReserva = () => {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState<Reserva>({
    nombreCliente: '',
    whatsapp: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    paquete: '30 vasitos',
    toppings: [],
    estado: 'pendiente'
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
      {/* Header del Formulario */}
      <div className="bg-orange-500 p-6 text-white text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider">CrujiSnacks</h2>
        <p className="text-orange-100 text-sm">Estás a unos pasos de tu barra de snacks</p>
      </div>

      <div className="p-8">
        {/* Indicador de pasos sutil */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 w-full mx-1 rounded-full ${paso >= num ? 'bg-orange-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Renderizado Condicional de Pasos */}
        {paso === 1 && <PasoContacto datos={datos} setDatos={setDatos} />}

        {/* Botón de Navegación */}
        <button
          onClick={() => setPaso(paso + 1)}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95"
        >
          {paso === 3 ? '¡Apartar mi fecha ya!' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};

