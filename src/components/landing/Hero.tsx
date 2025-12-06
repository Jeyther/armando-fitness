import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      const plansSection = document.getElementById('plans');
      plansSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative isolate pt-14 dark:bg-zinc-900 transition-colors">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white transition-colors">
              Tu mejor versión empieza <span className="text-primary-600 dark:text-primary-500">aquí y ahora</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 transition-colors">
              Entrenamiento personalizado, nutrición adaptada y el apoyo que necesitas para alcanzar tus metas. 
              Únete a la comunidad de Armando Fitness.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 hover:bg-primary-500 hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                {user ? 'Ir a mi Panel' : 'Empezar ahora'}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Saber más <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
