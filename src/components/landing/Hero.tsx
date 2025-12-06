import { ArrowRight, PlayCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/hero-bg.png";

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      const plansSection = document.getElementById("plans");
      plansSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative isolate min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Gym Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70 dark:to-black/30 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-start text-left w-full">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="hidden sm:mb-8 sm:flex">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-white/20 hover:ring-primary-500 hover:text-white transition-all glass">
              Transforma tu cuerpo hoy.{" "}
              <a href="#plans" className="font-semibold text-primary-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Ver planes <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-shadow-lg lg:leading-[1.1]">
            Domina tu mente, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-green-500">
              Esculpe tu cuerpo
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-xl text-shadow delay-100 animate-fade-in-up opacity-0">
            Metodología probada para resultados reales. Únete a la élite del
            fitness con planes personalizados que se adaptan a tu estilo de
            vida, no al revés.
          </p>
          <div className="mt-10 flex items-center gap-x-6 delay-200 animate-fade-in-up opacity-0">
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary-600/30 hover:bg-primary-500 hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {user ? "Ir al Panel" : "Comienza Tu Viaje"}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#about"
              className="group text-sm font-semibold leading-6 text-white flex items-center gap-2 hover:text-primary-400 transition-colors"
            >
              <PlayCircle className="h-10 w-10 text-white/80 group-hover:text-primary-500 transition-colors" />
              Ver video demostración
            </a>
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-0 w-full glass border-t border-white/10 dark:border-white/5 py-6 z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-around text-white">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-500">500+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              Clientes Satisfechos
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-500">10+</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              Años Experiencia
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-500">100%</p>
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              Compromiso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
