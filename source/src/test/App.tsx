import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { User } from "@/features/auth/types";
import { CartProvider } from "@/contexts/CartContext";
import { ListingsProvider } from "@/contexts/ListingsContext";
import LoginForm from "@/features/auth/LoginForm";
import Navbar from "@/components/layout/Navbar";
import Index from "@/pages/Index";
import MarketplacePage from "@/features/marketplace/MarketplacePage";
import SellGearPage from "@/features/sell/SellGearPage";
import ProfilePage from "@/features/profile/ProfilePage";
import ProductDetail from "@/features/catalog/ProductDetail";
import Dashboard from "@/features/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import techBg from "@/assets/tech-bg.jpg";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("estore_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem("estore_user", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("estore_user");
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginForm onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ListingsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div
                className="relative min-h-screen"
                style={{
                  backgroundImage: `url(${techBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                }}
              >
                <div className="absolute inset-0 bg-background/80" style={{ position: "fixed" }} />
                <div className="relative z-10">
                  <Navbar user={user} onLogout={handleLogout} />
                  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/marketplace" element={<MarketplacePage />} />
                        <Route path="/sell" element={<SellGearPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </AnimatePresence>
                  </main>
                </div>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ListingsProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
