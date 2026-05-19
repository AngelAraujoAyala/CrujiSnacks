import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AdminLayout } from "../layout/AdminLayout";

import { GestionToppings } from "../features/inventario/components/GestionToppings";

export const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/admin" element={<AdminLayout />}>

                    <Route
                        path="toppings"
                        element={<GestionToppings />}
                    />

                    <Route
                        path="paquetes"
                        element={<h1>Paquetes</h1>}
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