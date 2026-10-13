import React, { useState } from 'react';
import { X, RefreshCw, Truck, HelpCircle, Check, ChevronDown, ShieldCheck } from 'lucide-react';

export default function CustomerServiceModal({ isOpen, onClose, initialTab = 'faq' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('Size/Fit Adjust');
  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "What materials are utilized in the Quantum collection?",
      a: "Every piece integrates Grade 5 aerospace titanium, optical sapphire crystal, carbon-neutral bio-ceramics, and liquid silicone rubber for ultimate ergonomic comfort."
    },
    {
      q: "How does the Supersonic Delivery Guarantee work?",
      a: "All orders are dispatched via dedicated private air logistics hubs. Metropolitan consignments arrive within 24 to 48 hours worldwide with white-glove security handover."
    },
    {
      q: "What does the 3-Year Titanium Warranty cover?",
      a: "We provide comprehensive coverage against mechanical faults, acoustic driver degradation, sapphire crystal scratches, and battery capacity below 80% with immediate replacement."
    },
    {
      q: "Can I return an item if it does not fit my aesthetic vision?",
      a: "Yes. We offer 30-day effortless doorstep return pickup with zero handling fees and immediate refund upon consignment receipt."
    }
  ];

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    setReturnSubmitted(true);
    setTimeout(() => {
      setReturnSubmitted(false);
      onClose();
    }, 2500);
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
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'faq'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'returns'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Returns & Exchanges
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'shipping'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" /> Shipping Info
          </button>
        </div>

        {/* TAB 1: FAQ Accordion */}
        {activeTab === 'faq' && (
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide mb-3">
              Frequently Asked Questions
            </h4>
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
              >
                <div className="p-4 flex items-center justify-between text-xs font-bold text-white hover:text-sky-300 transition-colors">
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-sky-400 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-2">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Returns & Exchanges Portal */}
        {activeTab === 'returns' && (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">
              30-Day Doorstep Return Portal
            </h4>
            <p className="text-xs text-neutral-400">
              Enter your Order Reference to schedule an insured courier pickup directly from your residence.
            </p>

            <form onSubmit={handleReturnSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                  Order Reference (e.g. INV-8924)
                </label>
                <input
                  required
                  type="text"
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  placeholder="INV-XXXX"
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                  Reason for Return or Exchange
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option>Size / Ergonomic Exchange</option>
                  <option>Aesthetic Variant Switch</option>
                  <option>Complimentary Return & Full Refund</option>
                  <option>Hardware Diagnostic Request</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {returnSubmitted ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 stroke-[3]" /> Return Manifest Generated
                  </span>
                ) : (
                  <span>Schedule Insured Doorstep Pickup</span>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Shipping Info */}
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">
              Global Supersonic Shipping Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <div className="text-sky-300 font-bold uppercase text-[11px]">Metropolitan Air Transit</div>
                <div className="text-white text-base font-extrabold">24-48 Hours</div>
                <p className="text-neutral-400 text-[11px]">Direct priority air transit to New York, London, Tokyo, Dubai, and Zurich.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <div className="text-sky-300 font-bold uppercase text-[11px]">Complimentary Insurance</div>
                <div className="text-white text-base font-extrabold">100% Guaranteed</div>
                <p className="text-neutral-400 text-[11px]">Full titanium box tamper sealing with active GPS tracking token.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-neutral-300 space-y-1.5">
              <div className="font-bold text-white">White-Glove Delivery Protocol:</div>
              <p className="text-neutral-400 text-[11px]">
                Upon arrival at your private or commercial address, a vetted courier will personally handover your consignment in climate-controlled packaging.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
