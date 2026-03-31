import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useListings } from "@/contexts/ListingsContext";
import { ListingCategory } from "./types";
import ListingCard from "./ListingCard";

const categories: ListingCategory[] = [
  "All", "GPU", "Laptops", "Audio", "Peripherals", "Components", "Monitors",
];

const MarketplacePage = () => {
  const { allListings } = useListings();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ListingCategory>("All");

  const filtered = useMemo(() => {
    return allListings
      .filter((l) => !l.sold)
      .filter((l) => activeCategory === "All" || l.category === activeCategory)
      .filter(
        (l) =>
          search === "" ||
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.description.toLowerCase().includes(search.toLowerCase())
      );
  }, [allListings, search, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Marketplace
        </h1>
        <p className="text-sm text-muted-foreground">
          Buy & sell premium tech gear
        </p>
      </div>

      {/* Search & Filters */}
      <div className="glass-card mb-6 rounded-xl p-4">
        <div className="mb-3 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="w-full rounded-lg border border-input bg-secondary/50 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground cyber-glow-hover"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-sm text-muted-foreground"
          >
            No listings found matching your criteria.
          </motion.p>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MarketplacePage;
