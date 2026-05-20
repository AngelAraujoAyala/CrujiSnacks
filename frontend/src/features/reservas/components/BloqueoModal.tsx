import { useState } from "react";

interface Props {
  onClose: () => void;

  onSave: (data: {
    fecha: string;
    horaInicio?: string;
    horaFin?: string;
    motivo?: string;
  }) => Promise<void>;
}

export const BloqueoModal = ({ onClose, onSave }: Props) => {
  const [fecha, setFecha] = useState("");

  const [horaInicio, setHoraInicio] = useState("");

  const [horaFin, setHoraFin] = useState("");

  const [motivo, setMotivo] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (loading) return;

    if (!fecha) {
      alert("Selecciona una fecha");

      return;
    }

    try {
      setLoading(true);

      await onSave({
        fecha,

        horaInicio: horaInicio || undefined,

        horaFin: horaFin || undefined,

        motivo: motivo || undefined,
      });
    } catch (error) {
      console.error(error);

      alert("Error creando bloqueo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
                fixed inset-0
                bg-black/40
                flex justify-center
                items-center
                z-50
            "
    >
      <div
        className="
                    bg-white
                    rounded-2xl
                    p-6
                    w-full
                    max-w-md
                    shadow-2xl
                "
      >
        <h2 className="text-2xl font-bold mb-5">Bloquear fecha</h2>

        <div className="space-y-4">
          {/* FECHA */}
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="
                            w-full border
                            rounded-xl p-3
                        "
          />

          {/* HORA INICIO */}
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="
                            w-full border
                            rounded-xl p-3
                        "
          />

          {/* HORA FIN */}
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="
                            w-full border
                            rounded-xl p-3
                        "
          />

          {/* MOTIVO */}
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo"
            className="
                            w-full border
                            rounded-xl p-3
                        "
          />
        </div>

        {/* ACTIONS */}
        <div
          className="
                        flex justify-end
                        gap-3 mt-6
                    "
        >
          <button
            disabled={loading}
            onClick={onClose}
            className="
                            px-4 py-2
                            bg-gray-200
                            rounded-xl
                            disabled:opacity-50
                        "
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="
                            px-5 py-2
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            rounded-xl
                            disabled:opacity-50
                        "
          >
            {loading ? "Bloqueando..." : "Bloquear"}
          </button>
        </div>
      </div>
    </div>
  );
};
