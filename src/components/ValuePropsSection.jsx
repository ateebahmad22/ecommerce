import React from 'react';
import { valueProps } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

export default function ValuePropsSection({ onSelectValueProp }) {
  return (
    <section id="values" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[350px] bg-sky-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            FIFTH SECTION
          </h2>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {valueProps.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectValueProp(item.id)}
              className="group relative flex flex-col justify-between rounded-2xl glass-panel p-4 glass-panel-hover overflow-hidden cursor-pointer"
            >
              {/* Top ambient highlight gradient */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

              {/* 3D Visual Art */}
              <div className="relative w-full h-44 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-black/20">
                <div className="absolute w-24 h-24 rounded-full bg-sky-400/20 blur-xl group-hover:scale-125 transition-transform duration-500" />
                
                <img
                  src={item.art}
                  alt={item.title}
                  className="relative z-10 max-h-36 max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col flex-grow justify-between text-center">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase leading-tight group-hover:text-sky-300 transition-colors flex items-center justify-center gap-1">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400 font-light">
                    {item.subtitle}
                  </p>
                </div>

                <p className="mt-3 text-[11px] text-neutral-400/80 font-light line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Cyan Glow Bar at the Bottom */}
              <div className="mt-5 pt-1 flex justify-center">
                <div className="w-14 h-[3px] rounded-full bg-sky-400/70 shadow-[0_0_12px_#38bdf8] transition-all duration-300 group-hover:w-24 group-hover:bg-sky-300 group-hover:shadow-[0_0_18px_#38bdf8]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
