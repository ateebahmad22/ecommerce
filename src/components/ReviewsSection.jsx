import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Plus, Sparkles } from 'lucide-react';
import { reviews as defaultReviews } from '../data/products';
import { fetchReviews } from '../services/api';

export default function ReviewsSection({ onOpenWriteReview, latestReview }) {
  const [reviewList, setReviewList] = useState(defaultReviews);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function loadReviews() {
      const data = await fetchReviews();
      if (data && data.length > 0) {
        setReviewList(data);
      }
    }
    loadReviews();
  }, []);

  useEffect(() => {
    if (latestReview) {
      setReviewList((prev) => [latestReview, ...prev]);
    }
  }, [latestReview]);

  const prevReview = () => {
    setStartIndex((prev) => (prev === 0 ? reviewList.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setStartIndex((prev) => (prev === reviewList.length - 1 ? 0 : prev + 1));
  };

  // Safe window slice
  const n = reviewList.length;
  const visibleReviews = [
    reviewList[startIndex % n],
    reviewList[(startIndex + 1) % n],
    reviewList[(startIndex + 2) % n],
  ];

  return (
    <section id="reviews" className="relative py-28 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Write Review Trigger */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            ELITE INNOVATOR REVIEWS
          </h2>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onOpenWriteReview}
              className="px-5 py-2 rounded-full glass-panel hover:bg-white/10 text-xs font-semibold text-neutral-300 hover:text-white border border-white/15 flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span>Submit Your Testimonial</span>
            </button>
          </div>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative flex items-center justify-center">
          
          {/* Left Arrow Button */}
          <button
            onClick={prevReview}
            className="absolute left-0 sm:-left-3 lg:-left-6 z-20 w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95"
            title="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Row (3 visible cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-8 transition-all duration-500">
            {visibleReviews.map((rev, i) => (
              <div
                key={`${rev.id || i}-${startIndex}`}
                className="group relative flex flex-col items-center justify-between rounded-3xl glass-panel p-6 glass-panel-hover text-center overflow-hidden transition-all duration-500"
              >
                {/* Top ambient highlight gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                {/* Avatar with Cyan Glowing Circular Ring */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-sky-300 to-transparent shadow-[0_0_20px_#38bdf8] flex items-center justify-center">
                    <img
                      src={rev.avatar || "/assets/avatar_julian.png"}
                      alt={rev.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {rev.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-neutral-400 tracking-[0.2em] uppercase mt-0.5">
                    {rev.role}
                  </div>
                </div>

                {/* 5 Cyan Glowing Stars */}
                <div className="flex items-center gap-1 my-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < (rev.rating || 5)
                          ? 'text-sky-400 fill-sky-400 drop-shadow-[0_0_8px_#38bdf8]'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-xs mt-1">
                  "{rev.quote}"
                </p>

                {/* Cyan Glow Bar at the Bottom */}
                <div className="mt-6 flex justify-center w-full">
                  <div className="w-16 h-[3px] rounded-full bg-sky-400/80 shadow-[0_0_12px_#38bdf8] transition-all duration-300 group-hover:w-28 group-hover:bg-sky-300 group-hover:shadow-[0_0_18px_#38bdf8]" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextReview}
            className="absolute right-0 sm:-right-3 lg:-right-6 z-20 w-11 h-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95"
            title="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
