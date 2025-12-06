import { Check, Dumbbell } from "lucide-react";
import { plans } from "../../data/mockData";
import workoutBg from "../../assets/workout.png"; // Assuming this is the action shot

export default function Plans() {
  const handleWhatsApp = (planName: string) => {
    const message = encodeURIComponent(
      `Hola Armando, me interesa el plan ${planName}. ¿Me das más información?`
    );
    window.open(`https://wa.me/15551234567?text=${message}`, "_blank");
  };

  return (
    <div className="py-24 sm:py-32 relative isolate overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={workoutBg}
          alt="Workout Background"
          className="w-full h-full object-cover opacity-5 dark:opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-zinc-950 dark:via-transparent dark:to-zinc-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-500 uppercase tracking-widest">
            Inversión
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Planes diseñados para <br />
            <span className="text-primary-600 dark:text-primary-500">
              resultados reales
            </span>
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Elige el nivel de compromiso que se adapte a ti. Sin contratos
            ocultos.
          </p>
        </div>

        <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 xl:p-10 transition-all duration-300 ${
                plan.isPopular
                  ? "z-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl ring-1 ring-primary-600 dark:ring-primary-500 scale-105 lg:scale-110"
                  : "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-3xl shadow-lg ring-1 ring-gray-200 dark:ring-zinc-800 lg:my-8"
              } ${planIdx === 0 ? "lg:rounded-r-none lg:mr-[-20px]" : ""} ${
                planIdx === plans.length - 1
                  ? "lg:rounded-l-none lg:ml-[-20px]"
                  : ""
              } hover:shadow-xl hover:z-20 hover:scale-[1.02] lg:hover:scale-[1.12]`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-3 py-1.5 text-xs font-bold text-white text-center shadow-lg tracking-wide uppercase">
                  Recomendado
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={plan.id}
                    className={`text-xl font-bold leading-8 ${
                      plan.isPopular
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <Dumbbell className="h-6 w-6 text-primary-500" />
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400 min-h-[48px]">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-500 dark:text-gray-500">
                    /mes
                  </span>
                </div>
                <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 py-1 px-2 rounded-lg inline-block">
                  ${(plan.price / plan.classesPerMonth).toFixed(2)} por clase
                </div>
              </div>

              <div>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-start">
                      <Check
                        className={`h-5 w-5 flex-none ${
                          plan.isPopular
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-gray-400"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleWhatsApp(plan.name)}
                  className={`mt-8 block w-full rounded-xl px-3 py-3 text-center text-sm font-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:from-primary-500 hover:to-primary-400"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 ring-1 ring-inset ring-gray-200 dark:ring-zinc-700"
                  }`}
                >
                  Elegir {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
