import React from 'react';

interface ProjectEmblemLogoProps {
  projectId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ProjectEmblemLogo: React.FC<ProjectEmblemLogoProps> = ({
  projectId,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size];

  switch (projectId) {
    case 'contact-hub':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(168,85,247,0.85)]`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#c084fc" strokeWidth="2.5" fill="rgba(24,8,42,0.85)" />
          <path d="M22 24 C22 20 42 20 42 24 C42 28 32 30 32 34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="42" r="2.5" fill="#e879f9" />
          <circle cx="32" cy="32" r="18" stroke="#9D00FF" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
      );

    case 'active-challenges':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(192,132,252,0.85)]`} viewBox="0 0 64 64" fill="none">
          <polygon points="32,4 58,18 58,46 32,60 6,46 6,18" stroke="#d8b4fe" strokeWidth="2.5" fill="rgba(20,5,40,0.85)" />
          <line x1="20" y1="20" x2="44" y2="44" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="20" x2="20" y2="44" stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="4" fill="#ffffff" />
        </svg>
      );

    case 'world-games':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(232,121,249,0.85)]`} viewBox="0 0 64 64" fill="none">
          <rect x="10" y="24" width="44" height="30" rx="4" stroke="#c084fc" strokeWidth="2.5" fill="rgba(15,5,30,0.85)" />
          <path d="M10 24 L54 24 L50 14 L6 14 Z" stroke="#f3e8ff" strokeWidth="2.5" fill="rgba(168,85,247,0.4)" />
          <line x1="18" y1="14" x2="22" y2="24" stroke="#ffffff" strokeWidth="2" />
          <line x1="30" y1="14" x2="34" y2="24" stroke="#ffffff" strokeWidth="2" />
          <line x1="42" y1="14" x2="46" y2="24" stroke="#ffffff" strokeWidth="2" />
          <polygon points="26,32 42,39 26,46" fill="#e879f9" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );

    case 'nexus-payment':
    case 'nexus-pay':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(168,85,247,0.85)]`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#c084fc" strokeWidth="2" fill="rgba(20,5,40,0.85)" />
          {/* Shopping Cart handle & basket path */}
          <path d="M16 20 L22 20 L28 38 L46 38 L50 24 L24 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Cart grid lines */}
          <line x1="30" y1="28" x2="44" y2="28" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="33" x2="42" y2="33" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37" y1="24" x2="35" y2="38" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="29" cy="45" r="3" fill="#e879f9" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="45" cy="45" r="3" fill="#e879f9" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );

    case 'creative-studio':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(216,180,254,0.85)]`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#c084fc" strokeWidth="2" fill="rgba(18,6,35,0.8)" />
          <polygon points="32,10 44,48 32,38 20,48" stroke="#ffffff" strokeWidth="2.5" fill="rgba(192,132,252,0.4)" />
          <circle cx="32" cy="10" r="3.5" fill="#ffffff" />
          <circle cx="32" cy="38" r="3" fill="#e879f9" />
        </svg>
      );

    case 'data-nebula':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(192,132,252,0.85)]`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="26" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="18" stroke="#d8b4fe" strokeWidth="2.5" fill="rgba(25,8,45,0.85)" />
          <polygon points="32,10 36,24 50,24 38,34 43,48 32,38 21,48 26,34 14,24 28,24" fill="rgba(168,85,247,0.4)" stroke="#ffffff" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill="#f5d0fe" />
        </svg>
      );

    case 'ai-neural-core':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(244,114,182,0.85)]`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="12" stroke="#f5d0fe" strokeWidth="2.5" fill="rgba(168,85,247,0.3)" />
          <circle cx="32" cy="12" r="5" stroke="#ffffff" strokeWidth="2" fill="#7c3aed" />
          <circle cx="50" cy="42" r="5" stroke="#ffffff" strokeWidth="2" fill="#7c3aed" />
          <circle cx="14" cy="42" r="5" stroke="#ffffff" strokeWidth="2" fill="#7c3aed" />
          <line x1="32" y1="17" x2="32" y2="20" stroke="#d8b4fe" strokeWidth="2" />
          <line x1="46" y1="39" x2="42" y2="36" stroke="#d8b4fe" strokeWidth="2" />
          <line x1="18" y1="39" x2="22" y2="36" stroke="#d8b4fe" strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill="#ffffff" />
        </svg>
      );

    case 'member-portal':
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(168,85,247,0.85)]`} viewBox="0 0 64 64" fill="none">
          <polygon points="32,4 56,16 56,48 32,60 8,48 8,16" stroke="#c084fc" strokeWidth="2.5" fill="rgba(20,5,40,0.85)" />
          <rect x="24" y="26" width="16" height="18" rx="2" stroke="#ffffff" strokeWidth="2" fill="rgba(147,51,234,0.4)" />
          <path d="M27 26 V20 C27 16 37 16 37 20 V26" stroke="#ffffff" strokeWidth="2.5" fill="none" />
          <circle cx="32" cy="34" r="2.5" fill="#e879f9" />
        </svg>
      );

    default:
      return (
        <svg className={`${sizeClasses} ${className} drop-shadow-[0_0_14px_rgba(192,132,252,0.85)]`} viewBox="0 0 64 64" fill="none">
          <polygon points="32,6 56,20 56,44 32,58 8,44 8,20" stroke="#d8b4fe" strokeWidth="2.5" fill="rgba(20,5,40,0.8)" />
          <circle cx="32" cy="32" r="8" fill="#c084fc" />
        </svg>
      );
  }
};
