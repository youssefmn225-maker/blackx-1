import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectShard } from '../types';
import { MASTER_CARD_SHARDS, ShatteredPieceDefinition } from '../data/shatteredCardPieces';
import { ProjectEmblemLogo } from './ProjectEmblemLogo';

interface ShardShowcaseProps {
  projects: ProjectShard[];
  onSelectProject: (project: ProjectShard) => void;
}

export const ShardShowcase: React.FC<ShardShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 flex flex-col items-center justify-center select-none"
      id="projects-shards-section"
    >
      {/* 
        The Shattered Master Card (1000 × 750):
        12 geometrically exact pieces cut from a single rectangular stone slab.
        Floating like boat fragments on the purple water.
      */}
      <div className="relative w-full aspect-[4/3] max-h-[76vh] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 750"
          className="w-full h-full overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Dark Obsidian Stone Fill */}
            <linearGradient id="obsidianMasterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15082a" />
              <stop offset="45%" stopColor="#0a0316" />
              <stop offset="85%" stopColor="#05010a" />
              <stop offset="100%" stopColor="#020005" />
            </linearGradient>

            {/* Glowing Cleavage Rim Gradient */}
            <linearGradient id="chiseledRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#e9d5ff" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b0764" stopOpacity="0.9" />
            </linearGradient>

            {/* Water Shadow Filter */}
            <filter id="waterShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.1   0 0 0 0 0.02   0 0 0 0 0.2   0 0 0 0.7 0"
              />
            </filter>

            {/* Mirror Sheen Gradient */}
            <linearGradient id="mirrorSheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.09" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Render All 12 Interlocking Shards */}
          {MASTER_CARD_SHARDS.map((piece: ShatteredPieceDefinition) => {
            const project = projects[piece.id % projects.length];
            const isHovered = hoveredId === piece.id;

            return (
              <motion.g
                key={piece.id}
                id={`shard-piece-${piece.id}`}
                className="cursor-pointer"
                style={{
                  transformOrigin: `${piece.cx}px ${piece.cy}px`,
                }}
                animate={{
                  // Subtle boat drift on water waves
                  x: [0, piece.driftX * 2.5, 0, -piece.driftX * 2, 0],
                  y: [0, -piece.driftY * 2.2, 0, piece.driftY * 2.2, 0],
                  rotate: [
                    piece.baseRotate - 0.7,
                    piece.baseRotate + 0.9,
                    piece.baseRotate - 0.7,
                  ],
                }}
                transition={{
                  x: {
                    duration: piece.driftDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: piece.delay,
                  },
                  y: {
                    duration: piece.driftDuration * 0.95,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: piece.delay,
                  },
                  rotate: {
                    duration: piece.driftDuration * 1.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: piece.delay,
                  },
                }}
                whileHover={{
                  scale: 1.045,
                  transition: { duration: 0.25 },
                }}
                onMouseEnter={() => setHoveredId(piece.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectProject(project)}
              >
                {/* 1. Deep Violet Water Shadow (Drifts under the shard) */}
                <path
                  d={piece.path}
                  fill="#1a0636"
                  filter="url(#waterShadow)"
                  transform="translate(4, 8)"
                  opacity="0.8"
                />

                {/* 2. Main Shard Body: 100% PURE BLACK #000000 */}
                <path
                  d={piece.path}
                  fill="#000000"
                  stroke={isHovered ? '#c084fc' : '#4a2574'}
                  strokeWidth={isHovered ? '3' : '1.8'}
                  strokeLinejoin="round"
                  style={{
                    filter: isHovered
                      ? 'drop-shadow(0 0 16px rgba(192,132,252,0.7))'
                      : 'drop-shadow(0 6px 14px rgba(0,0,0,0.95))',
                    transition: 'stroke 0.2s, stroke-width 0.2s, filter 0.2s',
                  }}
                />

                {/* 3. Shard Face Content (Project Logo + Project Name) */}
                <foreignObject
                  x={piece.cx - 75}
                  y={piece.cy - 52}
                  width="150"
                  height="105"
                  className="pointer-events-none overflow-visible"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-1">
                    {/* Project Emblem Logo */}
                    <div className="mb-1.5 relative flex items-center justify-center">
                      <ProjectEmblemLogo projectId={project.id} size="sm" />
                    </div>

                    {/* Project Title */}
                    <h3
                      className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-white tracking-normal drop-shadow-[0_2px_6px_rgba(0,0,0,1)] line-clamp-1"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};
