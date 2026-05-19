import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AdminLayout } from "../layout/AdminLayout";

import { GestionToppings } from "../features/inventario";

import { FormularioReserva } from '../features/reserva'
import { GestionPaquetes } from "../features/paquetes";

export const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/reserva" element={<FormularioReserva />} />

                <Route path="/admin" element={<AdminLayout />}>

                    <Route
                        path="toppings"
                        element={<GestionToppings />}
                    />

                    <Route
                        path="paquetes"
                        element={<GestionPaquetes />}
                    />

                    <Route
                        path="reservas"
                        element={<h1>Reservas</h1>}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
};