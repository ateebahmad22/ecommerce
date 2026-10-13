import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StayAheadSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);

    // Trigger subtle confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#ffffff', '#0284c7']
    });

    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <section id="subscribe" className="relative py-28 overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 perspective-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
          STAY AHEAD
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-xs sm:text-sm text-neutral-300 tracking-[0.2em] uppercase font-light">
          SUBSCRIBE FOR EXCLUSIVE DROPS & INNOVATIONS.
        </p>

        {/* Glass Newsletter Container */}
        <div className="relative mt-12 p-8 sm:p-12 rounded-3xl glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 overflow-hidden">
          
          {/* Subtle 3D floating visuals on edges */}
          <div className="absolute -top-6 -right-6 w-32 h-32 opacity-70 pointer-events-none">
            <img
              src="/assets/featured_audio_item.png"
              alt="Floating acoustic device"
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_#38bdf8]"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-1.5 rounded-2xl sm:rounded-full bg-black/40 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.2),inset_0_1px_2px_rgba(255,255,255,0.1)]">
              
              {/* Input field with glowing cyan border effect */}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your futuristic email address..."
                className="w-full px-6 py-3.5 bg-transparent text-sm text-white placeholder-neutral-400 focus:outline-none"
              />

              {/* Subscribe Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-full bg-white/[0.12] hover:bg-white/[0.25] text-white text-xs font-bold tracking-widest uppercase border border-white/20 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5 text-sky-300">
                    <CheckCircle2 className="w-4 h-4" /> Subscribed
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    SUBSCRIBE
                    <Send className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-xs text-red-400 font-medium">
                {error}
              </p>
            )}

            {subscribed && (
              <p className="mt-3 text-xs text-sky-400 font-medium">
                Welcome to the inner circle. Exclusive early drops will arrive in your inbox.
              </p>
            )}
          </form>

          {/* Ambient cyan bottom glow bar */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 h-1 bg-sky-400/80 rounded-full blur-[3px] shadow-[0_0_15px_#38bdf8]" />
        </div>

      </div>
    </section>
  );
}
