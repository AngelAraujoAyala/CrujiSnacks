import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AdminLayout } from "../layout/AdminLayout";
import { GestionToppings } from "../features/inventario";
import { FormularioReserva } from '../features/reserva';
import { GestionPaquetes } from "../features/paquetes";
import { GestionReservas } from "../features/reservas";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { LoginPage } from "../features/auth/components/LoginPage";

// 1. NUEVO IMPORT: Traemos la vista de configuración
import { GestionConfiguracion } from "../features/auth/components/GestionConfiguracion";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. RUTA PÚBLICA */}
                <Route path="/reserva" element={<FormularioReserva />} />
                
                {/* Redirección opcional: si entran a la raíz "/", los manda a reservar */}
                <Route path="/" element={<Navigate to="/reserva" replace />} />

                {/* 2. RUTA DE ACCESO (Debe estar fuera de la protección) */}
                <Route path="/admin/login" element={<LoginPage />} />

                {/* 3. PANEL ADMINISTRATIVO PROTEGIDO */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Rutas hijas heredan la protección automáticamente */}
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

                    {/* 2. NUEVA RUTA HIJA: Resuelve la URL como /admin/configuracion */}
                    <Route
                        path="configuracion"
                        element={<GestionConfiguracion />}
                    />
                </Route>

                {/* Comodín para manejar páginas 404 o rutas inexistentes */}
                <Route path="*" element={<Navigate to="/reserva" replace />} />
            </Routes>
        </BrowserRouter>
    );
};