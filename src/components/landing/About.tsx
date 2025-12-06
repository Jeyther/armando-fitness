import { CheckCircle2, User, Trophy, Clock } from 'lucide-react';

export default function About() {
  const features = [
    {
      name: 'Experiencia Comprobada',
      description: 'Más de 10 años ayudando a personas a transformar sus vidas a través del fitness.',
      icon: Trophy,
    },
    {
      name: 'Atención Personalizada',
      description: 'Cada cuerpo es único. Tu plan se adapta 100% a tus necesidades y objetivos.',
      icon: User,
    },
    {
      name: 'Flexibilidad Total',
      description: 'Horarios adaptables a tu ritmo de vida. Entrena cuando mejor te convenga.',
      icon: Clock,
    },
  ];

  return (
    <div className="py-24 bg-gray-50 dark:bg-zinc-800/50 transition-colors sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Sobre Mí</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Más que un entrenador, tu compañero de metas
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Soy Armando, entrenador certificado con pasión por el bienestar integral. Mi metodología combina 
            entrenamiento funcional, fuerza y hábitos saludables para resultados sostenibles.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                <div className="rounded-lg bg-primary-100 dark:bg-primary-900/30 p-2 ring-1 ring-primary-50 dark:ring-primary-900/10">
                  <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {feature.name}
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </dt>
                <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
