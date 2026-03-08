import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const footerLinks = {
    shop: [
      { to: '/shop?category=women', label: 'Women' },
      { to: '/shop?category=men', label: 'Men' },
      { to: '/shop?category=kids', label: 'Kids' },
      { to: '/shop', label: 'New Arrivals' },
    ],
    help: [
      { to: '#', label: 'Shipping' },
      { to: '#', label: 'Returns' },
      { to: '#', label: 'Size Guide' },
      { to: '#', label: 'Care Instructions' },
    ],
    company: [
      { to: '#', label: 'About Us' },
      { to: '#', label: 'Careers' },
      { to: '#', label: 'Stockists' },
      { to: '#', label: 'Contact' },
    ],
  };

  return (
    <footer className="bg-[#111111] text-white">
      {/* Newsletter Section */}
      <div className="px-6 lg:px-10 py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Copy */}
          <div>
            <h2
              className="text-4xl lg:text-5xl font-semibold mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Stay in the loop
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              New drops, early access, and styling notes—once a week, no noise.
            </p>
          </div>

          {/* Right - Form */}
          <div className="flex items-center">
            {isSubscribed ? (
              <div className="flex items-center gap-3 text-[#BFA67A]">
                <div className="w-10 h-10 rounded-full bg-[#BFA67A]/20 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <span className="text-lg">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 bg-white/5 border-white/20 text-white placeholder:text-white/40 rounded-full px-6"
                  required
                />
                <button
                  type="submit"
                  className="h-14 px-8 rounded-full bg-[#BFA67A] text-[#111111] font-medium uppercase tracking-[0.12em] text-sm hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Shop */}
          <div>
            <h3 className="caption text-white/40 mb-6">Shop</h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="caption text-white/40 mb-6">Help</h3>
            <ul className="space-y-4">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="caption text-white/40 mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="caption text-white/40 mb-6">Follow Us</h3>
            <a
              href="https://www.instagram.com/libas_fashion_01/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span>@libas_fashion_01</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 lg:px-10 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Libas Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-white/40 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/40 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
