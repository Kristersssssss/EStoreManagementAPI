import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useListings } from '../../contexts/ListingsContext';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

const SellGear: React.FC = () => {
  const { addListing } = useListings();
  const { addToast } = useToast();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      addToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please fill in all fields.'
      });
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      addToast({
        type: 'error',
        title: 'Invalid Price',
        message: 'Please enter a valid price.'
      });
      return;
    }

    addListing({
      name: formData.name,
      price,
      description: formData.description,
      image: formData.image
    });

    addToast({
      type: 'success',
      title: 'Listing Added',
      message: 'Your item has been added to My Listings.'
    });

    setFormData({
      name: '',
      price: '',
      description: '',
      image: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Sell Your Gear</h1>
        <Link
          to="/"
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                placeholder="e.g., RTX 4090 Graphics Card"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none`}
                placeholder="Describe your product..."
                required
              />
            </div>

            <div>
              <label htmlFor="image" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              List Your Gear
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default SellGear;