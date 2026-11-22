'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, X, ChevronsUpDown } from 'lucide-react';
import { SocialGlassCards } from './SocialGlassCards';
import FluxLines from './FluxLines';

const USER = {
  name: 'BLACK-X Admin',
  email: 'admin@blackx.io',
  avatar: 'https://ik.imagekit.io/aitoolkit/Miscellaneous/Avatars/Silhouette%20Profile%20Against%20Gradient%20Background%201.webp',
};

const pageBackground = {
  background: '#1A1A19',
};

const glassPanelBlur = {
  backdropFilter: 'blur(24px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
};

const dropdownGlass = {
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setMenuOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 w-full h-full overflow-y-auto flex flex-col text-right"
        style={{ ...pageBackground, fontFamily: "'Cairo', sans-serif" }}
      >
        {/* Interactive FluxLines Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <FluxLines
            colors={['#94a3b8', '#ffffff', '#94a3b8']}
            glow={2}
            rimWidth={0.2}
            lineWidth={1}
            flowDirection="down"
            mouseInteraction
            clickSwirl
            speed={0.5}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            sharpness={2.5}
            shimmer={1.5}
            mouseStrength={1}
            mouseRadius={0.35}
            intro
            lightMode={false}
          />
        </div>

        {/* Full-Page Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              title="إغلاق"
            >
              <X size={18} />
            </button>

            {/* Clickable User Trigger + Dropdown */}
            <div ref={dropdownRef} className="relative">
              <motion.button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3.5 text-right rounded-2xl px-2.5 py-1.5 -m-1.5 hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <ChevronsUpDown size={15} className="text-white/40 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-wide">{USER.name}</h3>
                  <p className="text-xs text-white/50">{USER.email}</p>
                </div>
                <img
                  src={USER.avatar}
                  alt={USER.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-purple-500/50 shadow-md"
                />
              </motion.button>

              {/* Dropdown Menu (Hidden by default until user clicks BLACK-X Admin) */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, y: -8, filter: 'blur(4px)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="absolute right-0 top-full mt-2 w-60 rounded-2xl p-2 z-30"
                    style={{ ...dropdownGlass, ...glassPanelBlur, transformOrigin: 'top right' }}
                  >
                    <motion.button
                      type="button"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.08] transition-colors cursor-pointer text-right"
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-xl"
                        style={{
                          width: 34,
                          height: 34,
                          background: 'rgba(58, 134, 255, 0.16)',
                          border: '1px solid rgba(58, 134, 255, 0.35)',
                        }}
                      >
                        <User size={16} style={{ color: '#3A86FF' }} />
                      </div>
                      <span className="text-sm font-medium text-white/90">Profile</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setMenuOpen(false);
                        onClose();
                        if (onOpenAdmin) onOpenAdmin();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 mt-1 hover:bg-white/[0.08] transition-colors cursor-pointer text-right"
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-xl"
                        style={{
                          width: 34,
                          height: 34,
                          background: 'rgba(179, 136, 255, 0.16)',
                          border: '1px solid rgba(179, 136, 255, 0.35)',
                        }}
                      >
                        <Settings size={16} style={{ color: '#B388FF' }} />
                      </div>
                      <span className="text-sm font-medium text-white/90">Settings</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Social Media Glass Cards Section */}
          <div className="flex-1 flex items-center justify-center">
            <SocialGlassCards />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
