import { Product } from '../catalog/types';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
}