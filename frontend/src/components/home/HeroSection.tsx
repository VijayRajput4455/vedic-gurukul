import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { HeroCanvasParticles } from './HeroCanvasParticles';
import { vedicAudio } from '../../utils/audio';
import {
  ArrowRight,
  Sparkles,
  Pause,
  Play,
  ChevronDown,
  Volume2
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

interface HeroSlide {
  id: string;
  image: string;
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

  // High-Resolution Authentic Vedic Gurukul Photography Slides
  const slides: HeroSlide[] = useMemo(
    () => [
      {
        id: 'vedic-hero-mandap',
        image: '/assets/images/hero/vedic_hero_mandap.jpg',
        titleHi: 'वैदिक गुरुकुल एवं आश्रम मण्डप',
        titleEn: 'Sacred Gurukul Mandapa & River Horizon',
        tagHi: 'सत्यं • ऋतं • ज्ञानम् • सेवा',
        tagEn: 'Truth • Cosmic Order • Wisdom • Service'
      },
      {
        id: 'vedic-study-courtyard',
        image: '/assets/images/hero/vedic_study_courtyard.jpg',
        titleHi: 'प्राचीन वटवृक्ष पावन स्वाध्याय',
        titleEn: 'Sacred Banyan Courtyard & Shastric Study',
        tagHi: 'प्रातःकालीन स्वाध्याय व तपस्या',
        tagEn: 'Dawn Contemplation & Shastra Study'
      },
      {
        id: 'vedic-library-grantha',
        image: '/assets/images/hero/vedic_library_grantha.jpg',
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
      bgX: mx * -8,
      bgY: my * -5,
      fgX: mx * 3,
      fgY: my * 2,
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

  // Auto-slide Timer (10s cycle)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  const handleScrollToNext = () => {
    const nextEl = document.getElementById('welcome-section') || document.getElementById('home-next');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="hero-cinematic-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#1E140D',
        color: '#FFFFFF'
      }}
      aria-label="Vedic Gurukul Hero Banner"
    >
      {/* =========================================================================
          LAYER 1: Full-Width Gurukul Background with Cinematic Ken Burns Movement
          ========================================================================= */}
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <img
              src={currentSlide.image}
              alt={language === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
              className="ken-burns-hero-cinematic"
              onLoad={() => setImageLoaded((prev) => ({ ...prev, [currentSlide.id]: true }))}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 42%',
                opacity: imageLoaded[currentSlide.id] ? 1 : 0.8,
                transition: 'opacity 0.8s ease'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================================================
          LAYER 2: Atmospheric Elements (Gentle Sun Rays & Warm Vignette Overlay)
          ========================================================================= */}
      {/* Crisp, Warm Multi-Stop Atmospheric Shading (Ensures High Contrast & Readability) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, 
              rgba(18, 12, 8, 0.86) 0%, 
              rgba(18, 12, 8, 0.72) 38%, 
              rgba(18, 12, 8, 0.42) 65%, 
              rgba(18, 12, 8, 0.28) 100%
            ),
            linear-gradient(180deg, 
              rgba(18, 12, 8, 0.45) 0%, 
              transparent 25%, 
              transparent 70%, 
              rgba(18, 12, 8, 0.85) 100%
            )
          `,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Soft Golden Sunbeam Glow from Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(245, 197, 86, 0.18) 0%, rgba(212, 122, 43, 0.08) 45%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Golden Dust Particles Canvas */}
      <HeroCanvasParticles />

      {/* =========================================================================
          LAYER 3: Traditional Devanagari Filigree & Subtle Mandala Geometry
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          border: '1px solid rgba(229, 169, 60, 0.22)',
          boxShadow: 'inset 0 0 60px rgba(229, 169, 60, 0.06)',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0.45
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
            border: '1px dashed rgba(229, 169, 60, 0.20)'
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
            border: '1px solid rgba(198, 93, 33, 0.20)'
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 4: Structured Foreground Typography & Vedic CTAs
          ========================================================================= */}
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
            maxWidth: '780px',
            textAlign: 'left',
            padding: 'clamp(5.5rem, 12vh, 8.5rem) 0 clamp(3.5rem, 8vh, 5.5rem) 0'
          }}
        >
          {/* 1. Sacred Interactive Sanskrit Logo Crest: ॥ ॐ ॥ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => vedicAudio.playResonance(432, 4)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              backgroundColor: 'rgba(212, 175, 55, 0.16)',
              border: '1.2px solid rgba(229, 169, 60, 0.5)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 1.15rem 0.35rem 0.5rem',
              marginBottom: 'var(--spacing-4)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 16px rgba(229, 169, 60, 0.2)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title={language === 'hi' ? 'वैदिक ओंकार नाद (432Hz) सुनने हेतु क्लिक करें' : 'Click to experience 432Hz Sacred Om Resonance'}
          >
            {/* Medallion with spinning mandala */}
            <div
              style={{
                position: 'relative',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(229, 169, 60, 0.9), rgba(166, 95, 43, 0.9))',
                border: '1px solid #FFE299',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(229, 169, 60, 0.8)',
                flexShrink: 0
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: '50%',
                  border: '1px dashed #FFE299',
                  opacity: 0.8
                }}
                className="animate-spin-slow"
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading-devanagari)',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  textShadow: '0 0 6px #FFF'
                }}
              >
                ॐ
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-heading-latin)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#FFF8EE',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <span>{language === 'hi' ? 'संस्कृत वैदिक गुरुकुल' : 'Sanskrit Vedic Gurukul'}</span>
              <Volume2 size={12} color="#F5D77F" style={{ opacity: 0.85 }} />
            </span>
          </motion.div>

          {/* 2. Main Sanskrit Heading: ज्ञानं परमं बलम् */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 5.8vw, 4.2rem)',
              fontFamily: 'var(--font-heading-devanagari)',
              fontWeight: 700,
              lineHeight: 1.12,
              marginBottom: '0.45rem',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FFFFFF 20%, #FBE8BD 60%, #E5B35C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 28px rgba(0, 0, 0, 0.75)'
            }}
          >
            ज्ञानं परमं बलम्
          </motion.h1>

          {/* 3. English Heading: Awaken the Light of Vedic Knowledge */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading-latin)',
              fontSize: 'clamp(1.25rem, 2.6vw, 1.95rem)',
              fontWeight: 600,
              color: '#F4E8D6',
              letterSpacing: '0.02em',
              lineHeight: 1.3,
              marginBottom: 'var(--spacing-4)',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.7)'
            }}
          >
            Awaken the Light of Vedic Knowledge
          </motion.h2>

          {/* Traditional Sanskrit-Inspired Decorative Motif Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: '#D4AF37',
              marginBottom: 'var(--spacing-5)'
            }}
          >
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <svg width="24" height="14" viewBox="0 0 24 14" fill="currentColor" aria-hidden="true">
              <path d="M12 0C10.5 3 7.5 5 4 5C6 7 8 8 12 14C16 8 18 7 20 5C16.5 5 13.5 3 12 0Z" />
            </svg>
            <Sparkles size={14} />
            <svg width="24" height="14" viewBox="0 0 24 14" fill="currentColor" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
              <path d="M12 0C10.5 3 7.5 5 4 5C6 7 8 8 12 14C16 8 18 7 20 5C16.5 5 13.5 3 12 0Z" />
            </svg>
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(270deg, transparent, #D4AF37)' }} />
          </motion.div>

          {/* 4. Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body-latin)',
              fontSize: 'clamp(0.98rem, 1.4vw, 1.15rem)',
              color: '#E0D4C5',
              lineHeight: 1.7,
              marginBottom: 'var(--spacing-8)',
              maxWidth: '680px',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)'
            }}
          >
            {language === 'hi'
              ? 'संस्कृत वैदिक गुरुकुल में आपका स्वागत है — जहाँ स्वामी दयानन्द सरस्वती के पावन आदर्शों के अनुरूप पारम्परिक शिक्षा, संस्कृत स्वाध्याय, वैदिक प्रज्ञा एवं चरित्र-निर्माण का दिव्य संगम होता है।'
              : 'Welcome to our Sanskrit Vedic Gurukul, where traditional education, Sanskrit learning, Vedic wisdom, and character development come together in a nurturing environment.'}
          </motion.p>

          {/* 5. Primary & Secondary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.15rem'
            }}
          >
            {/* Primary Saffron/Ochre CTA Button: Explore Our Gurukul */}
            <button
              onClick={() => onNavigate('education')}
              style={{
                backgroundColor: '#C65D21',
                backgroundImage: 'linear-gradient(135deg, #D46B28 0%, #B84E1A 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 'var(--radius-full)',
                padding: '0.95rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(198, 93, 33, 0.45)',
                transition: 'all var(--transition-base)'
              }}
              className="hero-btn-primary"
            >
              <span>{language === 'hi' ? 'गुरुकुल परिचय देखें' : 'Explore Our Gurukul'}</span>
              <ArrowRight size={17} />
            </button>

            {/* Secondary Antique Gold Border CTA Button: Discover Our Vision */}
            <button
              onClick={() => onNavigate('philosophy')}
              style={{
                backgroundColor: 'rgba(28, 20, 14, 0.65)',
                color: '#FFF8EE',
                border: '1.5px solid rgba(229, 169, 60, 0.7)',
                borderRadius: 'var(--radius-full)',
                padding: '0.95rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
                transition: 'all var(--transition-base)'
              }}
              className="hero-btn-secondary"
            >
              <span>{language === 'hi' ? 'हमारा ध्येय व दर्शन' : 'Discover Our Vision'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          LAYER 5: Interactive Slide Switcher Pills & Scroll Indicator
          ========================================================================= */}
      {/* Slide Indicators on Bottom-Left */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: 'clamp(1rem, 4vw, 3rem)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(18, 12, 8, 0.55)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(229, 169, 60, 0.25)'
        }}
      >
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            style={{
              width: idx === currentSlideIndex ? '30px' : '8px',
              height: '7px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: idx === currentSlideIndex ? '#D4AF37' : 'rgba(255, 255, 255, 0.35)',
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
            color: '#E5B35C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px',
            cursor: 'pointer',
            padding: 0,
            background: 'none',
            border: 'none'
          }}
          title={isAutoPlaying ? 'Pause slide rotation' : 'Resume slide rotation'}
          aria-label={isAutoPlaying ? 'Pause slide rotation' : 'Resume slide rotation'}
        >
          {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>

      {/* Subtle Scroll Down Indicator on Bottom-Center/Right */}
      <button
        onClick={handleScrollToNext}
        style={{
          position: 'absolute',
          bottom: '22px',
          right: 'clamp(1rem, 4vw, 3rem)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#F4E8D6',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 10px'
        }}
        className="scroll-down-btn"
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="#D4AF37" />
        </motion.div>
      </button>

      {/* Component Specific Hover Styles & Ken Burns Animation */}
      <style>{`
        .ken-burns-hero-cinematic {
          animation: subtleKenBurns 28s ease-in-out infinite alternate;
        }

        @keyframes subtleKenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.06) translate(-1%, -1%);
          }
          100% {
            transform: scale(1.03) translate(1%, 0.5%);
          }
        }

        .hero-btn-primary:hover {
          background-image: linear-gradient(135deg, #E07A2E 0%, #C65D21 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212, 107, 40, 0.6) !important;
        }

        .hero-btn-secondary:hover {
          background-color: rgba(229, 169, 60, 0.22) !important;
          border-color: #F5D77F !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(229, 169, 60, 0.3) !important;
        }

        .scroll-down-btn:hover {
          color: #D4AF37;
        }
      `}</style>
    </section>
  );
};

