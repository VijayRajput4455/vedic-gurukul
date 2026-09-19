import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { Compass, Sparkles, BookOpen, ChevronRight, Quote } from 'lucide-react';

interface PhilosophyTeaserProps {
  onNavigate: (page: PageId) => void;
}

export const PhilosophyTeaser: React.FC<PhilosophyTeaserProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="section-pad" style={{
      backgroundColor: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="vedic-badge badge-saffron">{t.philosophySummary.tag}</span>
          </div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
            {t.philosophySummary.title}
          </h2>
          <p className="section-subtitle">
            {t.philosophySummary.subtitle}
          </p>
          <div className="ornamental-divider">
            <Sparkles size={16} />
          </div>
        </div>

        {/* Featured Satyarth Prakash Quote Box */}
        <div style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-gold-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-8)',
          maxWidth: '1200px',
          margin: '0 auto var(--spacing-12) auto',
          position: 'relative',
          boxShadow: 'var(--shadow-subtle)',
          textAlign: 'center'
        }}>
          <Quote size={32} color="var(--color-gold)" style={{ opacity: 0.35, margin: '0 auto 0.5rem auto' }} />
          <p style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            color: 'var(--color-primary)',
            lineHeight: 1.7,
            marginBottom: '0.75rem'
          }}>
            {t.philosophySummary.quote}
          </p>
          <p style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: 'var(--color-gold-dark)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: 0
          }}>
            {t.philosophySummary.author}
          </p>
        </div>

        {/* 3 Philosophy Pillars Cards */}
        <div className="grid-3" style={{ marginBottom: 'var(--spacing-12)' }}>
          
          <div className="vedic-card-ornate">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', marginBottom: '0.5rem' }}>
              {t.philosophySummary.card1Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.philosophySummary.card1Desc}
            </p>
          </div>

          <div className="vedic-card-ornate">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-gold-light)',
              color: 'var(--color-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <BookOpen size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', marginBottom: '0.5rem' }}>
              {t.philosophySummary.card2Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.philosophySummary.card2Desc}
            </p>
          </div>

          <div className="vedic-card-ornate">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-secondary-light)',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', marginBottom: '0.5rem' }}>
              {t.philosophySummary.card3Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.philosophySummary.card3Desc}
            </p>
          </div>

        </div>

        {/* Read More Philosophy CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('philosophy')}
            className="btn btn-primary btn-lg"
          >
            <span>{t.philosophySummary.readPhilosophyCta}</span>
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
