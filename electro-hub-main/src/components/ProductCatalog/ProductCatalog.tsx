import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import FilterSidebar from './FilterSidebar';
import { products } from '../../data/products';
import { Product } from '../../types';

interface ProductCatalogProps {
  onProductClick: (productId: string) => void;
  selectedBrand?: string;
}

interface Filters {
  brands: string[];
  sizes: string[];
  screenTypes: string[];
  resolutions: string[];
  priceRange: [number, number];
  searchQuery: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onProductClick, selectedBrand = '' }) => {
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    sizes: [],
    screenTypes: [],
    resolutions: [],
    priceRange: [0, 500000],
    searchQuery: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'name'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Apply selectedBrand filter when it changes
  useEffect(() => {
    if (selectedBrand && selectedBrand !== '') {
      setFilters(prev => ({
        ...prev,
        brands: [selectedBrand]
      }));
    }
  }, [selectedBrand]);

  // Get unique filter options
  const filterOptions = useMemo(() => ({
    brands: [...new Set(products.map(p => p.brand))],
    sizes: [...new Set(products.map(p => p.size))],
    screenTypes: [...new Set(products.map(p => p.screenType))],
    resolutions: [...new Set(products.map(p => p.resolution))]
  }), []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesSize = filters.sizes.length === 0 || filters.sizes.includes(product.size);
      const matchesScreenType = filters.screenTypes.length === 0 || filters.screenTypes.includes(product.screenType);
      const matchesResolution = filters.resolutions.length === 0 || filters.resolutions.includes(product.resolution);
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesSearch = filters.searchQuery === '' || 
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return matchesBrand && matchesSize && matchesScreenType && matchesResolution && matchesPrice && matchesSearch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      sizes: [],
      screenTypes: [],
      resolutions: [],
      priceRange: [0, 500000],
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.brands.length > 0 || 
    filters.sizes.length > 0 || 
    filters.screenTypes.length > 0 || 
    filters.resolutions.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 500000 ||
    filters.searchQuery !== '';

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TV Collection
          </h2>
          <p className="text-xl text-gray-600">
            Find the perfect TV for your home
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-1 text-white text-xs rounded-full" style={{ backgroundColor: '#179E42' }}>
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${isFilterOpen ? 'fixed inset-0 z-50 lg:relative lg:inset-auto' : 'hidden lg:block'}`}>
            <FilterSidebar
              filters={filters}
              filterOptions={filterOptions}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              onClose={() => setIsFilterOpen(false)}
              isOpen={isFilterOpen}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.searchQuery}
                    onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      '--tw-ring-color': '#179E42'
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 2px #179E42`;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                    }}
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      '--tw-ring-color': '#179E42'
                    } as React.CSSProperties}
                    onFocus={(e) => {
                      e.target.style.boxShadow = `0 0 0 2px #179E42`;
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                    }}
                  >
                    <option value="name">Name</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {filters.brands.map(brand => (
                    <span key={brand} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {brand}
                      <button
                        onClick={() => updateFilters({ brands: filters.brands.filter(b => b !== brand) })}
                        className="ml-2 hover:text-green-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {filters.searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      "{filters.searchQuery}"
                      <button
                        onClick={() => updateFilters({ searchQuery: '' })}
                        className="ml-2 hover:text-green-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Results Count and Pagination Info */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </p>
              {totalPages > 1 && (
                <p className="text-gray-600 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => onProductClick(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex space-x-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 rounded-lg ${
                                currentPage === page
                                  ? 'text-white'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                              style={{
                                backgroundColor: currentPage === page ? '#179E42' : undefined
                              }}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 3 ||
                          page === currentPage + 3
                        ) {
                          return (
                            <span key={page} className="px-2 py-2">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#179E42' }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
