import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StudioHeaderProps {
  onOpenAbout: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({ onOpenAbout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="relative z-20 w-full pt-6 pb-2 px-4 flex items-center justify-between">
      {/* 
        Side-by-side Logo + "BLACK-X" cleanly without enclosing box, extra subtitles or redundant badges.
        Clicking directly opens the developers / studio profile.
      */}
      <motion.button
        type="button"
        id="brand-header-trigger"
        onClick={onOpenAbout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="relative group flex items-center gap-3.5 sm:gap-4 p-1.5 -m-1.5 bg-transparent border-0 cursor-pointer select-none text-right outline-none"
        title="BLACK-X"
      >
        {/* Soft atmospheric backlight halo without any rectangular box border */}
        <div
          className={`absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
            isHovered ? 'opacity-100 blur-2xl scale-110' : 'opacity-40'
          }`}
        />

        {/* Iridescent Crystal Glass Logo (No enclosing rectangle) */}
        <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 flex items-center justify-center">
          <svg
            className="w-full h-full drop-shadow-[0_0_15px_rgba(192,132,252,0.9)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="iridescentGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#d8b4fe" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="glassFacetLight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2e0854" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Inlaid Hexagonal Crystal Facets */}
            <polygon
              points="50,6 92,28 92,72 50,94 8,72 8,28"
              fill="url(#glassFacetLight)"
              stroke="#d8b4fe"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Polished internal refractions */}
            <line x1="50" y1="6" x2="50" y2="50" stroke="#ffffff" strokeWidth="1.4" strokeOpacity="0.9" />
            <line x1="92" y1="28" x2="50" y2="50" stroke="#f3e8ff" strokeWidth="1.4" strokeOpacity="0.8" />
            <line x1="92" y1="72" x2="50" y2="50" stroke="#c084fc" strokeWidth="1.4" strokeOpacity="0.7" />
            <line x1="50" y1="94" x2="50" y2="50" stroke="#a855f7" strokeWidth="1.4" strokeOpacity="0.7" />
            <line x1="8" y1="72" x2="50" y2="50" stroke="#c084fc" strokeWidth="1.4" strokeOpacity="0.7" />
            <line x1="8" y1="28" x2="50" y2="50" stroke="#f3e8ff" strokeWidth="1.4" strokeOpacity="0.8" />

            {/* Glowing Core Crystal */}
            <polygon
              points="50,26 74,38 74,62 50,74 26,62 26,38"
              fill="url(#iridescentGlass)"
              stroke="#ffffff"
              strokeWidth="1.8"
            />
            <circle cx="50" cy="50" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />
          </svg>
        </div>

        {/* Brand Name Typography: Pure, minimalist BLACK-X */}
        <div className="relative flex items-center justify-center">
          <span
            id="brand-title-black-x"
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-widest leading-none drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:text-purple-200 group-hover:drop-shadow-[0_0_25px_rgba(192,132,252,0.8)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            BLACK-X
          </span>
        </div>
      </motion.button>
    </header>
  );
};
