import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { BookOpen, HeartHandshake, Sparkles, ChevronRight, Award, Flame } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="hero-section" style={{
      position: 'relative',
      paddingTop: 'var(--spacing-16)',
      paddingBottom: 'var(--spacing-20)',
      background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-main) 100%)',
      borderBottom: '1px solid var(--color-border)',
      overflow: 'hidden'
    }}>
      {/* Decorative Traditional Watermark Mandala in Background */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        right: '-120px',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        border: '1px dashed var(--color-gold-border)',
        pointerEvents: 'none',
        opacity: 0.35
      }} className="animate-mandala-rotate" />

      <div style={{
        position: 'absolute',
        bottom: '-160px',
        left: '-160px',
        width: '460px',
        height: '460px',
        borderRadius: '50%',
        border: '1px solid rgba(166, 95, 43, 0.15)',
        pointerEvents: 'none',
        opacity: 0.25
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Sanskrit Motto Tag */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-4)' }}>
          <div className="vedic-badge badge-saffron" style={{ padding: '0.4rem 1.25rem', fontSize: 'var(--text-xs)' }}>
            <Sparkles size={14} />
            <span className="font-devanagari">विद्या • संस्कार • सेवा (Vidya • Sanskar • Seva)</span>
          </div>
        </div>

        {/* Main Hero Headings */}
        <div style={{ textAlign: 'center', maxWidth: '1240px', margin: '0 auto var(--spacing-8) auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontFamily: 'var(--font-heading-devanagari)',
            color: 'var(--color-text-main)',
            lineHeight: 1.2,
            marginBottom: 'var(--spacing-4)',
            letterSpacing: '-0.02em'
          }}>
            {t.hero.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '1040px',
            margin: '0 auto var(--spacing-8) auto',
            fontFamily: 'var(--font-body-latin)'
          }}>
            {t.hero.description}
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'var(--spacing-12)'
          }}>
            <button
              onClick={() => onNavigate('education')}
              className="btn btn-primary btn-lg"
              style={{ boxShadow: '0 4px 18px var(--color-primary-glow)' }}
            >
              <BookOpen size={18} />
              <span>{t.hero.primaryCta}</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => onNavigate('trust')}
              className="btn btn-forest btn-lg"
              style={{ boxShadow: '0 4px 18px var(--color-secondary-glow)' }}
            >
              <HeartHandshake size={18} />
              <span>{t.hero.secondaryCta}</span>
            </button>
          </div>
        </div>

        {/* 3 Core Highlights Ribbon */}
        <div className="grid-3" style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          <div className="vedic-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              flexShrink: 0
            }}>
              <Flame size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{t.hero.statStudents}</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                {t.hero.statStudentsDesc}
              </p>
            </div>
          </div>

          <div className="vedic-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold-dark)',
              flexShrink: 0
            }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{t.hero.statFocus}</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                {t.hero.statFocusDesc}
              </p>
            </div>
          </div>

          <div className="vedic-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-secondary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-secondary)',
              flexShrink: 0
            }}>
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>{t.hero.statValues}</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                {t.hero.statValuesDesc}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
