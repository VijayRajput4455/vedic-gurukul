import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { HeartHandshake, ShieldCheck, Sparkles, BookHeart, Library, Utensils, ChevronRight } from 'lucide-react';

interface TrustPreviewProps {
  onNavigate: (page: PageId) => void;
}

export const TrustPreview: React.FC<TrustPreviewProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="section-pad" style={{
      backgroundColor: 'var(--color-bg-secondary)',
      borderTop: '2px solid rgba(59, 91, 67, 0.25)',
      borderBottom: '2px solid rgba(59, 91, 67, 0.25)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header with Forest Green Accent */}
        <div className="section-header">
          <div className="section-tag">
            <span className="vedic-badge badge-forest">
              <HeartHandshake size={14} />
              <span>{t.trustPreview.tag}</span>
            </span>
          </div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-secondary-dark)' }}>
            {t.trustPreview.title}
          </h2>
          <p className="section-subtitle">
            {t.trustPreview.subtitle}
          </p>
          <div className="ornamental-divider" style={{ color: 'var(--color-secondary)' }}>
            <Sparkles size={16} />
          </div>
        </div>

        {/* Intro text */}
        <p style={{
          textAlign: 'center',
          maxWidth: '760px',
          margin: '0 auto var(--spacing-10) auto',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7
        }}>
          {t.trustPreview.description}
        </p>

        {/* 3 Key Trust Initiatives Grid */}
        <div className="grid-3" style={{ marginBottom: 'var(--spacing-10)' }}>
          
          <div className="vedic-card" style={{ borderTop: '3px solid var(--color-secondary)' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-secondary-light)',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <BookHeart size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-secondary-dark)', marginBottom: '0.4rem' }}>
              {t.trustPreview.init1Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.trustPreview.init1Desc}
            </p>
          </div>

          <div className="vedic-card" style={{ borderTop: '3px solid var(--color-gold)' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-gold-light)',
              color: 'var(--color-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Library size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
              {t.trustPreview.init2Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.trustPreview.init2Desc}
            </p>
          </div>

          <div className="vedic-card" style={{ borderTop: '3px solid var(--color-primary)' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Utensils size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
              {t.trustPreview.init3Title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {t.trustPreview.init3Desc}
            </p>
          </div>

        </div>

        {/* Transparency Alert Box */}
        <div style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid rgba(59, 91, 67, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.5rem',
          maxWidth: '840px',
          margin: '0 auto var(--spacing-8) auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <ShieldCheck size={28} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            {t.trustPreview.transparencyNote}
          </p>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('trust')}
            className="btn btn-forest btn-lg"
          >
            <HeartHandshake size={18} />
            <span>{t.trustPreview.cta}</span>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
