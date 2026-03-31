import { Link, useLocation } from "react-router-dom";
import { Cpu, ShoppingBag, PlusCircle, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserType } from "../../auth/types";
import CartDrawer from "@/components/cart/CartDrawer";

interface NavbarProps {
  user: UserType;
  onLogout: () => void;
}

const navItems = [
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/sell", label: "Sell Product", icon: PlusCircle },
  { to: "/profile", label: "Profile", icon: User },
];

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
          >
            <Cpu className="h-4 w-4 text-primary-foreground" />
          </motion.div>
          <span className="font-heading text-base font-bold text-foreground">
            EStore<span className="text-primary">Management</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                pathname === to
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden items-center gap-2 md:flex">
          <CartDrawer />
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{user.username}</span>
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-2 md:hidden">
          <CartDrawer />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/20 bg-card/90 backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-3">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === to ? "bg-primary/15 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              ))}
              <button
                onClick={onLogout}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
