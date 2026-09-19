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
  Play
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
      bgX: mx * -10,
      bgY: my * -6,
      fgX: mx * 4,
      fgY: my * 3,
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
        minHeight: 'clamp(660px, 90vh, 940px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#F7F1E5',
        color: '#261911'
      }}
      aria-label="Vedic Gurukul Hero Banner"
    >
      {/* 1. Full-bleed Background Scene with Ken Burns & Smooth Crossfade */}
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

      {/* 2. Delicate, Transparent Ambient Warmth Overlay (NO heavy white wash) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, 
              rgba(255, 250, 240, 0.42) 0%, 
              rgba(255, 250, 240, 0.28) 32%, 
              rgba(255, 250, 240, 0.10) 55%, 
              transparent 75%
            )
          `,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Subtle Warm Ambient Radial Soft Light for Text Readability without Obscuring Background */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '8%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255, 248, 230, 0.45) 0%, rgba(255, 248, 230, 0.15) 50%, transparent 80%)',
          filter: 'blur(30px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 4. Bottom Soft Fade into 4-Pillar Ribbon */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(0deg, #F8F3E9 0%, rgba(248, 243, 233, 0.6) 40%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* 5. Delicate Golden Lace Mandala Filigree in Top-Left Corner */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '640px',
          height: '640px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 154, 78, 0.3)',
          boxShadow: 'inset 0 0 60px rgba(197, 154, 78, 0.08)',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0.35
        }}
        className="animate-mandala-rotate"
      >
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '12%',
            right: '12%',
            bottom: '12%',
            borderRadius: '50%',
            border: '1px dashed rgba(197, 154, 78, 0.25)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            right: '25%',
            bottom: '25%',
            borderRadius: '50%',
            border: '1px solid rgba(166, 95, 43, 0.2)'
          }}
        />
      </div>

      {/* 6. Soft Light Sweep & Golden Particle Canvas */}
      <div className="light-sweep-overlay" style={{ zIndex: 3 }} />
      <HeroCanvasParticles mouseX={parallax.rawMouseX} mouseY={parallax.rawMouseY} />

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
            padding: 'var(--spacing-10) 0'
          }}
        >
          {/* Main Sanskrit Gurukul Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 4.4rem)',
              fontFamily: 'var(--font-heading-devanagari)',
              color: '#261911',
              lineHeight: 1.14,
              marginBottom: '0.65rem',
              letterSpacing: '-0.015em',
              fontWeight: 700,
              textShadow: '0 2px 16px rgba(255, 248, 235, 0.9), 0 1px 3px rgba(255, 255, 255, 0.8)'
            }}
          >
            {language === 'hi' ? 'संस्कृत वैदिक गुरुकुल' : 'संस्कृत वैदिक गुरुकुल'}
          </motion.h1>

          {/* Uppercase Elegant Subtitle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading-latin)',
              fontSize: 'clamp(0.85rem, 1.4vw, 0.98rem)',
              fontWeight: 700,
              color: '#5C3D28',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight: 1.5,
              marginBottom: 'var(--spacing-6)',
              textShadow: '0 1px 10px rgba(255, 248, 235, 0.9)'
            }}
          >
            {language === 'hi'
              ? 'A JOURNEY TOWARDS KNOWLEDGE, CHARACTER AND A BETTER SOCIETY'
              : 'A JOURNEY TOWARDS KNOWLEDGE, CHARACTER AND A BETTER SOCIETY'}
          </motion.div>

          {/* Traditional Ornate Flourish Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#B88A45',
              marginBottom: 'var(--spacing-5)'
            }}
          >
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(90deg, transparent, #C59A4E)' }} />
            <svg width="22" height="14" viewBox="0 0 24 14" fill="currentColor">
              <path d="M12 0C10.5 3 7.5 5 4 5C6 7 8 8 12 14C16 8 18 7 20 5C16.5 5 13.5 3 12 0Z" />
            </svg>
            <div style={{ height: '1px', width: '50px', background: 'linear-gradient(270deg, transparent, #C59A4E)' }} />
          </motion.div>

          {/* Sacred Sanskrit Shloka Box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginBottom: 'var(--spacing-8)'
            }}
          >
            {/* Shloka Verse in Bold Serif */}
            <div
              style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: 'clamp(1.35rem, 2.4vw, 1.8rem)',
                color: '#261911',
                fontWeight: 700,
                lineHeight: 1.45,
                marginBottom: '0.5rem',
                textShadow: '0 2px 14px rgba(255, 248, 235, 0.9), 0 1px 2px rgba(255, 255, 255, 0.8)'
              }}
            >
              “विद्या ददाति विनयं<br />
              विनयाद् याति पात्रताम् ।”
            </div>

            {/* Sub-meaning in Italic */}
            <div
              style={{
                fontFamily: 'var(--font-serif-accent)',
                fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                color: '#573E2C',
                lineHeight: 1.5,
                textShadow: '0 1px 8px rgba(255, 248, 235, 0.9)'
              }}
            >
              Knowledge gives humility,<br />
              from humility comes worthiness.
            </div>
          </motion.div>

          {/* Action CTAs: Rounded Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.15rem'
            }}
          >
            {/* Primary Terracotta/Saffron Pill Button */}
            <button
              onClick={() => onNavigate('education')}
              style={{
                backgroundColor: '#984B22',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(152, 75, 34, 0.35)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-pill-primary"
            >
              <span>{language === 'hi' ? 'Explore Gurukul' : 'Explore Gurukul'}</span>
              <ArrowRight size={17} />
            </button>

            {/* Secondary Warm Parchment Pill Button */}
            <button
              onClick={() => onNavigate('trust')}
              style={{
                backgroundColor: 'rgba(255, 253, 249, 0.94)',
                color: '#261911',
                border: '1.5px solid rgba(197, 154, 78, 0.65)',
                borderRadius: 'var(--radius-full)',
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 10px rgba(42, 30, 23, 0.06)',
                transition: 'all var(--transition-fast)'
              }}
              className="btn-pill-secondary"
            >
              <span>{language === 'hi' ? 'Learn About Our Trust' : 'Learn About Our Trust'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 8. Bottom-Left Slide Indicator Carousel Pills */}
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
              backgroundColor: idx === currentSlideIndex ? '#984B22' : 'rgba(42, 30, 23, 0.3)',
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
            color: '#5C3D28',
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
          color: '#5C3D28',
          fontSize: '11px',
          letterSpacing: '0.04em',
          fontWeight: 600
        }}
      >
        <div
          style={{
            width: '20px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid #5C3D28',
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
              backgroundColor: '#984B22',
              borderRadius: 'var(--radius-full)'
            }}
          />
        </div>
        <span>Scroll to Explore ⌄</span>
      </div>

      <style>{`
        .btn-pill-primary:hover {
          background-color: #7E3C1A !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(152, 75, 34, 0.45) !important;
        }
        .btn-pill-secondary:hover {
          background-color: #FFFFFF !important;
          border-color: #984B22 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(42, 30, 23, 0.12) !important;
        }
      `}</style>
    </section>
  );
};
