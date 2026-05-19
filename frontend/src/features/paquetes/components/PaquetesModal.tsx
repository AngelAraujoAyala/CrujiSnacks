import type { Paquete } from "../../../interfaces/paquete.ts";

interface Props {
    pack: Paquete;
    setPack: (pack: Paquete) => void;
    onClose: () => void;
    onSave: () => void;
    isCreating: boolean;
}

export const PaquetesModal = ({
    pack,
    setPack,
    onClose,
    onSave,
    isCreating
}: Props) => {

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold mb-5">

                    {isCreating
                        ? "Nuevo Paquete"
                        : "Editar Paquete"}

                </h2>

                <div className="space-y-4">

                    {/* NOMBRE */}
                    <input
                        type="text"
                        value={pack.nombre}
                        onChange={(e) =>
                            setPack({
                                ...pack,
                                nombre: e.target.value
                            })
                        }
                        placeholder="Nombre del paquete"
                        className="w-full border rounded-xl p-3"
                    />

                    {/* DESCRIPCION */}
                    <textarea
                        value={pack.descripcion || ""}
                        onChange={(e) =>
                            setPack({
                                ...pack,
                                descripcion: e.target.value
                            })
                        }
                        placeholder="Descripción"
                        className="w-full border rounded-xl p-3 min-h-[120px]"
                    />

                    {/* PRECIO */}
                    <input
                        type="number"
                        value={pack.precio}
                        onChange={(e) =>
                            setPack({
                                ...pack,
                                precio: Number(e.target.value)
                            })
                        }
                        placeholder="Precio"
                        className="w-full border rounded-xl p-3"
                    />

                    {/* ACTIVO */}
                    <div className="flex items-center justify-between">

                        <span className="font-medium text-gray-700">
                            Paquete activo
                        </span>

                        <button
                            onClick={() =>
                                setPack({
                                    ...pack,
                                    activo: !pack.activo
                                })
                            }
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${pack.activo
                                ? "bg-orange-500"
                                : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${pack.activo
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                    }`}
                            />
                        </button>

                    </div>

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-xl"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onSave}
                        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                    >
                        Guardar
                    </button>

                </div>

            </div>
        </div>
    );
};