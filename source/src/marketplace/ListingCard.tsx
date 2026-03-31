import { motion } from "framer-motion";
import { ShoppingCart, Tag } from "lucide-react";
import { Listing } from "./types";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/features/catalog/types";

const ListingCard = ({ listing }: { listing: Listing }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const asProduct: Product = {
      id: Number(listing.id.replace(/\D/g, "")) || Date.now(),
      title: listing.title,
      price: listing.price,
      description: listing.description,
      category: listing.category,
      image: listing.image,
      rating: { rate: 4.5, count: 99 },
    };
    addItem(asProduct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass-card group relative flex flex-col overflow-hidden rounded-xl"
    >
      {listing.sold && (
        <div className="absolute left-3 top-3 z-10 rounded bg-primary px-2 py-0.5 text-[10px] font-black uppercase text-primary-foreground">
          Sold
        </div>
      )}
      <div className="relative h-40 overflow-hidden bg-secondary/30 p-4">
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="mx-auto h-full w-auto object-contain"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
            {listing.category}
          </span>
          <span className="text-[10px] text-muted-foreground">{listing.condition}</span>
        </div>
        <h3 className="mb-1 line-clamp-2 text-xs font-semibold leading-snug text-foreground">
          {listing.title}
        </h3>
        <p className="mb-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
          {listing.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-primary" />
            <span className="text-sm font-bold text-primary">${listing.price.toFixed(2)}</span>
          </div>
          {!listing.sold && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground transition-all cyber-glow-hover"
            >
              <ShoppingCart className="h-3 w-3" /> Add
            </motion.button>
          )}
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">by {listing.seller}</p>
      </div>
    </motion.div>
  );
};

export default ListingCard;
