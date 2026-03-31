import { Product } from "../catalog/types";
import { DashboardStats } from "./types";

export const computeStats = (products: Product[]): DashboardStats => {
  if (products.length === 0) {
    return { totalProducts: 0, totalCategories: 0, averagePrice: 0, averageRating: 0, topRated: "N/A", mostExpensive: "N/A" };
  }

  const categories = new Set(products.map((p) => p.category));
  const avgPrice = products.reduce((s, p) => s + p.price, 0) / products.length;
  const avgRating = products.reduce((s, p) => s + p.rating.rate, 0) / products.length;
  const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate)[0];
  const mostExpensive = [...products].sort((a, b) => b.price - a.price)[0];

  return {
    totalProducts: products.length,
    totalCategories: categories.size,
    averagePrice: Math.round(avgPrice * 100) / 100,
    averageRating: Math.round(avgRating * 10) / 10,
    topRated: topRated.title,
    mostExpensive: mostExpensive.title,
  };
};
