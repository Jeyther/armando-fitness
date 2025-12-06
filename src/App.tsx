import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSchedule from './pages/admin/AdminSchedule';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';

interface RouteGuardProps {
  children: ReactNode;
}

const ClientRoute = ({ children }: RouteGuardProps) => {
  const { user, isClient } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isClient) return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: RouteGuardProps) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

function AppContent() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors">
      {(!user || !isAdmin) && <Navbar />}
      
      <main className={`flex-grow ${(!user || !isAdmin) ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/dashboard" element={
            <ClientRoute><DashboardPage /></ClientRoute>
          } />
          
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute><AdminUsers /></AdminRoute>
          } />
          <Route path="/admin/schedule" element={
            <AdminRoute><AdminSchedule /></AdminRoute>
          } />
        </Routes>
      </main>
      
      {(!user || !isAdmin) && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <BookingProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </BookingProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
