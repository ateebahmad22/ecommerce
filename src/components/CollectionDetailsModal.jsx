import React from 'react';
import { X, ArrowRight, Plus, Star, Sparkles } from 'lucide-react';

export default function CollectionDetailsModal({ collection, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !collection) return null;

  const collectionProducts = [
    {
      id: `${collection.id}-1`,
      name: `${collection.title} Standard`,
      price: 890.00,
      image: collection.image,
      desc: "Flagship configuration engineered with aerospace alloys and high-frequency finishing.",
      rating: 5
    },
    {
      id: `${collection.id}-2`,
      name: `${collection.title} Bespoke Edition`,
      price: 1450.00,
      image: collection.image,
      desc: "Limited atelier edition with hand-polished titanium bevels and serial engraving.",
      rating: 5
    },
    {
      id: `${collection.id}-3`,
      name: `${collection.title} Stealth Matrix`,
      price: 1980.00,
      image: collection.image,
      desc: "Ultra-matte obsidian diamond-like carbon (DLC) coating with sapphire internals.",
      rating: 5
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-1 overflow-hidden">
            <img src={collection.image} alt={collection.title} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
              {collection.badge || "Featured Collection"}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {collection.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
          {collection.description} Discover the complete lineup of ultra-premium variants available for allocation.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collectionProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl glass-panel p-4 flex flex-col justify-between border border-white/10 hover:border-sky-400/40 transition-all group"
            >
              <div className="h-32 rounded-xl bg-black/30 border border-white/5 flex items-center justify-center p-2 mb-3 overflow-hidden">
                <img src={p.image} alt={p.name} className="max-h-28 max-w-full object-contain group-hover:scale-110 transition-transform" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase line-clamp-1">{p.name}</h4>
                <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2">{p.desc}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-mono font-bold text-sky-300">${p.price.toFixed(2)}</span>
                  <div className="flex text-sky-400">
                    {[...Array(p.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-sky-400" />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(p)}
                className="mt-4 w-full py-2 rounded-xl bg-white/10 hover:bg-sky-500 hover:text-black text-white text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-neutral-400">
          <span>All allocations include titanium authenticity serial and zero-delay shipping.</span>
          <button onClick={onClose} className="text-white hover:text-sky-300 font-semibold">
            Close Showcase
          </button>
        </div>

      </div>
    </div>
  );
}
