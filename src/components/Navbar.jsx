import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  activeSection,
  onNavigate,
  onOpenConcierge,
  currentUser
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (target) => {
    if (target === 'contact') {
      onOpenConcierge();
    } else {
      onNavigate(target);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06080e]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Apple Logo & Brand */}
        <div 
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <svg
            className="w-5 h-5 text-white fill-current transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            viewBox="0 0 170 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
          </svg>
        </div>

        {/* Center Pill Menu (Desktop) */}
        <nav className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <button
            onClick={() => handleLinkClick('hero')}
            className="relative px-5 py-1.5 text-sm font-medium text-white transition-all duration-300 rounded-full"
          >
            <span className="relative z-10">Premium</span>
            <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(56,189,248,0.3)]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
          </button>

          <button
            onClick={() => handleLinkClick('story')}
            className="px-4 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200"
          >
            Design
          </button>

          <button
            onClick={() => handleLinkClick('products')}
            className="px-4 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200"
          >
            Products
          </button>

          <button
            onClick={() => handleLinkClick('collections')}
            className="px-4 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200"
          >
            Fashion
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className="px-4 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-200"
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons & Sign Up */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 group"
            title="Search products"
          >
            <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 group"
            title="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sky-500 text-[10px] font-bold text-black flex items-center justify-center shadow-[0_0_10px_#38bdf8] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Sign Up / User Profile Button */}
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-xs font-semibold text-sky-300 tracking-wide border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentUser.name || 'Innovator'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-1.5 rounded-full bg-white/[0.12] hover:bg-white/[0.22] text-xs font-semibold text-white tracking-wide border border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:scale-95"
            >
              Sign up
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#080b12]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-2">
            {[
              { label: 'Premium', target: 'hero' },
              { label: 'Design', target: 'story' },
              { label: 'Products', target: 'products' },
              { label: 'Fashion', target: 'collections' },
              { label: 'Contact', target: 'contact' },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
