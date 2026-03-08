import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Relaxed Linen Shirt',
    price: 79,
    category: 'women',
    image: '/images/product_linen_shirt.jpg',
    description: 'A breathable linen shirt with a relaxed fit, perfect for warm days. Features a classic collar and mother-of-pearl buttons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#F5F3EE' },
      { name: 'Sand', hex: '#C4B7A6' },
      { name: 'Sage', hex: '#9CAF88' },
    ],
    isNew: true,
  },
  {
    id: '2',
    name: 'Tailored Trouser',
    price: 110,
    category: 'women',
    image: '/images/product_trouser.jpg',
    description: 'Elegant tailored trousers with a high waist and wide leg. Crafted from premium wool blend for all-day comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Taupe', hex: '#B8A99A' },
      { name: 'Charcoal', hex: '#4A4A4A' },
      { name: 'Navy', hex: '#2C3E50' },
    ],
    isNew: true,
  },
  {
    id: '3',
    name: 'Soft Knit Polo',
    price: 65,
    category: 'men',
    image: '/images/product_polo.jpg',
    description: 'A luxurious knit polo in superfine merino wool. Soft, lightweight, and endlessly versatile.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Beige', hex: '#D4C4B0' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
    isNew: true,
  },
  {
    id: '4',
    name: 'Canvas Tote',
    price: 95,
    category: 'accessories',
    image: '/images/product_tote.jpg',
    description: 'A spacious canvas tote with leather handles and brass hardware. Perfect for everyday essentials.',
    sizes: ['One Size'],
    colors: [
      { name: 'Natural', hex: '#E8DCC4' },
      { name: 'Olive', hex: '#6B7C5C' },
    ],
    isNew: true,
  },
  {
    id: '5',
    name: 'Minimal Sneaker',
    price: 140,
    category: 'men',
    image: '/images/product_sneaker.jpg',
    description: 'Clean, minimal sneakers in premium Italian leather. Cushioned sole for all-day comfort.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Off-White', hex: '#F5F5DC' },
    ],
    isNew: true,
  },
  {
    id: '6',
    name: 'Silk Scarf',
    price: 55,
    category: 'accessories',
    image: '/images/product_scarf.jpg',
    description: 'A luxurious silk scarf with an abstract print. Perfect for adding a touch of elegance to any outfit.',
    sizes: ['One Size'],
    colors: [
      { name: 'Terracotta', hex: '#C67C5C' },
      { name: 'Navy', hex: '#1E3A5F' },
    ],
    isNew: true,
  },
  {
    id: '7',
    name: 'Oversized Blazer',
    price: 175,
    category: 'women',
    image: '/images/product_oversized_blazer.jpg',
    description: 'A structured oversized blazer with single-button closure. The perfect layering piece for any season.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Cream', hex: '#F5F5DC' },
    ],
    isNew: true,
  },
  {
    id: '8',
    name: 'Wide-Leg Jean',
    price: 98,
    category: 'women',
    image: '/images/product_jeans.jpg',
    description: 'High-waisted wide-leg jeans in premium denim. Flattering fit with a vintage-inspired silhouette.',
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    colors: [
      { name: 'Light Wash', hex: '#B8C4D4' },
      { name: 'Medium Wash', hex: '#7A8BA8' },
    ],
    isNew: true,
  },
];

export const featuredProduct = products[6]; // Oversized Blazer

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
