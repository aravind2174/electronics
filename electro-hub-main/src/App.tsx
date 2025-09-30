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
import Chatbot from './components/Chatbot/Chatbot';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

export type Page = 'home' | 'product' | 'checkout' | 'contact' | 'account';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return (
          <ProductDetails 
            productId={selectedProductId!}
            onBack={() => setCurrentPage('home')}
            onRelatedProductClick={handleProductClick}
          />
        );
      case 'checkout':
        return <Checkout onBack={() => setCurrentPage('home')} />;
      case 'contact':
        return <Contact onBack={() => setCurrentPage('home')} />;
      case 'account':
        return <UserAccount onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <>
            <Hero />
            <Recommendations />
            <ProductCatalog onProductClick={handleProductClick} />
            <Testimonials />
            <SocialProof />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onCartClick={() => setIsCartOpen(true)}
              onNavigate={setCurrentPage}
            />
            
            {renderPage()}
            
            {currentPage === 'home' && <Footer onNavigate={setCurrentPage} />}
            
            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCheckout={() => {
                setIsCartOpen(false);
                setCurrentPage('checkout');
              }}
            />
            
            <Chatbot />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;