import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Samsung 65" QLED 4K Smart TV',
    brand: 'Samsung',
    price: 89999,
    originalPrice: 109999,
    image: 'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
    images: [
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
      'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
      'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg'
    ],
    size: '65"',
    screenType: 'QLED',
    resolution: '4K',
    tags: ['Smart TV', 'HDR', 'Gaming'],
    rating: 4.5,
    reviews: 234,
    features: ['Quantum Processor 4K', 'HDR10+', 'Smart Hub', 'Gaming Mode'],
    warranty: '2 Years',
    inStock: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'LG 55" OLED 4K Smart TV',
    brand: 'LG',
    price: 129999,
    originalPrice: 149999,
    image: 'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
    images: [
      'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
      'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg'
    ],
    size: '55"',
    screenType: 'OLED',
    resolution: '4K',
    tags: ['OLED', 'Cinema HDR', 'AI ThinQ'],
    rating: 4.7,
    reviews: 189,
    features: ['Perfect Black', 'Dolby Vision IQ', 'α9 Gen4 AI Processor', 'webOS'],
    warranty: '2 Years',
    inStock: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Sony 75" LED 4K Smart TV',
    brand: 'Sony',
    price: 159999,
    image: 'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
    images: [
      'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
      'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg'
    ],
    size: '75"',
    screenType: 'LED',
    resolution: '4K',
    tags: ['X1 Processor', 'Android TV', 'Dolby Vision'],
    rating: 4.3,
    reviews: 156,
    features: ['X1 Ultimate Processor', 'Full Array LED', 'Android TV', 'Voice Remote'],
    warranty: '2 Years',
    inStock: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'TCL 43" LED Full HD Smart TV',
    brand: 'TCL',
    price: 24999,
    originalPrice: 29999,
    image: 'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
    images: [
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg',
      'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg'
    ],
    size: '43"',
    screenType: 'LED',
    resolution: 'Full HD',
    tags: ['Smart TV', 'HDR', 'Budget Friendly'],
    rating: 4.1,
    reviews: 89,
    features: ['HDR10', 'Smart TV', 'Multiple Connectivity', 'Dolby Audio'],
    warranty: '1 Year',
    inStock: true,
    isNew: true
  },
  {
    id: '5',
    name: 'Samsung 85" QLED 8K Smart TV',
    brand: 'Samsung',
    price: 449999,
    image: 'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
    images: [
      'https://images.pexels.com/photos/1092637/pexels-photo-1092637.jpeg',
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg'
    ],
    size: '85"',
    screenType: 'QLED',
    resolution: '8K',
    tags: ['8K', 'Premium', 'AI Upscaling'],
    rating: 4.8,
    reviews: 45,
    features: ['8K AI Upscaling', 'Neo Quantum Processor 8K', 'HDR10+', 'Smart Hub'],
    warranty: '3 Years',
    inStock: true,
    isFeatured: true
  },
  {
    id: '6',
    name: 'LG 32" LED Full HD Smart TV',
    brand: 'LG',
    price: 18999,
    originalPrice: 22999,
    image: 'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
    images: [
      'https://images.pexels.com/photos/1545588/pexels-photo-1545588.jpeg',
      'https://images.pexels.com/photos/1682828/pexels-photo-1682828.jpeg'
    ],
    size: '32"',
    screenType: 'LED',
    resolution: 'Full HD',
    tags: ['Compact', 'Smart TV', 'webOS'],
    rating: 4.2,
    reviews: 112,
    features: ['webOS', 'Active HDR', 'Magic Remote', 'ThinQ AI'],
    warranty: '2 Years',
    inStock: true
  }
];

export const featuredProducts = products.filter(p => p.isFeatured);
export const newProducts = products.filter(p => p.isNew);