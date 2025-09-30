import React, { useState } from 'react';
import { DollarSign, Settings, Monitor } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../data/products';
import { Product } from '../../types';

interface RecommendationsProps {
  onProductClick?: (productId: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ onProductClick }) => {
  const [activeFilter, setActiveFilter] = useState<'price' | 'features' | 'screen' | null>('price');
  
  const getFilteredProducts = (): Product[] => {
    switch (activeFilter) {
      case 'price':
        return products.filter(p => p.price < 50000).slice(0, 4);
      case 'features':
        return products.filter(p => p.features.includes('Smart TV') || p.features.includes('HDR10+')).slice(0, 4);
      case 'screen':
        return products.filter(p => p.screenType === 'OLED' || p.screenType === 'QLED').slice(0, 4);
      default:
        return products.slice(0, 4);
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recommended For You
          </h2>
          <p className="text-xl text-gray-600">
            Discover TVs based on your preferences
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveFilter('price')}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
              activeFilter === 'price'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
            }`}
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Best Value
          </button>
          
          <button
            onClick={() => setActiveFilter('features')}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
              activeFilter === 'features'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Smart Features
          </button>
          
          <button
            onClick={() => setActiveFilter('screen')}
            className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all ${
              activeFilter === 'screen'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
            }`}
          >
            <Monitor className="w-5 h-5 mr-2" />
            Premium Display
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick?.(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
