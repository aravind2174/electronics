import React, { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Recommendations from './components/Recommendations/Recommendations';
import ProductCatalog from './components/ProductCatalog/ProductCatalog';
import Testimonials from './components/Testimonials/Testimonials';
import SocialProof from './components/SocialProof/SocialProof';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Contact from './components/Contact/Contact';
import UserAccount from './components/UserAccount/UserAccount';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Keep only the overlay/modal pages that need separate views
export type OverlayPage = 'product' | 'checkout' | 'contact' | 'account';

function App() {
  // State for overlay pages (product details, checkout, etc.)
  const [currentOverlay, setCurrentOverlay] = useState<OverlayPage | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // State for brand filtering
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentOverlay('product');
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrand(brand);
    // Scroll to product catalog section after filtering
    const element = document.getElementById('product-catalog');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const closeOverlay = () => {
    setCurrentOverlay(null);
    setSelectedProductId(null);
  };

  const handleFooterNavigate = (page: string) => {
    switch (page) {
      case 'contact':
        setCurrentOverlay('contact');
        break;
      case 'account':
        setCurrentOverlay('account');
        break;
      default:
        // For other footer links, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart handlers that can be used from any component
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentOverlay('checkout');
  };

  const renderOverlay = () => {
    if (!currentOverlay) return null;

    switch (currentOverlay) {
      case 'product':
        return (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <ProductDetails 
              productId={selectedProductId!}
              onBack={closeOverlay}
              onRelatedProductClick={handleProductClick}
              onCartClick={handleCartOpen} // Pass cart functionality
            />
          </div>
        );
      case 'checkout':
        return (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <Checkout onBack={closeOverlay} />
          </div>
        );
      case 'contact':
        return (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <Contact onBack={closeOverlay} />
          </div>
        );
      case 'account':
        return (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <UserAccount onBack={closeOverlay} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onCartClick={handleCartOpen}
              onBrandFilter={handleBrandFilter}
            />
            
            {/* Main Landing Page Content */}
            <main>
              {/* Hero Section */}
              <section id="hero">
                <Hero />
              </section>

              {/* Recommendations Section */}
              <section id="recommendations">
                <Recommendations onProductClick={handleProductClick} />
              </section>

              {/* Product Catalog Section */}
              <section id="product-catalog">
                <ProductCatalog 
                  onProductClick={handleProductClick}
                  selectedBrand={selectedBrand}
                />
              </section>

              {/* Testimonials Section */}
              <section id="testimonials">
                <Testimonials />
              </section>

              {/* Social Proof Section */}
              <section id="social-proof">
                <SocialProof />
              </section>
            </main>
            
            <Footer onNavigate={handleFooterNavigate} />
            
            {/* Cart Component - This will be available globally */}
            <Cart 
              isOpen={isCartOpen}
              onClose={handleCartClose}
              onCheckout={handleCheckout}
            />
            
            {/* Overlay Pages */}
            {renderOverlay()}
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
