import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowRight,
  MessageSquare,
  MessageCircle,
  Share2,
  ShieldCheck,
  Swords,
  Trophy,
  Cpu,
  Gamepad2,
  Clapperboard,
  Film,
  Headphones,
  Sparkles,
  CreditCard,
  Zap,
  Type,
  Monitor,
  Globe,
  Database,
  Brain,
  Search,
  Workflow,
  Fingerprint,
  Receipt,
  Key,
  Layers,
  ChevronLeft,
  Package,
  ClipboardList,
  Palette,
  Send,
  ExternalLink,
  Utensils,
} from 'lucide-react';
import { ProjectShard } from '../types';
import { InteractiveProjectQRCode } from './InteractiveProjectQRCode';

interface ExpandedShardModalProps {
  project: ProjectShard | null;
  onClose: () => void;
  onOpenContact: (projectTitle?: string) => void;
  clickPoint?: { x: number; y: number } | null;
}

// Map feature icon names to Lucide icons
const FeatureIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'Package':
      return <Package className={className} />;
    case 'ClipboardList':
      return <ClipboardList className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'MessageCircle':
      return <MessageCircle className={className} />;
    case 'Share2':
      return <Share2 className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Swords':
      return <Swords className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Clapperboard':
      return <Clapperboard className={className} />;
    case 'Film':
      return <Film className={className} />;
    case 'Headphones':
      return <Headphones className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Type':
      return <Type className={className} />;
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'Workflow':
      return <Workflow className={className} />;
    case 'Fingerprint':
      return <Fingerprint className={className} />;
    case 'Receipt':
      return <Receipt className={className} />;
    case 'Key':
      return <Key className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const ExpandedShardModal: React.FC<ExpandedShardModalProps> = ({
  project,
  onClose,
  onOpenContact,
  clickPoint,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const animationProps = useMemo(() => {
    if (!clickPoint) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: 'easeOut' },
      };
    }

    const maxRadius = Math.ceil(
      typeof window !== 'undefined'
        ? Math.hypot(
            Math.max(clickPoint.x, window.innerWidth - clickPoint.x),
            Math.max(clickPoint.y, window.innerHeight - clickPoint.y)
          ) * 1.15
        : 1800
    );

    return {
      initial: {
        clipPath: `circle(0px at ${clickPoint.x}px ${clickPoint.y}px)`,
        WebkitClipPath: `circle(0px at ${clickPoint.x}px ${clickPoint.y}px)`,
        opacity: 0.85,
      },
      animate: {
        clipPath: `circle(${maxRadius}px at ${clickPoint.x}px ${clickPoint.y}px)`,
        WebkitClipPath: `circle(${maxRadius}px at ${clickPoint.x}px ${clickPoint.y}px)`,
        opacity: 1,
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      },
      transition: {
        duration: 2.0, // Matches shard transition perfectly
        ease: [0.25, 1, 0.35, 1], // Perfect cubic-bezier
      },
    };
  }, [clickPoint]);

  if (!project) return null;

  const targetUrl =
    project.projectUrl ||
    `https://aha-studio.digital/projects/${project.id}`;

  return (
    <AnimatePresence>
      <motion.div
        {...animationProps}
        className="fixed inset-0 z-50 overflow-y-auto selection:bg-purple-500/40 selection:text-white"
        id="project-details-viewport"
      >
        {/* 
          1. TARGET VIEWPORT BACKGROUND:
          Seamlessly becomes the glowing, energetic electric-purple aura/nebula 
          that fully expanded from the card explosion (#9D00FF / #8A2BE2 / #070114)
        */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(157, 0, 255, 0.75) 0%, rgba(138, 43, 226, 0.55) 45%, #080117 92%)',
          }}
        />

        {/* Dynamic energetic cosmic nebula swirls and starlight aura */}
        <div
          className="fixed inset-0 pointer-events-none opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 70% 20%, rgba(232, 121, 249, 0.3) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(157, 0, 255, 0.35) 0%, transparent 60%)',
          }}
        />

        {/* Ambient subtle grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Main Content Viewport Container */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* 
            Top Navigation Bar: 
            Back Button + Studio Status Header 
          */}
          <header className="w-full flex items-center justify-between pb-6 border-b border-purple-500/20 mb-8">
            <button
              onClick={onClose}
              id="back-to-projects-btn"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 hover:text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(157,0,255,0.4)]"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span
                className="text-xs sm:text-sm font-bold"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                العودة إلى معرض المشاريع
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-purple-300/60 uppercase">
                BLACK-X // PROJECT DOSSIER
              </span>
              <button
                onClick={onClose}
                id="close-details-icon-btn"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-purple-500/30 text-purple-200 hover:text-white transition-all cursor-pointer shadow"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* 
            Project Core Presentation:
            Balanced 2-Column Responsive Layout
            - Column 1: Interactive High-Tech QR Code & Launch Deck
            - Column 2: Comprehensive Arabic Typography & Features
          */}
          <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-auto">
            {/* 
              PRIMARY VISUAL ELEMENT: 
              Interactive Clickable Image / QR Code Anchor
            */}
            <section className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center"
              >
                {/* Clean, Direct Clickable Anchor Image / QR Code Component */}
                <InteractiveProjectQRCode project={project} className="w-full" />

                {/* Direct Telegram Bot Support Link below visual */}
                {project.telegramChatUrl && (
                  <a
                    href={project.telegramChatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="qr-telegram-chat-link"
                    className="mt-4 w-full max-w-sm flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-[#229ED9]/20 via-[#0088cc]/30 to-purple-600/30 hover:from-[#229ED9]/40 hover:to-purple-600/50 border border-[#229ED9]/50 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(34,158,217,0.35)] hover:shadow-[0_0_30px_rgba(34,158,217,0.6)] transition-all duration-200 cursor-pointer text-center"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <Send className="w-4 h-4 text-[#229ED9] animate-pulse" />
                    <span>التواصل مع الدعم</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                  </a>
                )}
              </motion.div>
            </section>

            {/* 
              PROJECT DESCRIPTION & CONTENT:
              Modern Arabic Typography, Detailed Overview, and Feature Modules 
            */}
            <section className="lg:col-span-7 flex flex-col items-start text-right" dir="rtl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
                className="w-full"
              >
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-900/60 border border-purple-400/40 text-purple-200">
                    {project.categoryLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-purple-500/30 text-purple-300">
                    {project.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-purple-300/80">
                    {project.client}
                  </span>
                </div>

                {/* Arabic Project Title */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {project.title}
                </h1>

                {/* English Title & Tagline */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono tracking-widest text-purple-400/90 uppercase">
                    {project.titleEn}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span
                    className="text-xs sm:text-sm text-purple-200/80 font-medium"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {project.tagline}
                  </span>
                </div>

                {/* Comprehensive Written Overview in Clean Glass Container */}
                <div className="relative w-full p-5 sm:p-6 rounded-2xl bg-[#090216]/85 border border-purple-500/30 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] mb-6">
                  {/* Subtle corner light */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                  <h2
                    className="text-base sm:text-lg font-bold text-purple-200 mb-2.5 flex items-center gap-2"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>نبذة شاملة عن النظام</span>
                  </h2>

                  <p
                    className="text-sm sm:text-base text-purple-100/95 leading-relaxed mb-4 text-justify"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {project.fullOverview}
                  </p>

                  <p
                    className="text-xs sm:text-sm text-purple-200/80 leading-relaxed text-justify"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Feature Highlights Grid */}
                {project.features && project.features.length > 0 && (
                  <div className="w-full mb-6">
                    <h2
                      className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>أبرز المزايا والخصائص التقنية</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col p-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/25 transition-all duration-200"
                        >
                          <div className="flex items-center gap-2 mb-2 text-purple-300">
                            <div className="p-1.5 rounded-lg bg-purple-800/40 border border-purple-400/30 text-purple-200">
                              <FeatureIcon name={feature.iconName} className="w-4 h-4" />
                            </div>
                            <span
                              className="text-xs sm:text-sm font-bold text-white"
                              style={{ fontFamily: "'Cairo', sans-serif" }}
                            >
                              {feature.title}
                            </span>
                          </div>
                          <p
                            className="text-[11px] text-purple-200/75 leading-normal"
                            style={{ fontFamily: "'Cairo', sans-serif" }}
                          >
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="w-full flex flex-wrap items-center gap-1.5 mb-2">
                    <span
                      className="text-xs text-purple-300/70 ml-2"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      التقنيات المستخدمة:
                    </span>
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/60 border border-purple-700/40 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </section>
          </main>

          {/* 
            ====================================================================
            CONTACT & CONVERSATION CALL-TO-ACTION (CTA):
            - Direct Telegram Bot deep-link with specific project ID (e.g. 883)
            - Opens direct conversation with the official Telegram bot
            ====================================================================
          */}
          <footer className="w-full pt-8 pb-4 mt-8 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-right" dir="rtl">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <h3
                  className="text-base sm:text-lg font-black text-white"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  بدء التواصل المباشر حول {project.title}
                </h3>
              </div>
              <p
                className="text-xs sm:text-sm text-purple-300/80"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                تواصل مع فريق الدعم الفني مباشرة لتفاصيل المواصفات وبدء التنفيذ فوراً.
              </p>
            </div>

            {/* Action Buttons: Direct Support Link */}
            <div className="flex items-center justify-center">
              {/* Primary Glowing Support Link directing to Telegram */}
              <a
                href={project.telegramChatUrl || `https://t.me/BlackXOfficial_bot?start=${project.projectCode || 883}`}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-telegram-chat-btn"
                className="relative group flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#229ED9] via-[#0088cc] to-purple-600 hover:from-[#2bb2f4] hover:to-[#0088cc] text-white font-black text-sm sm:text-base shadow-[0_0_35px_rgba(34,158,217,0.7)] hover:shadow-[0_0_55px_rgba(34,158,217,0.95)] border border-cyan-300/50 cursor-pointer transition-all duration-200"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {/* Outer pulsing halo */}
                <span className="absolute -inset-1 rounded-2xl bg-[#229ED9]/40 blur-lg group-hover:opacity-100 opacity-60 transition-opacity pointer-events-none" />

                <Send className="w-5 h-5 text-white animate-pulse" />
                <span className="relative z-10 tracking-wide">
                  التواصل مع الدعم
                </span>
                <ExternalLink className="w-4 h-4 text-cyan-200 group-hover:translate-x-[-2px] transition-transform" />
              </a>
            </div>
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
