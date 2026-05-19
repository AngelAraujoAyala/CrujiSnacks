import type { Paquete } from "../../../interfaces/paquete.ts";

interface Props {
    pack: Paquete;
    onEdit: (pack: Paquete) => void;
    onDelete: (id: number) => void;

}

export const PaquetesCard = ({
    pack,
    onEdit,
    onDelete
}: Props) => {

    return (
        <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        📦 {pack.nombre}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {pack.descripcion}
                    </p>

                </div>

                <span
                    className={`inline-flex items-center gap-1 px-6 py-0 rounded-full text-xs font-semibold ${pack.activo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {pack.activo ? (
                        <>
                            {/* Ícono de Palomita (Check) */}
                            <svg className="w-6 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        </>
                    ) : (
                        <>
                            {/* Ícono de Equis (X) */}
                            <svg className="w-6 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </>
                    )}
                </span>

            </div>

            <div className="mt-5 flex justify-between items-center">

                <p className="text-2xl font-bold text-orange-500">
                    ${pack.precio}
                </p>

                <button
                    onClick={() => onEdit(pack)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                >
                    Editar
                </button>

                <button
                    onClick={() => onDelete(pack.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                    Eliminar
                </button>

            </div>
        </div>
    );
};