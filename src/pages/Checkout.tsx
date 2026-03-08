import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-[#F5F3EE] pt-32 px-6 lg:px-10">
        <div className="text-center py-20">
          <h1 className="heading-2 mb-4">Your Cart is Empty</h1>
          <p className="text-[#6E6E6E] mb-6">
            Add some items to your cart to proceed with checkout.
          </p>
          <Link to="/shop" className="btn-pill">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-20 lg:pt-24">
      <div className="px-6 lg:px-10 py-10">
        {/* Back Link */}
        {step !== 'confirmation' && (
          <button
            onClick={() => {
              if (step === 'payment') setStep('shipping');
              else navigate('/shop');
            }}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] font-medium text-[#6E6E6E] hover:text-[#111111] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 'shipping' ? 'Continue Shopping' : 'Back to Shipping'}
          </button>
        )}

        {/* Progress Steps */}
        {step !== 'confirmation' && (
          <div className="flex items-center gap-4 mb-10">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-[#111111]' : 'text-[#6E6E6E]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'shipping' ? 'bg-[#111111] text-white' : 'bg-[#BFA67A] text-[#111111]'
              }`}>
                {step === 'shipping' ? '1' : <Check className="w-4 h-4" />}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            <div className="w-12 h-px bg-[#111111]/20" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#111111]' : 'text-[#6E6E6E]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'payment' ? 'bg-[#111111] text-white' : 'bg-[#111111]/10'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit}>
                <h1 className="heading-2 mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Shipping Information
                </h1>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="caption text-[#6E6E6E] mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="caption text-[#6E6E6E] mb-2 block">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="caption text-[#6E6E6E] mb-2 block">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="caption text-[#6E6E6E] mb-2 block">
                      Address
                    </Label>
                    <Input
                      id="address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="caption text-[#6E6E6E] mb-2 block">
                        City
                      </Label>
                      <Input
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="caption text-[#6E6E6E] mb-2 block">
                        State
                      </Label>
                      <Input
                        id="state"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip" className="caption text-[#6E6E6E] mb-2 block">
                        ZIP
                      </Label>
                      <Input
                        id="zip"
                        required
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-pill w-full mt-4">
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit}>
                <h1 className="heading-2 mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Payment
                </h1>

                <div className="flex items-center gap-2 mb-6 text-[#6E6E6E]">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Your payment information is secure</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber" className="caption text-[#6E6E6E] mb-2 block">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="caption text-[#6E6E6E] mb-2 block">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="caption text-[#6E6E6E] mb-2 block">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nameOnCard" className="caption text-[#6E6E6E] mb-2 block">
                      Name on Card
                    </Label>
                    <Input
                      id="nameOnCard"
                      required
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                      className="h-12 bg-white border-[#111111]/20 focus:border-[#111111]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-pill w-full mt-4 disabled:opacity-70"
                  >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(0)}`}
                  </button>
                </div>
              </form>
            )}

            {step === 'confirmation' && (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-[#BFA67A] flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-[#111111]" />
                </div>
                <h1
                  className="heading-2 mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Order Confirmed!
                </h1>
                <p className="text-[#6E6E6E] mb-8 max-w-md mx-auto">
                  Thank you for your purchase. We have sent a confirmation email to{' '}
                  {shippingInfo.email}. Your order will be shipped within 2-3 business days.
                </p>
                <Link to="/shop" className="btn-pill">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {step !== 'confirmation' && (
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg sticky top-28">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-[#E8E4DC] rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-[#6E6E6E]">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-xs text-[#6E6E6E]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-[#111111]/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6E6E6E]">Subtotal</span>
                    <span>${subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6E6E6E]">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold pt-3 border-t border-[#111111]/10">
                    <span>Total</span>
                    <span>${total.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
