import { useEffect, useState } from "react";
import { Package, Layers, DollarSign, Star, TrendingUp, Award } from "lucide-react";
import { fetchProducts } from "../catalog/api";
import { Product } from "../catalog/types";
import { computeStats } from "./api";
import { DashboardStats } from "./types";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/ErrorMessage";

const statCards = [
  { key: "totalProducts" as const, label: "Total Products", icon: Package, format: (v: number) => String(v) },
  { key: "totalCategories" as const, label: "Categories", icon: Layers, format: (v: number) => String(v) },
  { key: "averagePrice" as const, label: "Avg. Price", icon: DollarSign, format: (v: number) => `$${v}` },
  { key: "averageRating" as const, label: "Avg. Rating", icon: Star, format: (v: number) => `${v}/5` },
];

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const products: Product[] = await fetchProducts();
      setStats(computeStats(products));
    } catch {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Loader text="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!stats) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Store overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, format }) => (
          <div key={key} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-xl font-bold text-card-foreground">{format(stats[key])}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            <h2 className="font-heading text-sm font-semibold">Most Expensive</h2>
          </div>
          <p className="text-sm leading-relaxed text-card-foreground">{stats.mostExpensive}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-accent">
            <Award className="h-5 w-5" />
            <h2 className="font-heading text-sm font-semibold">Top Rated</h2>
          </div>
          <p className="text-sm leading-relaxed text-card-foreground">{stats.topRated}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
