import axios from "axios";
import { Product } from "./types";

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(`${BASE_URL}/products`);
  return data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const { data } = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(`${BASE_URL}/products/categories`);
  return data;
};