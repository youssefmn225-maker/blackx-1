import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Sparkles, Video, Terminal, Layers } from 'lucide-react';

interface VideoPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIDEO_GENERATION_PROMPT_ENGLISH = `High-end cinematic 3D render, futuristic cryptic looping interactive video portal replacing a standard QR code for an e-commerce digital nexus, 15-second seamless loop.

[SCENE SETUP & ENVIRONMENT]:
Deep vignetted cosmic purple (#16052f, #9D00FF) and electric blue (#00e5ff) atmosphere with volumetric fog and floating nano-luminescent dust. Matte-black carbon and polished obsidian technical construct centered in frame, extreme chiaroscuro contrast between light-absorbing surfaces and ultra-vibrant emissive plasma.

[CENTRAL OBJECT (THE CORE)]:
Specialized server rack stack chassis in matte obsidian finish, integrated with glowing indicator LEDs, fiber-optic cable conduits, and illuminated geometric holographic product packages with glowing gift tags. Network lines radiate outward in a complex cybernetic matrix.

[FOUR CORNER ACTIVATION WELLS (MYSTERY QR ANCHORS)]:
Positioned exactly at the four outer corners (top-left, top-right, bottom-left, bottom-right) where traditional QR code finder patterns reside, are deep, stepped, multi-layered black hexagonal energy wells.
- Sequential Ignition Cycle: The wells ignite one-by-one in a slow hypnotic rhythm. Each well fills with a swirling, multi-layered cosmic purple and electric-blue plasma vortex. Luminous energy conduit lines pulse from each activated corner well directly into the central server core.

[FUNCTIONALITY HINTS & ORBITING ELEMENT]:
An iridescent, faceted geometric shopping cart basket icon gently orbits the central server stack, catching dynamic purple and cyan specular reflections from the ignited energy wells. The circuit matrix intensifies and hums with power as data transmits.

[ETCHED ARABIC TYPOGRAPHY (NO DIRECT SCAN/CLICK LABELS)]:
Etched directly into the matte obsidian chassis:
- Stylized glowing Arabic text above the core: "مشروع متجر الكتروني" in crisp white with electric cyan neon aura.
- Stylized Arabic text below the core inside the energy flow: "اكتشف إمكانيات السيرفر" and "تخصيص كامل".
Strictly no generic English labels, no "Scan Me", no "Click Here".

[LIGHTING & RENDER QUALITY]:
Unreal Engine 5 Octane render style, raytraced volumetric lighting, 8k resolution, subsurface scattering on energy portals, anamorphic lens flare, micro-reflections, perfectly seamless loop at 15.0 seconds.`;

export const VideoPromptModal: React.FC<VideoPromptModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(VIDEO_GENERATION_PROMPT_ENGLISH);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#090217] border border-purple-500/40 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(157,0,255,0.4)] text-right selection:bg-purple-500/40 selection:text-white"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-900/60 border border-purple-400/40 text-purple-200">
                <Video className="w-5 h-5 text-[#00e5ff]" />
              </div>
              <div>
                <h3
                  className="text-lg font-black text-white"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  صيغة Prompt توليد الفيديو لـ Google AI Studio
                </h3>
                <p className="text-xs text-purple-300/80 font-mono">
                  Interactive Video Portal (15s Loop) // Google Veo / Imagen Video
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-purple-500/30 text-purple-200 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Copy Action Bar */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#14062a] border border-purple-500/30 mb-5">
            <span className="text-xs text-purple-200 font-medium">
              جاهز للنسخ المباشر في نماذج توليد الفيديو (Google AI Studio / Veo / Runway)
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] border border-[#00e5ff]/50 font-bold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ النص بالكامل'}</span>
            </button>
          </div>

          {/* Prompt English Box */}
          <div className="relative mb-5" dir="ltr">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/80 mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00e5ff]" />
                PROMPT SPECIFICATION (ENGLISH - OPTIMIZED FOR VIDEO ENGINE)
              </span>
              <span>15s Seamless Loop</span>
            </div>
            <pre className="w-full p-4 rounded-2xl bg-[#04010a] border border-purple-500/30 text-xs font-mono text-purple-100/90 whitespace-pre-wrap leading-relaxed shadow-inner overflow-x-auto">
              {VIDEO_GENERATION_PROMPT_ENGLISH}
            </pre>
          </div>

          {/* Parameter Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/30">
              <span className="text-purple-400 text-[10px] block">Duration</span>
              <span className="text-white font-bold">15.0s Loop</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/30">
              <span className="text-purple-400 text-[10px] block">Aspect Ratio</span>
              <span className="text-white font-bold">1:1 (Square)</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/30">
              <span className="text-purple-400 text-[10px] block">Framerate</span>
              <span className="text-white font-bold">30 or 60 FPS</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-700/30">
              <span className="text-purple-400 text-[10px] block">Chiaroscuro</span>
              <span className="text-[#00e5ff] font-bold">High Contrast</span>
            </div>
          </div>

          {/* Negative Prompt */}
          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-red-500/20 text-xs text-purple-300 leading-relaxed mb-4">
            <span className="font-bold text-red-400 block mb-1">
              المحددات السلبية (Negative Prompt):
            </span>
            <code className="text-[11px] font-mono text-purple-200">
              blurry, low resolution, flat lighting, text "Scan Me", text "Click Here", white barcode, traditional paper QR, visible seams, abrupt loop cuts.
            </code>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-800/50 hover:bg-purple-700/70 border border-purple-400/40 text-white font-bold text-xs cursor-pointer transition-all"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              إغلاق النافذة
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
