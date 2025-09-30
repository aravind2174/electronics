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
  const priceRanges = [
    'Under ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹75,000', 
    '₹75,000 - ₹1,50,000',
    '₹1,50,000 - ₹3,00,000',
    'Above ₹3,00,000'
  ];

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

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    let minPrice = 0;
    let maxPrice = 1000000;

    switch (range) {
      case 'Under ₹25,000':
        minPrice = 0;
        maxPrice = 25000;
        break;
      case '₹25,000 - ₹50,000':
        minPrice = 25000;
        maxPrice = 50000;
        break;
      case '₹50,000 - ₹75,000':
        minPrice = 50000;
        maxPrice = 75000;
        break;
      case '₹75,000 - ₹1,50,000':
        minPrice = 75000;
        maxPrice = 150000;
        break;
      case '₹1,50,000 - ₹3,00,000':
        minPrice = 150000;
        maxPrice = 300000;
        break;
      case 'Above ₹3,00,000':
        minPrice = 300000;
        maxPrice = 1000000;
        break;
    }

    if (checked) {
      onFiltersChange({ priceRange: [minPrice, maxPrice] });
    } else {
      onFiltersChange({ priceRange: [0, 1000000] });
    }
  };

  const isPriceRangeSelected = (range: string): boolean => {
    const [min, max] = filters.priceRange;
    
    switch (range) {
      case 'Under ₹25,000':
        return min === 0 && max === 25000;
      case '₹25,000 - ₹50,000':
        return min === 25000 && max === 50000;
      case '₹50,000 - ₹75,000':
        return min === 50000 && max === 75000;
      case '₹75,000 - ₹1,50,000':
        return min === 75000 && max === 150000;
      case '₹1,50,000 - ₹3,00,000':
        return min === 150000 && max === 300000;
      case 'Above ₹3,00,000':
        return min === 300000 && max === 1000000;
      default:
        return false;
    }
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
            <div className="space-y-2 max-h-40 overflow-y-auto w-full">
              {priceRanges.map(range => (
                <label key={range} className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={isPriceRangeSelected(range)}
                    onChange={(e) => handlePriceRangeChange(range, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="ml-2 text-sm text-gray-700 break-words">{range}</span>
                </label>
              ))}
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
    </div>
  );
};

export default FilterSidebar;
