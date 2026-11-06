import React from 'react';
import { motion } from 'motion/react';

interface BackgroundFractureWebProps {
  // Center of the currently focused card relative to the grid
  centerX: number;
  centerY: number;
  active: boolean;
}

export const BackgroundFractureWeb: React.FC<BackgroundFractureWebProps> = ({
  centerX,
  centerY,
  active,
}) => {
  if (!active) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-visible transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0 }}
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Intense Cosmic Plasma Fracture Gradient */}
          <linearGradient id="cosmicSpillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#e9d5ff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#7e22ce" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
          </linearGradient>

          {/* Glowing Energy Aura Filter */}
          <filter id="fractureBlastGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Large intricate web of glowing purple and white energy fractures radiating from behind focused card */}
        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          filter="url(#fractureBlastGlow)"
        >
          {/* Central violent epicenter flare */}
          <circle
            cx={centerX}
            cy={centerY}
            r="90"
            fill="url(#cosmicSpillGrad)"
            opacity="0.35"
          />

          {/* Primary Main Cracks radiating outward */}
          {/* Branch 1: Top-Right fissure */}
          <path
            d={`M ${centerX} ${centerY} Q ${centerX + 80} ${centerY - 70} ${centerX + 160} ${centerY - 130} T ${centerX + 260} ${centerY - 190} T ${centerX + 390} ${centerY - 260}`}
            stroke="url(#cosmicSpillGrad)"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Branch 1 subtendril */}
          <path
            d={`M ${centerX + 160} ${centerY - 130} L ${centerX + 220} ${centerY - 90} L ${centerX + 310} ${centerY - 110}`}
            stroke="#d8b4fe"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Branch 2: Top-Left fissure */}
          <path
            d={`M ${centerX} ${centerY} Q ${centerX - 70} ${centerY - 80} ${centerX - 150} ${centerY - 140} T ${centerX - 240} ${centerY - 220} T ${centerX - 360} ${centerY - 270}`}
            stroke="url(#cosmicSpillGrad)"
            strokeWidth="3.0"
            fill="none"
            strokeLinecap="round"
          />
          {/* Branch 2 subtendril */}
          <path
            d={`M ${centerX - 150} ${centerY - 140} L ${centerX - 200} ${centerY - 80} L ${centerX - 290} ${centerY - 90}`}
            stroke="#e9d5ff"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Branch 3: Bottom-Left fissure */}
          <path
            d={`M ${centerX} ${centerY} Q ${centerX - 80} ${centerY + 60} ${centerX - 170} ${centerY + 120} T ${centerX - 270} ${centerY + 200} T ${centerX - 380} ${centerY + 250}`}
            stroke="url(#cosmicSpillGrad)"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Branch 3 subtendril */}
          <path
            d={`M ${centerX - 170} ${centerY + 120} L ${centerX - 130} ${centerY + 190} L ${centerX - 210} ${centerY + 240}`}
            stroke="#c084fc"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Branch 4: Bottom-Right fissure */}
          <path
            d={`M ${centerX} ${centerY} Q ${centerX + 70} ${centerY + 70} ${centerX + 150} ${centerY + 130} T ${centerX + 250} ${centerY + 210} T ${centerX + 370} ${centerY + 270}`}
            stroke="url(#cosmicSpillGrad)"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Branch 4 subtendril */}
          <path
            d={`M ${centerX + 150} ${centerY + 130} L ${centerX + 210} ${centerY + 180} L ${centerX + 290} ${centerY + 230}`}
            stroke="#f3e8ff"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Branch 5: Direct Left Lightning crack */}
          <path
            d={`M ${centerX} ${centerY} L ${centerX - 90} ${centerY - 10} L ${centerX - 180} ${centerY + 15} L ${centerX - 300} ${centerY - 5} L ${centerX - 420} ${centerY + 10}`}
            stroke="#a855f7"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Branch 6: Direct Right Lightning crack */}
          <path
            d={`M ${centerX} ${centerY} L ${centerX + 90} ${centerY + 10} L ${centerX + 190} ${centerY - 15} L ${centerX + 310} ${centerY + 10} L ${centerX + 440} ${centerY - 10}`}
            stroke="#c084fc"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Intense core white lightning filaments */}
          <path
            d={`M ${centerX} ${centerY} L ${centerX + 50} ${centerY - 45} L ${centerX + 110} ${centerY - 30} L ${centerX + 170} ${centerY - 80}`}
            stroke="#ffffff"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${centerX} ${centerY} L ${centerX - 45} ${centerY + 40} L ${centerX - 100} ${centerY + 30} L ${centerX - 160} ${centerY + 70}`}
            stroke="#ffffff"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
};
