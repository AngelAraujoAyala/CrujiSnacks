import { useEffect, useState } from "react";

import PasoContacto from "./PasoContacto";
import PasoDatosEvento from "./PasoDatosEvento";
import PasoToppings from "./PasoToppings";
import ConfirmarReserva from "./ConfirmarReserva";

import { Button } from "../../../components/ui/Buttons";
import { Alert } from "../../../components/ui/Alert";

import { crearReservacion } from "../services/reservaService";
import { getPackages, type Package } from "../services/packageService";
import { getToppings, type Topping } from "../services/toppingService";

import type { Reserva } from "../../../interfaces/reserva";

type ErroresReserva = Partial<Record<keyof Reserva, string>>;

export const FormularioReserva = () => {
  const [datos, setDatos] = useState<Reserva>(() => {
    const guardado = localStorage.getItem("progreso_crujisnacks");

    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        console.error("Error recuperando datos guardados", e);
      }
    }

    return {
      nombreCliente: "",
      emailCliente: "",
      telefono: "",

      fechaInicio: "",
      fechaFin: "",

      lugar: "",

      packageId: null,

      toppingsIds: [],
    };
  });

  const [packages, setPackages] = useState<Package[]>([]);

  const [toppings, setToppings] = useState<Topping[]>([]);

  const [paso, setPaso] = useState(1);

  const [loading, setLoading] = useState(false);

  const [errores, setErrores] = useState<ErroresReserva>({});

  // CARGAR DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesData, toppingsData] = await Promise.all([
          getPackages(),
          getToppings(),
        ]);

        setPackages(packagesData);

        setToppings(toppingsData.filter((t) => t.stock));
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };

    fetchData();
  }, []);

  // GUARDAR PROGRESO
  useEffect(() => {
    localStorage.setItem("progreso_crujisnacks", JSON.stringify(datos));
  }, [datos]);

  // SCROLL
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [paso]);

  // CONFIRMAR
  const handleFinalConfirm = async () => {
    try {
      setLoading(true);

      await crearReservacion(datos);

      alert("¡Reserva guardada correctamente!");

      const selectedPackage = packages.find((p) => p.id === datos.packageId);

      const selectedToppings = toppings.filter((t) =>
        datos.toppingsIds.includes(t.id),
      );

      const mensaje = `*NUEVA RESERVA* 📋%0A
*Cliente:* ${datos.nombreCliente}%0A
*WhatsApp:* ${datos.telefono}%0A
*Email:* ${datos.emailCliente}%0A
*Inicio:* ${datos.fechaInicio}%0A
*Fin:* ${datos.fechaFin}%0A
*Ubicación:* ${datos.lugar}%0A
*Paquete:* ${selectedPackage?.nombre ?? "Sin paquete"}%0A
*Toppings:* ${selectedToppings.map((t) => t.nombre).join(", ")}%0A
--------------------------%0A
_Enviado desde el formulario web_`;

      const numeroTelefono = "526624509876";

      localStorage.removeItem("progreso_crujisnacks");

      window.open(`https://wa.me/${numeroTelefono}?text=${mensaje}`, "_blank");
    } catch (error) {
      console.error(error);

      alert("Hubo un problema al guardar tu reserva");
    } finally {
      setLoading(false);
    }
  };

  // VALIDACIONES
  const validarPasoActual = () => {
    const nuevosErrores: ErroresReserva = {};

    // PASO 1
    if (paso === 1) {
      if (!datos.nombreCliente.trim()) {
        nuevosErrores.nombreCliente = "El nombre es obligatorio";
      }

      if (datos.telefono.trim().replace(/\D/g, "").length !== 10) {
        nuevosErrores.telefono = "El teléfono debe tener 10 dígitos";
      }

      if (!datos.lugar.trim()) {
        nuevosErrores.lugar = "La ubicación es obligatoria";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!datos.emailCliente) {
        nuevosErrores.emailCliente = "El correo es obligatorio";
      } else if (!emailRegex.test(datos.emailCliente)) {
        nuevosErrores.emailCliente = "Correo inválido";
      }
    }

    // PASO 2
    if (paso === 2) {
      if (!datos.fechaInicio) {
        nuevosErrores.fechaInicio = "Selecciona fecha inicio";
      }

      if (!datos.fechaFin) {
        nuevosErrores.fechaFin = "Selecciona fecha final";
      }

      if (!datos.packageId) {
        nuevosErrores.packageId = "Selecciona un paquete";
      }

      const inicio = new Date(datos.fechaInicio);

      const fin = new Date(datos.fechaFin);

      if (fin <= inicio) {
        nuevosErrores.fechaFin = "La fecha final debe ser posterior";
      }

      if (inicio < new Date()) {
        nuevosErrores.fechaInicio = "No puedes reservar en el pasado";
      }
    }

    // PASO 3
    if (paso === 3) {
      if (datos.toppingsIds.length < 10) {
        nuevosErrores.toppingsIds = "Selecciona 10 toppings";
      }
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  // SIGUIENTE
  const manejarSiguiente = () => {
    if (paso === 4) return;

    if (validarPasoActual()) {
      setPaso(paso + 1);
    }
  };

  // ATRÁS
  const manejarAtras = () => {
    if (paso === 1) return;

    setPaso(paso - 1);
  };

  // TOPPINGS
  const updateToppings = (nuevosToppings: number[]) => {
    setDatos((prev) => ({
      ...prev,
      toppingsIds: nuevosToppings,
    }));

    if (nuevosToppings.length === 10) {
      setErrores((prevErrors) => {
        const { toppingsIds, ...rest } = prevErrors;

        return rest;
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
      {/* HEADER */}
      <div className="bg-orange-500 p-6 text-white text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider">
          CrujiSnacks
        </h2>

        <p className="text-orange-100 text-sm">
          Estás a unos pasos de tu barra de snacks
        </p>
      </div>

      {/* CONTENT */}
      <div className="p-8">
        {/* PROGRESS */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`
                  h-2 w-full mx-1 rounded-full

                  ${paso >= num ? "bg-orange-500" : "bg-gray-200"}
                `}
            />
          ))}
        </div>

        {/* PASOS */}
        {paso === 1 && (
          <PasoContacto datos={datos} setDatos={setDatos} errores={errores} />
        )}

        {paso === 2 && (
          <PasoDatosEvento
            datos={datos}
            setDatos={setDatos}
            errores={errores}
          />
        )}

        {paso === 3 && (
          <PasoToppings
          toppings={toppings}
          selectedToppings={datos.toppingsIds}
          onChange={updateToppings}
        />
        )}

        {paso === 4 && (
          <ConfirmarReserva
            datos={datos}
            toppings={toppings}
            packages={packages}
            onBack={() => setPaso(3)}
            onConfirm={handleFinalConfirm}
          />
        )}

        {/* ALERTAS */}
        <div className="my-4">
          {Object.values(errores).map(
            (error, index) =>
              error && <Alert key={index} mensaje={error} tipo="error" />,
          )}
        </div>

        {/* BOTONES */}
        <div className="flex justify-between">
          <div>
            {paso > 1 && paso < 4 && (
              <Button variant="atras" onClick={manejarAtras}>
                Atrás
              </Button>
            )}
          </div>

          <div>
            {paso < 4 && (
              <Button onClick={manejarSiguiente} variant="primary">
                {paso === 3 ? "Confirmar" : "Siguiente"}
              </Button>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Procesando reserva...
          </div>
        )}
      </div>
    </div>
  );
};
