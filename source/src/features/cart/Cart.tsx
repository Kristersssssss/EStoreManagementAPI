import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, Shield, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleClearCart = () => {
    if (showConfirm) {
      clearCart();
      setShowConfirm(false);
      addToast({
        type: 'success',
        title: 'Cart cleared',
        message: 'All items have been removed from your cart.'
      });
    } else {
      setShowConfirm(true);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      addToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to proceed with checkout.'
      });
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Order Placed!',
        message: 'Your order has been successfully placed. You will receive a confirmation email shortly.'
      });
      clearCart();
      setIsCartOpen(false);
      setIsCheckingOut(false);
    }, 2000);
  };

  const marketplaceItems = items.filter(item => item.isMarketplaceItem);
  const catalogItems = items.filter(item => !item.isMarketplaceItem);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-secondary-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-primary-600" />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <span className="ml-2 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 text-xs rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Add some products to get started
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Marketplace Items */}
                  {marketplaceItems.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Marketplace Items
                      </h3>
                      <div className="space-y-4">
                        {marketplaceItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Catalog Items */}
                  {catalogItems.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                        Store Items
                      </h3>
                      <div className="space-y-4">
                        {catalogItems.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {shipping > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full flex items-center justify-center px-6 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </motion.button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleClearCart}
                      className={`flex-1 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                        showConfirm
                          ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {showConfirm ? 'Confirm Clear' : 'Clear Cart'}
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 px-4 py-2 border-2 border-yellow-bright text-yellow-bright rounded-xl hover:bg-yellow-bright hover:text-black transition-all duration-300 font-semibold"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-xs text-gray-500">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Truck className="w-4 h-4 mr-1" />
                    Fast Shipping
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cart Item Component
interface CartItemProps {
  item: any;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
        <p className="text-primary-600 font-semibold">${item.price.toFixed(2)}</p>
        {item.isMarketplaceItem && (
          <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 text-xs rounded-full mt-1">
            Marketplace
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;