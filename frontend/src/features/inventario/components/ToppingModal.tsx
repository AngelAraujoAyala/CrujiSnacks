import type { Topping } from "../../../interfaces/topping";
import crujiApi from "../../../services/crujiApi";

interface Props {
    topping: Topping;
    setTopping: (topping: Topping) => void;
    onClose: () => void;
    onSave: () => void;
    isCreating: boolean;
}


export const ToppingModal = ({
    topping,
    setTopping,
    onClose,
    onSave,
    isCreating,
}: Props) => {

    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        try {

            const formData = new FormData();

            formData.append("file", file);

            const { data } = await crujiApi.post(
                "/toppings/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setTopping({
                ...topping,
                iconURL: data.imageUrl,
            });

        } catch (error) {
            console.error(error);
            alert("Error subiendo imagen");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold mb-5">

                    {isCreating
                        ? "Nuevo Topping"
                        : "Editar Topping"}

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
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full border rounded-xl p-3"
                    />
                    {topping.iconURL && (

                        <img
                            src={topping.iconURL}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-xl mt-3"
                        />

                    )}
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