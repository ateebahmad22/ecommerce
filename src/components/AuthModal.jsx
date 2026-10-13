import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: 'Julian Thorne', email: 'julian@innovate.premium', password: '••••••••••••' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (onLoginSuccess) {
        onLoginSuccess({ name: formData.name || 'Innovator', email: formData.email });
      }
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-8 border border-white/20 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Apple Logo Icon Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <svg className="w-7 h-7 text-white fill-current drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-3" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
          </svg>
          <h3 className="text-xl font-bold text-white tracking-wide">
            {isLogin ? 'Welcome Back' : 'Join Innovate Elite'}
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {isLogin
              ? 'Access your luxury portfolio & orders'
              : 'Unlock ultra-premium privileges & drops'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
              !isLogin
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
              isLogin
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  placeholder="Julian Thorne"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="email"
                placeholder="innovator@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-neutral-300 block mb-1">
              Passkey / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" /> Authenticated
              </>
            ) : (
              <span>{isLogin ? 'Sign In with Passkey' : 'Create Exclusive ID'}</span>
            )}
          </button>
        </form>

        {/* Apple Passkey / Biometrics option */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
            </svg>
            <span>Continue with Apple ID</span>
          </button>

          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>End-to-End Encrypted Authentication</span>
          </div>
        </div>

      </div>
    </div>
  );
}
