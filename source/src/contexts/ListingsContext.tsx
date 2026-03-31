import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Listing {
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

interface ListingsContextType {
  activeListings: Listing[];
  soldHistory: Listing[];
  addListing: (listing: Omit<Listing, "id" | "createdAt" | "sellerId" | "sellerName" | "status">) => void;
  markAsSold: (id: string) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const USER_LISTINGS_KEY = "estore_user_listings";

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [userListings, setUserListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem(USER_LISTINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(userListings));
  }, [userListings]);

  const activeListings = userListings.filter(listing => listing.status === 'active');
  const soldHistory = userListings.filter(listing => listing.status === 'sold');

  const addListing = (listingData: Omit<Listing, "id" | "createdAt" | "sellerId" | "sellerName" | "status">) => {
    const newListing: Listing = {
      ...listingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      sellerId: 'current-user', // In a real app, get from auth context
      sellerName: 'Current User', // In a real app, get from auth context
      status: 'active',
    };

    setUserListings(prev => [...prev, newListing]);
  };

  const markAsSold = (id: string) => {
    setUserListings(prev =>
      prev.map(listing =>
        listing.id === id
          ? { ...listing, status: 'sold' as const }
          : listing
      )
    );
  };

  const value = {
    activeListings,
    soldHistory,
    addListing,
    markAsSold,
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
};

export const useListings = () => {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings must be used within ListingsProvider");
  return ctx;
};
