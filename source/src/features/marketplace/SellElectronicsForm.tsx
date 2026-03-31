import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Upload, Check, AlertCircle, Smartphone, Laptop, Headphones, Gamepad2 } from 'lucide-react';
import { createMarketplaceListing } from './api';
import { CreateListingRequest, ProductSpecs } from '../catalog/types';
import { MARKETPLACE_CATEGORIES } from './types';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

const categoryIcons = {
  Smartphones: Smartphone,
  Laptops: Laptop,
  Audio: Headphones,
  Gaming: Gamepad2,
  Tablets: Smartphone,
  Wearables: Smartphone,
  Cameras: Smartphone,
  Accessories: Smartphone,
};

const SellElectronicsForm: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateListingRequest>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    specs: {}
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateListingRequest, string>>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof CreateListingRequest, string>> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    }

    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || !isAuthenticated) return;

    setIsSubmitting(true);
    try {
      // In a real app, get user info from auth context
      const userId = 'current-user';
      const userName = 'Current User';

      await createMarketplaceListing(formData, userId, userName);

      addToast({
        type: 'success',
        title: 'Listing Created!',
        message: 'Your product has been listed successfully.'
      });

      navigate('/marketplace');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to create listing',
        message: 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof CreateListingRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateSpecs = (field: keyof ProductSpecs, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [field]: value }
    }));
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Product details' },
    { number: 2, title: 'Details', description: 'Description & image' },
    { number: 3, title: 'Specifications', description: 'Technical specs' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to sell products.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-yellow-bright text-black px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sell Your Electronics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              List your electronic devices and reach thousands of potential buyers
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <motion.div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-yellow-bright border-yellow-bright text-black'
                        : 'border-gray-300 text-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 transition-colors duration-300 ${
                        currentStep > step.number ? 'bg-yellow-bright' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-lg font-semibold mb-2">Product Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                        errors.title ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      }`}
                      placeholder="e.g., iPhone 15 Pro Max 256GB"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-4">Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {MARKETPLACE_CATEGORIES.map((category) => {
                        const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Smartphone;
                        return (
                          <motion.button
                            key={category}
                            type="button"
                            onClick={() => updateFormData('category', category)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${
                              formData.category === category
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <IconComponent className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <span className="text-sm font-medium">{category}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-2">Price ($)</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                        errors.price ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      }`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.price}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-lg font-semibold mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none ${
                        errors.description ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                      }`}
                      rows={6}
                      placeholder="Describe your product in detail. Include condition, features, and any defects..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-2">Product Image URL</label>
                    <div className="space-y-4">
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => updateFormData('image', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                          errors.image ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.image && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.image}
                        </p>
                      )}

                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </div>
                          <input type="file" className="hidden" accept="image/*" />
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Technical Specifications</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Add technical details to help buyers understand your product better
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">RAM</label>
                      <input
                        type="text"
                        value={formData.specs.ram || ''}
                        onChange={(e) => updateSpecs('ram', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 16GB"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Storage</label>
                      <input
                        type="text"
                        value={formData.specs.storage || ''}
                        onChange={(e) => updateSpecs('storage', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 512GB SSD"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Processor</label>
                      <input
                        type="text"
                        value={formData.specs.processor || ''}
                        onChange={(e) => updateSpecs('processor', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., Intel i7-12700H"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Screen Size</label>
                      <input
                        type="text"
                        value={formData.specs.screenSize || ''}
                        onChange={(e) => updateSpecs('screenSize', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 15.6 inches"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Battery</label>
                      <input
                        type="text"
                        value={formData.specs.battery || ''}
                        onChange={(e) => updateSpecs('battery', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 8 hours"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Operating System</label>
                      <input
                        type="text"
                        value={formData.specs.os || ''}
                        onChange={(e) => updateSpecs('os', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., Windows 11"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Camera</label>
                      <input
                        type="text"
                        value={formData.specs.camera || ''}
                        onChange={(e) => updateSpecs('camera', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 48MP triple camera"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Warranty</label>
                      <input
                        type="text"
                        value={formData.specs.warranty || ''}
                        onChange={(e) => updateSpecs('warranty', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                        placeholder="e.g., 1 year remaining"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {currentStep < 3 ? (
                <motion.button
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-3 bg-yellow-bright text-black rounded-xl hover:bg-yellow-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Listing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Create Listing
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellElectronicsForm;