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
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const CheckboxGroup: React.FC<{
    options: string[];
    selected: string[];
    filterType: keyof Pick<Filters, 'brands' | 'sizes' | 'screenTypes' | 'resolutions'>;
  }> = ({ options, selected, filterType }) => (
    <div className="space-y-3 max-h-48 overflow-y-auto">
      {options.map(option => (
        <label key={option} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={(e) => handleCheckboxChange(filterType, option, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-3 text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className={`bg-white h-full ${isOpen ? 'block' : 'hidden lg:block'}`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 lg:p-0 lg:sticky lg:top-4">
        {/* Header - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClearFilters}
            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear All
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
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            
            <div className="px-2">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 500000)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        </FilterSection>

        {/* Mobile Clear Button */}
        <div className="lg:hidden pt-6 border-t">
          <button
            onClick={() => {
              onClearFilters();
              onClose?.();
            }}
            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;