import type { Reserva } from "../interfaces/reserva";

interface Props {
  reserva: Reserva;

  onClose: () => void;

  onUpdateStatus: (
    id: number,
    estado: string
  ) => Promise<void>;
}

export const ReservaDetailsModal = ({
  reserva,
  onClose,
  onUpdateStatus,
}: Props) => {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-xl
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Detalles Reserva
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-black
              text-xl
            "
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500">
              Cliente
            </p>

            <p className="font-semibold text-lg">
              {reserva.nombreCliente}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Teléfono
            </p>

            <p>{reserva.telefono}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p>{reserva.emailCliente}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Lugar
            </p>

            <p>{reserva.lugar}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Fecha
            </p>

            <p>
              {new Date(
                reserva.fecha
              ).toLocaleString()}
            </p>
          </div>

          {/* STATUS */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Estado
            </p>

            <select
              value={reserva.estado}
              onChange={(e) =>
                void onUpdateStatus(
                  reserva.id,
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
              "
            >
              <option value="PENDIENTE">
                PENDIENTE
              </option>

              <option value="CONFIRMADA">
                CONFIRMADA
              </option>

              <option value="CANCELADA">
                CANCELADA
              </option>

              <option value="COMPLETADA">
                COMPLETADA
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};