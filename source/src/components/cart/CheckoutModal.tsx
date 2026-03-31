import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, CheckCircle, Lock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ open, onClose }: CheckoutModalProps) => {
  const { totalPrice, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setStep("form");
    setCard({ number: "", expiry: "", cvc: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card relative z-10 w-full max-w-md rounded-2xl p-6"
          >
            <AnimatePresence mode="wait">
              {step === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="mb-4 h-16 w-16 text-success" />
                  </motion.div>
                  <h2 className="font-heading text-xl font-bold text-foreground">Payment Successful!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Your order has been placed. Thank you!</p>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="cyber-button mt-6"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-area"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-5 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <h2 className="font-heading text-lg font-bold text-foreground">Secure Checkout</h2>
                  </div>
                  <div className="mb-4 rounded-lg bg-secondary/50 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{totalItems} item(s)</span>
                      <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() })}
                          maxLength={19}
                          required
                          className="w-full rounded-lg border border-input bg-secondary/50 py-2 pl-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                          maxLength={5}
                          required
                          className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-foreground">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={card.cvc}
                          onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "") })}
                          maxLength={3}
                          required
                          className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={step === "processing"}
                      className="cyber-button flex w-full items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {step === "processing" ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Processing...
                        </span>
                      ) : (
                        <>Pay ${totalPrice.toFixed(2)}</>
                      )}
                    </motion.button>
                    <p className="text-center text-[10px] text-muted-foreground">
                      Stripe Test Mode — No real charges
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
