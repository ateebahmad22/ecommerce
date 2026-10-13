import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Lock, Sparkles, ArrowRight, Truck, CheckCircle2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitCheckout } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete,
  initialPaymentMethod = 'Apple Pay'
}) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'Julian Thorne',
    email: 'julian@innovate.premium',
    address: '742 Cyber Plaza, Suite 80',
    city: 'New York',
    zip: '10001',
    country: 'United States',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    promoCode: 'INNOVATE20'
  });

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((sum, item) => sum + (item.price || 1299) * item.qty, 0);
  const discountAmount = formData.promoCode.toUpperCase() === 'INNOVATE20' ? rawSubtotal * 0.2 : 0;
  const finalTotal = rawSubtotal - discountAmount;

  const handleProcessPayment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await submitCheckout({
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
        items: cartItems,
        paymentMethod,
        promoCode: formData.promoCode,
      });

      setCompletedOrder(response.order);
      setStep(3);
      onOrderComplete(response.order);

      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#ffffff', '#0284c7', '#34d399']
      });
    } catch (err) {
      setError(err.message || 'Payment processing encountered an issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Steps */}
        <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              {step === 3 ? 'Consignment Sealed' : 'Quantum Checkout'}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {step === 1 && 'Step 1 of 2: White-Glove Shipping Telemetry'}
              {step === 2 && 'Step 2 of 2: Quantum Authorized Settlement'}
              {step === 3 && 'Order verified and queued for supersonic transit'}
            </p>
          </div>

          {step < 3 && (
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${step === 1 ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-emerald-400'}`} />
              <span className={`w-8 h-0.5 ${step === 2 ? 'bg-sky-400' : 'bg-white/15'}`} />
              <span className={`w-2.5 h-2.5 rounded-full ${step === 2 ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-white/20'}`} />
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* STEP 1: Shipping Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                  Full Name / Title
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                  Email for Encrypted Receipt
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-neutral-300 block mb-1">
                Destination Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-neutral-300 block mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {/* Order Brief Summary */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-400">{cartItems.length} items in Bag</span>
                <span className="text-sky-400 ml-2 font-medium">Free Supersonic Express</span>
              </div>
              <span className="text-white font-mono font-bold text-sm">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* STEP 2: Payment Selection & Processing */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Payment Method Selector Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'Apple Pay', label: 'Apple Pay', badge: 'FaceID Passkey' },
                { id: 'Card', label: 'Card', badge: 'Quantum Visa/MC' },
                { id: 'PayPal', label: 'PayPal', badge: '1-Click Instant' },
                { id: 'Bitcoin', label: 'Bitcoin', badge: 'Lightning & BTC' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === m.id
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{m.label}</div>
                  <div className="text-[10px] text-sky-300 mt-0.5">{m.badge}</div>
                </button>
              ))}
            </div>

            {/* Apple Pay View */}
            {paymentMethod === 'Apple Pay' && (
              <div className="p-6 rounded-2xl glass-panel border border-white/15 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-black border border-white/20 mx-auto flex items-center justify-center text-white shadow-xl">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.43-6.59-10.15-11.83-21.46-15.73-33.93-3.9-12.47-5.86-24.3-5.86-35.49 0-14.15 3.58-26.06 10.74-35.73 7.15-9.67 16.29-14.62 27.42-14.85 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.4 3.79 11.29 3.86 1.56 0 5.6-1.39 12.12-4.17 6.52-2.78 12.07-4.04 16.65-3.79 13.04.78 23.47 5.79 31.29 15.03-11.39 6.87-16.94 16.35-16.65 28.43.34 9.68 4.2 17.76 11.58 24.23 7.38 6.47 16.03 10.14 25.96 11.02-2.35 7.02-5.3 14.31-8.86 21.87zM119.22 31.55c0-7.39 2.65-14.28 7.96-20.67 5.3-6.39 11.96-10.36 19.98-11.92.22 1.23.34 2.35.34 3.36 0 7.39-2.76 14.42-8.29 21.09-5.53 6.67-12.28 10.59-20.25 11.77.06-1.12.26-2.33.26-3.63z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-300">
                  Ready to authenticate with <strong className="text-white">Apple ID Passkey & Touch ID</strong>.
                </p>
                <p className="text-[11px] text-neutral-500">
                  Direct hardware enclave settlement • Zero-knowledge encryption
                </p>
              </div>
            )}

            {/* Credit Card View */}
            {paymentMethod === 'Card' && (
              <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <label className="text-[11px] font-medium text-neutral-300 block mb-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-neutral-300 block mb-1">Expiry</label>
                    <input
                      type="text"
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-neutral-300 block mb-1">CVC / Security Key</label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bitcoin / Crypto View */}
            {paymentMethod === 'Bitcoin' && (
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 text-center space-y-2">
                <div className="text-amber-400 font-bold text-sm">Bitcoin Lightning Network</div>
                <div className="font-mono text-[11px] text-neutral-300 bg-neutral-900 p-2 rounded-xl break-all">
                  bc1q9v808x390k2z45m2z0x2n8m58z00innovatecrypto
                </div>
                <p className="text-[10px] text-neutral-400">Scan via Strike, Cash App, or any hardware wallet.</p>
              </div>
            )}

            {/* PayPal View */}
            {paymentMethod === 'PayPal' && (
              <div className="p-4 rounded-2xl bg-black/40 border border-blue-500/30 text-center space-y-2">
                <div className="text-sky-400 font-bold text-sm">PayPal One-Touch</div>
                <p className="text-xs text-neutral-300">
                  Instant buyer protection up to $10,000.00 with PayPal Elite.
                </p>
              </div>
            )}

            {/* Financial Totals */}
            <div className="border-t border-white/10 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({cartItems.length} pieces)</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sky-400">
                  <span>Passkey Discount (20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Supersonic White-Glove Transit</span>
                <span className="text-sky-400">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Total Authorized</span>
                <span className="text-sky-300 font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-neutral-300 transition-all"
              >
                Back
              </button>

              <button
                disabled={loading}
                onClick={handleProcessPayment}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-black text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Quantum Authorizing...
                  </span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize ${finalTotal.toFixed(2)} via {paymentMethod}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: Order Completed / Invoice Receipt */}
        {step === 3 && completedOrder && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_#10b981]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white tracking-tight uppercase">
                Consignment Authorized!
              </h4>
              <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto">
                Thank you, <strong className="text-white">{completedOrder.customer.name}</strong>. Your luxury order has been sealed and dispatched to our global cleanroom staging facility.
              </p>
            </div>

            {/* Official Order Passport Box */}
            <div className="p-5 rounded-2xl glass-panel border border-sky-400/30 text-left space-y-3 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Order Reference</div>
                  <div className="text-base font-extrabold text-white font-mono">{completedOrder.orderId}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Tracking Code</div>
                  <div className="text-sm font-bold text-sky-400 font-mono flex items-center gap-1.5">
                    {completedOrder.trackingNumber}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Destination</span>
                  <span className="text-white font-medium">
                    {completedOrder.customer.address}, {completedOrder.customer.city}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase">Telemetry Status</span>
                  <span className="text-emerald-400 font-medium">
                    {completedOrder.status}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-neutral-400">Settlement Total</span>
                <span className="text-sky-300 font-mono font-bold text-base">
                  ${completedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold tracking-wider uppercase transition-all"
              >
                Return to Innovation Showcase
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
