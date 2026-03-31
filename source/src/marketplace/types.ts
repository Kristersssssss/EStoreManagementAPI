export interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdAt: string;
  sellerId: string;
  sellerName: string;
  status: 'active' | 'sold' | 'inactive';
}

export type ListingCategory = 'All' | 'GPU' | 'CPU' | 'RAM' | 'Motherboard' | 'Storage' | 'PSU' | 'Case' | 'Cooling' | 'Other';