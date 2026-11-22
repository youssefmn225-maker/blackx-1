'use client';

import React, { useRef, useState, useEffect, type ComponentType } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import ElectricLogo from './ElectricLogo';

interface BrandIconProps {
  size?: number;
}

function WhatsAppOfficialIcon({ size = 28 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="wa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60F67A" />
          <stop offset="50%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#128C7E" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#wa-grad)" />
      <path
        d="M24 11.5C17.1 11.5 11.5 17.05 11.5 23.9C11.5 26.35 12.22 28.63 13.45 30.55L12.1 35.5L17.18 34.17C19.04 35.29 21.44 35.93 24 35.93C30.9 35.93 36.5 30.38 36.5 23.53C36.5 16.68 30.9 11.5 24 11.5Z"
        stroke="#FFFFFF"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <path
        d="M19.85 18.6C19.55 17.95 19.25 17.93 18.96 17.92C18.73 17.91 18.46 17.91 18.2 17.91C17.93 17.91 17.5 18.01 17.14 18.41C16.78 18.81 15.75 19.77 15.75 21.72C15.75 23.67 17.17 25.56 17.37 25.82C17.57 26.08 20.12 30.2 24.16 31.79C27.52 33.11 28.2 32.85 28.93 32.78C29.66 32.71 31.28 31.82 31.61 30.9C31.94 29.98 31.94 29.19 31.84 29.02C31.74 28.85 31.48 28.75 31.08 28.55C30.68 28.35 28.73 27.39 28.36 27.26C28 27.13 27.73 27.06 27.47 27.46C27.2 27.86 26.44 28.75 26.21 29.02C25.98 29.28 25.75 29.32 25.35 29.12C24.95 28.92 23.67 28.5 22.14 27.14C20.95 26.08 20.15 24.78 19.92 24.38C19.69 23.98 19.9 23.76 20.1 23.56C20.28 23.38 20.5 23.09 20.7 22.86C20.9 22.63 20.96 22.46 21.1 22.2C21.23 21.93 21.16 21.7 21.06 21.5C20.96 21.3 20.18 19.34 19.85 18.6Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function InstagramOfficialIcon({ size = 28 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad-1" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#ig-grad-1)" />
      <rect
        x="11"
        y="11"
        width="26"
        height="26"
        rx="7.5"
        stroke="#FFFFFF"
        strokeWidth="2.6"
      />
      <circle cx="24" cy="24" r="6.2" stroke="#FFFFFF" strokeWidth="2.6" />
      <circle cx="31.8" cy="16.2" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}

function TelegramOfficialIcon({ size = 28 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="tg-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#37AEE2" />
          <stop offset="100%" stopColor="#1E96C8" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#tg-grad)" />
      <path
        d="M34.6 15.2L11.8 24C10.25 24.62 10.26 25.49 11.52 25.88L17.37 27.7L30.92 19.16C31.56 18.77 32.15 18.98 31.66 19.41L20.68 29.32L20.28 35.33C20.87 35.33 21.13 35.06 21.46 34.74L24.28 32L30.15 36.33C31.23 36.93 32.01 36.62 32.28 35.33L36.14 17.15C36.53 15.57 35.53 14.85 34.6 15.2Z"
        fill="#FFFFFF"
      />
      <path
        d="M20.28 35.33L20.68 29.32L31.66 19.41L17.37 27.7L20.28 35.33Z"
        fill="#D2E9F7"
      />
      <path
        d="M20.28 35.33L24.28 32L20.68 29.32L20.28 35.33Z"
        fill="#B5D8EE"
      />
    </svg>
  );
}

function FacebookOfficialIcon({ size = 28 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="fb-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#18ACFE" />
          <stop offset="100%" stopColor="#0163E0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#fb-grad)" />
      <path
        d="M26.5 45.8V30.1H31.7L32.5 24H26.5V20.1C26.5 18.35 27 17.15 29.55 17.15H32.7V11.7C32.15 11.63 30.28 11.46 28.05 11.46C23.44 11.46 20.28 14.27 20.28 19.44V24H15.1V30.1H20.28V45.65C21.5 45.88 22.73 46 24 46C24.85 46 25.68 45.93 26.5 45.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

interface SocialCardConfig {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  gradient: string;
  cta: string;
  href: string;
  Icon: ComponentType<BrandIconProps>;
}

const SOCIAL_CARDS: SocialCardConfig[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'محادثة فورية واستشارات سريعة للمشاريع عبر واتساب.',
    color: '#25D366',
    gradient: '#25D366, #128C7E',
    cta: 'تواصل واتساب',
    href: 'https://wa.me/201098765432?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8b%20%D8%A8%D9%84%D8%A7%D9%83%20%D8%A5%D9%83%D8%B3',
    Icon: WhatsAppOfficialIcon,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'معرض الهويات البصرية وواجهات المستخدم وكواليس العمل.',
    color: '#E1306C',
    gradient: '#E1306C, #F77737',
    cta: 'زيارة إنستجرام',
    href: 'https://instagram.com',
    Icon: InstagramOfficialIcon,
  },
  {
    id: 'telegram',
    title: 'Telegram',
    subtitle: 'الدعم الفني المباشر واستقبال استفسارات المشاريع فوراً.',
    color: '#229ED9',
    gradient: '#229ED9, #38BDF8',
    cta: 'مراسلة تليجرام',
    href: 'https://t.me/BlackXOfficial_bot',
    Icon: TelegramOfficialIcon,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'الصفحة الرسمية لمتابعة أحدث الإطلاقات والأخبار.',
    color: '#1877F2',
    gradient: '#1877F2, #60A5FA',
    cta: 'صفحة فيسبوك',
    href: 'https://facebook.com',
    Icon: FacebookOfficialIcon,
  },
];

interface ExpandedGlassCardProps {
  card: SocialCardConfig;
  onClose: () => void;
}

function ExpandedGlassCard({ card, onClose }: ExpandedGlassCardProps) {
  const { title, subtitle, color, gradient, cta, href, Icon } = card;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const firstColor = gradient.split(',')[0].trim();
  const secondColor = gradient.split(',')[1]?.trim() ?? firstColor;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, scale: 0.45, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.45, y: 12, filter: 'blur(8px)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative w-72 sm:w-80 overflow-hidden rounded-3xl p-[1px]"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-40"
        style={{ background: `linear-gradient(135deg, ${gradient}, transparent 60%)` }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="relative rounded-3xl p-6 text-right"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          boxShadow: `0 16px 48px rgba(0, 0, 0, 0.45), 0 0 36px ${color}25, inset 0 1px 0 rgba(255, 255, 255, 0.14)`,
        }}
      >
        <div className="mb-5 flex items-start justify-between">
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/75 hover:bg-white/20 hover:text-white border border-white/15 transition-colors"
            title="رجوع للمدار"
          >
            <X size={15} />
          </motion.button>

          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}30`,
              boxShadow: `0 0 20px ${color}30`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Icon size={28} />
          </motion.div>
        </div>

        <h3 className="mb-2 text-base font-semibold text-white/95">{title}</h3>
        <p className="mb-5 text-sm leading-relaxed text-white/50">{subtitle}</p>

        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3"
          style={{
            background: `linear-gradient(135deg, ${firstColor}40, ${secondColor}28)`,
            border: `1px solid ${firstColor}55`,
            boxShadow: `0 2px 12px ${firstColor}25`,
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 4px 20px ${firstColor}45`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 2px 12px ${firstColor}25`;
          }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {cta}
          </span>
          <ArrowRight
            size={16}
            style={{ color: 'rgba(255,255,255,0.65)' }}
          />
        </motion.a>

        <div
          className="absolute left-6 right-6 top-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }}
        />
      </div>
    </motion.div>
  );
}

interface OrbitNodeProps {
  key?: string;
  card: SocialCardConfig;
  index: number;
  total: number;
  radius: number;
  iconBoxSize: number;
  orbitAngle: MotionValue<number>;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onSelect: () => void;
}

function OrbitNode({
  card,
  index,
  total,
  radius,
  iconBoxSize,
  orbitAngle,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: OrbitNodeProps) {
  const { Icon, color, title } = card;
  const baseDeg = (index * 360) / total;

  const x = useTransform(orbitAngle, (deg) => {
    const rad = ((deg + baseDeg) * Math.PI) / 180;
    return Math.cos(rad) * radius;
  });

  const y = useTransform(orbitAngle, (deg) => {
    const rad = ((deg + baseDeg) * Math.PI) / 180;
    return Math.sin(rad) * radius;
  });

  const iconSvgSize = Math.round(iconBoxSize * 0.54);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ scale: 1.18 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 360, damping: 20 }}
      aria-label={title}
      title={title}
      className="absolute left-1/2 top-1/2 flex cursor-pointer items-center justify-center rounded-full"
      style={{
        width: iconBoxSize,
        height: iconBoxSize,
        marginLeft: -iconBoxSize / 2,
        marginTop: -iconBoxSize / 2,
        x,
        y,
        background: isHovered ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border: isHovered
          ? `1.5px solid ${color}cc`
          : '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: isHovered
          ? `0 0 28px ${color}80, 0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)`
          : '0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.14)',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease',
      }}
    >
      <div className="pointer-events-none flex items-center justify-center">
        <Icon size={iconSvgSize} />
      </div>
    </motion.button>
  );
}

export const SocialGlassCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<SocialCardConfig | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const orbitAngle = useMotionValue(-90);
  const speedRef = useRef<number>(16); // degrees per second

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!selectedCard) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCard(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCard]);

  useAnimationFrame((_time, delta) => {
    const targetSpeed = selectedCard ? 1.5 : hoveredId ? 3.5 : 16;
    const lerpFactor = Math.min(1, (delta / 1000) * 5);
    speedRef.current += (targetSpeed - speedRef.current) * lerpFactor;
    orbitAngle.set((orbitAngle.get() + (speedRef.current * delta) / 1000) % 360);
  });

  // Responsive dimensions for mobile, tablet, and desktop
  const isSmallMobile = viewportWidth < 420;
  const isMobile = viewportWidth < 640;

  const centerSize = isSmallMobile ? 84 : isMobile ? 104 : 132;
  const iconBoxSize = isSmallMobile ? 50 : isMobile ? 60 : 72;
  const availableWidth = Math.max(240, viewportWidth - 32);
  const rawOrbitRadius = isSmallMobile ? 106 : isMobile ? 136 : 182;
  const maxOrbitRadius = Math.floor((availableWidth - iconBoxSize - 16) / 2);
  const orbitRadius = Math.max(76, Math.min(rawOrbitRadius, maxOrbitRadius));
  const stageSize = orbitRadius * 2 + iconBoxSize + 16;

  return (
    <div className="relative flex w-full items-center justify-center py-4 select-none">
      <div
        className="relative flex items-center justify-center"
        style={{ width: stageSize, height: stageSize, maxWidth: '100%' }}
      >
        {/* Single Thin Transparent Orbital Line */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 0 24px rgba(255, 255, 255, 0.03)',
          }}
        />

        {/* Center Frosted Glass Circle with Animated Blue BLACK-X ElectricLogo */}
        <motion.div
          animate={{
            scale: selectedCard ? 0.9 : 1,
            opacity: selectedCard ? 0.35 : 1,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative z-10 flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: centerSize,
            height: centerSize,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow:
              '0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
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
        </motion.div>

        {/* Orbiting 4 Circular Glass Social Icons */}
        <motion.div
          animate={{
            opacity: selectedCard ? 0.18 : 1,
            scale: selectedCard ? 0.96 : 1,
          }}
          transition={{ duration: 0.25 }}
          className={`absolute inset-0 ${selectedCard ? 'pointer-events-none' : ''}`}
        >
          {SOCIAL_CARDS.map((card, index) => (
            <OrbitNode
              key={card.id}
              card={card}
              index={index}
              total={SOCIAL_CARDS.length}
              radius={orbitRadius}
              iconBoxSize={iconBoxSize}
              orbitAngle={orbitAngle}
              isHovered={hoveredId === card.id}
              onHoverStart={() => setHoveredId(card.id)}
              onHoverEnd={() => setHoveredId((prev) => (prev === card.id ? null : prev))}
              onSelect={() => setSelectedCard(card)}
            />
          ))}
        </motion.div>

        {/* Expanded Original Glass Card Overlay */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 flex items-center justify-center p-4"
            >
              <div
                onClick={() => setSelectedCard(null)}
                className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
              />
              <div className="relative z-10">
                <ExpandedGlassCard
                  card={selectedCard}
                  onClose={() => setSelectedCard(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
