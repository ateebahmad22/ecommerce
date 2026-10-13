import React, { useState } from 'react';
import { X, FileText, TrendingUp, Compass, Download, Check } from 'lucide-react';

export default function ResourcesModal({ isOpen, onClose, initialTab = 'philosophy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

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
        <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('philosophy')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'philosophy'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Design Philosophy
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'press'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Press Kit
          </button>
          <button
            onClick={() => setActiveTab('investor')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'investor'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Investor Relations
          </button>
        </div>

        {/* TAB 1: Design Philosophy */}
        {activeTab === 'philosophy' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Monolithic Reductionism
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              We design by subtraction. By stripping away screws, seams, and visual clutter, each hardware piece emerges from a single billet of forged material with pristine weight distribution.
            </p>
            <div className="p-4 rounded-2xl glass-panel border border-white/10 text-xs text-neutral-300 space-y-2">
              <div className="font-bold text-white uppercase text-[11px] text-sky-400">Core Axioms:</div>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[11px]">
                <li>Zero Visible Seams or Fasteners</li>
                <li>Haptic feedback calibrated to human heartbeat harmonics</li>
                <li>Cryogenically treated sapphire crystal lenses</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: Press Kit */}
        {activeTab === 'press' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Official Media & Asset Archive
            </h4>
            <p className="text-xs text-neutral-400">
              Download high-resolution 8K photography, typography assets, 3D glTF models, and official press releases.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">INNOVATE 2026 Press Package (v4.2)</div>
                <div className="text-[10px] text-neutral-400">Includes 8K Renders, Brand Manual & Exec Speeches • 1.2 GB</div>
              </div>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold uppercase transition-all flex items-center gap-1.5"
              >
                {downloaded ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Download className="w-3.5 h-3.5" />}
                {downloaded ? 'Downloaded' : 'Download'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Investor Relations */}
        {activeTab === 'investor' && (
          <div className="space-y-4">
            <h4 className="text-xl font-extrabold text-white uppercase tracking-wide">
              Financial Highlights & Disclosures
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-2xl glass-panel border border-white/10">
                <div className="text-2xl font-black text-white">$4.8B</div>
                <div className="text-[10px] text-neutral-400 uppercase mt-1">Annual Revenue</div>
              </div>
              <div className="p-3 rounded-2xl glass-panel border border-white/10">
                <div className="text-2xl font-black text-emerald-400">+42%</div>
                <div className="text-[10px] text-neutral-400 uppercase mt-1">YoY Growth</div>
              </div>
              <div className="p-3 rounded-2xl glass-panel border border-white/10">
                <div className="text-2xl font-black text-sky-400">99.4%</div>
                <div className="text-[10px] text-neutral-400 uppercase mt-1">Gross Retention</div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 text-center">
              Audited quarterly filings available upon cryptographic investor verification.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
