import { useState, useEffect } from 'react';
import type { Reserva } from '../../../interfaces/reserva';
import PasoContacto from './PasoContacto';
import { Button } from '../../../components/ui/Buttons';
import { Alert } from '../../../components/ui/Alert';
import PasoDatosEvento from './PasoDatosEvento';
import PasoToppings from './PasoToppings';
import ConfirmarReserva from './ConfirmarReserva';
import { getToppingLabel } from './ConfirmarReserva';
import { crearReservacion } from '../services/reservaService';

type ErroresReserva = Partial<Record<keyof Reserva, string>>;

export const FormularioReserva = () => {
  const [datos, setDatos] = useState<Reserva>(() => {
    const guardado = localStorage.getItem('progreso_crujisnacks');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        console.error("Error recuperando datos guardados", e);
      }
    }
    return {
      nombreCliente: '',
      whatsapp: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      paquete: '30 vasitos',
      toppings: [],
      email: '',
    };
  });

  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState<ErroresReserva>({});

  useEffect(() => {
    localStorage.setItem('progreso_crujisnacks', JSON.stringify(datos));
  }, [datos]);

  // Este efecto se dispara cada vez que el valor de 'paso' cambia
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 'smooth' para desplazamiento animado, 'auto' para instantáneo
    });
  }, [paso]);

  const handleFinalConfirm = async () => {
    try {

      await crearReservacion(datos);

      alert("¡Reserva guardada en el backend!");
      const { nombreCliente, whatsapp, fecha, hora, ubicacion, paquete, toppings, email } = datos;

      const mensaje = `*NUEVA RESERVA* 📋%0A
*Cliente:* ${nombreCliente}%0A
*WhatsApp:* ${whatsapp}%0A
*Email:* ${email}%0A
*Fecha:* ${fecha}%0A
*Hora:* ${hora}%0A
*Ubicación:* ${ubicacion}%0A
*Paquete:* ${paquete}%0A
*Toppings (10):* ${toppings.map(getToppingLabel).join(', ')}%0A
--------------------------%0A
_Enviado desde el formulario web_`;

      const numeroTelefono = "526624509876";

      localStorage.removeItem('progreso_crujisnacks');

      window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, '_blank');
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      alert("Hubo un problema al guardar tu reserva");
    }
  };


  const validarPasoActual = () => {
    const nuevosErrores: ErroresReserva = {};
    if (paso === 1) {
      if (!datos.nombreCliente.trim()) nuevosErrores.nombreCliente = "El nombre es obligatorio";
      if (datos.whatsapp.trim().replace(/\D/g, '').length !== 10) nuevosErrores.whatsapp = "Minimo 10 dígitos";
      if (!datos.ubicacion.trim()) nuevosErrores.ubicacion = "Dinos dónde será el evento";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!datos.email) {
        nuevosErrores.email = "El correo es obligatorio";
      } else if (!emailRegex.test(datos.email)) {
        nuevosErrores.email = "Formato de correo inválido";
      }

    }
    if (paso === 2) {
      if (!datos.fecha) nuevosErrores.fecha = "Selecciona una fecha";
      if (!datos.hora) nuevosErrores.hora = "Selecciona una hora";
      const hoy = new Date().toISOString().split('T')[0];
      if (datos.fecha && datos.fecha < hoy) {
        nuevosErrores.fecha = "No puedes reservar en el pasado";
      }
    }
    if (paso === 3) {
      if (datos.toppings.length < 10) nuevosErrores.toppings = "Selecciona 10 toppings";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  const manejarSiguiente = () => {
    if (paso === 4) return;
    if (validarPasoActual()) {
      setPaso(paso + 1);
    }
  };

  const manejarAtras = () => {
    if (paso === 1) return;
    setPaso(paso - 1);
  }

  const updateToppings = (nuevosToppings: string[]) => {
    setDatos(prev => ({ ...prev, toppings: nuevosToppings }));
    if (nuevosToppings.length === 10) {
      setErrores(prevErrors => {
        const { toppings, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
      <div className="bg-orange-500 p-6 text-white text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider">CrujiSnacks</h2>
        <p className="text-orange-100 text-sm">Estás a unos pasos de tu barra de snacks</p>
      </div>

      <div className="p-8">
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`h-2 w-full mx-1 rounded-full ${paso >= num ? 'bg-orange-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {paso === 1 && <PasoContacto datos={datos} setDatos={setDatos} errores={errores} />}
        {paso === 2 && <PasoDatosEvento datos={datos} setDatos={setDatos} errores={errores} />}
        {paso === 3 && (<PasoToppings selectedToppings={datos.toppings} onChange={updateToppings} />)}
        {paso === 4 && (<ConfirmarReserva datos={datos} onBack={() => setPaso(3)} onConfirm={handleFinalConfirm} />)}

        <div className="my-4">
          {errores.nombreCliente && <Alert mensaje="El nombre es obligatorio." tipo="error" />}
          {errores.whatsapp && <Alert mensaje="El número debe tener exactamente 10 dígitos." tipo="error" />}
          {errores.ubicacion && <Alert mensaje="La ubicación es obligatoria." tipo="error" />}
          {errores.email && <Alert mensaje={errores.email} tipo="error" />}
          {errores.fecha && <Alert mensaje="Ingresa fecha válida." tipo="error" />}
          {errores.hora && <Alert mensaje="¡Ups! Ingresa hora válida." tipo="error" />}
          {errores.toppings && <Alert mensaje={errores.toppings} tipo="error" />}
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-start'>
            {paso > 1 && paso < 4 && (
              <Button variant="atras" onClick={manejarAtras}>
                Atrás
              </Button>
            )}
          </div>
          <div>
            {paso < 4 && (
              <Button onClick={manejarSiguiente} variant="primary">
                {paso === 3 ? '¡Apartar mi fecha ya!' : 'Siguiente'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};