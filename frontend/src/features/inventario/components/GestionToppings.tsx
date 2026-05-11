import { useEffect, useState } from 'react';
import crujiApi from '../../../services/crujiApi';
import type { Topping } from '../../../interfaces/topping';

export const GestionToppings = () => {
    const [toppings, setToppings] = useState<Topping[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadToppings();
    }, []);

    const loadToppings = async () => {
        try {
            const { data } = await crujiApi.get<Topping[]>('/toppings');
            setToppings(data);
        } catch (error) {
            console.error("Error cargando toppings", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStock = async (id: number, currentStock: boolean) => {
        try {
            // Optimistic Update: Cambiamos el estado local antes de la respuesta del servidor
            setToppings(prev => prev.map(t => t.id === id ? { ...t, stock: !currentStock } : t));

            await crujiApi.patch(`/toppings/${id}`, { stock: !currentStock });
        } catch (error) {
            // Revertir en caso de error
            loadToppings();
            alert("No se pudo actualizar el stock");
        }
    };

    if (loading) return <div className="p-10 text-center">Cargando inventario...</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Inventario de Toppings</h1>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    {toppings.length} Productos
                </span>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topping</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {toppings.map((topping) => (
                            <tr key={topping.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 shrink-0 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
                                            {topping.iconURL || '🍬'}
                                        </div>
                                        <div className="ml-4 font-medium text-gray-900">{topping.nombre}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${topping.stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {topping.stock ? 'En Stock' : 'Agotado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => toggleStock(topping.id, topping.stock)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${topping.stock ? 'bg-orange-500' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`${topping.stock ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};