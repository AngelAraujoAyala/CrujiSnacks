import { useEffect, useState } from "react";

import crujiApi from "../../../services/crujiApi";

import type { Topping } from "../../../interfaces/topping";

import { ToppingCard } from "./ToppingCard";
import { ToppingModal } from "./ToppingModal";

export const GestionToppings = () => {

    const [toppings, setToppings] = useState<Topping[]>([]);
    const [selectedTopping, setSelectedTopping] =
        useState<Topping | null>(null);

    useEffect(() => {
        loadToppings();
    }, []);

    const loadToppings = async () => {
        try {
            const { data } =
                await crujiApi.get<Topping[]>("/toppings");

            setToppings(data);

        } catch (error) {
            console.error(error);
        }
    };

    const toggleStock = async (
        id: number,
        currentStock: boolean
    ) => {
        try {

            setToppings(prev =>
                prev.map(t =>
                    t.id === id
                        ? { ...t, stock: !currentStock }
                        : t
                )
            );

            await crujiApi.patch(`/toppings/${id}`, {
                stock: !currentStock
            });

        } catch (error) {
            loadToppings();
        }
    };

    const saveChanges = async () => {

        if (!selectedTopping) return;

        try {

            await crujiApi.put(
                `/toppings/${selectedTopping.id}`,
                selectedTopping
            );

            setSelectedTopping(null);

            loadToppings();

        } catch (error) {
            console.error(error);
        }
    };

    const deleteTopping = async (id: number) => {

        const confirmDelete =
            confirm("¿Eliminar topping?");

        if (!confirmDelete) return;

        try {

            await crujiApi.delete(`/toppings/${id}`);

            loadToppings();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Gestión de Toppings
                    </h1>

                    <p className="text-gray-500">
                        Administra el inventario
                    </p>
                </div>

                <button className="bg-orange-500 text-white px-5 py-3 rounded-xl">
                    + Nuevo Topping
                </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {toppings.map((topping) => (

                    <ToppingCard
                        key={topping.id}
                        topping={topping}
                        onEdit={setSelectedTopping}
                        onDelete={deleteTopping}
                        onToggleStock={toggleStock}
                    />

                ))}

            </div>

            {/* MODAL */}
            {selectedTopping && (

                <ToppingModal
                    topping={selectedTopping}
                    setTopping={setSelectedTopping}
                    onClose={() => setSelectedTopping(null)}
                    onSave={saveChanges}
                />

            )}

        </div>
    );
};