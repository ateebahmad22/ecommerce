import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckoutSuccess
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 1299) * item.qty,
    0
  );

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const finalTotal = rawSubtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'INNOVATE20') {
      setDiscountPercent(20);
      setPromoMessage('20% Exclusive Discount Applied!');
    } else if (promoCode.trim().toUpperCase() === 'VIP') {
      setDiscountPercent(15);
      setPromoMessage('15% VIP Access Applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "INNOVATE20"');
    }
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#ffffff', '#0284c7', '#34d399']
    });
    onCheckoutSuccess(finalTotal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070a12]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl relative">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Shopping Bag ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="mt-6 space-y-4 max-h-[46vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center text-neutral-400 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-neutral-500">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-medium">Your shopping bag is currently empty.</p>
                  <p className="text-xs text-neutral-400">Explore the collections to add futuristic items.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-2xl glass-panel border border-white/10"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name || item.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.name || item.title}
                      </h4>
                      <p className="text-[11px] font-mono text-sky-300 mt-0.5">
                        ${(item.price || 1299).toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-5 h-5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white px-1">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-5 h-5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-2 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. INNOVATE20)"
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/15 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white rounded-xl transition-all"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] ${discountPercent > 0 ? 'text-sky-300' : 'text-neutral-400'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-sky-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Global Express Transit</span>
                  <span className="text-sky-400 font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Total Due</span>
                  <span className="text-sky-300 font-mono text-base">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-extrabold tracking-widest uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Quantum Biometric Encryption Secured</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
