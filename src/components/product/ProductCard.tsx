import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0].name;
    addItem(product, defaultSize, defaultColor);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#E8E4DC] rounded-sm overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image w-full h-full object-cover"
        />

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#111111] text-white text-xs uppercase tracking-wider">
            New
          </div>
        )}

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className={`quick-add absolute bottom-4 left-4 right-4 py-3 bg-[#111111] text-white text-sm uppercase tracking-[0.12em] font-medium flex items-center justify-center gap-2 hover:bg-[#BFA67A] hover:text-[#111111] transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Plus className="w-4 h-4" />
          Quick Add
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="text-[#6E6E6E] text-sm">${product.price}</p>
      </div>
    </Link>
  );
}
