import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import OrganizationDialog from './components/OrganizationDialog';
import Dashboard from './components/Dashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import AccountDeletion from './components/AccountDeletion';

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

  // Define a protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // Check if user is authenticated (you'll need to implement this logic)
    const isAuthenticated = currentState === 'dashboard';
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/delete-account" element={<AccountDeletion />} />

        {/* Main app flow routes */}
        <Route
          path="/"
          element={
            currentState === 'welcome' ? (
              <WelcomePage onGetStarted={handleGetStarted} />
            ) : currentState === 'auth' ? (
              <AuthPage onBack={handleBackToWelcome} onEmailSubmit={handleEmailSubmit} />
            ) : currentState === 'organization' ? (
              <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <OrganizationDialog
                  userEmail={userEmail}
                  onOrganizationSelected={handleOrganizationSelected}
                />
              </div>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard userEmail={userEmail} />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;