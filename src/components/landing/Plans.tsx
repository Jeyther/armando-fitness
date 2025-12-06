import { Check } from 'lucide-react';
import { plans } from '../../data/mockData';

export default function Plans() {
  const handleWhatsApp = (planName: string) => {
    const message = encodeURIComponent(`Hola Armando, me interesa el plan ${planName}. ¿Me das más información?`);
    window.open(`https://wa.me/15551234567?text=${message}`, '_blank');
  };

  return (
    <div className="py-24 sm:py-32 dark:bg-zinc-900 transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Precios</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Elige el plan perfecto para ti
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Sin matrícula ni permanencia. Cambia de plan cuando quieras.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-zinc-800 bg-white dark:bg-zinc-900 xl:p-10 transition-all hover:scale-105 ${
                plan.isPopular ? 'lg:z-10 lg:rounded-b-none lg:rounded-t-3xl lg:border-x lg:border-t lg:border-primary-600 dark:lg:border-primary-500 lg:scale-110 shadow-xl' : 'lg:mt-8'
              } ${planIdx === 0 ? 'lg:rounded-r-none' : ''} ${
                planIdx === plans.length - 1 ? 'lg:rounded-l-none' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white text-center shadow-md">
                  Más Popular
                </div>
              )}
              <div className="flex items-center justify-between gap-x-4">
                <h3 id={plan.id} className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/mes</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleWhatsApp(plan.name)}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.isPopular
                    ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30'
                }`}
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
