import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  User,
  Mail,
} from "lucide-react";

import { type Reserva } from "../../../interfaces/reserva";
import { type Topping } from "../services/toppingService";

interface PackageData {
  id: number;
  nombre: string;
  precio: number;
}

interface Props {
  datos: Reserva;
  toppings: Topping[];
  packages: PackageData[];
  onBack: () => void;
  onConfirm: () => void;
}

const ConfirmarReserva: React.FC<Props> = ({
  datos,
  toppings,
  packages,
  onBack,
  onConfirm,
}) => {
  const selectedPackage = packages.find((pkg) => pkg.id === datos.packageId);

  const selectedToppings = toppings.filter((topping) =>
    datos.toppingsIds.includes(topping.id),
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleString("es-MX", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Verifica tu reserva
        </h2>

        <p className="text-gray-500">
          Revisa que toda la información sea correcta
        </p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-orange-500 p-4 text-white">
          <div className="flex items-center gap-2">
            <Calendar size={20} />

            <span className="font-semibold">Información del evento</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* CLIENTE */}
          <div className="flex items-start gap-3">
            <User className="text-orange-500 mt-1" size={18} />

            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Cliente
              </p>

              <p className="text-gray-700 font-medium">{datos.nombreCliente}</p>

              <p className="text-sm text-gray-500">{datos.telefono}</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-start gap-3">
            <Mail className="text-orange-500 mt-1" size={18} />

            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Email
              </p>

              <p className="text-gray-700">{datos.emailCliente}</p>
            </div>
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <div className="flex items-start gap-3">
              <Clock className="text-orange-500 mt-1" size={18} />

              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Inicio
                </p>

                <p className="text-gray-700 text-sm">
                  {formatDate(datos.fechaInicio)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-orange-500 mt-1" size={18} />

              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Fin
                </p>

                <p className="text-gray-700 text-sm">
                  {formatDate(datos.fechaFin)}
                </p>
              </div>
            </div>
          </div>

          {/* PAQUETE */}
          <div className="flex items-start gap-3 border-t pt-4">
            <Package className="text-orange-500 mt-1" size={18} />

            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Paquete
              </p>

              <p className="text-gray-700 font-medium">
                {selectedPackage?.nombre}
              </p>

              <p className="text-orange-600 font-bold">
                ${Number(selectedPackage?.precio || 0).toLocaleString("es-MX")}
              </p>
            </div>
          </div>

          {/* UBICACIÓN */}
          <div className="flex items-start gap-3 border-t pt-4">
            <MapPin className="text-orange-500 mt-1" size={18} />

            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Ubicación
              </p>

              <p className="text-gray-700">{datos.lugar}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOPPINGS */}
      <div className="bg-orange-50 rounded-3xl border border-orange-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">✨</span>

          <h3 className="font-bold text-orange-900 text-sm uppercase tracking-widest">
            Toppings seleccionados
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedToppings.map((topping) => (
            <span
              key={topping.id}
              className="
                    bg-white px-3 py-1 rounded-full
                    text-xs font-medium text-orange-700
                    border border-orange-200 shadow-sm
                  "
            >
              {topping.nombre}
            </span>
          ))}
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onConfirm}
          className="
              w-full bg-green-600 hover:bg-green-700
              text-white font-bold py-4 rounded-2xl
              shadow-lg shadow-green-200
              flex items-center justify-center gap-2
              transition-all transform active:scale-95
            "
        >
          <MessageCircle size={20} />
          Confirmar y enviar
        </button>

        <button
          onClick={onBack}
          className="
              w-full bg-white text-gray-500
              font-medium py-3 rounded-2xl
              hover:bg-gray-50 transition-colors
            "
        >
          Corregir información
        </button>
      </div>
    </div>
  );
};

export default ConfirmarReserva;
