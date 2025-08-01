import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import OrganizationDialog from './components/OrganizationDialog';
import Dashboard from './components/Dashboard';

type AppState = 'welcome' | 'auth' | 'organization' | 'dashboard';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [userEmail, setUserEmail] = useState('');

  const handleGetStarted = () => {
    setCurrentState('auth');
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentState('organization');
  };

  const handleOrganizationSelected = (orgId: string) => {
    setCurrentState('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentState('welcome');
    setUserEmail('');
  };

  if (currentState === 'welcome') {
    return <WelcomePage onGetStarted={handleGetStarted} />;
  }

  if (currentState === 'auth') {
    return <AuthPage onBack={handleBackToWelcome} onEmailSubmit={handleEmailSubmit} />;
  }

  if (currentState === 'organization') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <OrganizationDialog 
          userEmail={userEmail} 
          onOrganizationSelected={handleOrganizationSelected} 
        />
      </div>
    );
  }

  return <Dashboard userEmail={userEmail} />;
}

export default App;