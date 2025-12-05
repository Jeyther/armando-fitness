import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);

    if (result.success) {
      // Redirigir según rol
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Email no encontrado. Prueba con: maria@email.com, carlos@email.com, ana@email.com o armando@armandofitness.com (admin)');
    }
  };

  // Demo credentials
  const demoCredentials = [
    { email: 'maria@email.com', role: 'Cliente (Plan Pro)' },
    { email: 'carlos@email.com', role: 'Cliente (Plan Básico)' },
    { email: 'armando@armandofitness.com', role: 'Administrador' },
  ];

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 text-primary-600 flex justify-center">
            <Dumbbell className="h-12 w-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Gestiona tus clases con Armando Fitness
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-300 mb-2">Credenciales de demostración:</p>
          <div className="space-y-2">
            {demoCredentials.map((cred) => (
              <button
                key={cred.email}
                onClick={() => fillDemo(cred.email)}
                className="w-full text-left px-3 py-2 text-sm bg-white dark:bg-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">{cred.email}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">({cred.role})</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:ring-zinc-700 dark:text-white"
                placeholder="Contraseña (cualquier valor)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
