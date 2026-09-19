import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { BookMarked, SunMedium, Users, ChevronRight } from 'lucide-react';

interface HeritageSectionProps {
  onNavigate: (page: PageId) => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--spacing-12)',
          alignItems: 'center'
        }} className="heritage-grid">
          
          {/* Left Column: Authentic Photography & Frame */}
          <div style={{ position: 'relative' }}>
            <div className="img-zoom-wrapper" style={{
              borderRadius: 'var(--radius-xl)',
              border: '2px solid var(--color-gold-border)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}>
              <img
                src="https://images.unsplash.com/photo-1609137144827-01311ffb4717?auto=format&fit=crop&w=1000&q=80"
                alt="Gurukul Sacred Fire Yajna and Studies"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>

            {/* Overlaid Sacred Emblem Box */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '20px',
              backgroundColor: 'var(--color-bg-card)',
              border: '1.5px solid var(--color-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              boxShadow: 'var(--shadow-ornate)',
              maxWidth: '260px'
            }}>
              <p style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '0.95rem',
                color: 'var(--color-primary)',
                margin: 0,
                lineHeight: 1.4
              }}>
                {language === 'hi' ? 'ऋषि परम्परा का साक्षात् अनुभव' : 'Authentic Vedic Lineage & Living Pedagogy'}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Text & 3 Pillars */}
          <div>
            <div className="section-tag">
              <span className="vedic-badge badge-gold">{t.heritage.tag}</span>
            </div>

            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', textAlign: 'left', marginBottom: 'var(--spacing-4)' }}>
              {t.heritage.title}
            </h2>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--spacing-4)' }}>
              {t.heritage.storyP1}
            </p>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--spacing-6)' }}>
              {t.heritage.storyP2}
            </p>

            {/* 3 Pillars List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'var(--spacing-8)' }}>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <BookMarked size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>
                    {t.heritage.pillar1Title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {t.heritage.pillar1Desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-gold-light)',
                  color: 'var(--color-gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <SunMedium size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>
                    {t.heritage.pillar2Title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {t.heritage.pillar2Desc}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-secondary-light)',
                  color: 'var(--color-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Users size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>
                    {t.heritage.pillar3Title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {t.heritage.pillar3Desc}
                  </p>
                </div>
              </div>

            </div>

            {/* Read Story CTA */}
            <button
              onClick={() => onNavigate('about')}
              className="btn btn-outline"
            >
              <span>{language === 'hi' ? 'गुरुकुल का सम्पूर्ण इतिहास जानें' : 'Read Our Institutional Story'}</span>
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .heritage-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
};
