export interface Product {
  id: string;
  name: string;
  brand: 'TCL' | 'VU TV' | 'Hisense';
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  size: '32"' | '40"' | '43"' | '50"' | '55"' | '65"' | '75"' | '78"' | '85"' | '98"' | '100"' | '120"';
  screenType: 'QLED' | 'Mini LED' | 'ULED' | 'Laser TV' | 'Smart TV' | 'Google TV' | 'LED' | 'OLED';
  resolution: 'FHD' | 'UHD 4K' | '4K HDR' | 'Full HD' | '4K' | '8K';
  tags: string[];
  rating: number;
  reviews: number;
  features: string[];
  warranty: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryDate?: string;
  address: Address;
  paymentMethod: string;
}

// Additional interfaces for filter data
export interface FilterOptions {
  brands: string[];
  sizes: string[];
  screenTypes: string[];
  resolutions: string[];
}

export interface Filters {
  brands: string[];
  sizes: string[];
  screenTypes: string[];
  resolutions: string[];
  priceRange: [number, number];
  searchQuery: string;
}

// Brand-specific data mapping
export const brandSpecifications = {
  'TCL': {
    screenTypes: ['Mini LED', 'QLED', 'Google TV', 'Smart TV', 'LED'],
    resolutions: ['FHD', 'UHD 4K', '4K HDR'],
    sizes: ['32"', '40"', '43"', '50"', '65"', '75"', '85"', '98"']
  },
  'VU TV': {
    screenTypes: ['QLED'],
    resolutions: ['UHD 4K', '4K HDR'],
    sizes: ['43"', '50"', '55"', '65"', '75"']
  },
  'Hisense': {
    screenTypes: ['Laser TV', 'Mini LED', 'QLED', 'ULED', 'Smart TV'],
    resolutions: ['FHD', 'UHD 4K', '4K HDR'],
    sizes: ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '78"', '85"', '98"', '100"', '120"']
  }
} as const;

// Filter options for the sidebar
export const filterOptions: FilterOptions = {
  brands: ['TCL', 'VU TV', 'Hisense'],
  sizes: ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '78"', '85"', '98"', '100"', '120"'],
  screenTypes: ['QLED', 'Mini LED', 'ULED', 'Laser TV', 'Smart TV', 'Google TV', 'LED', 'OLED'],
  resolutions: ['FHD', 'UHD 4K', '4K HDR', 'Full HD', '4K', '8K']
};
