import React, { useState, useEffect } from 'react';
import { X, Search, Truck, MapPin, CheckCircle2, Clock, ShieldCheck, Package } from 'lucide-react';
import { trackOrder } from '../services/api';

export default function OrderTrackingModal({ isOpen, onClose, initialTracking = 'INV-8924' }) {
  const [trackingInput, setTrackingInput] = useState(initialTracking);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      handleSearch(initialTracking);
    }
  }, [isOpen, initialTracking]);

  const handleSearch = async (query = trackingInput) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await trackOrder(query.trim());
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Tracking telemetry unavailable.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const stages = [
    { label: "Quantum Order Sealed", time: "09:30 UTC", done: true },
    { label: "Silicon Valley Lab Staging", time: "14:15 UTC", done: true },
    { label: "Supersonic Air Transit", time: "22:45 UTC", done: true },
    { label: "Local Concierge Vehicle", time: "En Route", active: true },
    { label: "Handed to Recipient", time: "Pending", done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Truck className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl font-bold text-white tracking-wide uppercase">
            Supersonic Delivery Telemetry
          </h3>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/15 mb-6">
          <Search className="w-4 h-4 text-neutral-400 ml-3" />
          <input
            type="text"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            placeholder="Enter Order ID (e.g. INV-8924) or Tracking Code..."
            className="w-full bg-transparent px-2 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={() => handleSearch()}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs uppercase tracking-wider transition-all"
          >
            Track
          </button>
        </div>

        {loading && (
          <div className="py-12 text-center text-xs text-sky-400 flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            Querying satellite logistics telemetry...
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Order Details View */}
        {order && !loading && (
          <div className="space-y-6">
            
            {/* Top Stat Bar */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block">Current Vector</span>
                <span className="text-white font-bold flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {order.currentLocation}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-400 block">Estimated Arrival</span>
                <span className="text-emerald-400 font-bold mt-0.5">
                  {order.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Stages Progression Timeline */}
            <div className="space-y-4 py-2">
              {stages.map((st, i) => (
                <div key={i} className="flex items-center gap-4 text-xs">
                  <div className="relative flex items-center justify-center">
                    {st.done ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_8px_#10b981]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : st.active ? (
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400 text-sky-400 flex items-center justify-center shadow-[0_0_10px_#38bdf8] animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/15 text-neutral-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className={st.done || st.active ? "text-white font-medium" : "text-neutral-500"}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Consignment Items */}
            <div className="border-t border-white/10 pt-4">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-2">
                Enclosed Equipment ({order.items.length})
              </span>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-white font-medium">{it.name}</span>
                    <span className="font-mono text-sky-300">${(it.price || 1299).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Full Insurance & White-Glove Chain of Custody</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
