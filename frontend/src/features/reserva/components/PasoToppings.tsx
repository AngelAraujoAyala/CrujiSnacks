import React from 'react';
import { Alert } from '../../../components/ui/Alert';

interface Props {
    selectedToppings: string[];
    onChange: (toppings: string[]) => void;
}

export const TOPPINGS_DISPONIBLES = [
    { id: 'ruffles', label: 'Ruffles', icon: '/toppings/ruffles_icon.png', disponible: true },
    { id: 'tostitosFlamingHot', label: 'Tostitos Flaming Hot', icon: '/toppings/tostitos_flaming_hot_icon.png', disponible: true },
    { id: 'tostitosSalsaVerde', label: 'Tostitos Salsa Verde', icon: '/toppings/tostitos_icon.png' },
    { id: 'takisFuego', label: 'Takis Fuego', icon: '/toppings/takis_icon.png' },
    { id: 'doritosNachos', label: 'Doritos Nachos', icon: '/toppings/doritos_icon.png' },
    { id: 'chipsJalapeño', label: 'Chips Jalapeño', icon: '/toppings/chips_jalapeño_icon.png' },
    { id: 'cheetosTorciditos', label: 'Cheetos Torciditos', icon: '/toppings/cheetos_torciditos_icon.png' },
    { id: 'cheetosFlamingHot', label: 'Cheetos Flaming Hot', icon: '/toppings/cheetos_flaming_hot_icon.png' },
    { id: 'bastonChile', label: 'Baston de Chile', icon: '/toppings/baston_chile_icon.png' },
    { id: 'cacahuatesJaponeses', label: 'Cacahuates Japoneses', icon: '/toppings/cacahuates_japoneses_icon.png' },
    { id: 'cacahuatesEnchilados', label: 'Cacahuates Enchilados', icon: '/toppings/cacahuates_enchilados_icon.png' },
    { id: 'gomitasAritos', label: 'Gomitas Aritos', icon: '/toppings/gomitas_aritos_icon.png' },
    { id: 'gomitasGusanitos', label: 'Gomitas Gusanitos', icon: '/toppings/gomitas_gusanito_icon.png' },
    { id: 'gomitasTiburones', label: 'Gomitas Tiburones', icon: '/toppings/gomitas_tiburon_icon.png' },
    { id: 'jicama', label: 'Jicama', icon: '/toppings/jicama_icon.png' },
    { id: 'pepino', label: 'Pepino', icon: '/toppings/pepino_icon.png' },
    { id: 'picaFresas', label: 'Pica Fresas', icon: '/toppings/picafresas_icon.png' },
    { id: 'pinia', label: 'Piña', icon: '/toppings/pinia_icon.png' },
    { id: 'realitos', label: 'Realitos', icon: '/toppings/realitos_icon.png' },
    { id: 'sandia', label: 'Sandia', icon: '/toppings/sandia_icon.png' },
];


const PasoToppings: React.FC<Props> = ({ selectedToppings, onChange }) => {
    const MAX_TOPPINGS = 10;

    const handleToggle = (toppingId: string) => {
        const isSelected = selectedToppings.includes(toppingId);

        if (isSelected) {
            // Siempre permitimos quitar uno que ya esté seleccionado
            onChange(selectedToppings.filter(id => id !== toppingId));
        } else {
            // Solo permitimos agregar si no se ha alcanzado el límite
            if (selectedToppings.length < MAX_TOPPINGS) {
                onChange([...selectedToppings, toppingId]);
            } else {
                // Aquí podrías disparar una notificación o alerta
                console.warn("Límite de toppings alcanzado");
            }
        }
    };

    return (
        <div className="space-y-4">

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personaliza tu paquete</h2>
                <p className="text-gray-500 text-sm">Selecciona los 10 toppings que gustes</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {TOPPINGS_DISPONIBLES.map((topping) => {
                    const isSelected = selectedToppings.includes(topping.id);
                    const reachedLimit = selectedToppings.length >= MAX_TOPPINGS;

                    // Lógica para decidir qué mostrar como icono
                    const renderIcon = () => {
                        if (topping.icon.startsWith('/') || topping.icon.startsWith('http')) {
                            return (
                                <img
                                    src={topping.icon}
                                    alt={topping.label}
                                    className="w-12 h-12 mb-2 object-contain"
                                />
                            );
                        }
                        return <span className="text-3xl mb-2">{topping.icon}</span>;
                    };

                    return (
                        <button
                            key={topping.id}
                            onClick={() => handleToggle(topping.id)}
                            disabled={reachedLimit && !isSelected}
                            type="button"
                            className={`
                relative p-4 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200 min-h-[120px]
                ${isSelected
                                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' // Cambié a naranja para matchear tu header
                                    : 'border-gray-100 bg-white hover:border-gray-300'}
                ${reachedLimit && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
                        >
                            {renderIcon()}

                            <span className={`text-sm font-medium text-center ${isSelected ? 'text-orange-900' : 'text-gray-600'}`}>
                                {topping.label}
                            </span>

                            {/* Checkmark */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            <span className={`text-sm font-bold mt-1 mb-2 ${selectedToppings.length >= MAX_TOPPINGS ? 'text-green-500' : 'text-gray-500'}`}>
                Topping seleccionados: {selectedToppings.length} / {MAX_TOPPINGS}
            </span>
            {selectedToppings.length === MAX_TOPPINGS && (
                <Alert mensaje={`Has alcanzado el máximo de ${MAX_TOPPINGS} toppings permitidos.`} tipo="success" />
            )}
        </div>
    );
};

export default PasoToppings;