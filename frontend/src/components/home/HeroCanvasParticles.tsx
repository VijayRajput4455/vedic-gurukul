import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
  hueOffset: number;
}

interface HeroCanvasParticlesProps {
  mouseX?: number;
  mouseY?: number;
}

export const HeroCanvasParticles: React.FC<HeroCanvasParticlesProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count: 35-45 for delicate, non-distracting atmospheric ambiance
    const particleCount = Math.min(45, Math.floor(width / 32));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.35 + 0.1,
        targetOpacity: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        hueOffset: Math.random() * 15 - 7.5
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with gentle sinusoidal wave drift
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + i) * 0.2;

        // Subtle mouse influence
        if (mouseX !== 0 || mouseY !== 0) {
          const dx = p.x - (width / 2 + mouseX * (width / 2));
          const dy = p.y - (height / 2 + mouseY * (height / 2));
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 0.6;
            p.y += (dy / dist) * force * 0.6;
          }
        }

        // Pulse opacity
        p.opacity += (p.targetOpacity - p.opacity) * p.pulseSpeed;
        if (Math.abs(p.targetOpacity - p.opacity) < 0.02) {
          p.targetOpacity = Math.random() * 0.4 + 0.1;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        // Antique gold / saffron warm ember tones (HSL 40°, 85%, 70%)
        gradient.addColorStop(0, `rgba(245, 218, 145, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(224, 154, 60, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(166, 95, 43, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4
      }}
      aria-hidden="true"
    />
  );
};
