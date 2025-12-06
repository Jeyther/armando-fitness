import { CheckCircle2, User, Trophy, Clock, Target } from "lucide-react";
import trainerImg from "../../assets/trainer.png";

export default function About() {
  const features = [
    {
      name: "Experiencia Comprobada",
      description:
        "Más de 10 años en la industria del fitness, transformando vidas con métodos científicos.",
      icon: Trophy,
    },
    {
      name: "Enfoque Personalizado",
      description:
        "Programas diseñados específicamente para tu tipo de cuerpo y metas personales.",
      icon: User,
    },
    {
      name: "Disponibilidad Flexible",
      description:
        "Agenda tus sesiones fácilmente a través de nuestra plataforma digital.",
      icon: Clock,
    },
    {
      name: "Resultados Garantizados",
      description:
        "Seguimiento constante y ajustes periódicos para asegurar tu progreso.",
      icon: Target,
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-zinc-950 transition-colors overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-fade-in-up">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-green-400 rounded-2xl opacity-30 blur-2xl -z-10 animate-float" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800">
              <img
                src={trainerImg}
                alt="Armando - Entrenador Personal"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-bold text-xl">
                  Luis Armando Incio
                </p>
                <p className="text-primary-400 text-sm">
                  Head Coach & Fundador
                </p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200">
            <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-500 uppercase tracking-wide">
              Conoce a tu mentor
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Más que un entrenador, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">
                tu aliado estratégico
              </span>
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Mi misión no es solo que te veas bien, sino que te sientas
              invencible. A través de una combinación de entrenamiento funcional
              y nutrición inteligente, te ayudaré a romper tus propios límites.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 ring-1 ring-primary-500/20">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <dt className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                      {feature.name}
                    </dt>
                    <dd className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </dd>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-l-4 border-l-primary-500 border-gray-100 dark:border-zinc-800">
              <p className="italic text-gray-600 dark:text-gray-400">
                "La disciplina es el puente entre tus metas y tus logros. Estoy
                aquí para asegurarme de que cruces ese puente."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
