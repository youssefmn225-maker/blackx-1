'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ElectricLogo from './ElectricLogo';
import { BorderBeam } from './BorderBeam';

interface GlassNavbarProps {
  onOpenAbout?: () => void;
  onAdminTrigger?: () => void;
}

export default function GlassNavbar({ onOpenAbout, onAdminTrigger }: GlassNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef<boolean>(false);

  const startHolding = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isHoldingRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (isHoldingRef.current && onAdminTrigger) {
        isHoldingRef.current = false;
        onAdminTrigger();
      }
    }, 8000);
  };

  const stopHolding = () => {
    if (isHoldingRef.current) {
      isHoldingRef.current = false;
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  };

  const glassBlur = {
    backdropFilter: 'blur(24px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
  };

  const ctaStyle = {
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.75), rgba(107, 33, 168, 0.6))',
    border: '1px solid rgba(192, 132, 252, 0.25)',
    boxShadow: '0 2px 16px rgba(168, 85, 247, 0.4)',
  };

  const ctaHoverStyle = {
    background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.9), rgba(126, 34, 206, 0.8))',
    boxShadow: '0 4px 24px rgba(168, 85, 247, 0.6)',
  };

  return (
    <div className="relative flex w-full items-center justify-center py-4 px-4 z-30 select-none">
      <div className="relative flex w-full max-w-[720px] flex-col">
        <motion.nav
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="relative isolate flex w-full items-center gap-1 rounded-full px-3 py-2 overflow-hidden"
          style={glassStyle}
        >
          <div className="pointer-events-none absolute inset-0 z-[-1] rounded-full" style={glassBlur} />
          <BorderBeam size={100} duration={5} colorFrom="#a855f7" colorTo="#3b82f6" borderWidth={1.5} />
          
          {/* Logo + Brand Name with 8s hold trigger for admin backend (no single-click) */}
          <div
            className="flex items-center gap-2.5 px-3 group"
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            title="BLACK-X"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center">
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
            <span
              className="text-base sm:text-lg font-black text-white/95 tracking-widest drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] group-hover:text-purple-200 transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              BLACK-X
            </span>
          </div>

          <div className="flex-1" />

          <div className="hidden items-center gap-1 sm:flex">
            <motion.button
              onClick={onOpenAbout}
              whileHover={{ scale: 1.04, ...ctaHoverStyle }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={ctaStyle}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              About
            </motion.button>
          </div>

          <motion.button
            className="mr-2 flex cursor-pointer items-center justify-center rounded-full p-2 text-white/80 sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, y: -8, overflow: 'hidden' }}
              animate={{ height: 'auto', y: 0, transitionEnd: { overflow: 'visible' } }}
              exit={{ height: 0, y: -8, overflow: 'hidden' }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-2 sm:hidden"
            >
              <motion.div
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative isolate flex flex-col gap-1 rounded-2xl p-2"
                style={glassStyle}
              >
                <div className="pointer-events-none absolute inset-0 z-[-1] rounded-2xl" style={glassBlur} />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (onOpenAbout) onOpenAbout();
                  }}
                  className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-white text-center"
                  style={ctaStyle}
                >
                  About
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
