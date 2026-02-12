import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export type UserRole = 'admin' | 'manager' | 'employee';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<UserRole>('admin');

  const handleLogin = (role: UserRole = 'admin') => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {currentView === 'landing' ? (
        <LandingPage onLogin={() => handleLogin('admin')} />
      ) : (
        <Dashboard
          role={userRole}
          setRole={setUserRole}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
