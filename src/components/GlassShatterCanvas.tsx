import React, { useEffect, useRef } from 'react';

export interface ClickPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface RadialSpoke {
  points: { x: number; y: number }[];
  branches: { points: { x: number; y: number }[] }[];
}

interface SpiderwebFracture {
  id: string;
  cx: number;
  cy: number;
  spokes: RadialSpoke[];
  rings: { x: number; y: number }[][];
  crushPoints: { x: number; y: number }[];
}

interface GlassShardParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  scale: number;
  alpha: number;
  points: { x: number; y: number }[];
}

interface GlassShatterCanvasProps {
  clickPoints: ClickPoint[];
  stressLevel: number; // 0: unblemished, 1: cracked, 2: severe, 3: breaking/shattering
  isBreaking: boolean;
  className?: string;
}

// Procedural generator for spiderweb / radial glass fracture centered at (cx, cy)
function generateFracture(
  cx: number,
  cy: number,
  width: number,
  height: number,
  seed: number
): SpiderwebFracture {
  // Pseudo-random helper seeded by coordinate and seed
  let s = Math.sin(cx * 12.9898 + cy * 78.233 + seed * 43.123) * 43758.5453;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const maxDimension = Math.max(width, height) * 1.5;
  const numSpokes = 14 + Math.floor(rnd() * 6); // 14 to 19 radial fracture rays
  const spokes: RadialSpoke[] = [];
  const ringDistances = [12, 28, 52, 85, 130, 185, 250];
  const numRings = ringDistances.length;

  // 1. Generate Radial Spokes with jagged crystalline paths
  for (let i = 0; i < numSpokes; i++) {
    const baseAngle = (i / numSpokes) * Math.PI * 2 + (rnd() - 0.5) * 0.22;
    let currAngle = baseAngle;
    let currX = cx;
    let currY = cy;

    const spokePoints: { x: number; y: number }[] = [{ x: currX, y: currY }];
    const branches: { points: { x: number; y: number }[] }[] = [];

    const numSegments = 7 + Math.floor(rnd() * 4);
    const stepDist = maxDimension / numSegments;

    for (let j = 1; j <= numSegments; j++) {
      // Small crystalline angular deflection
      currAngle += (rnd() - 0.5) * 0.28;
      const segLength = stepDist * (0.7 + rnd() * 0.6);
      currX += Math.cos(currAngle) * segLength;
      currY += Math.sin(currAngle) * segLength;

      spokePoints.push({ x: currX, y: currY });

      // Occasional lateral fissure branch splitting off
      if (j >= 2 && j <= 5 && rnd() > 0.62) {
        const branchAngle = currAngle + (rnd() > 0.5 ? 1 : -1) * (0.6 + rnd() * 0.4);
        let bX = currX;
        let bY = currY;
        const bPoints: { x: number; y: number }[] = [{ x: bX, y: bY }];

        for (let b = 0; b < 3; b++) {
          const bStep = stepDist * 0.55 * (0.8 + rnd() * 0.4);
          bX += Math.cos(branchAngle + (rnd() - 0.5) * 0.2) * bStep;
          bY += Math.sin(branchAngle + (rnd() - 0.5) * 0.2) * bStep;
          bPoints.push({ x: bX, y: bY });
        }
        branches.push({ points: bPoints });
      }
    }

    spokes.push({ points: spokePoints, branches });
  }

  // 2. Generate Concentric Polygonal Spiderweb Web-Rings
  const rings: { x: number; y: number }[][] = [];

  for (let r = 0; r < numRings; r++) {
    const dist = ringDistances[r];
    const ringPoly: { x: number; y: number }[] = [];

    for (let i = 0; i < numSpokes; i++) {
      const angle = (i / numSpokes) * Math.PI * 2;
      // Slight radius perturbation between spokes for authentic broken glass look
      const perturbedDist = dist * (0.85 + rnd() * 0.3);
      const px = cx + Math.cos(angle) * perturbedDist;
      const py = cy + Math.sin(angle) * perturbedDist;
      ringPoly.push({ x: px, y: py });
    }

    // Close the ring loop
    ringPoly.push({ ...ringPoly[0] });
    rings.push(ringPoly);
  }

  // 3. Central Impact Crush Zone (Micro-fractures around the strike point)
  const crushPoints: { x: number; y: number }[] = [];
  for (let c = 0; c < 18; c++) {
    const cAngle = rnd() * Math.PI * 2;
    const cDist = 2 + rnd() * 12;
    crushPoints.push({
      x: cx + Math.cos(cAngle) * cDist,
      y: cy + Math.sin(cAngle) * cDist,
    });
  }

  return {
    id: `fracture-${cx}-${cy}-${seed}`,
    cx,
    cy,
    spokes,
    rings,
    crushPoints,
  };
}

