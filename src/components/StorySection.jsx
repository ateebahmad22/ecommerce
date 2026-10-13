import React, { useState } from 'react';
import { Trophy, Smile, Network, ArrowUpRight, Check, X } from 'lucide-react';

export default function StorySection() {
  const [activeStat, setActiveStat] = useState(null);

  const stats = [
    {
      id: "awards",
      icon: Trophy,
      value: "320+",
      label: "Global Awards",
      detailTitle: "International Design Accolades",
      detailBody: "Recognized by Red Dot Best of the Best (2024-2026), iF Gold Award for Monolithic Architecture, and the Swiss Horological Grand Prix for Acoustic Engineering."
    },
    {
      id: "innovators",
      icon: Smile,
      value: "9.8M",
      label: "Satisfied Innovators",
      detailTitle: "Worldwide Client Collective",
      detailBody: "Over 9.8 million verified collectors and tech pioneers spanning 180 countries rely on Innovate systems for daily productivity and transcendent style."
    },
    {
      id: "labs",
      icon: Network,
      value: "50+",
      label: "R&D Centers",
      detailTitle: "Global Engineering Ateliers",
      detailBody: "Dedicated cleanroom laboratories in Zurich, Kyoto, Cupertino, Stockholm, and Munich pushing the boundaries of metallurgy, micro-optics, and neural haptics."
    }
  ];

  return (
    <section id="story" className="relative py-28 overflow-hidden">
      {/* Glow aura */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual with Executive & Floating Tech */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-panel p-2 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/15 group">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/assets/story_visual.png"
                  alt="Our Innovation Story Executive and Tech"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              {/* Cyan glow underline on visual */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-1 bg-sky-400/80 rounded-full blur-[3px] shadow-[0_0_15px_#38bdf8]" />
            </div>
          </div>

          {/* Right Column: Text & 3 Stat Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
                OUR INNOVATION<br />
                STORY.
              </h2>
              <p className="mt-5 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl">
                Ultra-premium dolor sit amet, consectetur adipiscing, sed do eiusmod tempor incididunt ut labore, in professional, emotional and high-end brand experience.
              </p>
            </div>

            {/* 3 Metric Cards (Clickable) */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.id}
                    onClick={() => setActiveStat(stat)}
                    className="relative rounded-2xl glass-panel p-4 flex flex-col items-center justify-between text-center glass-panel-hover cursor-pointer group"
                    title="Click for historical telemetry"
                  >
                    {/* Glowing Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-3 shadow-[0_0_12px_rgba(56,189,248,0.25)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Stat Number */}
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </div>

                    {/* Stat Label */}
                    <div className="mt-1 text-[11px] sm:text-xs text-neutral-400 font-medium flex items-center gap-1">
                      <span>{stat.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                    </div>

                    {/* Bottom Cyan Glow Bar */}
                    <div className="mt-4 w-10 h-[2.5px] rounded-full bg-sky-400/80 shadow-[0_0_10px_#38bdf8]" />
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Metric Detail Popup Modal */}
      {activeStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setActiveStat(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveStat(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                <activeStat.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black text-white">{activeStat.value}</span>
                <h4 className="text-sm font-bold text-sky-300">{activeStat.detailTitle}</h4>
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              {activeStat.detailBody}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
