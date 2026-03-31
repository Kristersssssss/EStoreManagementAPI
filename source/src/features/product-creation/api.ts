import axios from 'axios';
import { CreateProductRequest, CreateProductResponse } from './types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const createProduct = async (product: CreateProductRequest): Promise<CreateProductResponse> => {
  const response = await api.post('/products', product);
  return response.data;
};