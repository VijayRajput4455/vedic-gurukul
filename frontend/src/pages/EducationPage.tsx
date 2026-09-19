import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageId, Program } from '../types';
import { programsData } from '../data/programs';
import { BookOpen, GraduationCap, Clock, Award, CheckCircle, ChevronRight, X } from 'lucide-react';

interface EducationPageProps {
  onNavigate: (page: PageId) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Programs', labelHi: 'समस्त पाठ्यक्रम' },
    { id: 'vedic', labelEn: 'Foundational Veda', labelHi: 'प्रारम्भिक वेद व व्याकरण' },
    { id: 'sanskrit', labelEn: 'Intermediate Sanskrit', labelHi: 'माध्यमिक संस्कृत शास्त्र' },
    { id: 'higher', labelEn: 'Higher Degree (Shastri & Acharya)', labelHi: 'उच्च उपाधि (शास्त्री व आचार्य)' },
    { id: 'short-term', labelEn: 'Spoken Sanskrit & Short-term', labelHi: 'सम्भाषण व अल्पकालिक' },
    { id: 'youth', labelEn: 'Youth Weekend Gurukul', labelHi: 'बाल व युवा संस्कार' }
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? programsData
    : programsData.filter((p: Program) => p.category === selectedCategory);

  return (
    <div className="education-page-wrapper">
      
      {/* Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <BookOpen size={13} />
            <span>{language === 'hi' ? 'सांगोपांग शैक्षणिक पाठ्यक्रम' : 'Academic Programs & Curriculum'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'प्रामाणिक वैदिक एवं पाणिनीय शिक्षा' : 'Authentic Sanskrit & Vedic Academic Streams'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '760px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'प्रथमा से लेकर आचार्य तक की सांगोपांग पारम्परिक शिक्षा तथा आधुनिक विज्ञान, गणित व अंग्रेजी का समन्वय।'
              : 'From foundational Prathama to advanced postgraduate Acharya research, combining classical shastras with modern academic competencies.'}
          </p>
        </div>
      </section>

      {/* Main Content & Program Catalog */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          
          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: 'var(--spacing-12)'
          }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-card)',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-main)',
                    border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    transition: 'all var(--transition-fast)',
                    cursor: 'pointer'
                  }}
                >
                  {language === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Programs Grid */}
          <div className="grid-2" style={{ gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-16)' }}>
            {filteredPrograms.map((prog: Program) => (
              <div key={prog.id} className="vedic-card-ornate" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="vedic-badge badge-gold" style={{ fontSize: '11px' }}>
                      {prog.isResidential ? (language === 'hi' ? 'पूर्णकालिक आवासीय' : 'Full Residential') : (language === 'hi' ? 'सप्ताहान्त / हाइब्रिड' : 'Weekend / Hybrid')}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle size={12} /> {language === 'hi' ? 'प्रवेश प्रारम्भ' : 'Admissions Open'}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
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
                    lineHeight: 1.65,
                    marginBottom: '1rem'
                  }}>
                    {language === 'hi' ? prog.descriptionHi : prog.descriptionEn}
                  </p>

                  {/* Metadata Boxes */}
                  <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    marginBottom: '1rem',
                    fontSize: 'var(--text-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} color="var(--color-primary)" />
                      <span><strong>{language === 'hi' ? 'अवधि:' : 'Duration:'}</strong> {language === 'hi' ? prog.durationHi : prog.durationEn}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <Award size={14} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>{language === 'hi' ? 'पात्रता:' : 'Eligibility:'}</strong> {language === 'hi' ? prog.eligibilityHi : prog.eligibilityEn}</span>
                    </div>
                  </div>

                  {/* Highlight Subjects Preview */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h5 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                      {language === 'hi' ? 'प्रमुख अध्ययन विषय:' : 'Core Curricular Subjects:'}
                    </h5>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      {(language === 'hi' ? prog.subjectsHi : prog.subjectsEn).slice(0, 3).map((sub: string, idx: number) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: 'var(--color-gold)' }}>•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px dashed var(--color-border)'
                }}>
                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>{language === 'hi' ? 'सम्पूर्ण पाठ्यक्रम देखें' : 'View Full Syllabus'}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('admissions')}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <GraduationCap size={14} />
                    <span>{language === 'hi' ? 'प्रवेश हेतु आवेदन' : 'Apply Online'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Scholarship & Free Education Callout Box */}
          <div className="vedic-card" style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid rgba(59, 91, 67, 0.4)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <div className="vedic-badge badge-forest" style={{ marginBottom: '0.5rem' }}>
                {language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट योजना' : 'Vedic Gurukul Trust Initiative'}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.4rem',
                color: 'var(--color-secondary-dark)',
                marginBottom: '0.5rem'
              }}>
                {language === 'hi' ? 'बाल विद्या सहायता योजना: १००% निःशुल्क शिक्षा' : 'Bal Vidya Sahayata: 100% Free Education for Deserving Students'}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {language === 'hi'
                  ? 'आर्थिक रूप से साधनहीन, अनाथ एवं ग्रामीण पृष्ठभूमि के मेधावी बालकों हेतु आवास, भोजन, वस्त्र एवं सम्पूर्ण शिक्षा पूर्णतः निःशुल्क उपलब्ध कराई जाती है।'
                  : 'Full residential scholarships covering accommodation, sattvic meals, books, clothing, and complete tuition for children from economically disadvantaged backgrounds.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('trust')}
              className="btn btn-forest btn-lg"
            >
              <span>{language === 'hi' ? 'ट्रस्ट सहायता विवरण जानें' : 'Learn About Scholarship'}</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Full Program Details Modal */}
      {activeModalProgram && (
        <div className="modal-overlay" onClick={() => setActiveModalProgram(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalProgram(null)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '1.25rem' }}>
              <span className="vedic-badge badge-saffron" style={{ marginBottom: '0.5rem' }}>
                {activeModalProgram.isResidential ? (language === 'hi' ? 'आवासीय पाठ्यक्रम' : 'Residential') : 'Hybrid'}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.5rem',
                color: 'var(--color-primary-dark)',
                marginBottom: '0.2rem'
              }}>
                {language === 'hi' ? activeModalProgram.titleHi : activeModalProgram.titleEn}
              </h2>
              <p style={{ fontFamily: 'var(--font-serif-accent)', color: 'var(--color-text-gold)', fontWeight: 600, fontSize: '0.9rem' }}>
                {activeModalProgram.sanskritTitle}
              </p>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {language === 'hi' ? activeModalProgram.descriptionHi : activeModalProgram.descriptionEn}
            </p>

            {/* Subjects List */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                {language === 'hi' ? 'विस्तृत विषय सूची एवं ग्रन्थ:' : 'Detailed Subjects & Canonical Treatises:'}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-sm)' }}>
                {(language === 'hi' ? activeModalProgram.subjectsHi : activeModalProgram.subjectsEn).map((sub: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-text-main)' }}>
                    <CheckCircle size={15} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Highlights */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                {language === 'hi' ? 'पाठ्यक्रम की प्रमुख विशेषताएं:' : 'Program Highlights & Outcomes:'}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-sm)' }}>
                {(language === 'hi' ? activeModalProgram.highlightsHi : activeModalProgram.highlightsEn).map((high: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>•</span>
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => {
                  setActiveModalProgram(null);
                  onNavigate('admissions');
                }}
                className="btn btn-primary"
              >
                <GraduationCap size={16} />
                <span>{language === 'hi' ? 'इस पाठ्यक्रम हेतु आवेदन करें' : 'Apply for this Program'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
