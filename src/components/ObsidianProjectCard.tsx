import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectShard } from '../types';
import { GlassShatterCanvas, ClickPoint } from './GlassShatterCanvas';
import {
  MessageCircle,
  Swords,
  Clapperboard,
  ShoppingCart,
  Palette,
  Database,
  Brain,
  KeyRound,
  Utensils,
} from 'lucide-react';

interface Shockwave {
  id: number;
  x: number;
  y: number;
}

interface ObsidianProjectCardProps {
  project: ProjectShard;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ObsidianProjectCard: React.FC<ObsidianProjectCardProps> = ({
  project,
  index,
  isFocused,
  onFocus,
  onBlur,
  onSelect,
}) => {
  // Array of dynamic click epicenters captured relative to the card's surface
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
  // Stress level: 0 = unblemished, 1 = cracked, 2 = severe stress, 3 = breakthrough
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [isBreaking, setIsBreaking] = useState<boolean>(false);
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [shakeTrigger, setShakeTrigger] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-heal cracks if untouched for 12 seconds
  useEffect(() => {
    if (stressLevel === 0) return;
    const timer = setTimeout(() => {
      setStressLevel(0);
      setClickPoints([]);
      setIsBreaking(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, [stressLevel]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    };
  }, []);

  // Capture exact dynamic click coordinates on card surface and immediately shatter smoothly on 1 click
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isBreaking) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newPt: ClickPoint = {
      x: clickX,
      y: clickY,
      timestamp: performance.now(),
    };

    setClickPoints([newPt]);
    setStressLevel(3);
    setIsBreaking(true);
    setShakeTrigger((prev) => prev + 1);
    triggerVisualFeedback(clickX, clickY);

    // Preserve exact coordinates and target for transition
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentTarget = e.currentTarget;
    const target = e.target;

    // Instantly launch smooth transition without intermediate delay
    onSelect({
      clientX,
      clientY,
      currentTarget,
      target,
    } as unknown as React.MouseEvent<HTMLDivElement>);

    setTimeout(() => {
      setStressLevel(0);
      setClickPoints([]);
      setIsBreaking(false);
    }, 600);
  };

  const triggerVisualFeedback = (x: number, y: number) => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 160);

