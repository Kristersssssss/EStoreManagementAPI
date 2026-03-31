import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useListings } from '../../contexts/ListingsContext';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

const Profile: React.FC = () => {
  const { activeListings, soldHistory, markAsSold } = useListings();
  const { addToast } = useToast();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');

  const handleMarkAsSold = (id: string) => {
    markAsSold(id);
    addToast({
      type: 'success',
      title: 'Marked as Sold',
      message: 'Item moved to Sold History.'
    });
  };

  const ListingCard: React.FC<{ listing: any; isSold?: boolean; onMarkSold?: () => void }> = ({ listing, isSold, onMarkSold }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 shadow-lg relative"
    >
      {isSold && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs">
          SOLD
        </div>
      )}
      <img
        src={listing.image}
        alt={listing.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{listing.name}</h3>
      <p className={`text-sm line-clamp-2 mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{listing.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-yellow-400">${listing.price}</span>
        {!isSold && onMarkSold && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMarkSold}
            className="bg-yellow-400 text-black font-bold py-1.5 px-3 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300 text-sm"
          >
            Mark Sold
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>My Profile</h1>
        <Link
          to="/"
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-1 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'active'
              ? 'bg-yellow-400 text-black shadow-lg'
              : `bg-white/10 ${theme === 'dark' ? 'text-white' : 'text-black'} hover:bg-white/20 border border-white/20`
          }`}
        >
          Active Listings ({activeListings.length})
        </button>
        <button
          onClick={() => setActiveTab('sold')}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'sold'
              ? 'bg-yellow-400 text-black shadow-lg'
              : `bg-white/10 ${theme === 'dark' ? 'text-white' : 'text-black'} hover:bg-white/20 border border-white/20`
          }`}
        >
          Sold History ({soldHistory.length})
        </button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: activeTab === 'active' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: activeTab === 'active' ? 20 : -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'active' ? (
          <div>
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Active Listings</h2>
            {activeListings.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No active listings yet.</p>
                <Link
                  to="/sell"
                  className="inline-block mt-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
                >
                  Start Selling
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {activeListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onMarkSold={() => handleMarkAsSold(listing.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Sold History</h2>
            {soldHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No sold items yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldHistory.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    isSold={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;