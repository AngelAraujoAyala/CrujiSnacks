import { Calendar, Clock, MapPin, MessageCircle, Package, User } from 'lucide-react';
import type { Reserva } from '../../../interfaces/reserva';
import { TOPPINGS_DISPONIBLES } from './PasoToppings';

interface Props {
    datos: Reserva;
    onBack: () => void;
    onConfirm: () => void;
}

export const getToppingLabel = (id: string) => {
    const topping = TOPPINGS_DISPONIBLES.find(t => t.id === id);
    return topping ? topping.label : id; // Si no lo encuentra, muestra el id por si acaso
};

const ConfirmarReserva: React.FC<Props> = ({ datos, onBack, onConfirm }) => {

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Verifica tu pedido</h2>
                <p className="text-gray-500">Casi terminamos, confirma que los datos sean correctos.</p>
            </div>

            {/* Tarjeta de Detalles del Evento */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-indigo-600 p-4 text-white">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <span className="font-semibold">Detalles del Evento</span>
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                        <User className="text-indigo-500 mt-1" size={18} />
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Cliente</p>
                            <p className="text-gray-700">{datos.nombreCliente} • {datos.whatsapp}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <Clock className="text-indigo-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Horario</p>
                                <p className="text-gray-700">{datos.hora}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Package className="text-indigo-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Paquete</p>
                                <p className="text-gray-700">{datos.paquete}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 border-t pt-4">
                        <MapPin className="text-indigo-500 mt-1" size={18} />
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ubicación</p>
                            <p className="text-gray-700">{datos.ubicacion}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjeta de Toppings (Los 10 seleccionados) */}
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">✨</span>
                    <h3 className="font-bold text-amber-900 text-sm uppercase tracking-widest">Tus 10 Toppings seleccionados</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {datos.toppings.map((topping, index) => (
                        <span
                            key={index}
                            className="bg-white px-3 py-1 rounded-full text-xs font-medium text-amber-700 border border-amber-200 shadow-sm"
                        >
                            {getToppingLabel(topping)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col gap-3 pt-4">
                <button
                    onClick={onConfirm}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                >
                    <MessageCircle size={20} />
                    Confirmar y Enviar por WhatsApp
                </button>

                <button
                    onClick={onBack}
                    className="w-full bg-white text-gray-500 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Corregir algo
                </button>
            </div>
        </div>
    );
};

export default ConfirmarReserva;