import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { programsData } from '../../data/programs';
import { PageId } from '../../types';
import { BookOpen, GraduationCap, ChevronRight, Clock, Award, CheckCircle } from 'lucide-react';

interface ProgramsTeaserProps {
  onNavigate: (page: PageId) => void;
}

export const ProgramsTeaser: React.FC<ProgramsTeaserProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const featuredPrograms = programsData.slice(0, 3); // Top 3 streams

  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="vedic-badge badge-saffron">
              {language === 'hi' ? 'गुरुकुल शिक्षण संवर्ग' : 'Academic Offerings'}
            </span>
          </div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
            {language === 'hi' ? 'प्रामाणिक वैदिक एवं संस्कृत पाठ्यक्रम' : 'Authentic Sanskrit & Vedic Academic Programs'}
          </h2>
          <p className="section-subtitle">
            {language === 'hi'
              ? 'पाणिनीय अष्टाध्यायी, चतुर्वेद संहिता एवं षड्दर्शनों का शास्त्रीय अध्ययन आधुनिक विषयों के सामंजस्य सहित।'
              : 'Classical textual immersion in Paninian Vyakarana, Veda Samhitas, and Darshanas balanced with modern sciences.'}
          </p>
          <div className="ornamental-divider">
            <BookOpen size={16} />
          </div>
        </div>

        {/* 3 Featured Program Cards */}
        <div className="grid-3" style={{ marginBottom: 'var(--spacing-12)' }}>
          {featuredPrograms.map((prog) => (
            <div key={prog.id} className="vedic-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              borderTop: '3px solid var(--color-primary)'
            }}>
              <div>
                {/* Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="vedic-badge badge-gold" style={{ fontSize: '11px' }}>
                    {prog.isResidential ? (language === 'hi' ? 'पूर्ण आवासीय' : 'Residential') : (language === 'hi' ? 'सप्ताहान्त' : 'Weekend')}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                    <CheckCircle size={12} /> {language === 'hi' ? 'प्रवेश प्रारम्भ' : 'Admissions Open'}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-heading-devanagari)',
                  color: 'var(--color-primary-dark)',
                  marginBottom: '0.25rem'
                }}>
                  {language === 'hi' ? prog.titleHi : prog.titleEn}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-serif-accent)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-gold)',
                  fontWeight: 600,
                  marginBottom: '0.75rem'
                }}>
                  {prog.sanskritTitle}
                </p>

                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  {language === 'hi' ? prog.descriptionHi : prog.descriptionEn}
                </p>

                {/* Duration & Eligibility */}
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-main)' }}>
                    <Clock size={13} color="var(--color-primary)" />
                    <span><strong>{language === 'hi' ? 'अवधि:' : 'Duration:'}</strong> {language === 'hi' ? prog.durationHi : prog.durationEn}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: 'var(--color-text-muted)' }}>
                    <Award size={13} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>{language === 'hi' ? 'पात्रता:' : 'Eligibility:'}</strong> {language === 'hi' ? prog.eligibilityHi : prog.eligibilityEn}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                <button
                  onClick={() => onNavigate('education')}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <span>{t.common.viewDetails}</span>
                </button>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <GraduationCap size={14} />
                  <span>{language === 'hi' ? 'आवेदन करें' : 'Apply'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Programs Banner */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('education')}
            className="btn btn-outline btn-lg"
          >
            <span>{language === 'hi' ? 'सम्पूर्ण पाठ्यक्रम एवं विषय सूची देखें' : 'View Complete Academic Curriculum'}</span>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
