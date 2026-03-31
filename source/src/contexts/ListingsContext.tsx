import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Listing } from "@/features/marketplace/types";
import { mockListings } from "@/features/marketplace/api";

interface ListingsContextType {
  allListings: Listing[];
  userListings: Listing[];
  soldListings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "createdAt" | "sold" | "seller">) => void;
  markAsSold: (id: string) => void;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const LISTINGS_KEY = "estore_listings";
const USER_LISTINGS_KEY = "estore_user_listings";

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem(LISTINGS_KEY);
      return saved ? JSON.parse(saved) : mockListings;
    } catch {
      return mockListings;
    }
  });

  const [userListings, setUserListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem(USER_LISTINGS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(userListings));
  }, [userListings]);

  const addListing = (data: Omit<Listing, "id" | "createdAt" | "sold" | "seller">) => {
    const newListing: Listing = {
      ...data,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      sold: false,
      seller: "You",
    };
    setUserListings((prev) => [newListing, ...prev]);
    setListings((prev) => [newListing, ...prev]);
  };

  const markAsSold = (id: string) => {
    const update = (items: Listing[]) =>
      items.map((l) => (l.id === id ? { ...l, sold: true } : l));
    setListings(update);
    setUserListings(update);
  };

  const allListings = listings;
  const soldListings = userListings.filter((l) => l.sold);
  const activeUserListings = userListings.filter((l) => !l.sold);

  return (
    <ListingsContext.Provider
      value={{
        allListings,
        userListings: activeUserListings,
        soldListings,
        addListing,
        markAsSold,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings must be used within ListingsProvider");
  return ctx;
};
