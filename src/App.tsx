import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import FreelancerProfile from './pages/FreelancerProfile';
import SignUpPage from './pages/SignUpPage';
import HowItWorksPage from './pages/HowItWorksPage';
import DisputesPage from './pages/DisputesPage';
import { onAuthStateChangedListener } from './auth';
import WalletGuard from './components/WalletGuard';

export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<ProtectedRoute><HowItWorksPage /></ProtectedRoute>} />
          
          {/* Functional Routes - Require Wallet Connection */}
          <Route path="/services" element={<ProtectedRoute><WalletGuard><ServicesPage /></WalletGuard></ProtectedRoute>} />
          <Route path="/services/:category" element={<ProtectedRoute><WalletGuard><ServicesPage /></WalletGuard></ProtectedRoute>} />
          <Route path="/freelancer/:id" element={<ProtectedRoute><WalletGuard><FreelancerProfile /></WalletGuard></ProtectedRoute>} />
          <Route path="/disputes" element={<ProtectedRoute><WalletGuard><DisputesPage /></WalletGuard></ProtectedRoute>} />
          
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;