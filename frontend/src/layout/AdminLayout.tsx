import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 bg-gray-100 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};