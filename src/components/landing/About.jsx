import { CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16 bg-white dark:bg-black overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Conoce a tu Entrenador
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            Armando es un profesional certificado con más de 10 años de experiencia transformando vidas a través del fitness.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-3xl">
              Más que un entrenador
            </h3>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
              Mi filosofía se basa en el equilibrio. No solo se trata de levantar pesas, sino de construir hábitos saludables que perduren. Trabajo contigo para diseñar un plan que se ajuste a tu vida, no al revés.
            </p>

            <dl className="mt-10 space-y-10">
              {[
                { id: 1, text: 'Planes 100% personalizados y adaptables.' },
                { id: 2, text: 'Seguimiento constante y motivación diaria.' },
                { id: 3, text: 'Enfoque en técnica y prevención de lesiones.' },
              ].map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <CheckCircle className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900 dark:text-white">{item.text}</p>
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <img
              className="relative mx-auto rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5"
              width={490}
              src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80"
              alt="Armando entrenando a cliente"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
