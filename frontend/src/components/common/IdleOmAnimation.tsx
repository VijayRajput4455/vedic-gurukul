import React, { useEffect, useState, useRef } from 'react';

export const IdleOmAnimation: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const timerRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);

  useEffect(() => {
    // Initial center position as fallback
    mousePosRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const handlePointerActivity = (e: MouseEvent | TouchEvent) => {
      setIsIdle(false);

      let clientX = 0;
      let clientY = 0;

      if ('clientX' in e && typeof e.clientX === 'number') {
        clientX = e.clientX;
        clientY = e.clientY;
        hasMovedRef.current = true;
      } else if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        hasMovedRef.current = true;
      }

      if (hasMovedRef.current) {
        const margin = 120;
        const clampedX = Math.max(margin, Math.min(window.innerWidth - margin, clientX));
        const clampedY = Math.max(margin, Math.min(window.innerHeight - margin, clientY));
        mousePosRef.current = { x: clampedX, y: clampedY };
      }

      restartTimer();
    };

    const handleGeneralActivity = () => {
      setIsIdle(false);
      restartTimer();
    };

    const restartTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      // 3.0 seconds of stillness
      timerRef.current = window.setTimeout(() => {
        setCoords({
          x: mousePosRef.current.x || window.innerWidth / 2,
          y: mousePosRef.current.y || window.innerHeight / 2
        });
        setIsIdle(true);
      }, 3000);
    };

    // Activity event listeners
    window.addEventListener('mousemove', handlePointerActivity, { passive: true });
    window.addEventListener('mousedown', handlePointerActivity, { passive: true });
    window.addEventListener('touchstart', handlePointerActivity, { passive: true });
    window.addEventListener('touchmove', handlePointerActivity, { passive: true });
    window.addEventListener('keydown', handleGeneralActivity, { passive: true });
    window.addEventListener('scroll', handleGeneralActivity, { passive: true });
    window.addEventListener('wheel', handleGeneralActivity, { passive: true });

    // Initial start
    restartTimer();

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      window.removeEventListener('mousemove', handlePointerActivity);
      window.removeEventListener('mousedown', handlePointerActivity);
      window.removeEventListener('touchstart', handlePointerActivity);
      window.removeEventListener('touchmove', handlePointerActivity);
      window.removeEventListener('keydown', handleGeneralActivity);
      window.removeEventListener('scroll', handleGeneralActivity);
      window.removeEventListener('wheel', handleGeneralActivity);
    };
  }, []);

  return (
    <div
      className={`idle-om-container ${isIdle ? 'idle-om-active' : 'idle-om-hidden'}`}
      style={{
        position: 'fixed',
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999980
      }}
      aria-hidden="true"
    >
      {/* 1. Concentric Sacred Radiating Ripple Waves */}
      <div className="om-ripple om-ripple-1" />
      <div className="om-ripple om-ripple-2" />
      <div className="om-ripple om-ripple-3" />

      {/* 2. Soft Golden Radial Aura Ambient Glow */}
      <div className="om-aura-glow" />

      {/* 3. Rotating Sacred Vedic Yantra Mandala Ring */}
      <svg
        className="om-mandala-ring"
        viewBox="0 0 200 200"
        width="190"
        height="190"
      >
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="rgba(197, 154, 78, 0.45)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <circle
          cx="100"
          cy="100"
          r="72"
          fill="none"
          stroke="rgba(197, 154, 78, 0.65)"
          strokeWidth="1.5"
        />
        {/* 8-Fold Sacred Rays / Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <line
              x1="100"
              y1="22"
              x2="100"
              y2="34"
              stroke="rgba(197, 154, 78, 0.75)"
              strokeWidth="1.8"
            />
            <circle
              cx="100"
              cy="18"
              r="2.5"
              fill="#D4AF37"
            />
          </g>
        ))}
      </svg>

      {/* 4. The Sacred ॐ (Om) Glyph */}
      <div className="om-symbol-glyph">
        ॐ
      </div>

      {/* 5. Floating Shimmer Sparks */}
      <div className="om-spark om-spark-1" />
      <div className="om-spark om-spark-2" />
      <div className="om-spark om-spark-3" />
      <div className="om-spark om-spark-4" />
    </div>
  );
};
