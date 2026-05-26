import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const GestionConfiguracion: React.FC = () => {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    status: "success" | "error";
    text: string;
  } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
          setWhatsappNumber(data.whatsappNumber);
        }
      } catch (err) {
        console.error("Error cargando configuración", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, API_URL]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          whatsappNumber,
          ...(password ? { password } : {}),
        }),
      });

      if (res.ok) {
        setMessage({
          status: "success",
          text: "Configuración guardada y actualizada correctamente.",
        });
        setPassword(""); // Limpiar input de contraseña
      } else {
        setMessage({
          status: "error",
          text: "Hubo un problema al guardar los cambios en el servidor.",
        });
      }
    } catch (err) {
      setMessage({
        status: "error",
        text: `Error de conexión con el servidor: ${err}`,
      });
    } finally {
      setSaving(false);
    }
  };

  // 🔄 PANTALLA DE CARGA PROFESIONAL (SPINNER INTEGRADO)
  if (loading) {
    return (
      <div className="max-w-2xl bg-white p-12 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
        <svg
          className="animate-spin h-8 w-8 text-orange-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="text-sm font-semibold text-slate-500">
          Obteniendo configuraciones del sistema...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
      {/* HEADER DE LA PÁGINA */}
      <div className="p-6 sm:p-8 bg-slate-50/60 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900">
          Configuración General
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Ajusta las credenciales de acceso de la cuenta y define a dónde
          llegarán los mensajes de confirmación de las reservas.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* BANNER DE RETROALIMENTACIÓN DINÁMICO */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 border flex items-start gap-3 animate-shake text-xs sm:text-sm ${
              message.status === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {/* Iconos vectoriales según el estatus */}
            {message.status === "success" ? (
              <svg
                className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-rose-600 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <div className="flex-1 font-semibold">{message.text}</div>
            <button
              type="button"
              onClick={() => setMessage(null)}
              className={`text-xs font-bold px-1.5 py-0.5 rounded transition-colors ${
                message.status === "success"
                  ? "hover:bg-emerald-100 text-emerald-700"
                  : "hover:bg-rose-100 text-rose-700"
              }`}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* SECCIÓN 1: ACCESO Y SEGURIDAD */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">
              Seguridad y Cuenta
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Correo del Administrador
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 font-medium text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 font-medium text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white placeholder:text-slate-300"
                />
                <p className="text-[10px] text-slate-400 font-medium pl-1">
                  Dejar vacío para conservar la contraseña actual.
                </p>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: INTEGRACIONES / NOTIFICACIONES */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">
              Canales de Venta e Integraciones
            </h3>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                WhatsApp de Recepción de Pedidos
              </label>

              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-emerald-600 text-sm font-bold">💬</span>
                </div>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Ej: 526624509876"
                  className="w-full border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-sm font-bold text-slate-800 bg-slate-50/50 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 focus:bg-white placeholder:text-slate-400"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed pl-1 font-medium">
                Inserta la clave internacional completa sin espacios ni el
                símbolo <span className="font-bold text-slate-500">+</span> (Ej:
                Código de México:{" "}
                <span className="text-slate-600 font-semibold">52</span> seguido
                de los 10 dígitos locales).
              </p>
            </div>
          </div>

          {/* ACCIÓN DE ENVÍO */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm shadow-orange-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Guardando...
                </>
              ) : (
                "Guardar Configuración"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
