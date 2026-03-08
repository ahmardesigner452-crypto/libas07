import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
  { label: 'Kids', value: 'kids' },
  { label: 'Accessories', value: 'accessories' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sync with URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.some((c) => c.value === category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 lg:pt-32">
      <div className="px-6 lg:px-10 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="heading-1 mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Shop
          </h1>
          <p className="body-text text-[#6E6E6E] max-w-xl">
            Discover our latest collection of modern classics designed for everyday life.
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 pb-6 border-b border-[#111111]/10">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-full text-sm uppercase tracking-[0.1em] font-medium transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-[#111111] text-[#F5F3EE]'
                    : 'bg-transparent border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F5F3EE]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6E6E6E]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-transparent border border-[#111111]/20 rounded-full text-sm focus:outline-none focus:border-[#111111]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[#6E6E6E] mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-[#6E6E6E]">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
