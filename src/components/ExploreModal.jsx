import React, { useState } from 'react';
import { X, Sparkles, Leaf, Cpu, Briefcase, Check } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose, initialTab = 'about' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [careerApplied, setCareerApplied] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab Switching */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-6">
          {[
            { id: 'about', label: 'About Us', icon: Sparkles },
            { id: 'sustainability', label: 'Sustainability', icon: Leaf },
            { id: 'technology', label: 'Technology', icon: Cpu },
            { id: 'careers', label: 'Careers', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: About Us */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              The Innovate Genesis
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Founded at the intersection of precision Swiss horology, Cupertino industrial minimalism, and advanced aerospace architecture, <strong className="text-white">INNOVATE PREMIUM</strong> redefines luxury for the cybernetic era.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl glass-panel border border-white/10">
                <span className="text-[10px] uppercase text-sky-400 block font-semibold">Founding Philosophy</span>
                <span className="text-white font-bold block mt-1">Form Follows Transcendence</span>
                <p className="text-neutral-400 text-[11px] mt-1">Eliminating superfluous friction to create monolithic, weightless industrial objects.</p>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/10">
                <span className="text-[10px] uppercase text-sky-400 block font-semibold">Global Footprint</span>
                <span className="text-white font-bold block mt-1">50+ Cleanroom Facilities</span>
                <p className="text-neutral-400 text-[11px] mt-1">Zurich, Tokyo, San Francisco, and Singapore development ateliers.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Sustainability */}
        {activeTab === 'sustainability' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Carbon-Negative Luxury Architecture
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              We reject planned obsolescence. Every Innovate product is engineered with 100% recycled aerospace titanium, bio-engineered synthetic sapphires, and zero rare-earth waste streams.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
              <div className="font-bold text-white">Closed-Loop Recovery Program:</div>
              <p className="text-[11px] text-neutral-300">
                Return any hardware generation for a guaranteed 60% trade-in credit toward future drops. We disassemble and repurpose materials down to atomic purity.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Technology */}
        {activeTab === 'technology' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Proprietary Quantum Enclave
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Our hardware features neural haptic feedback, 24-bit 192kHz losslessly tuned acoustic chambers, and biometric passkey synchronization that connects seamlessly with your Apple ecosystem.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white font-bold">Micron CNC Mill</div>
                <div className="text-neutral-400 text-[11px]">Sub-0.002mm machining tolerances</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white font-bold">Ferrofluid Dampers</div>
                <div className="text-neutral-400 text-[11px]">Resonance-free acoustic dispersion</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Careers */}
        {activeTab === 'careers' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Join the Vanguard of Industrial Design
            </h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {[
                { role: "Senior Acoustic Architect", loc: "Zurich, Switzerland • Hybrid" },
                { role: "Titanium Metallurgy Specialist", loc: "Kyoto, Japan • Onsite" },
                { role: "Quantum Software Systems Lead", loc: "Cupertino, CA • Onsite" }
              ].map((c, i) => (
                <div key={i} className="p-3 rounded-xl glass-panel border border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <div className="text-white font-bold">{c.role}</div>
                    <div className="text-[10px] text-neutral-400">{c.loc}</div>
                  </div>
                  <button
                    onClick={() => {
                      setCareerApplied(true);
                      setTimeout(() => setCareerApplied(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-[11px] font-semibold border border-sky-400/30 transition-all"
                  >
                    {careerApplied ? 'Transmitted' : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
