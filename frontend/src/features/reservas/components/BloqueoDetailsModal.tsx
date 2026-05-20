import type { BloqueoFecha } from "../interfaces/bloqueo";

interface Props {
  bloqueo: BloqueoFecha;

  onClose: () => void;

  onDelete: (id: number) => Promise<void>;
}

export const BloqueoDetailsModal = ({ bloqueo, onClose, onDelete }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Detalles Bloqueo</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Fecha</p>

            <p>{new Date(bloqueo.fecha).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Horario</p>

            <p>
              {bloqueo.horaInicio || "--"} - {bloqueo.horaFin || "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Motivo</p>

            <p>{bloqueo.motivo || "Sin motivo"}</p>
          </div>

          <button
            onClick={() => void onDelete(bloqueo.id)}
            className="
    mt-6
    w-full
    bg-red-500
    hover:bg-red-600
    text-white
    py-3
    rounded-xl
  "
          >
            Eliminar bloqueo
          </button>
        </div>
      </div>
    </div>
  );
};
