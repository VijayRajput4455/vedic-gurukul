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
}

interface HeroCanvasParticlesProps {
  mouseX?: number;
  mouseY?: number;
}

export const HeroCanvasParticles: React.FC<HeroCanvasParticlesProps> = ({ mouseX = 0, mouseY = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  // Update mouseRef without triggering useEffect re-runs
  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

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

    // Particle count: 32 for delicate, peaceful, non-distracting atmospheric ambiance
    const particleCount = Math.min(36, Math.max(18, Math.floor(width / 42)));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.8,
        // Ultra-slow, peaceful floating dust speed (0.05 to 0.14 px per frame)
        speedY: -(Math.random() * 0.10 + 0.04),
        speedX: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.25 + 0.1,
        targetOpacity: Math.random() * 0.35 + 0.1,
        pulseSpeed: Math.random() * 0.008 + 0.003
      });
    }

    let time = 0;
    let lastTimestamp = performance.now();

    const render = (timestamp: number) => {
      // Calculate elapsed delta time capped at 32ms to prevent huge jumps on tab switch/click
      const elapsed = Math.min(32, timestamp - lastTimestamp);
      lastTimestamp = timestamp;
      const timeScale = elapsed / 16.666; // Normalize to 60fps

      ctx.clearRect(0, 0, width, height);
      time += 0.006 * timeScale;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move upward with very gentle, slow sinusoidal wave drift
        p.y += p.speedY * timeScale;
        p.x += (p.speedX + Math.sin(time * 0.8 + i) * 0.04) * timeScale;

        // Pulse opacity slowly and softly
        p.opacity += (p.targetOpacity - p.opacity) * (p.pulseSpeed * timeScale);
        if (Math.abs(p.targetOpacity - p.opacity) < 0.02) {
          p.targetOpacity = Math.random() * 0.35 + 0.08;
        }

        // Wrap around boundaries seamlessly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing golden particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        gradient.addColorStop(0, `rgba(245, 218, 145, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(224, 154, 60, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(166, 95, 43, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run effect once on mount, no re-creations on mouse moves or clicks

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

