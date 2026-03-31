import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, DollarSign, TrendingUp, Edit, Trash2, Eye, Calendar, MapPin, User, Settings, LogOut } from 'lucide-react';
import { getUserListings, updateListing, deleteListing, markAsSold } from './api';
import { MarketplaceListing } from './types';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'sold'>('listings');
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [soldItems, setSoldItems] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', price: 0, description: '' });

  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    try {
      const userListings = await getUserListings(user!.id);
      setListings(userListings.filter(item => item.status === 'active'));
      setSoldItems(userListings.filter(item => item.status === 'sold'));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to load profile data',
        message: 'Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MarketplaceListing) => {
    setEditingItem(item.id);
    setEditForm({
      title: item.title,
      price: item.price,
      description: item.description
    });
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      await updateListing(editingItem, editForm);
      addToast({
        type: 'success',
        title: 'Listing updated',
        message: 'Your listing has been successfully updated.'
      });
      setEditingItem(null);
      loadUserData();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to update listing',
        message: 'Please try again.'
      });
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      await deleteListing(itemId);
      addToast({
        type: 'success',
        title: 'Listing deleted',
        message: 'Your listing has been removed.'
      });
      loadUserData();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to delete listing',
        message: 'Please try again.'
      });
    }
  };

  const handleMarkAsSold = async (itemId: string) => {
    try {
      await markAsSold(itemId);
      addToast({
        type: 'success',
        title: 'Item marked as sold',
        message: 'Congratulations on your sale!'
      });
      loadUserData();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to mark as sold',
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

  const totalEarnings = soldItems.reduce((sum, item) => sum + item.price, 0);
  const activeListings = listings.length;
  const totalSold = soldItems.length;

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loading profile...</h1>
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
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300">Member since {formatDate(user.createdAt || new Date().toISOString())}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                <div className="text-2xl font-bold">{activeListings}</div>
                <div className="text-gray-600 dark:text-gray-300">Active Listings</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{totalSold}</div>
                <div className="text-gray-600 dark:text-gray-300">Items Sold</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
                <div className="text-gray-600 dark:text-gray-300">Total Earnings</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'listings'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              My Listings ({activeListings})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'sold'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
              }`}
            >
              Sold Items ({totalSold})
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'listings' && (
            <motion.div
              key="listings"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active listings</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start selling by creating your first listing
                  </p>
                  <button
                    onClick={() => navigate('/sell')}
                    className="px-6 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Create Listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((item) => (
                    <ListingCard
                      key={item.id}
                      item={item}
                      isEditing={editingItem === item.id}
                      editForm={editForm}
                      onEditFormChange={setEditForm}
                      onEdit={() => handleEdit(item)}
                      onSave={handleSaveEdit}
                      onCancel={() => setEditingItem(null)}
                      onDelete={() => handleDelete(item.id)}
                      onMarkSold={() => handleMarkAsSold(item.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'sold' && (
            <motion.div
              key="sold"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {soldItems.length === 0 ? (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No sold items yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your sold items will appear here
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {soldItems.map((item) => (
                    <SoldItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Listing Card Component
interface ListingCardProps {
  item: MarketplaceListing;
  isEditing: boolean;
  editForm: { title: string; price: number; description: string };
  onEditFormChange: (form: { title: string; price: number; description: string }) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onMarkSold: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  item,
  isEditing,
  editForm,
  onEditFormChange,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onMarkSold
}) => {
  return (
    <motion.div
      layout
      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl"
    >
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-500/20 backdrop-blur-md rounded-full hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => onEditFormChange({ ...editForm, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
              placeholder="Title"
            />
            <input
              type="number"
              value={editForm.price}
              onChange={(e) => onEditFormChange({ ...editForm, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
              placeholder="Price"
              min="0"
              step="0.01"
            />
            <textarea
              value={editForm.description}
              onChange={(e) => onEditFormChange({ ...editForm, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm resize-none"
              rows={3}
              placeholder="Description"
            />
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-2xl font-bold text-primary-600 mb-2">${item.price.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {item.views || 0} views
              </div>
            </div>

            <button
              onClick={onMarkSold}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Mark as Sold
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Sold Item Card Component
const SoldItemCard: React.FC<{ item: MarketplaceListing }> = ({ item }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl opacity-75">
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-medium">
            SOLD
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-2xl font-bold text-green-600 mb-2">${item.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Sold {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;