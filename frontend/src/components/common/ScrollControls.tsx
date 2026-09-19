import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ScrollControls: React.FC = () => {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrollY > 200);

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        setIsAtBottom(progress >= 98);
      } else {
        setScrollProgress(0);
        setIsAtBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      className="scroll-controls-capsule animate-fade-in-up"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '5px 8px',
        borderRadius: '9999px',
        backgroundColor:
          theme === 'parchment'
            ? 'rgba(255, 252, 245, 0.88)'
            : 'rgba(22, 15, 11, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(197, 154, 78, 0.45)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(197, 154, 78, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none'
      }}
      aria-label="Quick Scroll Navigation Capsule"
    >
      {/* ⬆️ Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title="Scroll back to top"
        aria-label="Scroll to top"
        className="scroll-btn scroll-btn-top"
      >
        <ArrowUp size={16} />
      </button>

      {/* Real-time Percentage Badge */}
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-text-main)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          backgroundColor:
            theme === 'parchment'
              ? 'rgba(197, 154, 78, 0.14)'
              : 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(197, 154, 78, 0.3)',
          minWidth: '42px',
          textAlign: 'center',
          letterSpacing: '-0.02em'
        }}
        title={`Current reading depth: ${Math.round(scrollProgress)}%`}
      >
        {Math.round(scrollProgress)}%
      </div>

      {/* ⬇️ Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        disabled={isAtBottom}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: 'none',
          color: isAtBottom ? 'var(--color-text-muted)' : 'var(--color-primary)',
          opacity: isAtBottom ? 0.4 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isAtBottom ? 'default' : 'pointer',
          transition: 'all 0.2s ease',
          padding: 0
        }}
        title={isAtBottom ? 'Already at bottom' : 'Scroll down to footer'}
        aria-label="Scroll to bottom"
        className="scroll-btn scroll-btn-bottom"
      >
        <ArrowDown size={16} />
      </button>

      <style>{`
        .scroll-controls-capsule:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25), 0 0 20px rgba(197, 154, 78, 0.35) !important;
          border-color: var(--color-gold) !important;
        }

        .scroll-btn:not(:disabled):hover {
          background-color: var(--color-primary-light) !important;
          color: var(--color-primary-dark) !important;
          transform: scale(1.1);
        }

        .scroll-btn:not(:disabled):active {
          transform: scale(0.95);
        }
      `}</style>
    </aside>
  );
};
