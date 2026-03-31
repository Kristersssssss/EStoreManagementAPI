import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ListingsProvider } from './contexts/ListingsContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Cart from './features/cart/Cart';
import Home from './components/Home';
import Marketplace from './features/marketplace/Marketplace';
import SellGear from './features/sell/SellGear';
import Profile from './features/profile/Profile';
import { useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen relative ${theme === 'dark' ? 'text-white' : 'text-black'} overflow-x-hidden`}>
      {/* Fixed background image for dark, light background for light */}
      {theme === 'dark' ? (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
            }}
          />
          <div className="fixed inset-0 bg-slate-900/80" />
        </>
      ) : (
        <div className="fixed inset-0 bg-gray-100" />
      )}
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <Header />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/sell" element={<SellGear />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <ListingsProvider>
              <Router>
                <AppContent />
              </Router>
            </ListingsProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;