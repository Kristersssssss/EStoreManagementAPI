import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useListings } from "@/contexts/ListingsContext";
import { Listing, ListingCategory } from "@/features/marketplace/types";

const conditionOptions: Listing["condition"][] = ["New", "Like New", "Good", "Fair"];
const categoryOptions: Exclude<ListingCategory, "All">[] = [
  "GPU", "Laptops", "Audio", "Peripherals", "Components", "Monitors",
];

const SellGearPage = () => {
  const { addListing } = useListings();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "GPU" as string,
    condition: "New" as Listing["condition"],
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addListing({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      image: form.image,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ title: "", description: "", price: "", category: "GPU", condition: "New", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80" });
    }, 2500);
  };

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-2xl"
    >
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Sell Your Product
        </h1>
        <p className="text-sm text-muted-foreground">
          List your tech for the community
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card flex flex-col items-center rounded-xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="mb-4 h-16 w-16 text-success" />
            </motion.div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Listed Successfully!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your item is now live on the Marketplace.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-4 rounded-xl p-6"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. NVIDIA RTX 4080 Super"
                className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Description
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe your item, condition, what's included..."
                rows={3}
                className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Condition
                </label>
                <select
                  value={form.condition}
                  onChange={(e) =>
                    update("condition", e.target.value)
                  }
                  className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {conditionOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => update("category", cat)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      form.category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Image URL
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="cyber-button flex w-full items-center justify-center gap-2"
            >
              <Upload className="h-4 w-4" /> List Item for Sale
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SellGearPage;
