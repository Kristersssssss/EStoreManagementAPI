import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Heart, Eye, Star, MapPin, Calendar, User } from 'lucide-react';
import { getMarketplaceListings } from './api';
import { MarketplaceListing } from './types';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const PublicMarketplace: React.FC = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const { addItem } = useCart();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Gaming', 'Tablets', 'Wearables', 'Cameras', 'Accessories'];

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    filterAndSortListings();
  }, [listings, searchTerm, selectedCategory, sortBy]);

  const loadListings = async () => {
    try {
      const data = await getMarketplaceListings();
      setListings(data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to load listings',
        message: 'Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortListings = () => {
    let filtered = listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredListings(filtered);
  };

  const handleAddToCart = async (listing: MarketplaceListing) => {
    if (!isAuthenticated) {
      addToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to add items to cart.'
      });
      return;
    }

    try {
      addItem({
        id: parseInt(listing.id),
        title: listing.title,
        price: listing.price,
        image: listing.image,
        quantity: 1,
        category: listing.category,
        isMarketplaceItem: true
      });

      addToast({
        type: 'success',
        title: 'Added to Cart',
        message: `${listing.title} has been added to your cart.`
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to add to cart',
        message: 'Please try again.'
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Marketplace</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading listings...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Electronics Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover amazing deals from trusted sellers
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-primary-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price Range</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Condition</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm">
                        <option value="">All Conditions</option>
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="City, State"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Listings Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-yellow-bright text-black text-xs rounded-full font-medium">
                        {listing.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {listing.title}
                    </h3>

                    <p className="text-2xl font-bold text-primary-600 mb-3">
                      ${listing.price.toFixed(2)}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {listing.description}
                    </p>

                    {/* Specs Preview */}
                    {listing.specs && Object.keys(listing.specs).length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(listing.specs).slice(0, 3).map(([key, value]) => (
                            <span key={key} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Seller Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {listing.sellerName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(listing.createdAt)}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleAddToCart(listing)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </motion.button>
                      <button className="px-4 py-2 border-2 border-yellow-bright text-yellow-bright rounded-xl hover:bg-yellow-bright hover:text-black transition-all duration-300 font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredListings.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No listings found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search criteria or check back later for new listings.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('newest');
              }}
              className="px-6 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublicMarketplace;