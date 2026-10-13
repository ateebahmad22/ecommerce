import React from 'react';
import { ArrowRight } from 'lucide-react';
import { featuredCollections } from '../data/products';

export default function FeaturedCollections({ onSelectCollection }) {
  return (
    <section id="collections" className="relative py-24 overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            FEATURED COLLECTIONS.
          </h2>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {featuredCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col)}
              className="group relative flex flex-col justify-between rounded-2xl glass-panel p-4 cursor-pointer glass-panel-hover overflow-hidden"
            >
              {/* Top ambient highlight gradient */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

              {/* Product Visual Showcase */}
              <div className="relative w-full h-44 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-black/20">
                {/* Cyan ambient aura behind product */}
                <div className="absolute w-24 h-24 rounded-full bg-sky-400/20 blur-xl group-hover:scale-125 transition-transform duration-500" />
                
                <img
                  src={col.image}
                  alt={col.title}
                  className="relative z-10 max-h-36 max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />

                {/* Badge */}
                <span className="absolute top-2 right-2 text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-neutral-300">
                  {col.tag}
                </span>
              </div>

              {/* Card Text Content */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase line-clamp-2 leading-tight group-hover:text-sky-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                {/* Interactive Explore Link */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-200 group-hover:text-sky-400 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {col.price}
                  </span>
                </div>
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
