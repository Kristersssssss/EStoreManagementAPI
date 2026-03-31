import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, PlusCircle, LayoutDashboard, ArrowRight } from "lucide-react";

const cards = [
  {
    to: "/marketplace",
    icon: ShoppingBag,
    title: "Marketplace",
    desc: "Browse & buy premium tech gear",
  },
  {
    to: "/sell",
    icon: PlusCircle,
    title: "Sell Product",
    desc: "List your electronics for sale",
  },
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "View store stats & analytics",
  },
];

const Index = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-8 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Welcome to EStore<span className="text-primary">Management</span>
      </h1>
      <p className="mt-2 text-muted-foreground">
        Your hub for buying, selling, and managing tech electronics
      </p>
    </div>

    <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
      {cards.map(({ to, icon: Icon, title, desc }, i) => (
        <motion.div
          key={to}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Link
            to={to}
            className="glass-card group flex flex-col items-center rounded-xl p-6 text-center transition-all cyber-glow-hover"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="font-heading text-sm font-bold text-foreground">{title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Index;
