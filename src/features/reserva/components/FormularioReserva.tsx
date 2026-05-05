import { useState } from 'react';
import type { Reserva } from '../../../interfaces/reserva';
import PasoContacto from './PasoContacto';
import { Button } from '../../../components/ui/Buttons';
import { Alert } from '../../../components/ui/Alert';

type ErroresReserva = Partial<Record<keyof Reserva, string>>;

export const FormularioReserva = () => {
  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState<ErroresReserva>({});
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

  const validarPasoActual = () => {
    const nuevosErrores: ErroresReserva = {};

    if (paso === 1) {
      if (!datos.nombreCliente.trim()) nuevosErrores.nombreCliente = "El nombre es obligatorio";
      if (!datos.whatsapp.trim()) nuevosErrores.whatsapp = "El WhatsApp es necesario";
      if (datos.whatsapp.length < 10) nuevosErrores.whatsapp = "Mínimo 10 dígitos";
      if (!datos.ubicacion.trim()) nuevosErrores.ubicacion = "Dinos dónde será el evento";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  const manejarSiguiente = () => {
    if (validarPasoActual()) {
      setPaso(paso + 1);
    }
  };

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
        {paso === 1 && <PasoContacto datos={datos} setDatos={setDatos} errores={errores} />}

        {errores.nombreCliente && (
          <Alert mensaje="¡Ups! El nombre es obligatorio." tipo="error" />
        )}
        {errores.whatsapp && (
          <Alert mensaje="¡Ups! El número debe tener exactamente 10 dígitos." tipo="error" />
        )}
        {errores.ubicacion && (
          <Alert mensaje="¡Ups! La ubicación es obligatoria." tipo="error" />
        )}

        {/* Botón de Navegación */}
        <Button onClick={manejarSiguiente} variant="primary">
          {paso === 3 ? '¡Apartar mi fecha ya!' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
};

