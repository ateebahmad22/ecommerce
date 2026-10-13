import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedCollections from './components/FeaturedCollections';
import BestSellingSection from './components/BestSellingSection';
import StorySection from './components/StorySection';
import ValuePropsSection from './components/ValuePropsSection';
import ReviewsSection from './components/ReviewsSection';
import LimitedOfferSection from './components/LimitedOfferSection';
import StayAheadSection from './components/StayAheadSection';
import FooterSection from './components/FooterSection';

// Interactive Modals
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import CustomerServiceModal from './components/CustomerServiceModal';
import ExploreModal from './components/ExploreModal';
import ResourcesModal from './components/ResourcesModal';
import ConciergeChatModal from './components/ConciergeChatModal';
import WriteReviewModal from './components/WriteReviewModal';
import CollectionDetailsModal from './components/CollectionDetailsModal';

import { bestSellers } from './data/products';
import { CheckCircle2, MessageSquare, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function App() {
  // Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: "prod-1",
      name: "QUANTUM SLIMBOOK",
      price: 1299.00,
      image: "/assets/prod_slimbook_item.png",
      qty: 1
    }
  ]);

  // User State
  const [currentUser, setCurrentUser] = useState(null);

  // Modal States
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Apple Pay');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Secondary Modals
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState('INV-8924');
  const [customerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [customerServiceTab, setCustomerServiceTab] = useState('faq');
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreTab, setExploreTab] = useState('about');
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [resourcesTab, setResourcesTab] = useState('philosophy');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [latestReview, setLatestReview] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Notification Toast & Sound
  const [notification, setNotification] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  };

  const showNotification = (msg) => {
    setNotification(msg);
    playChime();
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    const title = product.name || product.title;
    const price = typeof product.price === 'number' ? product.price : 1299.00;
    const image = product.image;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: title, price, image, qty: 1 }];
    });

    showNotification(`Added ${title} to your bag.`);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Value Prop Card Handlers
  const handleValuePropClick = (id) => {
    if (id === 'global-express') {
      setActiveTrackingId('INV-8924');
      setTrackingOpen(true);
    } else if (id === 'elite-craft') {
      setExploreTab('technology');
      setExploreOpen(true);
    } else if (id === 'fortified-pay') {
      setSelectedPaymentMethod('Apple Pay');
      setCheckoutOpen(true);
    } else if (id === 'smooth-returns') {
      setCustomerServiceTab('returns');
      setCustomerServiceOpen(true);
    } else if (id === 'eternal-assist') {
      setConciergeOpen(true);
    }
  };

  const handleOpenExplore = (tab) => {
    setExploreTab(tab);
    setExploreOpen(true);
  };

  const handleOpenCustomerService = (tab) => {
    setCustomerServiceTab(tab);
    setCustomerServiceOpen(true);
  };

  const handleOpenResources = (tab) => {
    setResourcesTab(tab);
    setResourcesOpen(true);
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#05070b] text-neutral-100 relative selection:bg-sky-400 selection:text-black">
      {/* Particle dust background */}
      <ParticleBackground />

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onNavigate={scrollToSection}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Floating Concierge & Sound Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setConciergeOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
          title="Open 24/7 AI Luxury Concierge"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Concierge</span>
        </button>
      </div>

      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playChime();
          }}
          className="px-3 py-2 rounded-full glass-panel border border-white/10 hover:border-sky-400/40 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 shadow-xl backdrop-blur-xl transition-all"
          title="Toggle ambient haptics & audio cues"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Audio Haptics: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Audio Haptics: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-5 py-3 rounded-2xl glass-panel border border-sky-400/40 text-white text-xs font-medium flex items-center gap-2.5 shadow-[0_10px_30px_rgba(56,189,248,0.3)]">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Main Sections */}
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <HeroSection
          onExplore={scrollToSection}
          onQuickView={(id) => {
            const item = bestSellers[0];
            setSelectedProduct(item);
          }}
          onBookNow={() => {
            setSelectedPaymentMethod('Apple Pay');
            setCheckoutOpen(true);
          }}
          onCallToAction={() => setConciergeOpen(true)}
        />

        {/* Section 2: Featured Collections */}
        <FeaturedCollections
          onSelectCollection={(col) => setSelectedCollection(col)}
        />

        {/* Section 3: Best Selling Innovations */}
        <BestSellingSection
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setSelectedProduct(prod)}
        />

        {/* Section 4: Our Innovation Story */}
        <StorySection />

        {/* Section 5: Fifth Section (Value Propositions) */}
        <ValuePropsSection
          onSelectValueProp={handleValuePropClick}
        />

        {/* Section 6: Elite Innovator Reviews */}
        <ReviewsSection
          latestReview={latestReview}
          onOpenWriteReview={() => setWriteReviewOpen(true)}
        />

        {/* Section 7: Limited-Time Offer */}
        <LimitedOfferSection
          onShopSale={() => {
            showNotification('Flash Sale Applied: 40% OFF code CYBER40 unlocked!');
            setSelectedPaymentMethod('Apple Pay');
            setCheckoutOpen(true);
          }}
        />

        {/* Section 8: Stay Ahead */}
        <StayAheadSection />

        {/* Section 9: Footer */}
        <FooterSection
          onNavigate={scrollToSection}
          onOpenExplore={handleOpenExplore}
          onOpenCustomerService={handleOpenCustomerService}
          onOpenTracking={() => {
            setActiveTrackingId('INV-8924');
            setTrackingOpen(true);
          }}
          onOpenResources={handleOpenResources}
          onOpenConcierge={() => setConciergeOpen(true)}
          onSelectPayment={handleSelectPaymentMethod}
        />
      </main>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={(total) => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        initialPaymentMethod={selectedPaymentMethod}
        onOrderComplete={(order) => {
          setCartItems([]);
          showNotification(`Order sealed! Order ID: ${order.orderId}`);
        }}
      />

      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(item) => setSelectedProduct(item)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showNotification(`Welcome, ${user.name}!`);
        }}
      />

      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        initialTracking={activeTrackingId}
      />

      <CustomerServiceModal
        isOpen={customerServiceOpen}
        onClose={() => setCustomerServiceOpen(false)}
        initialTab={customerServiceTab}
      />

      <ExploreModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        initialTab={exploreTab}
      />

      <ResourcesModal
        isOpen={resourcesOpen}
        onClose={() => setResourcesOpen(false)}
        initialTab={resourcesTab}
      />

      <ConciergeChatModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
      />

      <WriteReviewModal
        isOpen={writeReviewOpen}
        onClose={() => setWriteReviewOpen(false)}
        onReviewAdded={(newRev) => {
          setLatestReview(newRev);
          showNotification('Testimonial added to verified innovator roster!');
        }}
      />

      <CollectionDetailsModal
        isOpen={!!selectedCollection}
        collection={selectedCollection}
        onClose={() => setSelectedCollection(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
