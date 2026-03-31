import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Check } from "lucide-react";
import { fetchProduct } from "./api";
import { Product } from "./types";
import { useCart } from "@/contexts/CartContext";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/ErrorMessage";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchProduct(Number(id));
      setProduct(data);
    } catch {
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <Loader text="Loading product..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!product) return null;

  return (
    <div>
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-10">
          <img src={product.image} alt={product.title} className="max-h-80 w-auto object-contain" />
        </div>

        <div className="flex flex-col">
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
          <h1 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">{product.rating.rate}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
          </div>

          <p className="mt-6 text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>

          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-8"
          >
            {added ? <><Check className="h-4 w-4" /> Added!</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
