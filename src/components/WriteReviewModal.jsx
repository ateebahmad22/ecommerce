import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { postReview } from '../services/api';

export default function WriteReviewModal({ isOpen, onClose, onReviewAdded }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('GLOBAL INNOVATOR');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    setSubmitting(true);
    try {
      const res = await postReview({ name, role, rating, quote });
      if (res.success) {
        setSuccess(true);
        onReviewAdded(res.review);
        setTimeout(() => {
          setSuccess(false);
          setName('');
          setQuote('');
          onClose();
        }, 1500);
      }
    } catch (e) {
      // Fallback
      onReviewAdded({
        id: `rev-${Date.now()}`,
        name,
        role,
        rating,
        quote,
        avatar: '/assets/avatar_julian.png'
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <h4 className="text-xl font-bold text-white uppercase tracking-wide mb-1">
          Submit Client Testimonial
        </h4>
        <p className="text-xs text-neutral-400 mb-6">
          Share your experience with the Innovate collection.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">Your Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Dr. Aris Thorne"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">Designation / Role</label>
            <input
              type="text"
              placeholder="e.g. PRINCIPAL ARCHITECT"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-sky-400 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${star <= rating ? 'fill-sky-400 drop-shadow-[0_0_8px_#38bdf8]' : 'text-neutral-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">Your Review</label>
            <textarea
              required
              rows={3}
              placeholder="The attention to detail and futuristic vision is unparalleled..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {success ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" /> Testimonial Published
              </span>
            ) : submitting ? (
              <span>Publishing...</span>
            ) : (
              <span>Publish to Elite Review Board</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
