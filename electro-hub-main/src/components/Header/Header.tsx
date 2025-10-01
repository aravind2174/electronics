import React, { useState } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onBrandFilter?: (brand: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onBrandFilter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const { getItemCount } = useCart();

  const brands = ['TCL', 'VU TV', 'Hisense'];

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleBrandClick = (brand: string) => {
    console.log('Selected brand:', brand);
    setIsBrandsDropdownOpen(false);
    
    // Call the brand filter function if provided
    if (onBrandFilter) {
      onBrandFilter(brand);
    }
    
    // Scroll to ProductCatalog section
    scrollToSection('product-catalog');
  };

  const handleRecommendationsClick = () => {
    scrollToSection('recommendations');
  };

  const handleAboutUsClick = () => {
    scrollToSection('social-proof');
  };

  const handleHomeClick = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 h-16 relative">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
            onClick={handleHomeClick}
          >
            <img 
              src="https://res.cloudinary.com/dhn6uszk0/image/upload/v1759242449/download-removebg-preview_1_ssh7jg.png"
              alt="Company Logo"
              className="h-32 w-auto object-contain"
            />
          </div>

          {/* Spacer */}
          <div className="w-48"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-[#179E42] font-medium transition-colors"
              >
                <span>Brands</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isBrandsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-20">
                  <button
                    onClick={() => {
                      setIsBrandsDropdownOpen(false);
                      scrollToSection('product-catalog');
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#179E42] hover:text-white transition-colors"
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandClick(brand)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#179E42] hover:text-white transition-colors"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleRecommendationsClick}
              className="px-3 py-2 text-gray-700 hover:text-[#179E42] font-medium transition-colors"
            >
              Recommended for You
            </button>

            <button
              onClick={handleAboutUsClick}
              className="px-3 py-2 text-gray-700 hover:text-[#179E42] font-medium transition-colors"
            >
              About Us
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-[#179E42]/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#179E42]/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="space-y-2">
              <button 
                onClick={() => {
                  handleHomeClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#179E42]/10 hover:text-[#179E42] rounded-lg transition-colors"
              >
                Home
              </button>

              <div className="px-4 py-2">
                <div className="text-gray-700 font-medium mb-2">Brands</div>
                <div className="ml-4 space-y-1">
                  <button
                    onClick={() => {
                      scrollToSection('product-catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-1 text-gray-600 hover:text-[#179E42] transition-colors"
                  >
                    All Brands
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        handleBrandClick(brand);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1 text-gray-600 hover:text-[#179E42] transition-colors"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  handleRecommendationsClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#179E42]/10 hover:text-[#179E42] rounded-lg transition-colors"
              >
                Recommended for You
              </button>

              <button 
                onClick={() => {
                  handleAboutUsClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#179E42]/10 hover:text-[#179E42] rounded-lg transition-colors"
              >
                About Us
              </button>
            </nav>
          </div>
        )}
      </div>

      {isBrandsDropdownOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsBrandsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
