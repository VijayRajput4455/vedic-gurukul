import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import {
  BookOpen,
  Scroll,
  BookMarked,
  HeartHandshake,
  Compass,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LearningOfferingsSectionProps {
  onNavigate: (page: PageId) => void;
}

interface OfferingItem {
  id: string;
  icon: React.ElementType;
  titleHi: string;
  titleEn: string;
  sanskritTitle: string;
  descHi: string;
  descEn: string;
  featuresHi: string[];
  featuresEn: string[];
  badgeHi: string;
  badgeEn: string;
}

export const LearningOfferingsSection: React.FC<LearningOfferingsSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const offerings: OfferingItem[] = [
    {
      id: 'sanskrit-language',
      icon: BookOpen,
      titleHi: 'संस्कृत भाषा एवं व्याकरण',
      titleEn: 'Sanskrit Language & Linguistics',
      sanskritTitle: 'संस्कृत सम्भाषणम् • अष्टाध्यायी',
      descHi: 'पाणिनीय अष्टाध्यायी व्याकरण, धातुपाठ एवं धाराप्रवाह सम्भाषण का वैज्ञानिक शिक्षण।',
      descEn: 'Comprehensive Paninian Ashtadhyayi grammar, Dhatupatha, and fluent conversational spoken Sanskrit.',
      featuresHi: ['पाणिनीय व्याकरण', 'सरल सम्भाषण वर्ग', 'काव्य एवं साहित्य'],
      featuresEn: ['Paninian Vyakarana', 'Spoken Sanskrit Classes', 'Classical Kavya'],
      badgeHi: 'प्राथमिक से आचार्य',
      badgeEn: 'Beginner to Acharya'
    },
    {
      id: 'vedic-studies',
      icon: Scroll,
      titleHi: 'वेद स्वाध्याय एवं सस्वर पाठ',
      titleEn: 'Vedic Studies & Recitation',
      sanskritTitle: 'वेद संहित • सस्वर मन्त्रोच्चार',
      descHi: 'ऋग्वेद, यजुर्वेद, सामवेद एवं अथर्ववेद की मन्त्र-संहिताओं का उदात्त-अनुदात्त सस्वर पाठ।',
      descEn: 'Systematic chanting and study of Rigveda, Yajurveda, Samaveda, and Atharvaveda with authentic Swara.',
      featuresHi: ['सस्वर मन्त्रोच्चार', 'संहिता स्वाध्याय', 'दैनिक ब्रह्मयज्ञ'],
      featuresEn: ['Vedic Swara Chanting', 'Samhita Adhyayana', 'Daily Brahma Yajna'],
      badgeHi: 'पारम्परिक पद्धति',
      badgeEn: 'Traditional Oral Lineage'
    },
    {
      id: 'vedic-literature',
      icon: BookMarked,
      titleHi: 'वैदिक साहित्य एवं दर्शन',
      titleEn: 'Vedic Literature & Philosophy',
      sanskritTitle: 'उपनिषद् • षड्दर्शन • सत्यार्थ प्रकाश',
      descHi: 'एकादश उपनिषद्, षड्दर्शन (न्याय, वैशेषिक, सांख्य, योग, मीमांसा, वेदान्त) एवं सत्यार्थ प्रकाश का अध्ययन।',
      descEn: 'In-depth study of the major Upanishads, the 6 Classical Darshanas, and Swami Dayanand’s Satyarth Prakash.',
      featuresHi: ['षड्दर्शन परिचय', 'उपनिषद् भाष्य', 'सत्यार्थ प्रकाश'],
      featuresEn: ['6 Vedic Darshanas', 'Upanishadic Wisdom', 'Satyarth Prakash'],
      badgeHi: 'गहन अनुशीलन',
      badgeEn: 'Deep Hermeneutics'
    },
    {
      id: 'yoga-meditation',
      icon: Compass,
      titleHi: 'योग एवं ध्यान साधना',
      titleEn: 'Yoga & Meditation Sadhana',
      sanskritTitle: 'अष्टाङ्ग योग • प्राणायाम • सन्ध्या',
      descHi: 'महर्षि पतञ्जलि प्रणीत अष्टाङ्ग योग, सूर्य नमस्कार, प्राणायाम एवं त्रिकाल सन्ध्या-उपासना।',
      descEn: 'Patanjali Ashtanga Yoga, morning Surya Namaskar, Pranayama breathwork, and Vedic Sandhya contemplation.',
      featuresHi: ['दैनिक प्राणायाम', 'सूर्य नमस्कार', 'त्रिकाल सन्ध्या'],
      featuresEn: ['Daily Pranayama', 'Surya Namaskar', 'Meditation & Focus'],
      badgeHi: 'नित्य दिनचर्या',
      badgeEn: 'Daily Practice'
    },
    {
      id: 'traditional-knowledge',
      icon: Sparkles,
      titleHi: 'पारंपरिक भारतीय ज्ञान',
      titleEn: 'Traditional Indian Knowledge Systems',
      sanskritTitle: 'वैदिक गणित • आयुर्वेद • खगोलशास्त्र',
      descHi: 'वैदिक गणितीय सूत्र, दिनचर्या-ऋतुचर्या अनुसार प्राथमिक आयुर्वेद ज्ञान एवं काल-गणना।',
      descEn: 'Vedic mathematics sutras, fundamental Ayurvedic wellness & Dinacharya principles, and astronomical timekeeping.',
      featuresHi: ['वैदिक गणित सूत्र', 'आयुर्वेद दिनचर्या', 'प्राचीन विज्ञान'],
      featuresEn: ['Vedic Math Sutras', 'Ayurvedic Principles', 'Ancient Sciences'],
      badgeHi: 'व्यावहारिक अनुप्रयोग',
      badgeEn: 'Applied Wisdom'
    },
    {
      id: 'character-values',
      icon: HeartHandshake,
      titleHi: 'संस्कार एवं चरित्र निर्माण',
      titleEn: 'Character & Value Education',
      sanskritTitle: 'यज्ञ • अनुशासन • समाज सेवा',
      descHi: 'दैनिक अग्निहोत्र देवयज्ञ, ब्रह्मचर्य व्रत, स्वावलम्बन, माता-पिता-गुरु सेवा एवं सामाजिक उत्तरदायित्व।',
      descEn: 'Daily Agnihotra Yajna, disciplined Brahmacharya living, self-reliance, respect for elders, and community seva.',
      featuresHi: ['दैनिक अग्निहोत्र', 'स्वावलम्बन अभ्यास', 'निःस्वार्थ सेवा'],
      featuresEn: ['Daily Agnihotra Hawan', 'Self-Reliance Living', 'Selfless Community Seva'],
      badgeHi: 'मूल्यनिष्ठ जीवन',
      badgeEn: 'Ethical Grounding'
    }
  ];

  return (
    <section
      id="education"
      className="section-pad"
      style={{
        backgroundColor: 'var(--color-bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Corner Motif */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 154, 78, 0.18)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--spacing-12) auto' }}>
          <div style={{ marginBottom: 'var(--spacing-2)' }}>
            <span className="vedic-badge badge-gold">
              <BookOpen size={13} />
              <span>{language === 'hi' ? 'पाठ्यक्रम एवं विद्या' : 'Educational Offerings'}</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
              color: 'var(--color-text-main)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: 'var(--spacing-3)'
            }}
          >
            {language === 'hi'
              ? 'संस्कृत एवं वैदिक शिक्षण के आयाम'
              : 'Sanskrit & Vedic Learning Disciplines'}
          </h2>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
            {language === 'hi'
              ? 'प्राचीन ऋषि परम्परा और व्यवस्थित शिक्षण पद्धति का समन्वय, जहाँ ज्ञान और चरित्र का समग्र विकास होता है।'
              : 'Combining ancient Rishi traditions with disciplined pedagogical rigor to develop intellectual clarity, moral integrity, and deep cultural grounding.'}
          </p>
        </div>

        {/* 6 Elegant Offerings Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-6)'
          }}
        >
          {offerings.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="learning-card"
                onClick={() => onNavigate('education')}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid var(--color-border)',
                  padding: 'var(--spacing-6)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(42, 30, 23, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-4)' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'rgba(197, 154, 78, 0.12)',
                        border: '1px solid rgba(197, 154, 78, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)'
                      }}
                      className="learning-card-icon"
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--color-gold-dark)',
                        backgroundColor: 'rgba(197, 154, 78, 0.12)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(197, 154, 78, 0.25)'
                      }}
                    >
                      {language === 'hi' ? item.badgeHi : item.badgeEn}
                    </span>
                  </div>

                  {/* Sanskrit Subtitle */}
                  <div
                    style={{
                      fontFamily: 'var(--font-heading-devanagari)',
                      fontSize: '0.85rem',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      marginBottom: '0.35rem'
                    }}
                  >
                    {item.sanskritTitle}
                  </div>

                  {/* Main Card Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading-devanagari)',
                      fontSize: '1.28rem',
                      color: 'var(--color-text-main)',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: 'var(--spacing-3)'
                    }}
                  >
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: 'var(--spacing-4)'
                    }}
                  >
                    {language === 'hi' ? item.descHi : item.descEn}
                  </p>

                  {/* Feature Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: 'var(--spacing-4)' }}>
                    {(language === 'hi' ? item.featuresHi : item.featuresEn).map((f, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          backgroundColor: 'var(--color-bg-secondary)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border-subtle)'
                        }}
                      >
                        • {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '0.75rem',
                    transition: 'gap 0.2s ease'
                  }}
                  className="learning-card-cta"
                >
                  <span>{language === 'hi' ? 'विस्तृत विवरण एवं पाठ्यक्रम' : 'View Full Syllabus & Details'}</span>
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Central CTA */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-10)' }}>
          <button
            onClick={() => onNavigate('education')}
            className="btn btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
          >
            <span>{language === 'hi' ? 'सम्पूर्ण शिक्षण योजना व प्रवेश विवरण' : 'Explore All Academic Courses'}</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <style>{`
        .learning-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 34px rgba(42, 30, 23, 0.10) !important;
          border-color: var(--color-gold) !important;
        }
        .learning-card:hover .learning-card-icon {
          background-color: rgba(197, 154, 78, 0.22);
          transform: scale(1.05);
          transition: all 0.25s ease;
        }
        .learning-card:hover .learning-card-cta {
          gap: 0.65rem !important;
          color: var(--color-primary-hover);
        }
      `}</style>
    </section>
  );
};
