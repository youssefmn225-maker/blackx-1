import React, { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectShard } from '../types';
import { generateVoronoiShatter, VoronoiShard } from '../utils/voronoiShatter';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface TransitionOriginData {
  project: ProjectShard;
  rect: { top: number; left: number; width: number; height: number };
  clickPoint: { x: number; y: number };
}

interface CinematicShatterTransitionProps {
  transitionData: TransitionOriginData | null;
  onComplete: (project: ProjectShard) => void;
}

export const CinematicShatterTransition: React.FC<CinematicShatterTransitionProps> = ({
  transitionData,
  onComplete,
}) => {
  // Cinematic, slow-motion duration (2.0s) for a premium, buttery-smooth transition
  const DURATION = 2.0;

  useEffect(() => {
    if (!transitionData) return;

    const tComplete = setTimeout(() => {
      onComplete(transitionData.project);
    }, DURATION * 1000);

    return () => {
      clearTimeout(tComplete);
    };
  }, [transitionData, onComplete, DURATION]);

  // Compute exact click coordinates, Voronoi shards, and maximum radius needed
  const shatterData = useMemo(() => {
    if (!transitionData) return null;
    const { rect, clickPoint } = transitionData;
    
    // Relative coordinates of the click point on the card surface
    const relX = Math.max(15, Math.min(rect.width - 15, clickPoint.x - rect.left));
    const relY = Math.max(15, Math.min(rect.height - 15, clickPoint.y - rect.top));
    const shards = generateVoronoiShatter(rect.width, rect.height, relX, relY);

    const screenReach = Math.max(
      typeof window !== 'undefined' ? Math.max(window.innerWidth, window.innerHeight) * 0.95 : 1000,
      850
    );

    // Calculate maximum radius required to completely cover the screen from the click point
    const maxRadius = Math.ceil(
      typeof window !== 'undefined'
        ? Math.hypot(
            Math.max(clickPoint.x, window.innerWidth - clickPoint.x),
            Math.max(clickPoint.y, window.innerHeight - clickPoint.y)
          ) * 1.15
        : 1800
    );

    return {
      relX,
      relY,
      shards,
      screenReach,
      maxRadius,
    };
  }, [transitionData]);

  if (!transitionData || !shatterData) return null;

  const { rect, clickPoint, project } = transitionData;
  const { shards, relX, relY, screenReach, maxRadius } = shatterData;

  const px = clickPoint.x;
  const py = clickPoint.y;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* 
        1. Ambient Deep Dimming (Smooth GPU Opacity)
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION * 0.6, ease: 'easeOut' }}
        className="absolute inset-0 bg-[#020005]/92 backdrop-blur-[2px] pointer-events-none"
        style={{ willChange: 'opacity' }}
      />

      {/* 
        2. EXPANDING NEON RING WAVE:
        Emphasizes the circular wave swelling outward smoothly from the exact click point.
      */}
      <motion.div
        initial={{
          transform: 'translate3d(-50%, -50%, 0) scale(0)',
          opacity: 1,
        }}
        animate={{
          transform: 'translate3d(-50%, -50%, 0) scale(1)',
          opacity: 0,
        }}
        transition={{
          duration: DURATION * 0.95,
          ease: [0.25, 1, 0.35, 1],
        }}
        style={{
          left: px,
          top: py,
          width: 'max(220vw, 220vh)',
          height: 'max(220vw, 220vh)',
          borderRadius: '50%',
          willChange: 'transform, opacity',
        }}
        className="fixed pointer-events-none z-15 border-2 border-purple-300 shadow-[0_0_30px_#c084fc]"
      />

      {/* 
        4. FAST, CRISP, & BUTTERY-SMOOTH 3D VORONOI SHARDS (ON TOP OF EXPANDING CIRCLE):
        - Start directly from card surface at t=0
        - Separate and drift outward smoothly in 3D with premium easing from the click point
      */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          perspective: 1200,
          perspectiveOrigin: `${relX}px ${relY}px`,
          transformStyle: 'preserve-3d',
        }}
      >
        {shards.map((shard: VoronoiShard, index: number) => {
          const flightDistance = screenReach * (0.6 + ((index % 4) * 0.08));
          const targetX = shard.dirX * flightDistance;
          const targetY = shard.dirY * flightDistance;
          const targetZ = shard.zDistance * 1.2;
          const targetRotX = shard.rotX;
          const targetRotY = shard.rotY;
          const targetRotZ = shard.rotZ;

          return (
            <motion.div
              key={shard.id}
              initial={{
                x: 0,
                y: 0,
                z: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: targetX,
                y: targetY,
                z: targetZ,
                rotateX: targetRotX,
                rotateY: targetRotY,
                rotateZ: targetRotZ,
                scale: 1.1,
                opacity: [1, 1, 0.85, 0],
              }}
              transition={{
                duration: DURATION,
                times: [0, 0.5, 0.8, 1],
                ease: [0.25, 1, 0.35, 1],
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              {/* Clean Obsidian Shard Surface */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: shard.clipPathPercent,
                  WebkitClipPath: shard.clipPathPercent,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#180d2c] via-[#090312] to-[#040108]" />
              </div>

              {/* Crisp Crystal Neon Edges (Lightweight pure vector SVG - Zero Filter Lag) */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox={`0 0 ${rect.width} ${rect.height}`}
                preserveAspectRatio="none"
              >
                <polygon
                  points={shard.points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={shard.isEpicenter ? '#f5d0fe' : '#c084fc'}
                  strokeWidth={shard.isEpicenter ? 2.4 : 1.6}
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
