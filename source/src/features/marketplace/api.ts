import axios from 'axios';
import {
  MarketplaceListing,
  SoldItem,
  CreateListingRequest,
  CreateListingResponse,
  UserListings
} from '../catalog/types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Mock API functions for marketplace functionality
// In a real app, these would connect to your backend

export const getMarketplaceListings = async (): Promise<MarketplaceListing[]> => {
  // Mock data - in real app, this would fetch from your API
  const mockListings: MarketplaceListing[] = [
    {
      id: '1',
      product: {
        id: 101,
        title: 'MacBook Pro M1 (2021) - 16GB RAM, 512GB SSD',
        price: 1899,
        description: 'Mint condition MacBook Pro with M1 chip. Perfect for developers, video editing, and creative work. Includes original box, charger, and all accessories. Battery health at 98%. No scratches or dents. Used lightly for 8 months.',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.8, count: 24 },
        specs: {
          ram: '16GB',
          storage: '512GB SSD',
          processor: 'Apple M1',
          screenSize: '13.3"',
          battery: '18 hours',
          os: 'macOS Monterey',
          warranty: 'AppleCare+ (6 months remaining)'
        }
      },
      sellerId: 'user1',
      sellerName: 'TechHub Pro',
      createdAt: '2024-01-15T10:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      product: {
        id: 102,
        title: 'Samsung Galaxy S23 Ultra - 512GB, Ceramic White',
        price: 899,
        description: 'Like new Samsung Galaxy S23 Ultra in ceramic white. S-Pen included, all original accessories. Used for 6 months, perfect condition with no scratches. Comes with original box and warranty card. Camera works perfectly, all sensors functional.',
        category: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.9, count: 156 },
        specs: {
          ram: '12GB',
          storage: '512GB',
          processor: 'Snapdragon 8 Gen 2',
          screenSize: '6.8"',
          camera: '200MP main + 12MP ultra-wide + 10MP telephoto + 10MP periscope',
          battery: '5000mAh',
          os: 'Android 13',
          warranty: 'Samsung warranty (8 months remaining)'
        }
      },
      sellerId: 'user2',
      sellerName: 'MobileMasters',
      createdAt: '2024-01-14T15:30:00Z',
      status: 'active'
    },
    {
      id: '3',
      product: {
        id: 103,
        title: 'Sony WH-1000XM5 Wireless Headphones - Silver',
        price: 299,
        description: 'Premium noise-canceling wireless headphones in excellent condition. Crystal clear sound quality with industry-leading noise cancellation. Perfect for travel, work, or music production. Battery lasts 30 hours per charge.',
        category: 'Audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.7, count: 89 },
        specs: {
          battery: '30 hours (ANC on)',
          connectivity: ['Bluetooth 5.2', 'NFC', '3.5mm jack'],
          weight: '250g',
          drivers: '30mm',
          warranty: 'Sony warranty (10 months remaining)'
        }
      },
      sellerId: 'user3',
      sellerName: 'AudioTech',
      createdAt: '2024-01-13T09:15:00Z',
      status: 'active'
    },
    {
      id: '4',
      product: {
        id: 104,
        title: 'Dell XPS 13 Plus - Intel i7, 16GB RAM, 512GB SSD',
        price: 1299,
        description: 'Ultra-portable laptop with InfinityEdge display. Perfect for business professionals. Includes Windows 11 Pro license. Used for remote work, in pristine condition. All ports functional, keyboard backlit.',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.6, count: 42 },
        specs: {
          ram: '16GB LPDDR5',
          storage: '512GB NVMe SSD',
          processor: 'Intel Core i7-1260P',
          screenSize: '13.4" FHD+',
          battery: '55Wh',
          os: 'Windows 11 Pro',
          warranty: 'Dell warranty (4 months remaining)'
        }
      },
      sellerId: 'user4',
      sellerName: 'BusinessTech',
      createdAt: '2024-01-12T14:20:00Z',
      status: 'active'
    },
    {
      id: '5',
      product: {
        id: 105,
        title: 'iPad Pro 12.9" M2 - 256GB, Space Gray',
        price: 899,
        description: 'Latest iPad Pro with M2 chip and Liquid Retina XDR display. Perfect for digital artists, video editors, and productivity. Includes Apple Pencil Pro and Magic Keyboard. Used for 4 months, comes with all original packaging.',
        category: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.9, count: 78 },
        specs: {
          ram: '8GB',
          storage: '256GB',
          processor: 'Apple M2',
          screenSize: '12.9" Liquid Retina XDR',
          camera: '12MP Wide + 10MP Ultra Wide',
          battery: '10 hours',
          os: 'iPadOS 17',
          warranty: 'Apple warranty (11 months remaining)'
        }
      },
      sellerId: 'user5',
      sellerName: 'CreativePro',
      createdAt: '2024-01-11T11:45:00Z',
      status: 'active'
    },
    {
      id: '6',
      product: {
        id: 106,
        title: 'Nintendo Switch OLED - White, with Games',
        price: 349,
        description: 'Nintendo Switch OLED model in white. Includes 2 Joy-Con controllers, dock, and HDMI cable. Comes with Mario Kart 8 Deluxe and Animal Crossing. Used gently, screen is perfect. Ready for gaming!',
        category: 'Gaming',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format&q=80',
        rating: { rate: 4.8, count: 134 },
        specs: {
          screenSize: '7" OLED',
          storage: '64GB internal',
          battery: '9 hours',
          connectivity: 'Wi-Fi, Bluetooth',
          included: '2 Joy-Con, Dock, HDMI cable',
          warranty: 'Nintendo warranty (7 months remaining)'
        }
      },
      sellerId: 'user6',
      sellerName: 'GameZone',
      createdAt: '2024-01-10T16:30:00Z',
      status: 'active'
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockListings;
};

