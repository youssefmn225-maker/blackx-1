import React, { useEffect, useRef } from 'react';

export const CosmicNebulaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth spring inertia
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 1. Deep Background Micro-Stars (Twinkling Starfield)
    const microStarCount = 120;
    const microStars = Array.from({ length: microStarCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.6
          ? '216, 180, 254' // Lilac
          : Math.random() > 0.3
          ? '192, 132, 252' // Purple
          : '255, 255, 255', // Pure white
    }));

    // 2. Floating Radiant Embers & Luminous Cosmic Dust
    const emberCount = 65;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      baseAlpha: Math.random() * 0.5 + 0.25,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.25 - 0.1, // subtle upward buoyancy
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.5
          ? 'rgba(192, 132, 252, ' // Electric ultraviolet
          : Math.random() > 0.3
          ? 'rgba(168, 85, 247, ' // Radiant purple
          : 'rgba(233, 213, 255, ', // Bright violet core
    }));

    // 3. Volumetric Swirling Nebula Plasma Clouds
    const nebulaClouds = [
      {
        baseX: 0.5,
        baseY: 0.48,
        radiusRatio: 0.6,
        colorInner: 'rgba(147, 51, 234, 0.32)',
        colorMid: 'rgba(88, 28, 135, 0.18)',
        colorOuter: 'rgba(3, 0, 8, 0)',
        speed: 0.0005,
        angle: 0,
        driftRadius: 60,
      },
      {
        baseX: 0.3,
        baseY: 0.55,
        radiusRatio: 0.5,
        colorInner: 'rgba(168, 85, 247, 0.26)',
        colorMid: 'rgba(107, 33, 168, 0.14)',
        colorOuter: 'rgba(2, 0, 6, 0)',
        speed: -0.0007,
        angle: 2.1,
        driftRadius: 80,
      },
      {
        baseX: 0.7,
        baseY: 0.42,
        radiusRatio: 0.52,
        colorInner: 'rgba(192, 132, 252, 0.22)',
        colorMid: 'rgba(76, 29, 149, 0.14)',
        colorOuter: 'rgba(2, 0, 6, 0)',
        speed: 0.0006,
        angle: 4.3,
        driftRadius: 75,
      },
      {
        baseX: 0.5,
        baseY: 0.5,
        radiusRatio: 0.38,
        colorInner: 'rgba(216, 180, 254, 0.25)', // Intense luminous core
        colorMid: 'rgba(139, 92, 246, 0.15)',
        colorOuter: 'rgba(2, 0, 6, 0)',
        speed: 0.0009,
        angle: 1.2,
        driftRadius: 45,
      },
      {
        baseX: 0.5,
        baseY: 0.3,
        radiusRatio: 0.45,
        colorInner: 'rgba(124, 58, 237, 0.18)',
        colorMid: 'rgba(59, 7, 100, 0.1)',
        colorOuter: 'rgba(2, 0, 6, 0)',
        speed: -0.0004,
        angle: 3.5,
        driftRadius: 50,
      },
    ];

    let time = 0;

    const render = () => {
      time += 1;

      // Smooth mouse spring interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // 1. Base Layer: Deep Void Obsidian Gradient
      const baseGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      baseGradient.addColorStop(0, '#0c0217'); // Rich midnight violet center
      baseGradient.addColorStop(0.45, '#05010c'); // Deep obsidian
      baseGradient.addColorStop(1, '#010003'); // Void black edges
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Nebula Plasma Clouds
      nebulaClouds.forEach((cloud) => {
        cloud.angle += cloud.speed;
        const currentX =
          width * cloud.baseX +
          Math.cos(cloud.angle) * cloud.driftRadius +
          (mouseX - width / 2) * 0.035;
        const currentY =
          height * cloud.baseY +
          Math.sin(cloud.angle) * cloud.driftRadius +
          (mouseY - height / 2) * 0.035;
        const radius = Math.max(0, Math.min(width, height) * cloud.radiusRatio);

        if (radius > 10) {
          const grad = ctx.createRadialGradient(
            currentX,
            currentY,
            0,
            currentX,
            currentY,
            radius
          );
          grad.addColorStop(0, cloud.colorInner);
          grad.addColorStop(0.5, cloud.colorMid);
          grad.addColorStop(1, cloud.colorOuter);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Ethereal God-Rays / Radial Light Shafts (Subtle and cinematic)
      const coreCenterX = width * 0.5 + (mouseX - width / 2) * 0.04;
      const coreCenterY = height * 0.48 + (mouseY - height / 2) * 0.04;
      const rayCount = 8;
      const baseRayRadius = Math.max(width, height) * 0.55;

      ctx.save();
      ctx.translate(coreCenterX, coreCenterY);
      ctx.rotate(time * 0.0004);

      for (let i = 0; i < rayCount; i++) {
        ctx.rotate((Math.PI * 2) / rayCount);
        const rayGrad = ctx.createLinearGradient(0, 0, baseRayRadius, 0);
        rayGrad.addColorStop(0, 'rgba(192, 132, 252, 0.08)');
        rayGrad.addColorStop(0.4, 'rgba(147, 51, 234, 0.03)');
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const rayWidth = 35 + Math.sin(time * 0.02 + i) * 10;
        ctx.quadraticCurveTo(baseRayRadius * 0.4, rayWidth, baseRayRadius, 0);
        ctx.quadraticCurveTo(baseRayRadius * 0.4, -rayWidth, 0, 0);
        ctx.fill();
      }
      ctx.restore();

      // 4. Central Luminous Core & High-Energy Halo (Positioned directly behind grid)
      const coreGlowRadius = Math.max(0, Math.min(width, height) * 0.52);
      if (coreGlowRadius > 10) {
        const coreGrad = ctx.createRadialGradient(
          coreCenterX,
          coreCenterY,
          0,
          coreCenterX,
          coreCenterY,
          coreGlowRadius
        );
        const pulse = Math.sin(time * 0.02) * 0.04;
        coreGrad.addColorStop(0, `rgba(216, 180, 254, ${0.3 + pulse})`);
        coreGrad.addColorStop(0.25, `rgba(168, 85, 247, ${0.22 + pulse})`);
        coreGrad.addColorStop(0.55, 'rgba(107, 33, 168, 0.12)');
        coreGrad.addColorStop(0.85, 'rgba(46, 16, 77, 0.05)');
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(coreCenterX, coreCenterY, coreGlowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Deep Space Micro-Star Twinkles
      microStars.forEach((star) => {
        const alpha = Math.max(
          0.05,
          star.alpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.35
        );
        ctx.fillStyle = `rgba(${star.color}, ${Math.min(1, alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Floating Cosmic Radiant Embers
      embers.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentAlpha =
          p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3;
        const validAlpha = Math.max(0, Math.min(1, currentAlpha));

        // Outer soft glow halo
        const emberGlow = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 3.5
        );
        emberGlow.addColorStop(0, `${p.color}${validAlpha * 0.85})`);
        emberGlow.addColorStop(0.5, `${p.color}${validAlpha * 0.35})`);
        emberGlow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = emberGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Bright white/lavender center
        ctx.fillStyle = `rgba(255, 255, 255, ${validAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. Luxury Cinematic Vignette (Deep dark obsidian rim with contrast)
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.32,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.65, 'rgba(2, 0, 5, 0.45)');
      vignette.addColorStop(1, 'rgba(0, 0, 2, 0.96)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#010003' }}
    />
  );
};
