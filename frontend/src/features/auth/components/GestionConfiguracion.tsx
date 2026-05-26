import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const GestionConfiguracion: React.FC = () => {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ status: 'success' | 'error', text: string } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, whatsappNumber, ...(password ? { password } : {}) })
      });

      if (res.ok) {
        setMessage({ status: 'success', text: 'Configuración actualizada correctamente.' });
        setPassword(''); // Limpiar input de contraseña
      } else {
        setMessage({ status: 'error', text: 'Error al actualizar los datos.' });
      }
    } catch (err) {
      setMessage({ status: 'error', text: `Error de conexión con el servidor ${err}.` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-500">Cargando configuraciones...</div>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Configuración General</h2>
      <p className="text-sm text-slate-500 mb-6">Actualiza las credenciales de acceso y el número de destino de las reservas.</p>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${message.status === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo Administrador</label>
          <input 
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nueva Contraseña</label>
          <input 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar en blanco para mantener la actual"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp de Notificaciones</label>
          <input 
            type="text" required value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
            placeholder="Ej: 526624509876"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm"
          />
          <p className="mt-1 text-xs text-slate-400">Incluye el código de país sin el signo + (ej. 52 para México).</p>
        </div>

        <button 
          type="submit" disabled={saving}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

