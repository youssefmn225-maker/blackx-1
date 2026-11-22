'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, LogOut, Users, CreditCard, X } from 'lucide-react';

const USER = {
  name: 'BLACK-X Admin',
  email: 'admin@blackx.io',
  avatar: 'https://ik.imagekit.io/aitoolkit/Miscellaneous/Avatars/Silhouette%20Profile%20Against%20Gradient%20Background%201.webp',
};

const MENU_GROUPS = [
  {
    label: 'Account',
    items: [
      { icon: User, label: 'Profile', color: '#3A86FF' },
      { icon: Settings, label: 'Settings', color: '#B388FF' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { icon: Users, label: 'Team', color: '#06D6A0' },
      { icon: CreditCard, label: 'Billing', color: '#FFBE0B' },
    ],
  },
];

const glassPanel = {
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
};

const glassPanelBlur = {
  backdropFilter: 'blur(24px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  if (!isOpen) return null;

  let itemIndex = 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/80">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 cursor-pointer"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="relative z-10 w-full max-w-md rounded-3xl p-6 text-right overflow-hidden"
          style={{ ...glassPanel, ...glassPanelBlur }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Info Header inside modal */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/10">
            <img
              src={USER.avatar}
              alt={USER.name}
              className="h-14 w-14 rounded-full object-cover border-2 border-purple-500/50 shadow-lg"
            />
            <div>
              <h3 className="text-lg font-black text-white">{USER.name}</h3>
              <p className="text-xs text-white/60">{USER.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            {MENU_GROUPS.map((group) => (
              <div key={group.label} className="mb-2">
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const idx = itemIndex++;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 mb-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
                      onClick={() => {
                        if (item.label === 'Settings' && onOpenAdmin) {
                          onClose();
                          onOpenAdmin();
                        }
                      }}
                    >
                      <div
                        className="flex shrink-0 items-center justify-center rounded-xl"
                        style={{
                          width: 36,
                          height: 36,
                          background: `${item.color}20`,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <span className="text-sm font-semibold text-white/90">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            <div className="my-3 h-[1px] bg-white/10" />

            {/* Log Out */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
              onClick={onClose}
            >
              <div
                className="flex shrink-0 items-center justify-center rounded-xl"
                style={{
                  width: 36,
                  height: 36,
                  background: '#FF5A5A25',
                  border: '1px solid #FF5A5A40',
                }}
              >
                <LogOut size={18} style={{ color: '#FF5A5A' }} />
              </div>
              <span className="text-sm font-semibold text-red-400">
                Log Out
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
