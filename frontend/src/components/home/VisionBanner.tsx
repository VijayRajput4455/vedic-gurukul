import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface VisionBannerProps {
  onNavigate: (page: PageId) => void;
}

export const VisionBanner: React.FC<VisionBannerProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section
      className="vision-banner-section"
      style={{
        position: 'relative',
        backgroundColor: '#1E1712',
        color: '#FFFFFF',
        overflow: 'hidden',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* 1. Deckle Torn-Parchment Top SVG Divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '34px',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <svg
          viewBox="0 0 1440 34"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', fill: '#F8F3E9' }}
          aria-hidden="true"
        >
          <path d="M0,0 L1440,0 L1440,8 C1380,18 1320,5 1260,16 C1200,26 1140,10 1080,22 C1020,30 960,12 900,20 C840,28 780,14 720,24 C660,32 600,10 540,18 C480,26 420,8 360,20 C300,28 240,12 180,22 C120,30 60,6 0,16 Z" />
        </svg>
      </div>

      {/* 2. Panoramic Himalayan Temple Horizon Image Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/images/vision/vedic_vision_horizon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          opacity: 0.85
        }}
      />

      {/* 3. Layered Dark Sandstone Vignette Overlays for Crisp Typography */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(20, 14, 10, 0.92) 0%, rgba(20, 14, 10, 0.75) 50%, rgba(20, 14, 10, 0.88) 100%)',
          zIndex: 2
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(197, 154, 78, 0.22) 0%, transparent 70%)',
          zIndex: 3
        }}
      />

      {/* 4. Vision Content Grid */}
      <div className="container" style={{ position: 'relative', zIndex: 5, padding: 'var(--spacing-16) var(--spacing-4)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-8)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Vision Motto & Title */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 'var(--spacing-3)'
              }}
            >
              <div style={{ height: '1px', width: '32px', background: 'var(--color-gold)' }} />
              <span>{language === 'hi' ? '— हमारा ध्येय एवं दृष्टि —' : '— OUR VISION —'}</span>
              <div style={{ height: '1px', width: '32px', background: 'var(--color-gold)' }} />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                color: '#FFFDF9',
                lineHeight: 1.2,
                marginBottom: 'var(--spacing-4)',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)'
              }}
            >
              {language === 'hi' ? 'विद्या • संस्कार • सेवा' : 'Vidya • Sanskar • Seva'}
            </h2>

            {/* Ornamental Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--color-gold)',
                marginBottom: 'var(--spacing-6)'
              }}
            >
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
              <Sparkles size={16} />
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(270deg, var(--color-gold), transparent)' }} />
            </div>

            <button
              onClick={() => onNavigate('philosophy')}
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.95rem' }}
            >
              <span>{language === 'hi' ? 'हमारा दर्शन विस्तार से' : 'Explore Our Philosophy'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Quote Card */}
          <div
            style={{
              backgroundColor: 'rgba(28, 20, 14, 0.72)',
              borderLeft: '4px solid var(--color-gold)',
              borderTop: '1px solid rgba(197, 154, 78, 0.3)',
              borderRight: '1px solid rgba(197, 154, 78, 0.3)',
              borderBottom: '1px solid rgba(197, 154, 78, 0.3)',
              borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
              padding: 'var(--spacing-8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-heading-latin)',
                fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                color: '#FFF8EE',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: 'var(--spacing-4)'
              }}
            >
              {language === 'hi'
                ? '“ज्ञान पर आधारित, सनातन मूल्यों से सिंचित एवं मानवता की निःस्वार्थ सेवा हेतु समर्पित समाज का निर्माण।”'
                : '“A society rooted in knowledge, guided by values, and committed to service.”'}
            </p>

            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-gold-light)',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}
            >
              {language === 'hi'
                ? '— स्वामी दयानन्द सरस्वती के शिक्षा-आदर्शों पर आधारित'
                : '— Inspired by Swami Dayanand Saraswati’s Educational Principles'}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Deckle Torn-Parchment Bottom SVG Divider */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '34px',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <svg
          viewBox="0 0 1440 34"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', fill: 'var(--color-bg-main)' }}
          aria-hidden="true"
        >
          <path d="M0,34 L1440,34 L1440,26 C1380,16 1320,29 1260,18 C1200,8 1140,24 1080,12 C1020,4 960,22 900,14 C840,6 780,20 720,10 C660,2 600,24 540,16 C480,8 420,26 360,14 C300,6 240,22 180,12 C120,4 60,28 0,18 Z" />
        </svg>
      </div>
    </section>
  );
};
