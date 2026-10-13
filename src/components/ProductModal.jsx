import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Obsidian Cyber');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const title = item.name || item.title;
  const price = typeof item.price === 'number' ? item.price : 1299.00;
  const image = item.image;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item);
    }
    setAdded(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#ffffff']
    });
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          
          {/* Image Showcase */}
          <div className="relative h-64 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-6 overflow-hidden group">
            <div className="absolute w-36 h-36 rounded-full bg-sky-400/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <img
              src={image}
              alt={title}
              className="relative z-10 max-h-56 max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Bottom Glow Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-400/80 rounded-full blur-[2px] shadow-[0_0_12px_#38bdf8]" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-[10px] font-bold text-sky-300 tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" /> Ultra-Premium
              </div>
              <h3 className="text-xl font-extrabold text-white uppercase tracking-tight">
                {title}
              </h3>
              <p className="text-xs text-neutral-400 font-light mt-1">
                {item.subtitle || item.description || "Precision engineered for futuristic performance."}
              </p>
            </div>

            {/* Stars & Price */}
            <div className="flex items-center justify-between border-y border-white/10 py-3">
              <div>
                <span className="text-2xl font-black text-white font-mono">
                  ${price.toFixed(2)}
                </span>
                <span className="block text-[10px] text-sky-400 font-medium">
                  Tax included • Free global express
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 text-sky-400 fill-sky-400 drop-shadow-[0_0_6px_#38bdf8]"
                  />
                ))}
              </div>
            </div>

            {/* Color selection */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Finish: <span className="text-sky-300">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {[
                  { name: 'Obsidian Cyber', class: 'bg-neutral-900 border-sky-400' },
                  { name: 'Titanium Frost', class: 'bg-neutral-400 border-white' },
                  { name: 'Deep Space Blue', class: 'bg-sky-900 border-sky-500' }
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3 py-1 text-[11px] rounded-lg border transition-all ${
                      selectedColor === c.name
                        ? 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_8px_#38bdf8]'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-white/20 rounded-full bg-white/5 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-neutral-400 hover:text-white text-sm"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-neutral-400 hover:text-white text-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-emerald-500 text-white shadow-[0_0_20px_#10b981]'
                    : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                } active:scale-95`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>3-Year Global Titanium Warranty Included</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
