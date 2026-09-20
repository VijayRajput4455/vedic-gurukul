import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const VedicBackground: React.FC = () => {
  const { theme, activeThemeData } = useTheme();

  return (
    <div
      className="vedic-dynamic-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-main)',
        transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* 1. Subtle Traditional Geometric Texture Pattern Layer */}
      <div
        className="vedic-pattern-layer"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `var(--bg-pattern-image, url("${activeThemeData.patternSvg}"))`,
          backgroundSize: `var(--bg-pattern-size, ${activeThemeData.patternSize})`,
          backgroundRepeat: 'repeat',
          opacity: 'var(--bg-pattern-opacity, 0.18)',
          transition: 'opacity 0.4s ease, background-image 0.4s ease',
          willChange: 'opacity, background-image'
        }}
      />

      {/* 2. Tasteful Large Low-Opacity Om (ॐ) Watermark in Backdrop */}
      <div
        className="vedic-om-watermark"
        style={{
          position: 'absolute',
          top: '35%',
          right: '5%',
          transform: 'translate(0, -50%)',
          fontSize: 'clamp(280px, 42vw, 560px)',
          fontFamily: "'Noto Serif Devanagari', 'Yatra One', serif",
          fontWeight: 700,
          lineHeight: 1,
          color: theme === 'parchment' ? '#B88A45' : '#DFB260',
          opacity: theme === 'parchment' ? 0.038 : 0.05,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'opacity 0.6s ease'
        }}
      >
        ॐ
      </div>

      {/* 3. Ambient Sacred Spotlight Glow */}
      <div
        className="vedic-ambient-halo"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '95vw',
          maxWidth: '1300px',
          height: '700px',
          borderRadius: '50%',
          background:
            theme === 'parchment'
              ? `radial-gradient(ellipse at center, rgba(${activeThemeData.rgb}, 0.08) 0%, rgba(${activeThemeData.rgb}, 0.02) 50%, transparent 75%)`
              : `radial-gradient(ellipse at center, rgba(${activeThemeData.rgb}, 0.16) 0%, rgba(${activeThemeData.rgb}, 0.04) 50%, transparent 75%)`,
          filter: 'blur(70px)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none'
        }}
      />

      {/* 4. Bottom Subtle Grounding Warm Glow */}
      <div
        className="vedic-bottom-glow"
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '5%',
          width: '65vw',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${activeThemeData.rgb}, 0.06) 0%, transparent 70%)`,
          filter: 'blur(90px)',
          pointerEvents: 'none'
        }}
      />

      {/* 5. Delicate Edge Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            theme === 'parchment'
              ? 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(240, 232, 220, 0.3) 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(10, 7, 5, 0.45) 100%)',
          pointerEvents: 'none'
        }}
      />

      <style>{`
        @keyframes subtleVedicPulse {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.02); }
        }
        .vedic-ambient-halo {
          animation: subtleVedicPulse 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

