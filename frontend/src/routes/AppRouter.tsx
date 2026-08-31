import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AdminLayout } from "../layout/AdminLayout";
import { GestionToppings } from "../features/inventario";
import { FormularioReserva } from '../features/reserva';
import { GestionPaquetes } from "../features/paquetes";
import { GestionReservas } from "../features/reservas";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { LoginPage } from "../features/auth/components/LoginPage";
import { GestionConfiguracion } from "../features/auth/components/GestionConfiguracion";
import { LandingPage } from "../pages/LandingPage";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/reserva" element={<FormularioReserva />} />
                <Route path="/landing" element={<LandingPage />} />
                
                <Route path="/" element={<Navigate to="/landing" replace />} />

                <Route path="/admin/login" element={<LoginPage />} />

                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
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
                        element={<GestionReservas />}
                    />

                    <Route
                        path="configuracion"
                        element={<GestionConfiguracion />}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/reserva" replace />} />
            </Routes>
        </BrowserRouter>
    );
};