export const GlassShatterCanvas: React.FC<GlassShatterCanvasProps> = ({
  clickPoints,
  stressLevel,
  isBreaking,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fracturesRef = useRef<SpiderwebFracture[]>([]);
  const shardsRef = useRef<GlassShardParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const breakStartRef = useRef<number | null>(null);

  // Generate or update procedural fractures when new click points are registered
  useEffect(() => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const w = rect.width || 320;
    const h = rect.height || 220;

    // Build fractures for clicks that don't have one yet
    const existingCount = fracturesRef.current.length;
    if (clickPoints.length > existingCount) {
      for (let i = existingCount; i < clickPoints.length; i++) {
        const pt = clickPoints[i];
        const newFracture = generateFracture(pt.x, pt.y, w, h, i + 1);
        fracturesRef.current.push(newFracture);
      }
    } else if (clickPoints.length === 0) {
      fracturesRef.current = [];
      shardsRef.current = [];
      breakStartRef.current = null;
    }
  }, [clickPoints]);

  // Setup explosive shards when breakthrough occurs
  useEffect(() => {
    if (isBreaking && shardsRef.current.length === 0 && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const w = rect.width || 320;
      const h = rect.height || 220;

      // Primary epicenter
      const primaryCenter =
        clickPoints.length > 0
          ? clickPoints[clickPoints.length - 1]
          : { x: w / 2, y: h / 2 };

      const shards: GlassShardParticle[] = [];
      const numShards = 42;

      for (let i = 0; i < numShards; i++) {
        const angle = (i / numShards) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const distFromCenter = Math.random() * 80;
        const sx = primaryCenter.x + Math.cos(angle) * distFromCenter;
        const sy = primaryCenter.y + Math.sin(angle) * distFromCenter;

        // Radial explosion velocity
        const speed = 7 + Math.random() * 16;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Generate irregular polygon shard vertices
        const shardRadius = 10 + Math.random() * 22;
        const numVerts = 3 + Math.floor(Math.random() * 3); // 3-5 vertices
        const points: { x: number; y: number }[] = [];

        for (let v = 0; v < numVerts; v++) {
          const vAngle = (v / numVerts) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
          const vRad = shardRadius * (0.6 + Math.random() * 0.8);
          points.push({
            x: Math.cos(vAngle) * vRad,
            y: Math.sin(vAngle) * vRad,
          });
        }

        shards.push({
          x: sx,
          y: sy,
          vx,
          vy,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.35,
          scale: 1,
          alpha: 1,
          points,
        });
      }

      shardsRef.current = shards;
      breakStartRef.current = performance.now();
    }
  }, [isBreaking, clickPoints]);

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Ensure canvas matches high DPI display
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // If no cracks and not breaking, canvas stays completely transparent (pitch black card beneath)
      if (fracturesRef.current.length === 0 && !isBreaking) {
        ctx.restore();
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Energy oscillation factor for breathing plasma effect
      const pulse = Math.sin(time * 0.006) * 0.15 + 0.85;

      // 1. RENDER CRACK NETWORKS (For all accumulated click epicenters)
      fracturesRef.current.forEach((fracture, fIndex) => {
        // Multi-stage glow scaling:
        // As stressLevel grows, fractures become wider, brighter, and bleed deeper energy
        const baseWidth = stressLevel === 1 ? 1.4 : stressLevel === 2 ? 2.5 : 3.6;
        const glowBlur = (stressLevel === 1 ? 8 : stressLevel === 2 ? 16 : 24) * pulse;

        // A. Subtle molten plasma bloom bleeding through the obsidian around the impact epicenter
        const bloomRadius = Math.max(1, stressLevel === 1 ? 55 : stressLevel === 2 ? 100 : 160);
        const radialGrad = ctx.createRadialGradient(
          fracture.cx,
          fracture.cy,
          2,
          fracture.cx,
          fracture.cy,
          Math.max(2.1, bloomRadius)
        );
        radialGrad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * pulse})`);
        radialGrad.addColorStop(0.25, `rgba(157, 0, 255, ${0.4 * pulse})`);
        radialGrad.addColorStop(0.7, `rgba(138, 43, 226, ${0.2 * pulse})`);
        radialGrad.addColorStop(1, 'rgba(138, 43, 226, 0)');

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(
          fracture.cx,
          fracture.cy,
          bloomRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // B. Concentric spiderweb web-rings
        ctx.save();
        ctx.shadowColor = '#9D00FF';
        ctx.shadowBlur = glowBlur;
        ctx.strokeStyle = `rgba(157, 0, 255, ${0.75 * pulse})`;
        ctx.lineWidth = baseWidth * 0.75;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        fracture.rings.forEach((ring) => {
          ctx.beginPath();
          ring.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });
        ctx.restore();

        // C. Primary Radial Fracture Spokes (Pass 1: Neon Violet Glow)
        ctx.save();
        ctx.shadowColor = '#9D00FF';
        ctx.shadowBlur = glowBlur;
        ctx.strokeStyle = '#9D00FF';
        ctx.lineWidth = baseWidth * 1.3;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';

        fracture.spokes.forEach((spoke) => {
          ctx.beginPath();
          spoke.points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();

          // Draw branches
          spoke.branches.forEach((branch) => {
            ctx.beginPath();
            branch.points.forEach((bPt, bIdx) => {
              if (bIdx === 0) ctx.moveTo(bPt.x, bPt.y);
              else ctx.lineTo(bPt.x, bPt.y);
            });
            ctx.stroke();
          });
        });
        ctx.restore();

        // D. Pass 2: Electric Purple / Lavender Filament
        ctx.save();
        ctx.shadowColor = '#8A2BE2';
        ctx.shadowBlur = glowBlur * 0.5;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = baseWidth * 0.8;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';

        fracture.spokes.forEach((spoke) => {
          ctx.beginPath();
          spoke.points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });
        ctx.restore();

        // E. Pass 3: White-Hot Crack Centerline
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = Math.max(0.8, baseWidth * 0.4);
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';

        fracture.spokes.forEach((spoke) => {
          ctx.beginPath();
          spoke.points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });
        ctx.restore();

        // F. Central Impact Crush Core
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        const coreRadius = Math.max(0, 3 + stressLevel);
        ctx.arc(fracture.cx, fracture.cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 1;
        fracture.crushPoints.forEach((cp) => {
          ctx.beginPath();
          ctx.moveTo(fracture.cx, fracture.cy);
          ctx.lineTo(cp.x, cp.y);
          ctx.stroke();
        });
        ctx.restore();
      });

      // 2. BREAKTHROUGH PHYSICAL SHARD PARTICLES (When card reaches final breaking point)
      if (isBreaking && shardsRef.current.length > 0) {
        const elapsed = breakStartRef.current ? Math.max(0, time - breakStartRef.current) : 0;
        const progress = Math.max(0, Math.min(1, elapsed / 700));

        // Blinding eruption core blooming outward
        const eruptRadius = Math.max(0, progress * Math.max(displayWidth, displayHeight) * 1.2);
        if (eruptRadius > 0) {
          const eruptGrad = ctx.createRadialGradient(
            displayWidth / 2,
            displayHeight / 2,
            0,
            displayWidth / 2,
            displayHeight / 2,
            Math.max(1, eruptRadius)
          );
          eruptGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          eruptGrad.addColorStop(0.3, 'rgba(157, 0, 255, 0.85)');
          eruptGrad.addColorStop(0.7, 'rgba(138, 43, 226, 0.7)');
          eruptGrad.addColorStop(1, 'rgba(138, 43, 226, 0)');

          ctx.fillStyle = eruptGrad;
          ctx.beginPath();
          ctx.arc(displayWidth / 2, displayHeight / 2, eruptRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update and render physical flying obsidian glass shards
        shardsRef.current.forEach((shard) => {
          shard.x += shard.vx;
          shard.y += shard.vy;
          shard.vx *= 0.98;
          shard.vy *= 0.98;
          shard.rotation += shard.vRot;
          shard.alpha = Math.max(0, 1 - progress * 1.3);

          ctx.save();
          ctx.translate(shard.x, shard.y);
          ctx.rotate(shard.rotation);
          ctx.scale(shard.scale, shard.scale);

          // Shard obsidian body
          ctx.beginPath();
          shard.points.forEach((pt, pIdx) => {
            if (pIdx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.closePath();

          ctx.fillStyle = `rgba(5, 5, 5, ${shard.alpha})`;
          ctx.fill();

          // Glowing electric purple shard edge
          ctx.strokeStyle = `rgba(157, 0, 255, ${shard.alpha * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#9D00FF';
          ctx.shadowBlur = 8;
          ctx.stroke();

          ctx.restore();
        });
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stressLevel, isBreaking]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 ${className}`}
    />
  );
};
