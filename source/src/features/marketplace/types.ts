// Marketplace-specific types are defined in ../catalog/types.ts
// This file maintains the API structure requirement

export const MARKETPLACE_CATEGORIES = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Audio',
  'Gaming',
  'Wearables',
  'Cameras',
  'Accessories'
] as const;

export type MarketplaceCategory = typeof MARKETPLACE_CATEGORIES[number];

export const LISTING_STATUS = {
  ACTIVE: 'active',
  SOLD: 'sold',
  INACTIVE: 'inactive'
} as const;

export type ListingStatus = typeof LISTING_STATUS[keyof typeof LISTING_STATUS];