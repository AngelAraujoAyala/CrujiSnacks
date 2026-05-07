import { type AlertProps } from "../../interfaces/alertProps";

export const Alert = ({ mensaje, tipo = 'error' }: AlertProps) => {
    const estilos = {
        error: "bg-red-50 border-red-500 text-red-700",
        success: "bg-green-50 border-green-500 text-green-700",
        warning: "bg-yellow-50 border-yellow-500 text-yellow-700"
    };

    return (
        <div className={`mb-4 mt-3 p-3 border-l-4 rounded-r-xl flex items-center gap-2 animate-bounce ${estilos[tipo]}`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{mensaje}</p>
        </div>
    );
};