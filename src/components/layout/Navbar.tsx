import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, Moon, Sun } from 'lucide-react';
import { useState, MouseEvent } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLandingPage = location.pathname === '/';

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isLandingPage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 dark:bg-zinc-900/90 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Dumbbell className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Armando<span className="text-primary-600 dark:text-primary-500">Fitness</span>
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gray-600 hover:text-primary-600 font-medium dark:text-gray-300 dark:hover:text-primary-400 transition-colors cursor-pointer">Inicio</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-gray-600 hover:text-primary-600 font-medium dark:text-gray-300 dark:hover:text-primary-400 transition-colors cursor-pointer">Sobre Mí</a>
            <a href="#plans" onClick={(e) => handleNavClick(e, 'plans')} className="text-gray-600 hover:text-primary-600 font-medium dark:text-gray-300 dark:hover:text-primary-400 transition-colors cursor-pointer">Planes</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-gray-600 hover:text-primary-600 font-medium dark:text-gray-300 dark:hover:text-primary-400 transition-colors cursor-pointer">Contacto</a>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>

            <Link to="/login" className="px-5 py-2.5 rounded-full bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Iniciar Sesión
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer">Inicio</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer">Sobre Mí</a>
            <a href="#plans" onClick={(e) => handleNavClick(e, 'plans')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer">Planes</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer">Contacto</a>
            <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4 block w-[90%] text-center px-5 py-3 rounded-xl bg-primary-600 text-white font-semibold">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
