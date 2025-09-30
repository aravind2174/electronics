import React from 'react';
import { X, RotateCcw } from 'lucide-react';

interface Filters {
  brands: string[];
  sizes: string[];
  screenTypes: string[];
  resolutions: string[];
  priceRange: [number, number];
  searchQuery: string;
}

interface FilterOptions {
  brands: string[];
  sizes: string[];
  screenTypes: string[];
  resolutions: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  filterOptions,
  onFiltersChange,
  onClearFilters,
  onClose,
  isOpen = true
}) => {
  const handleCheckboxChange = (
    filterType: keyof Pick<Filters, 'brands' | 'sizes' | 'screenTypes' | 'resolutions'>,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[filterType] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFiltersChange({ [filterType]: newValues });
  };

  const handlePriceRangeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFiltersChange({ priceRange: newRange });
  };

  const FilterSection: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h3>
      <div className="w-full">
        {children}
      </div>
    </div>
  );

  const CheckboxGroup: React.FC<{
    options: string[];
    selected: string[];
    filterType: keyof Pick<Filters, 'brands' | 'sizes' | 'screenTypes' | 'resolutions'>;
  }> = ({ options, selected, filterType }) => (
    <div className="space-y-2 max-h-40 overflow-y-auto w-full">
      {options.map(option => (
        <label key={option} className="flex items-center cursor-pointer w-full">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={(e) => handleCheckboxChange(filterType, option, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
          />
          <span className="ml-2 text-sm text-gray-700 break-words">{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className={`w-full lg:w-64 bg-white border-r border-gray-200 h-full ${isOpen ? 'block' : 'hidden lg:block'}`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClearFilters}
              className="flex items-center text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear
            </button>
          </div>

          {/* Brand Filter */}
          <FilterSection title="Brand">
            <CheckboxGroup
              options={filterOptions.brands}
              selected={filters.brands}
              filterType="brands"
            />
          </FilterSection>

          {/* Size Filter */}
          <FilterSection title="Screen Size">
            <CheckboxGroup
              options={filterOptions.sizes.sort((a, b) => {
                const aNum = parseInt(a);
                const bNum = parseInt(b);
                return aNum - bNum;
              })}
              selected={filters.sizes}
              filterType="sizes"
            />
          </FilterSection>

          {/* Screen Type Filter */}
          <FilterSection title="Screen Type">
            <CheckboxGroup
              options={filterOptions.screenTypes}
              selected={filters.screenTypes}
              filterType="screenTypes"
            />
          </FilterSection>

          {/* Resolution Filter */}
          <FilterSection title="Resolution">
            <CheckboxGroup
              options={filterOptions.resolutions}
              selected={filters.resolutions}
              filterType="resolutions"
            />
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection title="Price Range">
            <div className="space-y-3 w-full">
              {/* Price Display */}
              <div className="flex items-center justify-between text-xs text-gray-600 w-full">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
              
              {/* Range Sliders Container */}
              <div className="w-full px-1">
                <div className="relative h-6 w-full">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{ zIndex: 1 }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{ zIndex: 2 }}
                  />
                </div>
              </div>

              {/* Number Inputs */}
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeRange(1, parseInt(e.target.value) || 500000)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Mobile Clear Button */}
          <div className="lg:hidden pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onClearFilters();
                onClose?.();
              }}
              className="w-full flex items-center justify-center py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles for Range Sliders */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;