    const newWave: Shockwave = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setShockwaves((prev) => [...prev.slice(-3), newWave]);
  };

  // Sustained press / hold support: progressively charges & shatters the glass across 3 ticks
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let current = stressLevel;

    holdTimerRef.current = setInterval(() => {
      current += 1;
      const pt: ClickPoint = {
        x: clickX + (Math.random() - 0.5) * 40,
        y: clickY + (Math.random() - 0.5) * 40,
        timestamp: performance.now(),
      };
      setClickPoints((prev) => [...prev, pt]);
      triggerVisualFeedback(pt.x, pt.y);
      setShakeTrigger((prev) => prev + 1);

      if (current >= 3) {
        setStressLevel(3);
        setIsBreaking(true);
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        const clientX = e.clientX;
        const clientY = e.clientY;
        const currentTarget = e.currentTarget;
        const target = e.target;
        setTimeout(() => {
          onSelect({
            clientX,
            clientY,
            currentTarget,
            target,
          } as unknown as React.MouseEvent<HTMLDivElement>);
          setTimeout(() => {
            setStressLevel(0);
            setClickPoints([]);
            setIsBreaking(false);
          }, 500);
        }, 100);
      } else {
        setStressLevel(current);
      }
    }, 450);
  };

  const handleMouseUpOrLeave = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  // Minimal icon for the card
  const renderCardIcon = () => {
    const iconClass = `w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
      isFocused || stressLevel > 0
        ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-110'
        : 'text-purple-300/40'
    }`;

    switch (index) {
      case 0:
        return <MessageCircle className={iconClass} />;
      case 1:
        return <Swords className={iconClass} />;
      case 2:
        return <Clapperboard className={iconClass} />;
      case 3:
        return <ShoppingCart className={iconClass} />;
      case 4:
        return <Utensils className={iconClass} />;
      case 5:
        return <Database className={iconClass} />;
      case 6:
        return <Brain className={iconClass} />;
      case 7:
        return <KeyRound className={iconClass} />;
      default:
        return <MessageCircle className={iconClass} />;
    }
  };

  // Dynamic progressive scaling:
  // Card progressively scales larger in size with each click as energy stresses the structure
  const getCardScale = () => {
    if (stressLevel === 3) return 1.12;
    if (stressLevel === 2) return 1.075;
    if (stressLevel === 1) return 1.035;
    return 1.0;
  };

  return (
    <div
      className="relative flex items-center justify-center p-1 sm:p-2"
      id={`obsidian-card-wrapper-${index}`}
    >
      {/* 
        1. AURA & BACKLIGHT BEHIND CARD:
        - Default state: Completely subtle/dark.
        - Hover Effect: A soft, low-intensity neon purple backlight appears strictly from behind the card edges.
        - Progressive Cracking: Bleeds wider and brighter as stressLevel increases.
      */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
          stressLevel === 3
            ? 'bg-gradient-to-r from-[#9D00FF] via-[#8A2BE2] to-[#ffffff] blur-3xl opacity-100 scale-125 animate-pulse'
            : stressLevel === 2
            ? 'bg-gradient-to-r from-[#9D00FF] via-[#8A2BE2] to-[#c084fc] blur-2xl opacity-90 scale-115'
            : stressLevel === 1
            ? 'bg-[#8A2BE2]/50 blur-xl opacity-75 scale-108'
            : isFocused
            ? 'bg-[#9D00FF]/30 blur-xl opacity-80 scale-105'
            : 'bg-purple-950/15 blur-lg opacity-20 scale-95'
        }`}
      />

      {/* 
        2. THE SOLID PITCH-BLACK (#050505) OBSIDIAN / GLASS SLAB:
        - Initial State: Solid pitch black, completely opaque, zero visible cracks, no counters.
        - Progressive Scaling: Card dynamically expands larger with each click.
        - Kinetic Impact: High-speed micro-shudder on impact.
      */}
      <motion.div
        ref={cardRef}
        id={`obsidian-card-${index}`}
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onFocus}
        onMouseLeave={() => {
          onBlur();
          handleMouseUpOrLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onClick={handleCardClick}
        animate={{
          scale: getCardScale(),
          x:
            shakeTrigger > 0
              ? [0, -3.5, 3.5, -2, 2, -1, 0]
              : 0,
          y:
            shakeTrigger > 0
              ? [0, -2, 2, -1, 1, 0]
              : 0,
        }}
        transition={{
          scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          x: { duration: 0.22, ease: 'easeInOut' },
          y: { duration: 0.22, ease: 'easeInOut' },
        }}
        whileHover={stressLevel === 0 ? { y: -3, scale: 1.015 } : {}}
        className={`relative z-10 w-full aspect-[16/11] rounded-2xl bg-[#050505] cursor-pointer select-none overflow-hidden flex flex-col justify-between p-4 sm:p-5 outline-none border transition-colors duration-300 ${
          stressLevel >= 2
            ? 'border-[#9D00FF] shadow-[0_0_35px_rgba(157,0,255,0.7),0_15px_40px_rgba(0,0,0,0.95)]'
            : stressLevel === 1
            ? 'border-[#8A2BE2]/80 shadow-[0_0_20px_rgba(138,43,226,0.5),0_10px_30px_rgba(0,0,0,0.95)]'
            : isFocused
            ? 'border-purple-500/50 shadow-[0_12px_35px_rgba(0,0,0,0.95)]'
            : 'border-purple-900/25 shadow-[0_8px_25px_rgba(0,0,0,0.9)]'
        }`}
      >
        {/* Completely solid pitch-black #050505 backing */}
        <div className="absolute inset-0 bg-[#050505] pointer-events-none z-0" />

        {/* Subtle stone/glass microstructure texture on solid pitch black */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
            backgroundSize: '7px 7px',
          }}
        />

        {/* 
          3. DYNAMIC PROCEDURAL CANVAS GLASS SHATTERING:
          - Dynamic point detection
          - Procedural spiderweb/radial fracture pattern centered EXACTLY at click points
          - Vibrant neon electric purple light bleeding through crevices
          - Physical shard explosion on final breakthrough
        */}
        <GlassShatterCanvas
          clickPoints={clickPoints}
          stressLevel={stressLevel}
          isBreaking={isBreaking}
          className="z-10"
        />

        {/* 
          VISUAL FEEDBACK: Brief intense purple flash radiating with each click
        */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-tr from-[#9D00FF]/60 via-white/50 to-[#8A2BE2]/60 pointer-events-none z-30 mix-blend-screen"
            />
          )}
        </AnimatePresence>

        {/* 
          VISUAL FEEDBACK: Radiating purple shockwaves expanding from exact click coordinates
        */}
        {shockwaves.map((wave) => (
          <motion.span
            key={wave.id}
            initial={{ width: 0, height: 0, opacity: 1, scale: 0 }}
            animate={{ width: 420, height: 420, opacity: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              setShockwaves((prev) => prev.filter((w) => w.id !== wave.id));
            }}
            className="absolute rounded-full border-2 border-[#9D00FF] shadow-[0_0_22px_#8A2BE2] pointer-events-none z-25 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: wave.x,
              top: wave.y,
            }}
          />
        ))}

        {/* 
          4. ABSOLUTE CLEAN UI (NO COUNTERS, NO PIPS, NO NUMBERS):
          Top Bar: Only the sleek, subtle icon box on the left.
        */}
        <div className="relative z-20 flex items-center justify-between w-full">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              stressLevel >= 2
                ? 'bg-[#9D00FF]/50 border-[#ffffff] shadow-[0_0_18px_#9D00FF]'
                : stressLevel === 1
                ? 'bg-purple-950/80 border-purple-400/80 shadow-[0_0_12px_rgba(192,132,252,0.6)]'
                : 'bg-black/60 border-purple-900/30'
            }`}
          >
            {renderCardIcon()}
          </div>
        </div>

        {/* 
          Bottom Bar: Clean, stylized Arabic typography & English title
        */}
        <div className="relative z-20 flex flex-col text-right w-full mt-auto pt-2">
          <span
            className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
              stressLevel > 0 ? 'text-purple-200 drop-shadow-[0_0_8px_#9D00FF]' : 'text-purple-300/35'
            }`}
          >
            {project.titleEn}
          </span>

          <h3
            className={`text-base sm:text-lg md:text-xl font-bold tracking-tight mt-0.5 transition-all duration-300 ${
              stressLevel >= 2
                ? 'text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.95)] scale-[1.03] origin-right'
                : stressLevel === 1
                ? 'text-white drop-shadow-[0_2px_12px_rgba(157,0,255,0.75)]'
                : isFocused
                ? 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]'
                : 'text-slate-200/90'
            }`}
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {project.title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};
