import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, CheckCircle2, Globe, Smartphone, Code, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultProjectTitle,
}) => {
  const matchingProject = defaultProjectTitle
    ? PROJECTS_DATA.find((p) => p.title === defaultProjectTitle || p.titleEn.toLowerCase() === defaultProjectTitle.toLowerCase())
    : null;
  const telegramUrl = matchingProject?.telegramChatUrl || 'https://t.me/BlackXOfficial_bot';
  const projectCode = matchingProject?.projectCode;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'website',
    budget: 'medium',
    message: defaultProjectTitle ? `أود الاستفسار عن تفاصيل تنفيذ مشروع بجودة مماثلة لـ (${defaultProjectTitle}).` : '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        name: formData.name,
        email: formData.email,
        service: formData.serviceType,
        budget: formData.budget,
        message: formData.message,
        projectTitle: defaultProjectTitle || 'عام',
        projectCode: projectCode || null,
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
        status: 'new',
      });
    } catch (err) {
      console.error('Failed to save to Firestore:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      }, 400);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xl bg-black/80">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-gradient-to-br from-purple-950/60 via-black/80 to-[#0a0214]/90 cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-[#000000] border border-purple-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.25)] overflow-hidden"
        >
          {/* Pure Black Base #000000 */}
          <div className="absolute inset-0 bg-[#000000] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 left-5 p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="relative py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                <CheckCircle2 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h3>
              <p className="text-sm text-purple-200/80 max-w-xs leading-relaxed">
                سيتواصل معك مهندسو ومصممو "بلاك إكس ستوديو" خلال ساعات لمناقشة أفكار مشروعك ووضع خطة العمل.
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="mb-5 text-right">
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                  <Sparkles className="w-3 h-3" />
                  ابدأ فكرتك الرقمية
                </span>
                <h3 className="text-2xl font-black text-white mt-1">تواصل مع بلاك إكس ستوديو</h3>
                <p className="text-xs text-purple-300/70 mt-1">
                  سواء كنت تحتاج متجراً إلكترونياً أو تطبيقاً سحابياً، نحن هنا لمساعدتك.
                </p>
              </div>

              {/* Telegram Direct Bot Banner */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#229ED9]/20 via-[#0088cc]/25 to-purple-600/25 border border-[#229ED9]/40 hover:border-[#229ED9]/80 shadow-[0_0_15px_rgba(34,158,217,0.2)] hover:shadow-[0_0_25px_rgba(34,158,217,0.4)] transition-all text-right group"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#229ED9] animate-pulse" />
                  <span className="text-xs font-bold text-white">
                    التواصل مع الدعم عبر تليجرام
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-cyan-300 bg-[#229ED9]/20 px-2.5 py-0.5 rounded-md border border-[#229ED9]/40">
                    محادثة مباشرة
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-[-2px] transition-transform" />
                </div>
              </a>

              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    الاسم الكامل أو اسم شركتك
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: أحمد المنصوري"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-purple-500/25 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    البريد الإلكتروني أو رقم الواتساب
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com / +966 50..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-purple-500/25 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                    نوع المشروع المطلوب
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'website', label: 'موقع ويب متطور', icon: Globe },
                      { id: 'mobile', label: 'تطبيق هاتف', icon: Smartphone },
                      { id: 'fullstack', label: 'نظام سحابي متكامل', icon: Code },
                    ].map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.serviceType === srv.id;
                      return (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, serviceType: srv.id })}
                          className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                              : 'bg-black/40 border-purple-500/20 text-purple-300/70 hover:bg-purple-950/40'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[10px]">{srv.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    تفاصيل الفكرة أو المتطلبات
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب نبذة عن موقعك أو تطبيقك، والأهداف التي تريد تحقيقها..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-purple-500/25 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>جاري حفظ وإرسال البيانات...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 rotate-45" />
                      <span>إرسال طلب الاستشارة والتقدير المالي</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
