import type { Topping } from "../../../interfaces/topping";

interface Props {
    topping: Topping;
    onEdit: (topping: Topping) => void;
    onDelete: (id: number) => void;
    onToggleStock: (id: number, stock: boolean) => void;
}

export const ToppingCard = ({
    topping,
    onEdit,
    onDelete,
    onToggleStock
}: Props) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5">

            {/* HEADER */}
            <div className="flex justify-between items-start">

                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">

                    {topping.iconURL ? (
                        <img
                            src={topping.iconURL}
                            alt={topping.nombre}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl">🍬</span>
                    )}

                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${topping.stock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {topping.stock ? "Disponible" : "Agotado"}
                </span>
            </div>

            {/* INFO */}
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {topping.nombre}
                </h2>

                <p className="text-gray-500">
                    ID: #{topping.id}
                </p>
            </div>

            {/* STOCK */}
            <div className="mt-5 flex items-center justify-between">

                <span className="text-sm text-gray-600">
                    Stock
                </span>

                <button
                    onClick={() =>
                        onToggleStock(
                            topping.id,
                            topping.stock
                        )
                    }
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${topping.stock
                        ? "bg-orange-500"
                        : "bg-gray-300"
                        }`}
                >
                    <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${topping.stock
                            ? "translate-x-6"
                            : "translate-x-1"
                            }`}
                    />
                </button>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex gap-3">

                <button
                    onClick={() => onEdit(topping)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium"
                >
                    Editar
                </button>

                <button
                    onClick={() => onDelete(topping.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium"
                >
                    Eliminar
                </button>

            </div>
        </div>
    );
};