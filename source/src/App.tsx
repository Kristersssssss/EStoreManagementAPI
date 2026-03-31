import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './components/Home';
import ProductList from './features/catalog/ProductList';
import ProductForm from './features/product-creation/ProductForm';
import Cart from './features/cart/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import PublicMarketplace from './features/marketplace/PublicMarketplace';
import SellElectronicsForm from './features/marketplace/SellElectronicsForm';
import UserProfile from './features/marketplace/UserProfile';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 text-gray-900 dark:text-white relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<ProductList />} />
        <Route path="/marketplace" element={<PublicMarketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated && (
          <>
            <Route path="/admin" element={<div>Admin Panel</div>} />
            <Route path="/create-product" element={<ProductForm />} />
            <Route path="/sell" element={<SellElectronicsForm />} />
            <Route path="/profile" element={<UserProfile />} />
          </>
        )}
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;