import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectShard } from '../types';

interface InteractiveVideoPortalProps {
  project: ProjectShard;
  className?: string;
  onLaunch?: () => void;
}

export const InteractiveVideoPortal: React.FC<InteractiveVideoPortalProps> = ({
  project,
  className = '',
  onLaunch,
}) => {
  // Cycle timer: 15 seconds seamless loop (0s -> 15s)
  // Phase breakdown:
  // 0s - 2.5s: Idle state & subtle electric blue hum
  // 2.5s - 5.5s: Well 1 (Top-Left) ignites & streams data to core
  // 5.5s - 8.5s: Well 2 (Top-Right) ignites & streams data to core
  // 8.5s - 11.5s: Well 3 (Bottom-Left) ignites & streams data to core
  // 11.5s - 14.0s: Well 4 (Bottom-Right) ignites & streams data to core
  // 14.0s - 15.0s: Full-power synchronized resonance & loop reset
  const [cycleTime, setCycleTime] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleTime((prev) => (prev + 0.1) % 15);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const well1Active = cycleTime >= 2.5;
  const well2Active = cycleTime >= 5.5;
  const well3Active = cycleTime >= 8.5;
  const well4Active = cycleTime >= 11.5;
  const allWellsPeak = cycleTime >= 13.8;

  const targetUrl =
    project.projectUrl ||
    `https://aha-studio.digital/projects/${project.id}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLaunch) {
      onLaunch();
    } else {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.025, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-72 sm:w-80 md:w-88 aspect-square rounded-3xl bg-[#05010c] border border-purple-500/40 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(157,0,255,0.35)] cursor-pointer select-none overflow-hidden transition-all duration-300 ${className}`}
      title="بوابة الفيديو التفاعلية - انقر لفتح المتجر الإلكتروني مباشرة"
    >
      {/* 
        ========================================================================
        1. DEEP VIGNETTED PURPLE & ELECTRIC BLUE ABYSS BACKGROUND
        ========================================================================
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(32, 7, 68, 0.9) 0%, rgba(13, 2, 28, 0.98) 55%, #030008 100%)',
        }}
      />

      {/* Dynamic volumetric nebula clouds reacting to cycle */}
      <motion.div
        animate={{
          opacity: allWellsPeak ? 0.75 : isHovered ? 0.65 : 0.45,
          scale: allWellsPeak ? 1.08 : 1,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(0, 229, 255, 0.25) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(157, 0, 255, 0.3) 0%, transparent 55%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Cybernetic High-Tech Grid Floor with Perspective Tilt */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 229, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, transparent 85%)',
        }}
      />

      {/* 
        ========================================================================
        2. COMPLEX NETWORK CONDUITS MATRIX (CONNECTING CORNERS TO CENTRAL CORE)
        ========================================================================
      */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="neonPulseBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9D00FF" stopOpacity="0.9" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Conduit Lines from Corner Wells to Central Server Stack */}
        {/* Top-Left to Core */}
        <line
          x1="52"
          y1="52"
          x2="135"
          y2="135"
          stroke={well1Active ? '#00e5ff' : '#1e0f38'}
          strokeWidth={well1Active ? 2 : 1}
          strokeDasharray={well1Active ? '4 2' : 'none'}
          filter={well1Active ? 'url(#glowFilter)' : undefined}
          className="transition-colors duration-500"
        />
        {/* Top-Right to Core */}
        <line
          x1="268"
          y1="52"
          x2="185"
          y2="135"
          stroke={well2Active ? '#a855f7' : '#1e0f38'}
          strokeWidth={well2Active ? 2 : 1}
          strokeDasharray={well2Active ? '4 2' : 'none'}
          filter={well2Active ? 'url(#glowFilter)' : undefined}
          className="transition-colors duration-500"
        />
        {/* Bottom-Left to Core */}
        <line
          x1="52"
          y1="268"
          x2="135"
          y2="185"
          stroke={well3Active ? '#a855f7' : '#1e0f38'}
          strokeWidth={well3Active ? 2 : 1}
          strokeDasharray={well3Active ? '4 2' : 'none'}
          filter={well3Active ? 'url(#glowFilter)' : undefined}
          className="transition-colors duration-500"
        />
        {/* Bottom-Right to Core */}
        <line
          x1="268"
          y1="268"
          x2="185"
          y2="185"
          stroke={well4Active ? '#00e5ff' : '#1e0f38'}
          strokeWidth={well4Active ? 2 : 1}
          strokeDasharray={well4Active ? '4 2' : 'none'}
          filter={well4Active ? 'url(#glowFilter)' : undefined}
          className="transition-colors duration-500"
        />

        {/* Data Stream Particle Pulses Along Active Conduits */}
        {well1Active && (
          <circle r="2.5" fill="#ffffff" filter="url(#glowFilter)">
            <animateMotion
              path="M 52,52 L 135,135"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {well2Active && (
          <circle r="2.5" fill="#ffffff" filter="url(#glowFilter)">
            <animateMotion
              path="M 268,52 L 185,135"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {well3Active && (
          <circle r="2.5" fill="#ffffff" filter="url(#glowFilter)">
            <animateMotion
              path="M 52,268 L 135,185"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        {well4Active && (
          <circle r="2.5" fill="#ffffff" filter="url(#glowFilter)">
            <animateMotion
              path="M 268,268 L 185,185"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        {/* Concentric Energy Nexus Ring around Server Stack */}
        <circle
          cx="160"
          cy="160"
          r="48"
          fill="none"
          stroke="url(#neonPulseBlue)"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          className="animate-[spin_20s_linear_infinite]"
          opacity={isHovered ? 0.9 : 0.6}
        />
        <circle
          cx="160"
          cy="160"
          r="62"
          fill="none"
          stroke="#9D00FF"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          className="animate-[spin_30s_linear_infinite_reverse]"
          opacity={isHovered ? 0.6 : 0.35}
        />
      </svg>

      {/* 
        ========================================================================
        3. THE FOUR ACTIVATION WELLS (HEXAGONAL ENERGY PORTALS AT QR CORNERS)
        Top-Left, Top-Right, Bottom-Left, Bottom-Right
        ========================================================================
      */}
      {/* WELL 1: TOP-LEFT */}
      <div className="absolute top-4 left-4 z-20">
        <HexagonalEnergyWell
          isActive={well1Active}
          index={1}
          cycleTime={cycleTime}
          accentColor="#00e5ff"
        />
      </div>

      {/* WELL 2: TOP-RIGHT */}
      <div className="absolute top-4 right-4 z-20">
        <HexagonalEnergyWell
          isActive={well2Active}
          index={2}
          cycleTime={cycleTime}
          accentColor="#c084fc"
        />
      </div>

      {/* WELL 3: BOTTOM-LEFT */}
      <div className="absolute bottom-4 left-4 z-20">
        <HexagonalEnergyWell
          isActive={well3Active}
          index={3}
          cycleTime={cycleTime}
          accentColor="#a855f7"
        />
      </div>

      {/* WELL 4: BOTTOM-RIGHT */}
      <div className="absolute bottom-4 right-4 z-20">
        <HexagonalEnergyWell
          isActive={well4Active}
          index={4}
          cycleTime={cycleTime}
          accentColor="#00e5ff"
        />
      </div>

      {/* 
        ========================================================================
        4. SUBTLE ETCHED ARABIC TYPOGRAPHY (NO "SCAN ME" / NO "CLICK HERE")
        Text 1 (Above Core): Stylized white & electric blue "مشروع متجر الكتروني"
        Text 2 (Below Core): "اكتشف إمكانيات السيرفر" & "تخصيص كامل"
        ========================================================================
      */}
      {/* Text 1: Above Core */}
      <div className="absolute top-7 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
        <motion.span
          animate={{
            textShadow: allWellsPeak
              ? '0 0 15px #00e5ff, 0 0 25px #c084fc'
              : '0 0 8px rgba(0,229,255,0.7)',
            opacity: [0.85, 1, 0.85],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs sm:text-[13px] font-black tracking-wider text-white select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          مشروع متجر الكتروني
        </motion.span>
        <span className="text-[9px] font-mono tracking-widest text-[#00e5ff]/80 uppercase">
          E-COMMERCE DATA PORTAL
        </span>
      </div>

      {/* Text 2: Below Core within energy flow */}
      <div className="absolute bottom-7 left-0 right-0 z-20 flex items-center justify-center gap-3 pointer-events-none">
        <span
          className="text-[10px] font-bold text-purple-200/90 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          اكتشف إمكانيات السيرفر
        </span>
        <span className="w-1 h-1 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" />
        <span
          className="text-[10px] font-bold text-[#00e5ff]/90 drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          تخصيص كامل
        </span>
      </div>

      {/* 
        ========================================================================
        5. CENTRAL CORE (THE NEXUS):
        Specialized Server Rack Stack + Integrated Product Packages + Glowing Gift Tag
        ========================================================================
      */}
      <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
        <div className="relative w-28 h-32 flex flex-col items-center justify-center">
          {/* Volumetric Core Glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
            style={{
              background: allWellsPeak
                ? 'radial-gradient(circle, rgba(0, 229, 255, 0.45) 0%, rgba(157, 0, 255, 0.35) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(157, 0, 255, 0.35) 0%, rgba(0, 229, 255, 0.15) 50%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Specialized Server Rack Stack Frame (Matte Obsidian Construct) */}
          <div className="relative w-24 h-24 rounded-2xl bg-[#090217] border-2 border-purple-500/60 p-2 shadow-[0_0_25px_rgba(157,0,255,0.45)] flex flex-col justify-between overflow-hidden">
            {/* Server Blade 1 (Top Chassis) */}
            <div className="w-full h-4 rounded-md bg-[#130526] border border-purple-400/40 flex items-center justify-between px-1.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex gap-0.5">
                <span className="w-3 h-1 bg-purple-400/50 rounded-xs" />
                <span className="w-2 h-1 bg-purple-400/50 rounded-xs" />
              </div>
            </div>

            {/* Server Blade 2 (Integrated Product Display: Glowing Boxes & Tag) */}
            <div className="relative w-full h-8 rounded-md bg-[#1b0738]/90 border border-purple-300/40 flex items-center justify-around px-1 overflow-hidden">
              {/* Product Box 1: Cyber Hologram Cube */}
              <div className="relative w-5 h-5 rounded bg-[#2a0b54] border border-[#00e5ff]/80 flex items-center justify-center shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                <span className="text-[7px] font-mono text-[#00e5ff] font-bold">PKG</span>
                <span className="absolute -top-1 right-1 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_4px_#f472b6]" />
              </div>

              {/* Product Box 2: Gift Tag Product with Fiber Ribbon */}
              <div className="relative w-6 h-6 rounded bg-[#350f68] border border-purple-300/80 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.7)]">
                {/* Stylized Gift Ribbon Cross */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-[#f0abfc]" />
                  <div className="h-full w-0.5 bg-[#f0abfc]" />
                </div>
                <span className="relative z-10 text-[8px]">🎁</span>
              </div>

              {/* Mini Server Activity LEDs */}
              <div className="flex flex-col gap-1">
                <span className="w-1 h-1 rounded-full bg-[#00e5ff] animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-purple-400" />
              </div>
            </div>

            {/* Server Blade 3 (Bottom Core Storage Unit) */}
            <div className="w-full h-4 rounded-md bg-[#130526] border border-purple-400/40 flex items-center justify-between px-1.5">
              <span className="text-[7px] font-mono text-purple-300 tracking-wider">
                CORE:ONLINE
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </div>
            </div>

            {/* Subtle Horizontal Scan Sweep */}
            <motion.div
              animate={{ y: ['-10%', '110%'] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-75 pointer-events-none"
            />
          </div>

          {/* 
            ====================================================================
            6. IRIDESCENT GEOMETRIC SHOPPING CART BASKET ICON ORBITING THE CORE
            Subtly integrated icon catching the purple & electric blue light
            ====================================================================
          */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: isHovered ? 6 : 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div
              className="absolute -top-4 w-7 h-7 rounded-xl bg-[#120429]/90 border border-[#00e5ff]/80 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.7)]"
              style={{
                transform: 'rotate(-45deg)',
              }}
            >
              {/* Faceted Geometric Cart SVG */}
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 3h2l2.4 12h11.2l2.4-8H6.5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="19" r="1.5" fill="#00e5ff" />
                <circle cx="17" cy="19" r="1.5" fill="#c084fc" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 
        ========================================================================
        7. SPECULAR CORNER BRACKETS & INTERACTIVE PULSE OVERLAY
        ========================================================================
      */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00e5ff]/70 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00e5ff]/70 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00e5ff]/70 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00e5ff]/70 pointer-events-none" />

      {/* Hover prompt sheen */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-700 pointer-events-none ${
          isHovered ? 'translate-x-full' : ''
        }`}
      />
    </motion.div>
  );
};

// ============================================================================
// SUB-COMPONENT: MULTI-LAYERED DEEP HEXAGONAL ENERGY WELL (AT QR CORNERS)
// ============================================================================
interface HexagonalEnergyWellProps {
  isActive: boolean;
  index: number;
  cycleTime: number;
  accentColor: string;
}

const HexagonalEnergyWell: React.FC<HexagonalEnergyWellProps> = ({
  isActive,
  index,
  accentColor,
}) => {
  return (
    <div className="relative w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center">
      {/* Outer Hexagon Shell (Matte Obsidian) */}
      <svg className="w-full h-full" viewBox="0 0 60 60">
        <defs>
          <radialGradient id={`wellGlow-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={isActive ? 0.95 : 0.1} />
            <stop offset="35%" stopColor={accentColor} stopOpacity={isActive ? 0.85 : 0.05} />
            <stop offset="70%" stopColor="#9D00FF" stopOpacity={isActive ? 0.7 : 0.05} />
            <stop offset="100%" stopColor="#05010c" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer Stepped Hexagon Frame */}
        <polygon
          points="30,3 54,16 54,44 30,57 6,44 6,16"
          fill="#06010f"
          stroke={isActive ? accentColor : '#1f0d36'}
          strokeWidth="2"
          className="transition-colors duration-700"
        />

        {/* Middle Stepped Hexagon Ring */}
        <polygon
          points="30,8 49,19 49,41 30,52 11,41 11,19"
          fill="#0b021a"
          stroke={isActive ? '#c084fc' : '#140726'}
          strokeWidth="1.5"
          className="transition-colors duration-700"
        />

        {/* Inner Deep Energy Pool (Active Swirling Nebula) */}
        <polygon
          points="30,14 43,21 43,39 30,46 17,39 17,21"
          fill={`url(#wellGlow-${index})`}
          stroke={isActive ? '#ffffff' : '#0e041e'}
          strokeWidth={isActive ? 1.5 : 1}
          className="transition-all duration-700"
        />

        {/* Concentric Center Activation Core Dot */}
        <circle
          cx="30"
          cy="30"
          r={isActive ? 4 : 2}
          fill={isActive ? '#ffffff' : '#230b42'}
          className="transition-all duration-500"
        />
      </svg>

      {/* Emissive Ambient Glow when active */}
      {isActive && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(157, 0, 255, 0.4) 60%, transparent 80%)`,
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Sequential Identifier Tag */}
      <span
        className={`absolute bottom-0 text-[7px] font-mono tracking-tighter transition-colors duration-500 ${
          isActive ? 'text-[#00e5ff] font-bold' : 'text-purple-900/60'
        }`}
      >
        W-0{index}
      </span>
    </div>
  );
};
