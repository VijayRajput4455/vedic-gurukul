import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { HeroCanvasParticles } from './HeroCanvasParticles';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Pause,
  Play,
  MousePointer
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

interface HeroSlide {
  id: string;
  image: string;
  fallbackGradient: string;
  titleHi: string;
  titleEn: string;
  tagHi: string;
  tagEn: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);

  // Parallax transform state (RAF damped)
  const [parallax, setParallax] = useState({
    bgX: 0,
    bgY: 0,
    fgX: 0,
    fgY: 0,
    rotX: 0,
    rotY: 0,
    rawMouseX: 0,
    rawMouseY: 0
  });

  const heroRef = useRef<HTMLDivElement | null>(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  // Cinematic Slides
  const slides: HeroSlide[] = useMemo(
    () => [
      {
        id: 'golden-horizon',
        image: '/assets/images/hero/vedic_golden_horizon_hero.jpg',
        fallbackGradient: 'radial-gradient(circle at center, #4A3323 0%, #1E1510 100%)',
        titleHi: 'वैदिक गुरुकुल एवं आश्रम मण्डप',
        titleEn: 'Sacred Gurukul Mandapa & River Horizon',
        tagHi: 'सत्यं • ऋतं • ज्ञानम् • सेवा',
        tagEn: 'Truth • Cosmic Order • Wisdom • Service'
      },
      {
        id: 'campus-dawn',
        image: '/assets/images/hero/gurukul_campus_hero.jpg',
        fallbackGradient: 'radial-gradient(circle at center, #3A2518 0%, #1A120D 100%)',
        titleHi: 'वैदिक गुरुकुल परिसर एवं अध्ययन कुटीर',
        titleEn: 'Sacred Gurukul Campus & Study Pavilions',
        tagHi: 'प्रातःकालीन स्वाध्याय व तपस्या',
        tagEn: 'Dawn Contemplation & Shastra Study'
      },
      {
        id: 'granthalaya-hall',
        image: '/assets/images/hero/vedic_granthalaya_hero.jpg',
        fallbackGradient: 'radial-gradient(circle at center, #2E1F16 0%, #160F0B 100%)',
        titleHi: 'प्राचीन पाणिनीय ग्रन्थागार',
        titleEn: 'Ancient Vedic Manuscript Library',
        tagHi: 'पाणिनीय व्याकरण व दर्शन अनुसंधान',
        tagEn: 'Paninian Grammar & Shastric Research'
      }
    ],
    []
  );

  // Smooth RAF Parallax Loop
  const updateParallax = useCallback(() => {
    const ease = 0.08;
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * ease;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * ease;

    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;

    setParallax({
      bgX: mx * -12,
      bgY: my * -8,
      fgX: mx * 5,
      fgY: my * 4,
      rotX: my * -1.5,
      rotY: mx * 1.5,
      rawMouseX: mx,
      rawMouseY: my
    });

    rafId.current = requestAnimationFrame(updateParallax);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    rafId.current = requestAnimationFrame(updateParallax);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateParallax]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetMouse.current = { x, y };
  };

  const handleMouseLeave = () => {
    targetMouse.current = { x: 0, y: 0 };
    setIsHovered(false);
  };

  // Auto-slide Timer (12s cycle)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="hero-golden-horizon-section"
      style={{
        position: 'relative',
        minHeight: 'clamp(640px, 88vh, 920px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#F8F3E9',
        color: '#2A1E17'
      }}
      aria-label="Vedic Gurukul Hero Banner"
    >
      {/* 1. Background Cinematic Image Layer with Ken Burns & Smooth Crossfade */}
      <div
        style={{
          position: 'absolute',
          top: '-4%',
          left: '-4%',
          width: '108%',
          height: '108%',
          transform: `translate3d(${parallax.bgX}px, ${parallax.bgY}px, 0)`,
          willChange: 'transform',
          zIndex: 1
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: currentSlide.fallbackGradient
            }}
          >
            <img
              src={currentSlide.image}
              alt={language === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
              className={currentSlideIndex === 0 ? 'ken-burns-1' : 'ken-burns-2'}
              onLoad={() => setImageLoaded((prev) => ({ ...prev, [currentSlide.id]: true }))}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                opacity: imageLoaded[currentSlide.id] ? 1 : 0,
                transition: 'opacity 0.8s ease'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Soft Parchment-to-Landscape Gradient Overlay on Left for Flawless Text Readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, 
              rgba(250, 246, 238, 0.94) 0%, 
              rgba(250, 246, 238, 0.88) 36%, 
              rgba(250, 246, 238, 0.52) 58%, 
              rgba(250, 246, 238, 0.12) 80%,
              rgba(250, 246, 238, 0.02) 100%
            )
          `,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Subtle Dark/Warm Top and Bottom Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(180deg, rgba(250, 246, 238, 0.7) 0%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(0deg, rgba(248, 243, 233, 1) 0%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* 4. Soft Light Sweep Sheen */}
      <div className="light-sweep-overlay" style={{ zIndex: 3 }} />

      {/* 5. Atmospheric Golden Dust Particles Engine */}
      <HeroCanvasParticles mouseX={parallax.rawMouseX} mouseY={parallax.rawMouseY} />

      {/* 6. Subtle Watermark Mandala on Left Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          border: '1.5px dashed rgba(197, 154, 78, 0.25)',
          boxShadow: 'inset 0 0 40px rgba(197, 154, 78, 0.05)',
          pointerEvents: 'none',
          zIndex: 3
        }}
        className="animate-mandala-rotate"
      />

      {/* 7. Foreground Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          transform: `translate3d(${parallax.fgX}px, ${parallax.fgY}px, 0)`,
          willChange: 'transform'
        }}
        className="container"
      >
        <div
          style={{
            maxWidth: '680px',
            textAlign: 'left',
            padding: 'var(--spacing-8) 0'
          }}
        >
          {/* Main Sanskrit Gurukul Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              fontFamily: 'var(--font-heading-devanagari)',
              color: '#2A1E17',
              lineHeight: 1.15,
              marginBottom: '0.4rem',
              letterSpacing: '-0.02em'
            }}
          >
            {language === 'hi' ? 'संस्कृत वैदिक गुरुकुल' : 'Sanskrit Vedic Gurukul'}
          </motion.h1>

          {/* Subtitle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading-latin)',
              fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
              fontWeight: 700,
              color: 'var(--color-primary-dark)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 'var(--spacing-6)'
            }}
          >
            {language === 'hi'
              ? 'ज्ञान, संस्कार एवं श्रेष्ठ समाज निर्माण की साधना'
              : 'A JOURNEY TOWARDS KNOWLEDGE, CHARACTER AND A BETTER SOCIETY'}
          </motion.div>

          {/* Traditional Sanskrit Shloka Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginBottom: 'var(--spacing-8)',
              position: 'relative'
            }}
          >
            {/* Ornamental Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-gold)',
                marginBottom: '0.75rem'
              }}
            >
              <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, var(--color-gold))' }} />
              <Sparkles size={14} />
              <div style={{ height: '1px', width: '40px', background: 'linear-gradient(270deg, transparent, var(--color-gold))' }} />
            </div>

            {/* Sacred Verse */}
            <div
              style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                color: '#2A1E17',
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: '0.35rem'
              }}
            >
              “विद्या ददाति विनयं विनयाद् याति पात्रताम् ।”
            </div>

            {/* English/Hindi Subtext */}
            <div
              style={{
                fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
                color: 'var(--color-text-secondary)',
                fontStyle: 'italic',
                lineHeight: 1.5
              }}
            >
              {language === 'hi'
                ? 'विद्या से विनय आता है, और विनय से ही सच्ची योग्यता प्राप्त होती है।'
                : 'Knowledge gives humility, from humility comes worthiness.'}
            </div>
          </motion.div>

          {/* Rounded Pill CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            {/* Primary Saffron/Terracotta Pill Button */}
            <button
              onClick={() => onNavigate('education')}
              style={{
                backgroundColor: '#984B22',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.85rem 1.85rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(152, 75, 34, 0.35)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-pill-primary"
            >
              <span>{language === 'hi' ? 'गुरुकुल परिचय व शिक्षा' : 'Explore Gurukul'}</span>
              <ArrowRight size={16} />
            </button>

            {/* Secondary Parchment/Gold Pill Button */}
            <button
              onClick={() => onNavigate('trust')}
              style={{
                backgroundColor: 'rgba(255, 253, 249, 0.85)',
                color: '#2A1E17',
                border: '1.5px solid var(--color-gold-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.85rem 1.85rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-pill-secondary"
            >
              <span>{language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट' : 'Learn About Our Trust'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 8. Bottom-Left Slide Indicator Pills */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 'clamp(1rem, 4vw, 3rem)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            style={{
              width: idx === currentSlideIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: idx === currentSlideIndex ? 'var(--color-primary)' : 'rgba(42, 30, 23, 0.25)',
              border: 'none',
              transition: 'all var(--transition-base)',
              padding: 0,
              cursor: 'pointer'
            }}
            title={language === 'hi' ? s.titleHi : s.titleEn}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}

        <button
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          style={{
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '6px',
            cursor: 'pointer',
            padding: 0,
            background: 'none',
            border: 'none'
          }}
          title={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
          aria-label={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
        >
          {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>

      {/* 9. Bottom-Right "Scroll to Explore" Pill Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: 'clamp(1rem, 4vw, 3rem)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--color-text-muted)',
          fontSize: '11px',
          letterSpacing: '0.04em'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--color-text-muted)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '5px'
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '3px',
              height: '6px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)'
            }}
          />
        </div>
        <span>{language === 'hi' ? 'नीचे देखें ⌄' : 'Scroll to Explore ⌄'}</span>
      </div>

      <style>{`
        .btn-pill-primary:hover {
          background-color: #7E3C1A !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(152, 75, 34, 0.45) !important;
        }
        .btn-pill-secondary:hover {
          background-color: #FFFFFF !important;
          border-color: var(--color-gold) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
    </section>
  );
};
