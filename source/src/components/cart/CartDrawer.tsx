import { ShoppingCart, X, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import CheckoutModal from "./CheckoutModal";

const CartDrawer = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
      >
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
          >
            {totalItems}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border/20 bg-card shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border/20 p-4">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Cart <span className="text-primary">({totalItems})</span>
                </h2>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <p className="mt-8 text-center text-sm text-muted-foreground">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {items.map(({ product, quantity }) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-card flex gap-3 rounded-lg p-3"
                      >
                        <img src={product.image} alt={product.title} className="h-14 w-14 rounded object-contain" />
                        <div className="flex flex-1 flex-col">
                          <p className="line-clamp-1 text-xs font-semibold text-foreground">{product.title}</p>
                          <p className="text-sm font-bold text-primary">${(product.price * quantity).toFixed(2)}</p>
                          <div className="mt-auto flex items-center gap-2">
                            <button onClick={() => updateQuantity(product.id, quantity - 1)} className="rounded bg-secondary p-1 text-secondary-foreground hover:bg-secondary/80">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-medium text-foreground">{quantity}</span>
                            <button onClick={() => updateQuantity(product.id, quantity + 1)} className="rounded bg-secondary p-1 text-secondary-foreground hover:bg-secondary/80">
                              <Plus className="h-3 w-3" />
                            </button>
                            <button onClick={() => removeItem(product.id)} className="ml-auto text-destructive hover:text-destructive/80">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-border/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setOpen(false); setCheckoutOpen(true); }}
                    className="cyber-button flex w-full items-center justify-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" /> Checkout
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};

export default CartDrawer;
