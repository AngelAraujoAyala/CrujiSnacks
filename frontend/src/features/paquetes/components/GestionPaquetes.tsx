import { useEffect, useState } from "react";

import crujiApi from "../../../services/crujiApi";

import type { Paquete } from "../../../interfaces/paquete.ts";

import { PaquetesCard } from "./PaquetesCard";
import { PaquetesModal } from "./PaquetesModal";

export const GestionPaquetes = () => {

    const [paquetes, setPaquetes] = useState<Paquete[]>([]);

    const [selectedPaquete, setSelectedPaquete] =
        useState<Paquete | undefined>();

    const [isCreating, setIsCreating] =
        useState(false);

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {

        try {

            const { data } =
                await crujiApi.get<Paquete[]>("/packages");

            setPaquetes(
                data.map((pack) => ({
                    ...pack,
                    precio: Number(pack.precio),
                }))
            );

        } catch (error) {
            console.error(error);
        }
    };

    const saveChanges = async () => {

        if (!selectedPaquete) return;

        try {

            const payload = {
                nombre: selectedPaquete.nombre,
                descripcion: selectedPaquete.descripcion ?? "",
                precio: selectedPaquete.precio,
                activo: selectedPaquete.activo,
            };

            // CREAR
            if (isCreating) {

                await crujiApi.post(
                    "/packages",
                    payload
                );

            }

            // EDITAR
            else {

                await crujiApi.patch(
                    `/packages/${selectedPaquete.id}`,
                    payload
                );
            }

            loadPackages();

            setSelectedPaquete(null);

            setIsCreating(false);

        } catch (error) {

            console.error(error);

            alert("Error guardando paquete");
        }
    };

    const deletePaquete = async (id: number) => {

        const confirmDelete = confirm("¿Eliminar paquete?");

        if (!confirmDelete) return;

        try {

            await crujiApi.delete(`/packages/${id}`);

            loadPackages();

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
                        Gestión de Paquetes
                    </h1>

                    <p className="text-gray-500">
                        Administra los paquetes disponibles
                    </p>

                </div>

                <button
                    onClick={() => {

                        setSelectedPaquete({
                            nombre: "",
                            descripcion: "",
                            precio: 0,
                            activo: true,
                        } as Paquete);

                        setIsCreating(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl"
                >
                    + Nuevo Paquete
                </button>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {paquetes.map((pack) => (

                    <PaquetesCard
                        key={pack.id}
                        pack={pack}
                        onEdit={(pack) =>
                            setSelectedPaquete({
                                ...pack,
                                precio: Number(pack.precio),
                            })
                        }
                        onDelete={deletePaquete}
                    />

                ))}

            </div>

            {/* MODAL */}
            {selectedPaquete && (

                <PaquetesModal
                    pack={selectedPaquete}
                    setPack={setSelectedPaquete}
                    onClose={() => {
                        setSelectedPaquete(null);
                        setIsCreating(false);
                    }}
                    onSave={saveChanges}
                    isCreating={isCreating}
                />

            )}

        </div>
    );
};