import { Product } from '../catalog/types';

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CreateProductResponse extends Product {}