export const createMarketplaceListing = async (
  listing: CreateListingRequest,
  sellerId: string,
  sellerName: string
): Promise<CreateListingResponse> => {
  // Mock API call - in real app, this would post to your backend
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newListing: CreateListingResponse = {
    id: Date.now().toString(),
    product: {
      id: Date.now(),
      ...listing,
      rating: { rate: 0, count: 0 },
      sellerId,
      sellerName,
      createdAt: new Date().toISOString(),
      status: 'active'
    },
    sellerId,
    sellerName,
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  return newListing;
};

export const getUserListings = async (userId: string): Promise<UserListings> => {
  // Mock data - in real app, this would fetch user's listings from backend
  await new Promise(resolve => setTimeout(resolve, 300));

  const mockActiveListings: MarketplaceListing[] = [
    {
      id: '1',
      product: {
        id: 101,
        title: 'Gaming Laptop RTX 4070',
        price: 1899,
        description: 'High-performance gaming laptop with RTX 4070.',
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
        rating: { rate: 4.5, count: 12 },
        specs: {
          ram: '32GB',
          storage: '1TB SSD',
          processor: 'Intel i9-12900H',
          screenSize: '15.6"',
          battery: '6 hours',
          os: 'Windows 11'
        }
      },
      sellerId: userId,
      sellerName: 'Current User',
      createdAt: '2024-01-10T08:00:00Z',
      status: 'active'
    }
  ];

  const mockSoldItems: SoldItem[] = [
    {
      id: 'sold-1',
      product: {
        id: 201,
        title: 'iPad Air 5th Gen',
        price: 599,
        description: 'Apple iPad Air with M1 chip.',
        category: 'Tablets',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        rating: { rate: 4.8, count: 45 },
        specs: {
          ram: '8GB',
          storage: '64GB',
          processor: 'Apple M1',
          screenSize: '10.9"',
          battery: '10 hours',
          os: 'iPadOS'
        }
      },
      sellerId: userId,
      sellerName: 'Current User',
      createdAt: '2024-01-05T12:00:00Z',
      status: 'sold',
      soldAt: '2024-01-08T14:30:00Z',
      soldPrice: 580,
      buyerId: 'buyer123'
    }
  ];

  return {
    active: mockActiveListings,
    sold: mockSoldItems
  };
};

export const updateListing = async (
  listingId: string,
  updates: Partial<CreateListingRequest>
): Promise<MarketplaceListing> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // In real app, this would update the listing in the backend
  return {
    id: listingId,
    product: {
      id: Date.now(),
      title: updates.title || 'Updated Product',
      price: updates.price || 0,
      description: updates.description || '',
      category: updates.category || '',
      image: updates.image || '',
      rating: { rate: 0, count: 0 },
      specs: updates.specs
    },
    sellerId: 'current-user',
    sellerName: 'Current User',
    createdAt: new Date().toISOString(),
    status: 'active'
  };
};

export const deleteListing = async (listingId: string): Promise<void> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 300));
  // In real app, this would delete the listing from backend
};

export const markAsSold = async (listingId: string, soldPrice: number): Promise<SoldItem> => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    id: listingId,
    product: {
      id: Date.now(),
      title: 'Sold Product',
      price: soldPrice,
      description: 'This item has been sold',
      category: 'Electronics',
      image: '',
      rating: { rate: 0, count: 0 }
    },
    sellerId: 'current-user',
    sellerName: 'Current User',
    createdAt: new Date().toISOString(),
    status: 'sold',
    soldAt: new Date().toISOString(),
    soldPrice
  };
};