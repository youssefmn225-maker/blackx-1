import React, { useState } from 'react';
import { motion } from 'motion/react';
import ElectricLogo from './ElectricLogo';

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

        {/* ElectricLogo Animation */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
          <ElectricLogo
            src="/logo.svg"
            color="#2357ad"
            glowColor="#0a234d"
            scale={0.7}
            strands={3}
            bend={0.6}
            crackle={1.5}
            arcs={1}
            speed={2.5}
            interactive
            intensity={1.15}
            glow={1.1}
            thickness={1.5}
            flicker={0.6}
            fill={0}
            cursorIntensity={0.75}
            cursorRadius={100}
          />
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
