import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { getProductById } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import { SizeSelector } from '@/components/product/SizeSelector';
import { ColorSwatch } from '@/components/product/ColorSwatch';
import { ProductCard } from '@/components/product/ProductCard';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] pt-32 px-6 lg:px-10">
        <div className="text-center py-20">
          <h1 className="heading-2 mb-4">Product Not Found</h1>
          <p className="text-[#6E6E6E] mb-6">
            The product you are looking for does not exist.
          </p>
          <Link to="/shop" className="btn-pill">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }

    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) return;
    handleAddToCart();
    navigate('/checkout');
  };

  // Get related products (same category, excluding current)
  const relatedProducts = cartItems
    .filter((item) => item.product.id !== product.id)
    .slice(0, 4)
    .map((item) => item.product);

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-20 lg:pt-24">
      {/* Added to Cart Toast */}
      {showAddedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#111111] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
          <div className="w-8 h-8 rounded-full bg-[#BFA67A] flex items-center justify-center">
            <Check className="w-4 h-4 text-[#111111]" />
          </div>
          <div>
            <p className="font-medium">Added to cart</p>
            <p className="text-sm text-white/70">{product.name}</p>
          </div>
        </div>
      )}

      <div className="px-6 lg:px-10 py-10">
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] font-medium text-[#6E6E6E] hover:text-[#111111] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image */}
          <div className="aspect-[3/4] bg-[#E8E4DC] rounded-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Title & Price */}
            <div className="mb-6">
              {product.isNew && (
                <span className="caption text-[#BFA67A] mb-2 block">New Arrival</span>
              )}
              <h1
                className="heading-2 mb-3"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {product.name}
              </h1>
              <p className="text-2xl font-medium">${product.price}</p>
            </div>

            {/* Description */}
            <p className="body-text text-[#6E6E6E] mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="caption text-[#6E6E6E]">Color</span>
                {selectedColor && (
                  <span className="text-sm">{selectedColor}</span>
                )}
              </div>
              <ColorSwatch
                colors={product.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="caption text-[#6E6E6E]">Size</span>
                <button className="text-sm text-[#6E6E6E] underline">
                  Size Guide
                </button>
              </div>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="caption text-[#6E6E6E] mb-3 block">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F5F3EE] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F5F3EE] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="btn-pill w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!selectedSize || !selectedColor}
                className="btn-pill-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              {(!selectedSize || !selectedColor) && (
                <p className="text-sm text-[#6E6E6E] text-center">
                  Please select a size and color
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-6 border-t border-[#111111]/10 space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#BFA67A]" />
                <span className="text-sm">Free shipping on orders over $150</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#BFA67A]" />
                <span className="text-sm">30-day easy returns</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#BFA67A]" />
                <span className="text-sm">Sustainable materials</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#111111]/10 pt-16">
            <h2
              className="heading-3 mb-8"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
