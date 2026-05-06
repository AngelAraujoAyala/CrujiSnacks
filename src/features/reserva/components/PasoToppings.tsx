import React from 'react';
import { Alert } from '../../../components/ui/Alert';

interface Props {
    selectedToppings: string[];
    onChange: (toppings: string[]) => void;
}

const TOPPINGS_DISPONIBLES = [
    { id: 'chips', label: 'Chips de Fuego', icon: '🔥' },
    { id: 'gomitas', label: 'Gomitas Enchiladas', icon: '🍬' },
    { id: 'salsas', label: 'Mix de Salsas', icon: '🌶️' },
    { id: 'cacahuates', label: 'Cacahuates Japoneses', icon: '🥜' },
    { id: 'fruta', label: 'Fruta Picada', icon: '🥭' },
    { id: '1', label: 'Personalizado', icon: '👑' },
    { id: '2', label: 'Personalizado', icon: '👑' },
    { id: '3', label: 'Personalizado', icon: '👑' },
    { id: '4', label: 'Personalizado', icon: '👑' },
    { id: '5', label: 'Personalizado', icon: '👑' },
    { id: '6', label: 'Personalizado', icon: '👑' },
    { id: '7', label: 'Personalizado', icon: '👑' },
    { id: '8', label: 'Personalizado', icon: '👑' },
    { id: '9', label: 'Personalizado', icon: '👑' },
    { id: '10', label: 'Personalizado', icon: '👑' },
    { id: '11', label: 'Personalizado', icon: '👑' },
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


                    return (
                        <button
                            key={topping.id}
                            onClick={() => handleToggle(topping.id)}
                            disabled={reachedLimit && !isSelected}
                            type="button"
                            className={`
                relative p-4 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200
                ${isSelected
                                    ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                                    : 'border-gray-100 bg-white hover:border-gray-300'}
              `}
                        >
                            <span className="text-3xl mb-2">{topping.icon}</span>
                            <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-600'}`}>
                                {topping.label}
                            </span>

                            {/* Checkmark visual */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1">
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