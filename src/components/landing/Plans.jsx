import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Básico',
    href: '#',
    priceMonthly: 60,
    classes: 6,
    description: 'Perfecto para mantenerte activo y aprender la técnica correcta.',
    features: [
      '6 Clases al mes',
      'Evaluación inicial',
      'Rutina personalizada',
      'Soporte por WhatsApp Lunes-Viernes',
    ],
  },
  {
    name: 'Pro',
    href: '#',
    priceMonthly: 85,
    classes: 9,
    description: 'El equilibrio ideal para ver resultados constantes.',
    features: [
      '9 Clases al mes',
      'Evaluación mensual',
      'Rutina personalizada + Nutrición básica',
      'Soporte por WhatsApp 24/7',
      'Acceso a comunidad exclusiva',
    ],
    highlight: true,
  },
  {
    name: 'Élite',
    href: '#',
    priceMonthly: 110,
    classes: 12,
    description: 'Transformación total con acompañamiento intensivo.',
    features: [
      '12 Clases al mes',
      'Evaluación quincenal',
      'Plan nutricional completo',
      'Soporte prioritario 24/7',
      'Camiseta oficial ArmandoFitness',
      'Descuento en suplementos',
    ],
  },
];

export default function Plans() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Precios</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Elige tu plan de entrenamiento
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-300">
          Sin contratos forzosos. Cancela cuando quieras. Todos los planes incluyen acceso a la app de reservas.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 text-center sm:text-left">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-800 p-8 ring-1 xl:p-10 transition-all hover:scale-105 ${
                tier.highlight
                  ? 'ring-2 ring-primary-600 shadow-xl shadow-primary-600/10 scale-105 z-10'
                  : 'ring-gray-200 dark:ring-zinc-700 shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.name}
                    className={`text-lg font-semibold leading-8 ${tier.highlight ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    {tier.name}
                  </h3>
                  {tier.highlight && (
                    <span className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600 dark:text-primary-400">
                      Más Popular
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/mes</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                aria-describedby={tier.name}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
                    tier.highlight
                    ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/40'
                }`}
              >
                Elegir Plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
