import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

export const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const initParticles = (width: number, height: number) => {
      const count = Math.floor((width * height) / 30000);
      const particles: Particle[] = [];
      for (let i = 0; i < Math.min(count, 70); i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.45,
          speedY: -Math.random() * 0.5 - 0.2, // float upward
          opacity: Math.random() * 0.8 + 0.25,
          pulseSpeed: Math.random() * 0.04 + 0.015,
        });
      }
      particlesRef.current = particles;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const addRipple = (x: number, y: number) => {
      const colors = ['#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#f0abfc'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.random() * 110 + 100,
        alpha: 0.95,
        speed: Math.random() * 1.8 + 2.4,
        color: chosenColor,
      });
      // Limit max ripples
      if (ripplesRef.current.length > 25) {
        ripplesRef.current.shift();
      }
    };

    // Spawn ambient deep ripples periodically
    const ambientInterval = setInterval(() => {
      if (!canvas) return;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      addRipple(x, y);
    }, 2400);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 65) {
        addRipple(clientX, clientY);
        lastMousePos.current = { x: clientX, y: clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      addRipple(clientX, clientY);
      // Create double ripple on click
      setTimeout(() => {
        addRipple(clientX + (Math.random() - 0.5) * 20, clientY + (Math.random() - 0.5) * 20);
      }, 120);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    // Render loop
    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // 1. Deep Ocean/Water Abyss Base with Deep Shadow Pockets
      const bgGradient = ctx.createRadialGradient(w * 0.5, h * 0.45, 50, w * 0.5, h * 0.5, Math.max(w, h));
      bgGradient.addColorStop(0, '#1c053a');   // deep rich purple core
      bgGradient.addColorStop(0.35, '#120224'); // deep obsidian violet
      bgGradient.addColorStop(0.7, '#080112');  // midnight violet shadow
      bgGradient.addColorStop(1, '#020006');    // pitch black abyss perimeter
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      // 2. High-Contrast Deep Water Shadow Waves (creates volume & depth)
      ctx.save();
      for (let s = 0; s < 3; s++) {
        const shadowGrad = ctx.createLinearGradient(0, (h / 3) * s, w, (h / 3) * (s + 1));
        shadowGrad.addColorStop(0, 'rgba(3, 0, 8, 0.75)');
        shadowGrad.addColorStop(0.5, 'rgba(18, 2, 36, 0.2)');
        shadowGrad.addColorStop(1, 'rgba(2, 0, 5, 0.85)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        const startY = (h / 3) * s + Math.sin(t * 0.7 + s) * 50;
        ctx.moveTo(0, startY);
        ctx.bezierCurveTo(
          w * 0.3, startY + Math.cos(t * 0.8 + s) * 70,
          w * 0.7, startY - Math.sin(t * 0.9 + s) * 60,
          w, startY + Math.cos(t * 0.6 + s) * 50
        );
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 3. Luminous Violet & Ultraviolet Glowing Pools (Intense underwater radiance)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Top-Center primary luminous glow
      const lightPool1 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(t * 0.8) * 40,
        h * 0.22 + Math.cos(t * 0.7) * 30,
        15,
        w * 0.5,
        h * 0.25,
        w * 0.65
      );
      lightPool1.addColorStop(0, 'rgba(216, 180, 254, 0.45)');
      lightPool1.addColorStop(0.2, 'rgba(168, 85, 247, 0.35)');
      lightPool1.addColorStop(0.5, 'rgba(126, 34, 206, 0.18)');
      lightPool1.addColorStop(0.85, 'rgba(76, 29, 149, 0.05)');
      lightPool1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lightPool1;
      ctx.fillRect(0, 0, w, h);

      // Bottom-Right glowing amethyst water reservoir
      const lightPool2 = ctx.createRadialGradient(
        w * 0.82 + Math.cos(t * 0.6) * 50,
        h * 0.72 + Math.sin(t * 0.5) * 40,
        25,
        w * 0.82,
        h * 0.72,
        w * 0.52
      );
      lightPool2.addColorStop(0, 'rgba(232, 121, 249, 0.38)');
      lightPool2.addColorStop(0.35, 'rgba(147, 51, 234, 0.22)');
      lightPool2.addColorStop(0.7, 'rgba(88, 28, 135, 0.08)');
      lightPool2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lightPool2;
      ctx.fillRect(0, 0, w, h);

      // Bottom-Left deep radiant purple pocket
      const lightPool3 = ctx.createRadialGradient(
        w * 0.18 + Math.sin(t * 0.5) * 40,
        h * 0.8 + Math.cos(t * 0.6) * 35,
        15,
        w * 0.18,
        h * 0.8,
        w * 0.48
      );
      lightPool3.addColorStop(0, 'rgba(192, 132, 252, 0.32)');
      lightPool3.addColorStop(0.4, 'rgba(107, 33, 168, 0.2)');
      lightPool3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lightPool3;
      ctx.fillRect(0, 0, w, h);

      // 4. Underwater Caustic God-Rays (Beams piercing through deep water with shadows between)
      for (let j = 0; j < 5; j++) {
        const rayAngle = (w / 6) * (j + 1) + Math.sin(t * 0.6 + j * 1.5) * 90;
        const rayWidth = 70 + Math.sin(t + j) * 25;
        const rayGrad = ctx.createLinearGradient(rayAngle - rayWidth, 0, rayAngle + rayWidth, h);
        rayGrad.addColorStop(0, 'rgba(233, 213, 255, 0.18)');
        rayGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.12)');
        rayGrad.addColorStop(0.7, 'rgba(107, 33, 168, 0.04)');
        rayGrad.addColorStop(1, 'rgba(30, 10, 60, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(rayAngle - 30 + Math.sin(t + j) * 25, 0);
        ctx.lineTo(rayAngle + 30 + Math.sin(t + j + 1) * 25, 0);
        ctx.lineTo(rayAngle + 140 + Math.cos(t + j) * 45, h);
        ctx.lineTo(rayAngle - 140 + Math.cos(t + j) * 45, h);
        ctx.closePath();
        ctx.fill();
      }

      // 5. Caustic Wave Surface Filaments (Shimmering aquatic webs)
      const waveSteps = 8;
      for (let i = 0; i < waveSteps; i++) {
        const yOffset = (h / waveSteps) * i + Math.sin(t * 0.9 + i) * 40;
        ctx.beginPath();
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= w; x += 35) {
          const waveHeight1 = Math.sin(x * 0.006 + t * 1.1 + i * 0.8) * 26;
          const waveHeight2 = Math.cos(x * 0.014 - t * 0.8 + i * 1.3) * 16;
          const waveY = yOffset + waveHeight1 + waveHeight2;
          ctx.lineTo(x, waveY);
        }

        ctx.strokeStyle = `rgba(216, 180, 254, ${0.08 + (i % 2) * 0.06})`;
        ctx.lineWidth = 1.8 + Math.sin(t + i) * 0.8;
        ctx.stroke();
      }

      ctx.restore();

      // 6. Interactive Glowing Ripples with Deep Water Refraction Shadows
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.013;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();

        // Deep shadow ring behind the glowing ripple (creates physical water displacement)
        const shadowRadius = Math.max(0, r.radius + 2);
        if (shadowRadius > 0) {
          ctx.beginPath();
          ctx.arc(r.x + 2, r.y + 4, shadowRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#020005';
          ctx.globalAlpha = r.alpha * 0.65;
          ctx.lineWidth = Math.max(2, 5 * (1 - r.radius / r.maxRadius));
          ctx.stroke();
        }

        // Luminous crest ring
        const crestRadius = Math.max(0, r.radius);
        if (crestRadius > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, crestRadius, 0, Math.PI * 2);
          ctx.strokeStyle = r.color;
          ctx.globalAlpha = r.alpha * 0.9;
          ctx.lineWidth = Math.max(1.2, 3.8 * (1 - r.radius / r.maxRadius));
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = 16;
          ctx.stroke();
        }

        // Inner secondary harmonic wave
        if (r.radius > 25) {
          const innerWaveRadius = Math.max(0, r.radius * 0.65);
          if (innerWaveRadius > 0) {
            ctx.beginPath();
            ctx.arc(r.x, r.y, innerWaveRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#f3e8ff';
            ctx.globalAlpha = r.alpha * 0.5;
            ctx.lineWidth = 1.6;
            ctx.shadowBlur = 8;
            ctx.stroke();
          }
        }

        // Radiant central flash when starting
        if (r.radius < 45 && r.radius >= 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${r.alpha * 0.9})`;
          ctx.shadowColor = '#e879f9';
          ctx.shadowBlur = 20;
          ctx.fill();
        }

        ctx.restore();
      }

      // 7. Bioluminescent Deep Water Sparks & Floating Orbs
      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -15) p.y = h + 15;
        if (p.x < -15) p.x = w + 15;
        if (p.x > w + 15) p.x = -15;

        const dynamicAlpha = p.opacity * (0.6 + Math.sin(t * 2.2 + p.x) * 0.4);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 213, 255, ${dynamicAlpha})`;
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      clearInterval(ambientInterval);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden" id="violet-water-canvas-container">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        title="انقر أو حرّك على المياه البنفسجية لتوليد تموجات وإضاءات حية"
      />
      {/* Deep water vignetting, shadow depths, and ambient light filtration */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020006] via-transparent to-[#04010a]/80 mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#020005_95%)] opacity-85" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/15 via-transparent to-transparent" />
    </div>
  );
};

