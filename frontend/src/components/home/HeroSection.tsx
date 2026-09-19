import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { HeroCanvasParticles } from './HeroCanvasParticles';
import {
  BookOpen,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  Flame,
  Award,
  Compass,
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
  const { language, t } = useLanguage();
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
    // Lerp smoothing factor
    const ease = 0.08;
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * ease;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * ease;

    const mx = currentMouse.current.x;
    const my = currentMouse.current.y;

    setParallax({
      bgX: mx * -14,
      bgY: my * -10,
      fgX: mx * 5,
      fgY: my * 4,
      rotX: my * -1.8,
      rotY: mx * 1.8,
      rawMouseX: mx,
      rawMouseY: my
    });

    rafId.current = requestAnimationFrame(updateParallax);
  }, []);

  useEffect(() => {
    // Disable if prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    rafId.current = requestAnimationFrame(updateParallax);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateParallax]);

  // Handle Mouse Move for Parallax
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

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="hero-cinematic-section"
      style={{
        position: 'relative',
        minHeight: 'clamp(620px, 86vh, 920px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#1C1510',
        color: '#FFFFFF'
      }}
      aria-label="Vedic Gurukul Hero Banner"
    >
      {/* 1. Background Cinematic Image Carousel with Ken Burns & Smooth Crossfade */}
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

      {/* 2. Layered Vignette, Dark Shadows & Radial Warm Ambient Overlays for Crystal Clear Contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(180deg, 
              rgba(18, 12, 9, 0.72) 0%, 
              rgba(22, 15, 11, 0.45) 30%, 
              rgba(24, 16, 11, 0.65) 65%, 
              rgba(18, 12, 9, 0.94) 100%
            )
          `,
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 50% 45%, 
              rgba(197, 154, 78, 0.16) 0%, 
              rgba(166, 95, 43, 0.08) 40%, 
              rgba(18, 12, 9, 0.75) 100%
            )
          `,
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Soft Light Sweep Sheen */}
      <div className="light-sweep-overlay" style={{ zIndex: 3 }} />

      {/* 4. Atmospheric Golden Dust Particles Engine */}
      <HeroCanvasParticles mouseX={parallax.rawMouseX} mouseY={parallax.rawMouseY} />

      {/* 5. Ornamental Sacred Mandala Geometry Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(380px, 50vw, 750px)',
          height: 'clamp(380px, 50vw, 750px)',
          borderRadius: '50%',
          border: '1.5px dashed rgba(223, 178, 96, 0.22)',
          boxShadow: 'inset 0 0 50px rgba(197, 154, 78, 0.08)',
          pointerEvents: 'none',
          zIndex: 4
        }}
        className="animate-mandala-rotate"
      >
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            right: '8%',
            bottom: '8%',
            borderRadius: '50%',
            border: '1px solid rgba(223, 178, 96, 0.12)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: '20%',
            borderRadius: '50%',
            border: '1px dashed rgba(224, 154, 60, 0.15)'
          }}
        />
      </div>

      {/* 6. Traditional Indian Manuscript Corner Borders on Hero Frame */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '32px',
          height: '32px',
          borderTop: '2px solid var(--color-gold)',
          borderLeft: '2px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0.65
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '32px',
          height: '32px',
          borderTop: '2px solid var(--color-gold)',
          borderRight: '2px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0.65
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '32px',
          height: '32px',
          borderBottom: '2px solid var(--color-gold)',
          borderLeft: '2px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0.65
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '32px',
          height: '32px',
          borderBottom: '2px solid var(--color-gold)',
          borderRight: '2px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0.65
        }}
      />

      {/* 7. Foreground Content Container with 3D Depth Parallax & Blur-to-Sharp Reveals */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          transform: `translate3d(${parallax.fgX}px, ${parallax.fgY}px, 0) perspective(1000px) rotateX(${parallax.rotX}deg) rotateY(${parallax.rotY}deg)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className="container"
      >
        <div style={{ textAlign: 'center', maxWidth: '1240px', margin: '0 auto', paddingTop: 'var(--spacing-8)' }}>
          
          {/* Sanskrit Motto Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 'var(--spacing-4)' }}
          >
            <div
              className="vedic-badge"
              style={{
                backgroundColor: 'rgba(38, 26, 18, 0.75)',
                border: '1.5px solid var(--color-gold-border)',
                backdropFilter: 'blur(10px)',
                color: 'var(--color-gold)',
                padding: '0.45rem 1.4rem',
                fontSize: 'var(--text-xs)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
                letterSpacing: '0.04em'
              }}
            >
              <Flame size={14} className="animate-flame" style={{ color: '#E88340' }} />
              <span className="font-devanagari" style={{ fontWeight: 600 }}>
                विद्या • संस्कार • सेवा (Vidya • Sanskar • Seva)
              </span>
            </div>
          </motion.div>

          {/* Main Cinematic Heading with Blur-to-Sharp Stagger */}
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.3rem, 5.2vw, 4.1rem)',
              fontFamily: 'var(--font-heading-devanagari)',
              lineHeight: 1.18,
              marginBottom: 'var(--spacing-4)',
              color: '#FFFBF5',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.75), 0 0 35px rgba(197, 154, 78, 0.25)',
              letterSpacing: '-0.02em'
            }}
          >
            {t.hero.title}
          </motion.h1>

          {/* Manuscript Traditional Divider with Gold Lotus Accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-3)',
              margin: '0 auto var(--spacing-4) auto',
              maxWidth: '320px',
              color: 'var(--color-gold)'
            }}
          >
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, var(--color-gold))' }} />
            <Sparkles size={16} color="var(--color-gold)" />
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
          </motion.div>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1.05rem, 2.1vw, 1.3rem)',
              color: '#E8DED1',
              lineHeight: 1.7,
              maxWidth: '1040px',
              margin: '0 auto var(--spacing-8) auto',
              fontFamily: 'var(--font-body-latin)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.65)'
            }}
          >
            {t.hero.description}
          </motion.p>

          {/* Action CTAs Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: 'var(--spacing-12)'
            }}
          >
            {/* Primary Action Button: Education & Admission */}
            <button
              onClick={() => onNavigate('education')}
              className="btn btn-primary btn-lg"
              style={{
                boxShadow: '0 6px 24px rgba(166, 95, 43, 0.5)',
                padding: '0.85rem 1.85rem',
                fontSize: '1.05rem'
              }}
            >
              <BookOpen size={19} />
              <span>{t.hero.primaryCta}</span>
              <ChevronRight size={17} />
            </button>

            {/* Secondary Action Button: Trust & Seva */}
            <button
              onClick={() => onNavigate('trust')}
              className="btn btn-forest btn-lg"
              style={{
                boxShadow: '0 6px 24px rgba(59, 91, 67, 0.45)',
                padding: '0.85rem 1.85rem',
                fontSize: '1.05rem'
              }}
            >
              <HeartHandshake size={19} />
              <span>{t.hero.secondaryCta}</span>
            </button>

            {/* 360 Virtual Campus Tour Button */}
            <button
              onClick={() => onNavigate('gallery')}
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: 'rgba(28, 21, 16, 0.6)',
                borderColor: 'var(--color-gold-border)',
                color: '#F4ECD8',
                backdropFilter: 'blur(8px)',
                padding: '0.85rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              <Compass size={18} color="var(--color-gold)" />
              <span>{language === 'hi' ? 'परिसर 360° दर्शन' : '360° Campus Tour'}</span>
            </button>
          </motion.div>

          {/* 8. Bottom 3-Card Glassmorphic Highlights Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid-3"
            style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'left' }}
          >
            {/* Highlight 1: 100% Free Bal Vidya Sahayata */}
            <div
              className="vedic-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'rgba(32, 23, 17, 0.72)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(223, 178, 96, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(166, 95, 43, 0.3)',
                  border: '1px solid var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFA560',
                  flexShrink: 0
                }}
              >
                <Flame size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#FFF8F0', marginBottom: '0.25rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                  {t.hero.statStudents}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: '#DACEC0', margin: 0, lineHeight: 1.5 }}>
                  {t.hero.statStudentsDesc}
                </p>
              </div>
            </div>

            {/* Highlight 2: Paninian Ashtadhyayi & Shastras */}
            <div
              className="vedic-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'rgba(32, 23, 17, 0.72)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(223, 178, 96, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(197, 154, 78, 0.25)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DFB260',
                  flexShrink: 0
                }}
              >
                <BookOpen size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#FFF8F0', marginBottom: '0.25rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                  {t.hero.statFocus}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: '#DACEC0', margin: 0, lineHeight: 1.5 }}>
                  {t.hero.statFocusDesc}
                </p>
              </div>
            </div>

            {/* Highlight 3: Vidya-Sanskar-Seva Values */}
            <div
              className="vedic-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'rgba(32, 23, 17, 0.72)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(223, 178, 96, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(59, 91, 67, 0.3)',
                  border: '1px solid var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#73AB81',
                  flexShrink: 0
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#FFF8F0', marginBottom: '0.25rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                  {t.hero.statValues}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: '#DACEC0', margin: 0, lineHeight: 1.5 }}>
                  {t.hero.statValuesDesc}
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* 9. Cinematic Scene Switcher Controls (Bottom Right Floating Pill) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(24, 17, 12, 0.75)',
          border: '1px solid var(--color-gold-border)',
          borderRadius: 'var(--radius-full)',
          padding: '0.35rem 0.75rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
          <Layers size={12} />
          <span>{currentSlideIndex + 1}/{slides.length}</span>
        </span>

        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            style={{
              width: idx === currentSlideIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: idx === currentSlideIndex ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'all var(--transition-base)',
              padding: 0,
              cursor: 'pointer'
            }}
            title={language === 'hi' ? s.titleHi : s.titleEn}
            aria-label={`Switch to slide ${idx + 1}: ${language === 'hi' ? s.titleHi : s.titleEn}`}
          />
        ))}

        <button
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          style={{
            color: '#DACEC0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px',
            cursor: 'pointer',
            padding: 0
          }}
          title={isAutoPlaying ? 'Pause scene rotation' : 'Resume scene rotation'}
          aria-label={isAutoPlaying ? 'Pause scene rotation' : 'Resume scene rotation'}
        >
          {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>
      </div>

    </section>
  );
};
