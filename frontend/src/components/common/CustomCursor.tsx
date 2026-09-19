import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const spotlightPos = useRef({ x: -300, y: -300 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touch/mobile)
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.innerWidth < 768;

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Instant 0-latency direct transform for core dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], .btn, .card, .vedic-card, .glass-card, .nav-link-btn, .clickable, kbd, label, [tabindex="0"]'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp physics for trailing ring (easing factor = 0.2)
    const lerp = 0.2;
    const animate = () => {
      // Interpolate ring position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Spotlight follows with slight lag for soft ambient effect
      spotlightPos.current.x += (mousePos.current.x - spotlightPos.current.x) * 0.12;
      spotlightPos.current.y += (mousePos.current.y - spotlightPos.current.y) * 0.12;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.current.x}px, ${spotlightPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div className="cyber-cursor-wrapper" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {/* 1. Layer A: Ambient 500px Soft Radial Glow Flashlight */}
      <div
        ref={spotlightRef}
        className="cursor-ambient-spotlight"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '500px',
          height: '500px',
          marginLeft: '-250px',
          marginTop: '-250px',
          borderRadius: '50%',
          background:
            theme === 'parchment'
              ? 'radial-gradient(circle, rgba(197, 154, 78, 0.14) 0%, rgba(166, 95, 43, 0.05) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(223, 178, 96, 0.16) 0%, rgba(200, 106, 40, 0.06) 45%, transparent 70%)',
          zIndex: 99990,
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform'
        }}
      />

      {/* 2. Layer C: Trailing Outer Ring with Lerp Physics */}
      <div
        ref={ringRef}
        className={`cursor-outer-ring ${isHovered ? 'ring-hovered' : ''} ${isMouseDown ? 'ring-active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isMouseDown ? '22px' : isHovered ? '48px' : '28px',
          height: isMouseDown ? '22px' : isHovered ? '48px' : '28px',
          marginLeft: isMouseDown ? '-11px' : isHovered ? '-24px' : '-14px',
          marginTop: isMouseDown ? '-11px' : isHovered ? '-24px' : '-14px',
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid var(--color-gold, #C59A4E)'
            : '1.5px solid rgba(197, 154, 78, 0.65)',
          backgroundColor: isHovered
            ? 'rgba(197, 154, 78, 0.18)'
            : isMouseDown
              ? 'rgba(197, 154, 78, 0.3)'
              : 'transparent',
          boxShadow: isHovered
            ? '0 0 16px rgba(197, 154, 78, 0.5), inset 0 0 8px rgba(197, 154, 78, 0.2)'
            : isMouseDown
              ? '0 0 20px rgba(166, 95, 43, 0.7)'
              : '0 0 6px rgba(197, 154, 78, 0.25)',
          zIndex: 99998,
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition:
            'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), margin 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, opacity 0.25s ease',
          willChange: 'transform'
        }}
      />

      {/* 3. Layer B: 6px Pinpoint Core Dot with 0 Latency */}
      <div
        ref={dotRef}
        className={`cursor-core-dot ${isHovered ? 'dot-hovered' : ''} ${isMouseDown ? 'dot-active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          marginLeft: isHovered ? '-4px' : '-3px',
          marginTop: isHovered ? '-4px' : '-3px',
          borderRadius: '50%',
          backgroundColor: isHovered
            ? '#FFFFFF'
            : isMouseDown
              ? 'var(--color-gold, #C59A4E)'
              : 'var(--color-primary, #A65F2B)',
          boxShadow: isHovered
            ? '0 0 10px #FFFFFF, 0 0 16px var(--color-gold)'
            : '0 0 6px rgba(166, 95, 43, 0.6)',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.18s ease, height 0.18s ease, margin 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, opacity 0.2s ease',
          willChange: 'transform'
        }}
      />

      {/* Mobile & Touch Styles and Accessibility Fallbacks */}
      <style>{`
        @media (pointer: coarse), (hover: none), (max-width: 767px) {
          .cyber-cursor-wrapper {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cursor-ambient-spotlight,
          .cursor-outer-ring {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
