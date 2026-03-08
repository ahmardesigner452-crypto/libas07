import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#111111]/10">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Your Cart
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F5F3EE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Content */}
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <ShoppingBag className="w-16 h-16 text-[#6E6E6E] mb-4" />
          <p className="text-lg text-[#6E6E6E] mb-2">Your cart is empty</p>
          <p className="text-sm text-[#6E6E6E] mb-6">Add some items to get started</p>
          <Link
            to="/shop"
            onClick={onClose}
            className="btn-pill"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 px-6">
            <div className="py-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-32 bg-[#E8E4DC] rounded-sm overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-xs text-[#6E6E6E] mt-1">
                          {item.color} / Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#6E6E6E] hover:text-[#111111] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F5F3EE] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F5F3EE] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-6 border-t border-[#111111]/10 bg-[#F5F3EE]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#6E6E6E]">Subtotal</span>
              <span className="text-xl font-semibold">${getTotalPrice().toFixed(0)}</span>
            </div>
            <p className="text-xs text-[#6E6E6E] mb-6">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn-pill w-full mb-3"
            >
              Checkout
            </Link>
            <button
              onClick={onClose}
              className="btn-pill-outline w-full"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
