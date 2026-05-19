import type { Topping } from "../../../interfaces/topping";

interface Props {
    topping: Topping;
    setTopping: (topping: Topping) => void;
    onClose: () => void;
    onSave: () => void;
}

export const ToppingModal = ({
    topping,
    setTopping,
    onClose,
    onSave
}: Props) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold mb-5">
                    Editar Topping
                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        value={topping.nombre}
                        onChange={(e) =>
                            setTopping({
                                ...topping,
                                nombre: e.target.value
                            })
                        }
                        placeholder="Nombre"
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        value={topping.iconURL || ""}
                        onChange={(e) =>
                            setTopping({
                                ...topping,
                                iconURL: e.target.value
                            })
                        }
                        placeholder="Emoji"
                        className="w-full border rounded-xl p-3"
                    />
                </div>

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