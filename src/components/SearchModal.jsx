import React, { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { bestSellers, featuredCollections } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  // Combine items for searching
  const allItems = [
    ...bestSellers.map((b) => ({ ...b, type: 'Product' })),
    ...featuredCollections.map((f) => ({
      id: f.id,
      name: f.title,
      subtitle: f.description,
      priceFormatted: f.price,
      image: f.image,
      type: 'Collection'
    }))
  ];

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          (item.type && item.type.toLowerCase().includes(query.toLowerCase()))
      )
    : allItems.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-xl rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, collections, or innovations..."
            className="w-full bg-transparent text-base text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2 pr-1">
          <div className="text-[11px] font-semibold text-neutral-400 tracking-wider uppercase mb-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Innovations'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching luxury items found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl glass-panel border border-white/5 hover:border-sky-400/40 hover:bg-white/[0.08] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-sky-400">
                    {item.priceFormatted || `$${item.price?.toFixed(2)}`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
