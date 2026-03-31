export interface ProductSpecs {
  ram?: string;
  storage?: string;
  battery?: string;
  processor?: string;
  screenSize?: string;
  camera?: string;
  os?: string;
  connectivity?: string[];
  warranty?: string;
  color?: string;
  weight?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  specs?: ProductSpecs;
  sellerId?: string;
  sellerName?: string;
  createdAt?: string;
  status?: 'active' | 'sold' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
}

export interface MarketplaceListing {
  id: string;
  product: Product;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  status: 'active' | 'sold' | 'inactive';
}

export interface SoldItem extends MarketplaceListing {
  soldAt: string;
  soldPrice: number;
  buyerId?: string;
}

export interface CreateListingRequest {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  specs: ProductSpecs;
}

export interface CreateListingResponse extends MarketplaceListing {}

export interface UserListings {
  active: MarketplaceListing[];
  sold: SoldItem[];
}