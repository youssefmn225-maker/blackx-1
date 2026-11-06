import React from 'react';
import { ProjectShard } from '../types';
import TiltedCard, { TiltedCardLayer } from './TiltedCard';
import {
  MessageCircle,
  Swords,
  Clapperboard,
  ShoppingCart,
  Utensils,
  Database,
  Brain,
  KeyRound,
  ExternalLink,
  RotateCw,
  Sparkles,
} from 'lucide-react';

interface TiltedProjectCardProps {
  project: ProjectShard;
  index: number;
  onSelect: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PROJECT_IMAGES: Record<string, string> = {
  'contact-hub': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop',
  'active-challenges': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&auto=format&fit=crop',
  'world-games': '/wg.jpg',
  'nexus-payment': '/ecommerce-showcase.jpg',
  'restaurant-system': '/food.jpg',
  'data-nebula': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop',
  'ai-neural-core': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80&auto=format&fit=crop',
  'member-portal': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&auto=format&fit=crop',
};

export const TiltedProjectCard: React.FC<TiltedProjectCardProps> = ({
  project,
  index,
  onSelect,
}) => {
  const imageSrc = PROJECT_IMAGES[project.id] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop';

  const renderIcon = () => {
    const iconClass = 'w-4 h-4 text-purple-200 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]';
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
        return <Sparkles className={iconClass} />;
    }
  };

  const backContent = (
    <div className="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-br from-[#0c051a] via-[#05020c] to-[#020005] border border-purple-500/30 text-right select-none">
      {/* Top Header on Back */}
      <div className="flex items-center justify-between w-full">
        <span className="text-[10px] font-mono tracking-widest text-purple-400/80 bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/40">
          CODE #{project.projectCode || 880 + index}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
          <span>{project.titleEn}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
        </div>
      </div>

      {/* Overview Description */}
      <div className="my-auto py-2">
        <h4 className="text-white font-bold text-sm sm:text-base mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
          {project.title}
        </h4>
        <p className="text-slate-300/80 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
          {project.tagline || project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 justify-end">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-200 border border-purple-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons on Back */}
      <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
        <span className="text-[10px] text-purple-300/50 flex items-center gap-1 font-mono">
          <RotateCw className="w-3 h-3" />
          <span>قلب الكارت</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(e as unknown as React.MouseEvent<HTMLDivElement>);
          }}
          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>عرض التفاصيل</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full flex items-center justify-center p-1 sm:p-1.5">
      <TiltedCard
        imageSrc={imageSrc}
        altText={project.title}
        showTooltip={false}
        containerHeight="220px"
        containerWidth="100%"
        imageHeight="220px"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        glare={0.4}
        glareColor="#a855f7"
        shadow={0.5}
        radius={18}
        backContent={backContent}
        flipOnClick={true}
        className="w-full border border-purple-900/20 shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
      >
        {/* Layer 1: Dark Obsidian Vignette Overlay for Crisp Contrast */}
        <TiltedCardLayer depth={12}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020005]/95 via-[#020005]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-purple-950/20 mix-blend-color pointer-events-none" />
        </TiltedCardLayer>

        {/* Layer 2: 3D Floating Header Icon & Status */}
        <TiltedCardLayer depth={30}>
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="w-8 h-8 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.4)]">
              {renderIcon()}
            </div>

            <span className="text-[10px] font-mono tracking-widest text-purple-300/80 bg-black/60 px-2 py-0.5 rounded-md border border-purple-900/40">
              #{project.projectCode || 880 + index}
            </span>
          </div>
        </TiltedCardLayer>

        {/* Layer 3: 3D Floating Title & Subtitle */}
        <TiltedCardLayer depth={35}>
          <div className="absolute bottom-3 left-3 right-3 text-right pointer-events-none">
            <span
              className="text-[10px] font-mono tracking-widest text-purple-300/70 uppercase block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              {project.titleEn}
            </span>

            <h3
              className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {project.title}
            </h3>
          </div>
        </TiltedCardLayer>
      </TiltedCard>
    </div>
  );
};
