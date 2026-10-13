import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';

export default function LimitedOfferSection({ onShopSale }) {
  // Live ticking countdown timer initialized to 12h 45m 22s
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 45, seconds: 22 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section id="offer" className="relative py-28 overflow-hidden">
      {/* Perspective Cyber Grid Floor */}
      <div className="absolute inset-0 perspective-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-sky-500/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, Countdown Box, Button */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5" />
              Limited Allocation
            </div>

            {/* Giant Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
              LIMITED-TIME<br />
              OFFER.
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md">
              Elevate your innovation for less. <br />
              <span className="text-sky-300 font-medium">Up to 40% OFF</span> the collection.
            </p>

            {/* Frosted Glass Countdown Card */}
            <div className="w-full max-w-sm rounded-2xl glass-panel p-4 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
              <div className="grid grid-cols-3 divide-x divide-white/10 text-center">
                {/* Hours */}
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {formatNumber(timeLeft.hours)}h
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-1">
                    HOURS
                  </div>
                </div>

                {/* Minutes */}
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {formatNumber(timeLeft.minutes)}m
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-1">
                    MINUTES
                  </div>
                </div>

                {/* Seconds */}
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight drop-shadow-[0_0_8px_#38bdf8]">
                    {formatNumber(timeLeft.seconds)}s
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-1">
                    SECONDS
                  </div>
                </div>
              </div>

              {/* Cyan Glow Underline */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-sky-400/80 rounded-full blur-[2px] shadow-[0_0_12px_#38bdf8]" />
            </div>

            {/* "Shop the Sale" Button */}
            <div className="pt-2">
              <button
                onClick={onShopSale}
                className="relative group px-10 py-3.5 rounded-full bg-white/[0.12] hover:bg-white/[0.22] text-white text-sm font-semibold tracking-wide border border-white/25 backdrop-blur-2xl shadow-[0_0_20px_rgba(56,189,248,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop the Sale
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-sky-400 rounded-full blur-[2px] shadow-[0_0_12px_#38bdf8]" />
              </button>
            </div>

          </div>

          {/* Right Column: 3D Floating Smartwatch & Headphones */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-[580px] rounded-3xl p-2 group">
              <div className="relative rounded-2xl overflow-hidden cursor-pointer" onClick={onShopSale}>
                <img
                  src="/assets/offer_product_visual.png"
                  alt="Limited Time Offer Smartwatch and Headphones"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Bottom Cyan Glow Bar */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-sky-400/60 rounded-full blur-[4px] shadow-[0_0_18px_#38bdf8]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
