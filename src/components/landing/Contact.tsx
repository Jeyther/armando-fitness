import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hola, soy ${formData.name} (${formData.email}). \n\n${formData.message}`);
    window.open(`https://wa.me/15551234567?text=${message}`, '_blank');
  };

  return (
    <div className="relative isolate bg-white dark:bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8 transition-colors">
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Contáctame</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400 text-center">
          ¿Listo para empezar? Escríbeme y diseñemos tu plan ideal.
        </p>
        
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <div className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="flex gap-x-4 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                  <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Teléfono</h3>
                  <p className="leading-7 text-gray-600 dark:text-gray-400">+1 555 123 4567</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Email</h3>
                  <p className="leading-7 text-gray-600 dark:text-gray-400">info@armandofitness.com</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600">
                  <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Ubicación</h3>
                  <p className="leading-7 text-gray-600 dark:text-gray-400">Centro Deportivo Principal, Ciudad</p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Nombre</label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:ring-zinc-800 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Email</label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:ring-zinc-800 dark:text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">Mensaje</label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-900 dark:ring-zinc-800 dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center justify-center gap-2"
              >
                Enviar mensaje
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
