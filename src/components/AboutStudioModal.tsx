import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageCircle,
  Instagram,
  Facebook,
  Send,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-react';

interface AboutStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDirectChat?: () => void;
}

export const AboutStudioModal: React.FC<AboutStudioModalProps> = ({
  isOpen,
  onClose,
  onOpenDirectChat,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const socialChannels = [
    {
      id: 'whatsapp',
      name: 'واتساب',
      nameEn: 'WhatsApp',
      handle: '+20 10 9876 5432',
      url: 'https://wa.me/201098765432?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%AD%D8%A7%20%D8%B3%D8%AA%D9%88%D8%AF%D9%8A%D9%88%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D9%86%D9%81%D9%8A%D8%B0%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9',
      desc: 'محادثة فورية واستشارات سريعة للمشاريع',
      icon: MessageCircle,
      accentColor: '#25D366',
      badge: 'متصل الآن',
    },
    {
      id: 'instagram',
      name: 'إنستجرام',
      nameEn: 'Instagram',
      handle: '@aha.digital.studio',
      url: 'https://instagram.com',
      desc: 'معرض الهويات البصرية وواجهات المستخدم وكواليس العمل',
      icon: Instagram,
      accentColor: '#E1306C',
      badge: 'أحدث التصاميم',
    },
    {
      id: 'facebook',
      name: 'فيسبوك',
      nameEn: 'Facebook',
      handle: 'facebook.com/AhaStudioDigital',
      url: 'https://facebook.com',
      desc: 'الصفحة الرسمية لمتابعة إطلاقاتنا وأخبار التقنية',
      icon: Facebook,
      accentColor: '#1877F2',
      badge: 'الصفحة الرسمية',
    },
    {
      id: 'telegram',
      name: 'التواصل مع الدعم (تليجرام)',
      nameEn: 'Telegram Support',
      handle: '@BlackXOfficial_bot',
      url: 'https://t.me/BlackXOfficial_bot',
      desc: 'الدعم الفني المباشر واستقبال استفسارات ومتطلبات المشاريع فوراً',
      icon: Send,
      accentColor: '#229ED9',
      badge: 'دعم فوري',
    },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-xl bg-black/80"
        id="about-studio-modal"
      >
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-gradient-to-b from-[#14062a]/90 via-[#070114]/95 to-[#020005]/95 cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#000000] border border-purple-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col p-6 sm:p-8 text-right my-auto"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          {/* Pure Black Base #000000 */}
          <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

          {/* Glowing purple ambient orb */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-about-modal-btn"
            className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-200 hover:text-white transition-all cursor-pointer shadow-lg"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Identity */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-6 border-b border-purple-500/20">
            {/* Crystal Shard Studio Emblem */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-lg animate-pulse" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#240c44] via-[#100424] to-[#05010c] border border-purple-400/50 shadow-[0_8px_25px_rgba(0,0,0,0.8)] flex items-center justify-center p-2.5">
                <svg
                  className="w-full h-full text-purple-200 drop-shadow-[0_0_12px_rgba(192,132,252,0.9)]"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <polygon
                    points="50,6 92,28 92,72 50,94 8,72 8,28"
                    fill="rgba(168,85,247,0.25)"
                    stroke="#d8b4fe"
                    strokeWidth="2.5"
                  />
                  <line x1="50" y1="6" x2="50" y2="50" stroke="#f3e8ff" strokeWidth="2" />
                  <line x1="92" y1="28" x2="50" y2="50" stroke="#f3e8ff" strokeWidth="2" />
                  <line x1="92" y1="72" x2="50" y2="50" stroke="#c084fc" strokeWidth="2" />
                  <line x1="50" y1="94" x2="50" y2="50" stroke="#c084fc" strokeWidth="2" />
                  <line x1="8" y1="72" x2="50" y2="50" stroke="#a855f7" strokeWidth="2" />
                  <line x1="8" y1="28" x2="50" y2="50" stroke="#a855f7" strokeWidth="2" />
                  <polygon
                    points="50,26 74,38 74,62 50,74 26,62 26,38"
                    fill="url(#prismModalGrad)"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="prismModalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e9d5ff" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Studio Name & Vision */}
            <div className="flex-1 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-purple-900/60 border border-purple-400/40 text-purple-200">
                  BLACK-X DIGITAL STUDIO
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  متاحون لمشاريع جديدة
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                بلاك إكس ستوديو
              </h2>

              <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-lg">
                استوديو تصميم وهندسة برمجية متقدم، متخصص في نحت وتطوير التجارب الرقمية الفاخرة، ومواقع الويب فائقة السرعة، وتطبيقات الهواتف الذكية الاستثنائية.
              </p>
            </div>
          </div>

          {/* Quick Studio Pillars */}
          <div className="relative z-10 grid grid-cols-3 gap-2.5 my-4">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
              <Sparkles className="w-4 h-4 text-purple-300 mx-auto mb-1" />
              <div className="text-sm font-black text-white">إبداع فريد</div>
              <div className="text-[10px] text-purple-300/70">تصاميم غير مكررة</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
              <Zap className="w-4 h-4 text-amber-300 mx-auto mb-1" />
              <div className="text-sm font-black text-white">أداء خارق</div>
              <div className="text-[10px] text-purple-300/70">سرعة استجابة فائقة</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-300 mx-auto mb-1" />
              <div className="text-sm font-black text-white">أمان وضمان</div>
              <div className="text-[10px] text-purple-300/70">معايير أمان عالية</div>
            </div>
          </div>

          {/* Direct Social & Contact Channels ("بياناتنا بقى بالتواصل وشوية حاجات كده، بيانات الواتس، إنستا، إنستجرام، فيسبوك، تليجرام") */}
          <div className="relative z-10 mt-2">
            <h3 className="text-sm font-bold text-purple-100 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>قنوات التواصل المباشرة الرسمية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialChannels.map((channel) => {
                const Icon = channel.icon;
                const isCopied = copiedKey === channel.id;

                return (
                  <div
                    key={channel.id}
                    className="group relative p-3.5 rounded-xl bg-[#120726]/80 hover:bg-[#1c0c3a] border border-purple-500/25 hover:border-purple-400/60 transition-all duration-200 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0"
                          style={{ backgroundColor: `${channel.accentColor}25`, border: `1px solid ${channel.accentColor}60` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: channel.accentColor }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{channel.name}</span>
                            <span className="text-[10px] text-purple-300/60 font-mono">({channel.nameEn})</span>
                          </div>
                          <span className="text-[10px] text-purple-300/70 block mt-0.5">{channel.badge}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopy(channel.id, channel.handle)}
                        className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-500/20 text-purple-300 hover:text-white transition-colors cursor-pointer"
                        title="نسخ الحساب"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <p className="text-[11px] text-purple-200/70 mb-3 leading-tight">
                      {channel.desc}
                    </p>

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-bold text-white transition-all cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${channel.accentColor}dd, ${channel.accentColor}aa)`,
                      }}
                    >
                      <span>تواصل عبر {channel.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="relative z-10 mt-5 pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-300/80">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>contact@ahastudio.dev</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span dir="ltr">+20 10 9876 5432</span>
              </span>
            </div>

            {onOpenDirectChat && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDirectChat();
                }}
                className="px-4 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
              >
                <span>إرسال استفسار الآن</span>
                <Send className="w-3 h-3" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
