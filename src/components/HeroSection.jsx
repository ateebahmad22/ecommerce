import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export default function HeroSection({ onExplore, onQuickView, onBookNow, onCallToAction }) {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-sky-400/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            {/* Small uppercase tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
              HERO SECTION
            </div>

            {/* Giant Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
              LUXURY HEADING<br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-sky-200 bg-clip-text text-transparent">
                BEALIKE 2020.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-lg leading-relaxed font-light">
              Ultra-premium futuristic E-commerce portfolio, for expensive, elite and immersive.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Primary Glowing Button */}
              <button
                onClick={onBookNow}
                className="relative group px-8 py-3.5 rounded-full bg-white/[0.14] hover:bg-white/[0.22] text-white text-sm font-semibold tracking-wide border border-white/30 backdrop-blur-2xl shadow-[0_0_25px_rgba(56,189,248,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book it Now
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-sky-400 rounded-full blur-[2px] shadow-[0_0_12px_#38bdf8]" />
              </button>

              {/* Secondary Glass Button */}
              <button
                onClick={onCallToAction}
                className="px-8 py-3.5 rounded-full bg-black/40 hover:bg-white/[0.08] text-neutral-200 hover:text-white text-sm font-semibold tracking-wide border border-white/15 backdrop-blur-xl transition-all duration-300 hover:border-white/30 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                Call To Action
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Verified Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Instant Concierge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Showcase */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[620px] rounded-3xl p-3 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-blue-500/10 rounded-3xl blur-2xl -z-10" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <img
                  src="/assets/hero_composition.png"
                  alt="Futuristic luxury products composition"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Hotspot 1: Central Luxury Sneaker */}
                <div 
                  onClick={() => onQuickView('sneakers')}
                  className="absolute top-[38%] left-[55%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group/hotspot"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-sky-400/20 animate-ping" />
                    <span className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center border-2 border-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    </span>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-400/40 text-[11px] font-medium text-sky-200 shadow-xl">
                      Air Jordan Retro Cyber • $890
                    </div>
                  </div>
                </div>

                {/* Hotspot 2: Apple Watch */}
                <div 
                  onClick={() => onQuickView('chronographs')}
                  className="absolute top-[18%] left-[62%] cursor-pointer group/hotspot"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] flex items-center justify-center border border-sky-400">
                      <span className="w-1 h-1 rounded-full bg-sky-400" />
                    </span>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-[11px] font-medium text-white shadow-xl">
                      Chronograph OS • $2,450
                    </div>
                  </div>
                </div>

                {/* Hotspot 3: Luxury Headphones */}
                <div 
                  onClick={() => onQuickView('gaming')}
                  className="absolute top-[28%] right-[12%] cursor-pointer group/hotspot"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8] flex items-center justify-center border border-white">
                      <span className="w-1 h-1 rounded-full bg-black" />
                    </span>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-400/30 text-[11px] font-medium text-sky-200 shadow-xl">
                      Acoustic Max Studio • $980
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-sky-400/60 rounded-full blur-[4px] shadow-[0_0_18px_#38bdf8]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
