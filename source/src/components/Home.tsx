import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, ChevronRight, Smartphone, Laptop, Headphones, Gamepad2 } from 'lucide-react';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Only the best gear from trusted sellers'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Quick delivery to your doorstep'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Safe and secure transactions guaranteed'
    }
  ];

  const categories = [
    { icon: <Smartphone className="w-6 h-6" />, name: 'Phones', count: '120+' },
    { icon: <Laptop className="w-6 h-6" />, name: 'Laptops', count: '85+' },
    { icon: <Headphones className="w-6 h-6" />, name: 'Audio', count: '95+' },
    { icon: <Gamepad2 className="w-6 h-6" />, name: 'Gaming', count: '60+' }
  ];

  return (
    <div className="pt-16">
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EStore?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the best deals on premium electronics with our trusted marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Shop by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} items</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <FeaturedProducts />

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of sellers on our platform and reach millions of customers worldwide
            </p>
            <Link
              to="/sell"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Start Selling <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;