import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../ProductCard/ProductCard';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onRelatedProductClick: (productId: string) => void;
  onCartClick: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack, onRelatedProductClick, onCartClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#179E42' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.id !== product.id && 
    (p.brand === product.brand || p.screenType === product.screenType)
  ).slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button and Cart Icon */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center hover:opacity-75 transition-colors"
            style={{ color: '#179E42' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          
          <button
            onClick={onCartClick}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="ml-2 text-gray-700">Cart</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-gray-400' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={index === currentImageIndex ? { borderColor: '#179E42' } : {}}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Name */}
              <div>
                <p className="text-lg font-medium mb-2" style={{ color: '#179E42' }}>{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">{product.rating}</span>
                    <span className="ml-1 text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                
                <p className="text-green-600 font-medium mb-2">✓ In Stock</p>
                <p className="text-sm text-gray-600">Free shipping on orders above ₹10,000</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#179E42' }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warranty & Guarantees */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">{product.warranty}</p>
                  <p className="text-sm text-gray-600">Warranty</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">Pan India</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">7 Days</p>
                  <p className="text-sm text-gray-600">Return Policy</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                    style={{ backgroundColor: '#179E42' }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>

                {/* Payment Options */}
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Payment Options:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded">Credit Card</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">UPI</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">Net Banking</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">EMI Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            {/* Tab Headers */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'specs'
                    ? 'border-b-2'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'specs' ? { borderColor: '#179E42', color: '#179E42' } : {}}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-b-2'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === 'reviews' ? { borderColor: '#179E42', color: '#179E42' } : {}}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'specs' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Display</h4>
                      <table className="w-full text-sm">
                        <tbody className="space-y-2">
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Screen Size</td>
                            <td className="py-2">{product.size}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Display Type</td>
                            <td className="py-2">{product.screenType}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Resolution</td>
                            <td className="py-2">{product.resolution}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Refresh Rate</td>
                            <td className="py-2">120Hz</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Audio & Connectivity</h4>
                      <table className="w-full text-sm">
                        <tbody className="space-y-2">
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Audio Output</td>
                            <td className="py-2">20W Speakers</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">HDMI Ports</td>
                            <td className="py-2">4x HDMI 2.1</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">USB Ports</td>
                            <td className="py-2">2x USB 3.0</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 font-medium">Wi-Fi</td>
                            <td className="py-2">802.11ac Dual Band</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                  
                  {/* Review Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{product.reviews} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map(stars => (
                          <div key={stars} className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-600 w-6">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : stars === 2 ? 3 : 2}%`
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {stars === 5 ? '60%' : stars === 4 ? '25%' : stars === 3 ? '10%' : stars === 2 ? '3%' : '2%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">Customer {i}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, starIndex) => (
                                  <Star
                                    key={starIndex}
                                    className={`w-4 h-4 ${
                                      starIndex < (i === 1 ? 5 : i === 2 ? 4 : 3)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">Verified Purchase • 2 weeks ago</p>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          {i === 1 
                            ? "Excellent TV with amazing picture quality. The colors are vibrant and the smart features work flawlessly."
                            : i === 2 
                            ? "Great value for money. Setup was easy and the display quality exceeded my expectations."
                            : "Good TV overall, though the sound could be better. Picture quality is impressive for the price."
                          }
                        </p>
                        <div className="mt-2 text-sm text-gray-500">
                          Was this helpful? <button className="hover:opacity-75" style={{ color: '#179E42' }}>Yes (12)</button> | <button className="hover:opacity-75" style={{ color: '#179E42' }}>No (1)</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onClick={() => onRelatedProductClick(relatedProduct.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
