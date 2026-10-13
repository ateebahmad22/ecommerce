import React, { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { bestSellers } from '../data/products';

export default function BestSellingSection({ onAddToCart, onQuickView }) {
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="products" className="relative py-24 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sky-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            BEST SELLING INNOVATIONS.
          </h2>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              onClick={() => onQuickView(item)}
              className="group relative flex flex-col justify-between rounded-2xl glass-panel p-4 cursor-pointer glass-panel-hover overflow-hidden"
            >
              {/* Top ambient highlight gradient */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

              {/* Product Visual Showcase */}
              <div className="relative w-full h-44 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-black/20">
                <div className="absolute w-24 h-24 rounded-full bg-sky-400/20 blur-xl group-hover:scale-125 transition-transform duration-500" />
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative z-10 max-h-36 max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase line-clamp-2 leading-tight group-hover:text-sky-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                {/* Price and Rating row */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {item.priceFormatted}
                  </span>
                  
                  {/* Glowing Blue/Cyan Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < item.rating
                            ? 'text-sky-400 fill-sky-400 drop-shadow-[0_0_6px_#38bdf8]'
                            : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Glass Add Button [+] */}
                <button
                  onClick={(e) => handleAdd(e, item)}
                  className={`mt-4 w-full py-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    addedIds[item.id]
                      ? 'bg-sky-500 border-sky-400 text-black shadow-[0_0_15px_#38bdf8]'
                      : 'bg-white/[0.07] hover:bg-white/[0.18] border-white/20 text-neutral-200 hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                  } active:scale-95`}
                  title="Add to shopping bag"
                >
                  {addedIds[item.id] ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Added
                    </span>
                  ) : (
                    <Plus className="w-4 h-4 transition-transform group-hover:scale-125" />
                  )}
                </button>
              </div>

              {/* Cyan Glow Bar at the Bottom */}
              <div className="mt-4 pt-2 flex justify-center">
                <div className="w-14 h-[3px] rounded-full bg-sky-400/70 shadow-[0_0_12px_#38bdf8] transition-all duration-300 group-hover:w-24 group-hover:bg-sky-300 group-hover:shadow-[0_0_18px_#38bdf8]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
