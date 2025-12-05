import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              Armando<span className="text-primary-600 dark:text-primary-500">Fitness</span>
            </span>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-sm">
              Transforma tu cuerpo y mente con entrenamiento personalizado. 
              Planes adaptados a tus objetivos y estilo de vida.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase dark:text-white">Enlaces</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#home" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">Inicio</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">Sobre Mí</a></li>
              <li><a href="#plans" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">Planes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase dark:text-white">Sígueme</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-500">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between dark:border-zinc-800">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Armando Fitness. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
