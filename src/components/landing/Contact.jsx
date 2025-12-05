import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="relative isolate bg-white dark:bg-zinc-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Contáctame</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    ¿Listo para empezar tu transformación? Envíame un mensaje y creemos el plan perfecto para ti.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                <div>
                    <h3 className="border-l-4 border-primary-600 pl-6 font-semibold text-gray-900 dark:text-white">WhatsApp</h3>
                    <address className="border-l-4 border-gray-200 dark:border-zinc-800 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> +1 (555) 123-4567</p>
                        <p className="mt-1 text-sm text-gray-500">Respuesta rápida</p>
                    </address>
                </div>
                <div>
                    <h3 className="border-l-4 border-primary-600 pl-6 font-semibold text-gray-900 dark:text-white">Email</h3>
                    <address className="border-l-4 border-gray-200 dark:border-zinc-800 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> contacto@armandofitness.com</p>
                    </address>
                </div>
                <div>
                    <h3 className="border-l-4 border-primary-600 pl-6 font-semibold text-gray-900 dark:text-white">Ubicación</h3>
                    <address className="border-l-4 border-gray-200 dark:border-zinc-800 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-400">
                        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Gimnasio Central</p>
                        <p>Calle Principal 123, Ciudad</p>
                    </address>
                </div>
                <div>
                    <h3 className="border-l-4 border-primary-600 pl-6 font-semibold text-gray-900 dark:text-white">Horario</h3>
                    <address className="border-l-4 border-gray-200 dark:border-zinc-800 pl-6 pt-2 not-italic text-gray-600 dark:text-gray-400">
                        <p>Lunes - Viernes: 6am - 9pm</p>
                        <p>Sábados: 8am - 2pm</p>
                    </address>
                </div>
            </div>
            
            <div className="mt-16 bg-gray-50 dark:bg-zinc-900 rounded-2xl p-8 sm:p-12 lg:flex lg:gap-8 lg:p-16 shadow-lg">
                 <form action="#" method="POST" className="w-full max-w-xl lg:flex-auto">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Nombre</label>
                            <div className="mt-2.5">
                                <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Apellido</label>
                            <div className="mt-2.5">
                                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white" />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Email</label>
                            <div className="mt-2.5">
                                <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white" />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Mensaje</label>
                            <div className="mt-2.5">
                                <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white" defaultValue={""} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors">Enviar Mensaje</button>
                    </div>
                </form>
                 <div className="mt-10 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center italic">
                        "El primer paso es siempre el más difícil. Escríbeme y hagámoslo juntos." - Armando
                    </p>
                 </div>
            </div>
        </div>
    </div>
  );
}
