import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { sendConciergeMessage } from '../services/api';

export default function ConciergeChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'concierge',
      text: "Greetings. I am your 24/7 Innovate Luxury Concierge. How may I assist your collection exploration today?",
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);

    setLoading(true);
    try {
      const res = await sendConciergeMessage(userText);
      setMessages((prev) => [
        ...prev,
        { sender: 'concierge', text: res.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: 'concierge', text: "All our pieces feature aerospace-grade titanium, neural acoustic chambers, and complimentary supersonic transit.", time: "Just now" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl z-10 flex flex-col h-[520px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_10px_#38bdf8]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Eternal Concierge AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <p className="text-[10px] text-neutral-400">24/7 Dedicated Priority Client Advisor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-neutral-800 text-white'
                    : 'bg-sky-500/20 text-sky-400 border border-sky-400/30'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
              </div>

              <div
                className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-sky-500/20 border border-sky-400/30 text-white rounded-tr-none'
                    : 'glass-panel border border-white/10 text-neutral-200 rounded-tl-none shadow-md'
                }`}
              >
                {m.text}
                <span className="block text-[9px] text-neutral-500 mt-1 text-right">{m.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-sky-400 pl-8">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="flex gap-1.5 overflow-x-auto py-2 no-scrollbar border-t border-white/5">
          {['Delivery Timeline', 'Warranty Terms', 'Discount Passkey', 'Materials'].map((chip) => (
            <button
              key={chip}
              onClick={() => {
                setInput(`Tell me about ${chip}`);
              }}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] text-neutral-400 hover:text-white border border-white/10 whitespace-nowrap transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your inquiry to the luxury concierge..."
            className="flex-1 px-4 py-2.5 bg-black/50 border border-white/15 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-400"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-400 text-black flex items-center justify-center transition-all shadow-[0_0_10px_#38bdf8]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
