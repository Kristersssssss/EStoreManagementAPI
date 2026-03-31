import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Store, Plus, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/catalog', label: 'Catalog', icon: null },
    { path: '/marketplace', label: 'Marketplace', icon: Store },
  ];

  const authNavItems = [
    { path: '/sell', label: 'Sell', icon: Plus },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-bright transition-colors drop-shadow-lg">
            EStoreManagement
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-yellow-bright bg-white/10'
                    : 'text-white hover:text-yellow-bright hover:bg-white/10'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 inline mr-2" />}
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}

            {isAuthenticated && authNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-yellow-bright bg-white/10'
                    : 'text-white hover:text-yellow-bright hover:bg-white/10'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 inline mr-2" />}
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 text-white hover:text-yellow-bright hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-yellow-bright text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-white">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-white hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-white hover:text-yellow-bright hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 bg-yellow-bright text-black rounded-lg hover:bg-yellow-400 transition-all duration-300 font-semibold"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-yellow-bright hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-yellow-bright bg-white/10'
                        : 'text-white hover:text-yellow-bright hover:bg-white/10'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 inline mr-2" />}
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated && authNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-yellow-bright bg-white/10'
                        : 'text-white hover:text-yellow-bright hover:bg-white/10'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 inline mr-2" />}
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-white/20 pt-2 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm text-white">
                        Welcome, {user?.name}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-white hover:text-yellow-bright hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        <LogIn className="w-4 h-4 mr-2 inline" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 bg-yellow-bright text-black rounded-lg hover:bg-yellow-400 transition-all duration-300 font-semibold"
                      >
                        <UserPlus className="w-4 h-4 mr-2 inline" />
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;