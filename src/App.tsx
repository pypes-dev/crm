import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import OrganizationDialog from './components/OrganizationDialog';
import Dashboard from './components/Dashboard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import AccountDeletion from './components/AccountDeletion';
import { useAuth } from './hooks/useAuth';
import * as Sentry from '@sentry/capacitor';
import * as SentryReact from '@sentry/react';


Sentry.init({
  dsn: "https://35ae37a436876f1f2e8bb489c6f0bae6@o4507778758934528.ingest.us.sentry.io/4507778764177408",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
},
  // Forward the init method from @sentry/react
  SentryReact.init
);

function App() {
  const { user, loading: authLoading } = useAuth();
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/delete-account" element={<AccountDeletion />} />
        {/* Main app flow routes */}
        <Route path="/" element={user ? <Dashboard /> : <WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/org-check" element={<OrganizationDialog />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;