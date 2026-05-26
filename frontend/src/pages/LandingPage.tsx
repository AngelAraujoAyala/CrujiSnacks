import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const crujiPhotos = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % crujiPhotos.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [crujiPhotos.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      <nav className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tight text-orange-500">
              Cruji<span className="text-yellow-400">Snacks</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/reservar")}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm"
          >
            Reservar Ahora
          </button>
        </div>
      </nav>
      <section className="relative overflow-hidden py-20 lg:py-20 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
              ✨ Snack-Bar para Eventos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Crujientes, personalizados y <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-600">
                listos para tu evento
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Lleva la experiencia de CrujiSnacks a tus fiestas y reuniones.
              Diseña tu barra de snacks ideal, elige tus toppings favoritos y
              reserva tu fecha en menos de 2 minutos.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/reservar")}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold tracking-wide shadow-lg shadow-orange-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Comenzar mi Reserva
              </button>
              <a
                href="#como-funciona"
                className="w-full sm:w-auto text-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-200"
              >
                ¿Cómo funciona?
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div
              className="w-full max-w-[400px] aspect-square rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 transition-all duration-1000 ease-in-out bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0) 50%, rgba(15, 23, 42, 0.2)), url(${crujiPhotos[currentPhotoIndex]})`,
              }}
            >
              <div className="relative z-10 space-y-2">
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  CrujiBox
                </div>
                <div className="h-1.5 w-16 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all ease-linear"
                    style={{
                      width: `${((currentPhotoIndex + 1) / crujiPhotos.length) * 100}%`,
                      transitionDuration: "2000ms",
                    }}
                  />
                </div>
              </div>

              <div className="relative z-10 space-y-2 text-white/90">
                <p className="text-sm font-medium">Personalización total:</p>
                <p className="text-xs leading-relaxed opacity-90">
                  Papas, dulces, cacahuates, verduras y nuestra variedad de
                  salsas.
                </p>
              </div>
            </div>

            <div className="absolute inset-0 bg-orange-200 rounded-3xl blur-3xl opacity-30 transform translate-y-4 scale-95"></div>
          </div>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <span className="text-yellow-400">La</span>{" "}
            <span className="text-orange-500">Cruji</span>
            <span className="text-yellow-400">-Experiencia</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Nuestro propósito es que cada uno de tus eventos esté acompañado de
            una barra de snacks irresistible, diseñada para sorprender a tus
            invitados y hacer de tu día una experiencia espectacular.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              🎯
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              A tu Medida
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tú eliges la base, los toppings y el nivel de picor. Una barra
              pensada por y para tus invitados.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              🧼
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Calidad e Higiene
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ingredientes frescos, empaques perfectamente sellados y estaciones
              sanitizadas para tu total tranquilidad.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Reserva Instantánea
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Olvídate de esperar horas por una cotización. Elige tu paquete en
              nuestro sistema y agenda de inmediato.
            </p>
          </div>
        </div>
      </section>
      <section
        id="como-funciona"
        className="py-20 bg-slate-100/60 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pide tu Barra en 3 Pasos
            </h2>
            <p className="mt-4 text-slate-600">
              Diseñado para ser rápido, intuitivo y sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="relative space-y-4">
              <div className="text-6xl font-black text-orange-300">01</div>
              <h3 className="text-xl font-bold text-slate-900">
                Ingresa los Datos
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dinos la fecha, hora y lugar de tu evento. El sistema validará
                la disponibilidad automáticamente.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="text-6xl font-black text-orange-300">02</div>
              <h3 className="text-xl font-bold text-slate-900">
                Arma tu Paquete
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Selecciona el tamaño del evento, la base de tus snacks y la
                variedad de toppings que deseas incluir.
              </p>
            </div>

            <div className="relative space-y-4">
              <div className="text-6xl font-black text-orange-300">03</div>
              <h3 className="text-xl font-bold text-slate-900">
                Confirma en WhatsApp
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Al finalizar, se generará un resumen detallado y te
                redirigiremos para asegurar tu lugar con un solo clic.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl"></div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              ¿Listo para hacer tu evento inolvidable?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
              No dejes tu mesa de snacks para el final. Asegura la fecha hoy
              mismo desde nuestro cotizador interactivo.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/reservar")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all duration-200"
              >
                Iniciar Cotización Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="relative bg-slate-950 text-slate-200 py-16 overflow-hidden border-t border-slate-800/60">
        <div
          className="absolute top-0 left-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"
          style={{ animationDuration: "12s" }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div className="space-y-3 group">
            <div className="text-2xl font-black tracking-tight text-orange-500 flex items-center justify-center md:justify-start gap-2">
              <span className="inline-block group-hover:animate-bounce">
                Cruji<span className="text-yellow-400">Snacks</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Haciendo tus eventos más crujientes y deliciosos. <br />
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          {/* Columna 2: Información de Contacto con Efecto Hover */}
          <div className="text-sm space-y-2 md:text-center">
            <p className="font-bold tracking-widest uppercase text-xs mb-3 bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Contacto Directo
            </p>
            <div className="overflow-hidden py-0.5">
              <a
                href="mailto:luciauribe999@gmail.com"
                className="relative inline-block hover:text-orange-400 transition-colors duration-300 font-medium group text-slate-300"
              >
                luciauribe999@gmail.com
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="overflow-hidden py-0.5">
              <a
                href="tel:+526624509876"
                className="relative inline-block hover:text-orange-400 transition-colors duration-300 font-medium group text-slate-300"
              >
                +52 (662) 450-9876
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end space-x-5">
            <a
              href="https://instagram.com/snacks_en_tu_evento/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-900/80 hover:bg-orange-500 text-slate-400 hover:text-white rounded-2xl transition-all duration-300 border border-slate-800 hover:border-orange-400 hover:-translate-y-1.5 hover:rotate-6 shadow-lg hover:shadow-orange-500/20"
              aria-label="Instagram de CrujiSnacks"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
            </a>

            <a
              href="https://facebook.com/profile.php?id=61588499993441"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-900/80 hover:bg-orange-500 text-slate-400 hover:text-white rounded-2xl transition-all duration-300 border border-slate-800 hover:border-orange-400 hover:-translate-y-1.5 hover:-rotate-6 shadow-lg hover:shadow-orange-500/20"
              aria-label="Facebook de CrujiSnacks"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
