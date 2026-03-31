import { Star } from "lucide-react";
import { Product } from "./types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/product/${product.id}`}
    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
  >
    <div className="flex h-32 items-center justify-center bg-muted/50 p-3">
      <img
        src={product.image}
        alt={product.title}
        className="h-full max-h-24 w-auto object-contain transition-transform group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="flex flex-1 flex-col p-3">
      <span className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {product.category}
      </span>
      <h3 className="mb-1 line-clamp-1 text-xs font-semibold leading-snug text-card-foreground">
        {product.title}
      </h3>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">${product.price.toFixed(2)}</span>
        <div className="flex items-center gap-0.5 text-accent">
          <Star className="h-3 w-3 fill-current" />
          <span className="text-[10px] font-medium">{product.rating.rate}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default ProductCard;
