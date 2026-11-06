import React from 'react';
import { ProjectShard } from '../types';
import { Clapperboard, Play, ExternalLink, Film, Sparkles, Globe } from 'lucide-react';

interface InteractiveProjectQRCodeProps {
  project: ProjectShard;
  className?: string;
}

export const InteractiveProjectQRCode: React.FC<InteractiveProjectQRCodeProps> = ({
  project,
  className = '',
}) => {
  const targetUrl = project.projectUrl || 'https://aha-studio.digital';

  // If the project explicitly has a QR code image (like the E-commerce store)
  if (project.qrImageUrl) {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="project-qr-code-link"
          className="block max-w-full cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          title="انقر للانتقال مباشرة إلى الرابط"
        >
          <img
            src={project.qrImageUrl}
            alt={project.title}
            className="w-72 sm:w-80 md:w-96 aspect-square object-contain block"
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
    );
  }

  // If the project is the Movie Site (موقع افلام)
  if (project.id === 'world-games') {
    return (
      <div className={`relative flex flex-col items-center select-none ${className}`}>
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="movie-portal-direct-link"
          className="group relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl overflow-hidden border border-purple-500/50 bg-[#080214] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(232,121,249,0.3)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(232,121,249,0.55)] transition-all duration-300 flex flex-col items-center justify-between p-6 cursor-pointer"
        >
          {/* Ambient Cinema Backdrop Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-[#0a0218]/90 to-[#05000d] pointer-events-none" />
          <div className="absolute inset-0 opacity-25 mix-blend-screen bg-[radial-gradient(#e879f9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Cinema Badge */}
          <div className="relative z-10 w-full flex items-center justify-between">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-900/60 border border-purple-400/40 text-purple-200">
              <Film className="w-3 h-3 text-[#e879f9]" />
              <span>WATCHGO CINEMA</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#e879f9] animate-ping" />
          </div>

          {/* Center Play & Clapperboard Cinema Emblem */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-purple-900 via-[#e879f9]/20 to-purple-600 border border-[#e879f9]/60 shadow-[0_0_35px_rgba(232,121,249,0.5)] flex items-center justify-center group-hover:scale-110 group-hover:border-[#e879f9] transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-[#e879f9]/20 blur-md group-hover:blur-xl transition-all" />
              <Clapperboard className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#e879f9] text-black shadow-lg">
                <Play className="w-3.5 h-3.5 fill-black" />
              </div>
            </div>

            <span
              className="mt-4 text-base sm:text-lg font-black text-white text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              موقع افلام
            </span>
            <span className="text-[11px] font-mono text-purple-300/80 mt-0.5">
              WATCHGO STREAMING
            </span>
          </div>

          {/* Bottom Live Launch Button */}
          <div className="relative z-10 w-full">
            <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-[#e879f9] to-purple-600 group-hover:from-[#e879f9] group-hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,121,249,0.5)] transition-all">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span style={{ fontFamily: "'Cairo', sans-serif" }}>مشاهدة موقع الأفلام مباشرة</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/90" />
            </div>
          </div>
        </a>
      </div>
    );
  }

  // Default interactive card for other projects without QR
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        id={`project-card-launch-${project.id}`}
        className="group relative w-72 sm:w-80 md:w-96 aspect-square rounded-3xl overflow-hidden border border-purple-500/40 bg-[#080214] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(157,0,255,0.25)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(157,0,255,0.45)] transition-all duration-300 flex flex-col items-center justify-between p-6 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-[#0a0218]/90 to-[#05000d] pointer-events-none" />

        <div className="relative z-10 w-full flex items-center justify-between">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-900/60 border border-purple-400/40 text-purple-200">
            <Globe className="w-3 h-3 text-purple-300" />
            <span>{project.categoryLabel}</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center my-auto">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-purple-900/40 border border-purple-500/50 flex items-center justify-center group-hover:scale-110 transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-purple-200" />
          </div>
          <span
            className="mt-3 text-base sm:text-lg font-bold text-white text-center"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {project.title}
          </span>
        </div>

        <div className="relative z-10 w-full">
          <div className="w-full py-2.5 px-4 rounded-xl bg-purple-600/80 group-hover:bg-purple-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all">
            <span style={{ fontFamily: "'Cairo', sans-serif" }}>معاينة المشروع مباشرة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>
    </div>
  );
};

