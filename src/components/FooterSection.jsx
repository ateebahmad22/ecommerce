import React from 'react';

export default function FooterSection({
  onNavigate,
  onOpenExplore,
  onOpenCustomerService,
  onOpenTracking,
  onOpenResources,
  onOpenConcierge,
  onSelectPayment
}) {
  return (
    <footer id="contact" className="relative pt-20 pb-12 overflow-hidden border-t border-white/10 bg-[#040609]">
      {/* Perspective Grid subtle floor */}
      <div className="absolute inset-0 perspective-grid opacity-15 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Apple Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <svg
            className="w-8 h-8 text-white fill-current drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] cursor-pointer hover:scale-110 transition-transform"
            viewBox="0 0 170 170"
            fill="none"
            onClick={() => onNavigate('hero')}
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
          </svg>

          {/* Nav links row */}
          <div className="flex items-center gap-8 mt-6 text-sm text-neutral-300 font-medium">
            <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
              Design
            </button>
            <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
              Products
            </button>
            <button onClick={() => onNavigate('collections')} className="hover:text-white transition-colors">
              Fashion
            </button>
            <button onClick={() => onOpenConcierge()} className="hover:text-white transition-colors">
              Contact
            </button>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          
          {/* Column 1: EXPLORE (Glass card container) */}
          <div className="rounded-2xl glass-panel p-6 border border-white/10 relative overflow-hidden group">
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li onClick={() => onOpenExplore('about')} className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li onClick={() => onOpenExplore('sustainability')} className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
              <li onClick={() => onOpenExplore('technology')} className="hover:text-white cursor-pointer transition-colors">Technology</li>
              <li onClick={() => onOpenExplore('careers')} className="hover:text-white cursor-pointer transition-colors">Careers</li>
            </ul>
            {/* Watermark art */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-20 pointer-events-none">
              <img src="/assets/featured_audio_item.png" alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Column 2: CUSTOMER SERVICES */}
          <div className="p-6">
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4">
              CUSTOMER SERVICES
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li onClick={onOpenTracking} className="hover:text-white cursor-pointer transition-colors flex items-center justify-between">
                <span>Track Order</span>
                <span className="text-[10px] text-sky-400 font-mono">Live GPS</span>
              </li>
              <li onClick={() => onOpenCustomerService('returns')} className="hover:text-white cursor-pointer transition-colors">Returns & Exchanges</li>
              <li onClick={() => onOpenCustomerService('shipping')} className="hover:text-white cursor-pointer transition-colors">Shipping Info</li>
              <li onClick={() => onOpenCustomerService('faq')} className="hover:text-white cursor-pointer transition-colors">FAQ</li>
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="p-6">
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4">
              CONNECT
            </h4>
            <div className="space-y-2 text-xs text-neutral-300 font-light">
              <p onClick={onOpenConcierge} className="hover:text-sky-300 cursor-pointer transition-colors">
                contact@innovate.premium
              </p>
              <p onClick={onOpenConcierge} className="hover:text-sky-300 cursor-pointer transition-colors">
                +1 (800) 123-4567
              </p>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 mt-5">
              {/* Instagram */}
              <button
                onClick={onOpenConcierge}
                title="Instagram"
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-neutral-300 hover:text-sky-300 transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={onOpenConcierge}
                title="LinkedIn"
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-neutral-300 hover:text-sky-300 transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>

              {/* X / Twitter */}
              <button
                onClick={onOpenConcierge}
                title="X"
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-neutral-300 hover:text-sky-300 transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* TikTok */}
              <button
                onClick={onOpenConcierge}
                title="TikTok"
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-neutral-300 hover:text-sky-300 transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.96-4.52V8.78a8.28 8.28 0 0 0 4.81 1.5v-3.59z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Column 4: RESOURCES (Glass card container) */}
          <div className="rounded-2xl glass-panel p-6 border border-white/10">
            <h4 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400 font-light">
              <li onClick={() => onOpenResources('press')} className="hover:text-white cursor-pointer transition-colors">Press Kit</li>
              <li onClick={() => onOpenResources('investor')} className="hover:text-white cursor-pointer transition-colors">Investor Relations</li>
              <li onClick={() => onOpenResources('philosophy')} className="hover:text-white cursor-pointer transition-colors">Design Philosophy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Payment Methods Glass Dock (Clickable buttons that launch checkout with that method) */}
        <div className="relative mt-8 max-w-4xl mx-auto rounded-2xl glass-panel p-4 border border-white/15 flex flex-wrap items-center justify-center sm:justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
            {/* VISA */}
            <div
              onClick={() => onSelectPayment('Card')}
              className="px-4 py-2 rounded-xl bg-gradient-to-tr from-blue-700/80 to-blue-500/80 border border-blue-400/30 text-white font-extrabold italic text-sm tracking-widest shadow-[0_4px_12px_rgba(37,99,235,0.3)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via Visa"
            >
              VISA
            </div>

            {/* MasterCard */}
            <div
              onClick={() => onSelectPayment('Card')}
              className="px-4 py-2 rounded-xl bg-neutral-900/90 border border-white/15 flex items-center gap-0.5 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via MasterCard"
            >
              <div className="w-4 h-4 rounded-full bg-red-500 opacity-90 -mr-1.5" />
              <div className="w-4 h-4 rounded-full bg-amber-400 opacity-90" />
            </div>

            {/* AMEX */}
            <div
              onClick={() => onSelectPayment('Card')}
              className="px-4 py-2 rounded-xl bg-cyan-700/80 border border-cyan-400/30 text-white font-bold text-xs tracking-wider shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via AMEX"
            >
              AMEX
            </div>

            {/* PayPal */}
            <div
              onClick={() => onSelectPayment('PayPal')}
              className="px-4 py-2 rounded-xl bg-blue-900/80 border border-blue-400/30 text-sky-300 font-extrabold text-sm italic shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via PayPal"
            >
              PayPal
            </div>

            {/* Apple Pay */}
            <div
              onClick={() => onSelectPayment('Apple Pay')}
              className="px-4 py-2 rounded-xl bg-black border border-white/20 text-white font-medium text-xs flex items-center gap-1.5 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via Apple Pay"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
              </svg>
              <span>Pay</span>
            </div>

            {/* Bitcoin */}
            <div
              onClick={() => onSelectPayment('Bitcoin')}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Click to checkout via Bitcoin"
            >
              ₿
            </div>
          </div>

          {/* Cyan Glow Bar */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 h-1 bg-sky-400/80 rounded-full blur-[2px] shadow-[0_0_12px_#38bdf8]" />
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-[11px] font-medium text-neutral-400 tracking-wider">
          © 2024 INNOVATE PREMIUM INC. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}
