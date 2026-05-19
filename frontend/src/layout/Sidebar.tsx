import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
            <h1 className="text-2xl font-bold mb-10">
                CrujiSnacks
            </h1>

            <nav className="flex flex-col gap-3">
                <Link
                    to="/admin/toppings"
                    className="p-3 rounded-lg hover:bg-gray-800 transition"
                >
                    🍬 Toppings
                </Link>

                <Link
                    to="/admin/paquetes"
                    className="p-3 rounded-lg hover:bg-gray-800 transition"
                >
                    📦 Paquetes
                </Link>

                <Link
                    to="/admin/reservas"
                    className="p-3 rounded-lg hover:bg-gray-800 transition"
                >
                    📅 Reservas
                </Link>
            </nav>
        </aside>
    );
};