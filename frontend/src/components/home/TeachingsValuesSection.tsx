import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Heart,
  Flame,
  UserCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TeachingsValuesSectionProps {
  onNavigate: (page: PageId) => void;
}

interface ValueItem {
  id: string;
  sanskritName: string;
  englishName: string;
  subTitleHi: string;
  subTitleEn: string;
  descHi: string;
  descEn: string;
  icon: React.ElementType;
}

export const TeachingsValuesSection: React.FC<TeachingsValuesSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const values: ValueItem[] = [
    {
      id: 'jnana',
      sanskritName: 'ज्ञान (Knowledge)',
      englishName: 'Wisdom & Discernment',
      subTitleHi: 'सत्य ज्ञान की प्राप्ति',
      subTitleEn: 'Pursuit of Truth & Reason',
      descHi: 'वेदों एवं ऋषियों के प्रामाणिक ग्रन्थों पर आधारित वैज्ञानिक ज्ञान, जो अविद्या का नाश कर प्रज्ञा को जाग्रत करता है।',
      descEn: 'Cultivation of rational, scripturally grounded knowledge that dispels ignorance and illuminates the intellect.',
      icon: BookOpen
    },
    {
      id: 'anushasan',
      sanskritName: 'अनुशासन (Discipline)',
      englishName: 'Daily Moral Discipline',
      subTitleHi: 'ब्रह्मचर्य एवं नियमित दिनचर्या',
      subTitleEn: 'Self-Restraint & Routine',
      descHi: 'ब्रह्म मुहूर्त (४:३० प्रात:) से रात्रि शयन तक कठोर समय-पालन, इन्द्रिय-संयम एवं सदाचार का सतत अभ्यास।',
      descEn: 'Adherence to a disciplined daily schedule from 4:30 AM dawn, fostering focus, self-control, and physical vigor.',
      icon: Clock
    },
    {
      id: 'satya',
      sanskritName: 'सत्य (Truth)',
      englishName: 'Truthfulness & Integrity',
      subTitleHi: 'सत्य को ग्रहण करना व असत्य का त्याग',
      subTitleEn: 'Embracing Truth, Rejecting Falsehood',
      descHi: 'स्वामी दयानन्द सरस्वती के शिक्षा-आदर्शों के अनुसार सत्य को स्वीकार करने और असत्य को छोड़ने में सदा तत्पर रहना।',
      descEn: 'Always being ready to accept truth and renounce untruth in thought, speech, and institutional action.',
      icon: CheckCircle2
    },
    {
      id: 'seva',
      sanskritName: 'सेवा (Service)',
      englishName: 'Selfless Social Contribution',
      subTitleHi: 'परोपकार एवं समाज संवर्धन',
      subTitleEn: 'Altruism & Compassion',
      descHi: 'सबकी उन्नति में अपनी उन्नति समझना। समाज के वंचित एवं साधनहीन बन्धुओं की निःस्वार्थ सेवा हेतु तत्परता।',
      descEn: 'Regarding the welfare of all as integral to one’s own growth, serving the underprivileged with humility.',
      icon: Heart
    },
    {
      id: 'sanskar',
      sanskritName: 'संस्कार (Values & Character)',
      englishName: 'Culture & Sacred Virtues',
      subTitleHi: 'यज्ञ, सन्ध्या एवं चरित्र-शोधन',
      subTitleEn: 'Spiritual Purity & Character',
      descHi: 'दैनिक अग्निहोत्र देवयज्ञ, त्रिकाल सन्ध्या, गुरु-माता-पिता का सम्मान तथा उदात्त नैतिक संस्कारों का रोपण।',
      descEn: 'Daily devotional Agnihotra, contemplation, reverence for preceptors, and cultivating unblemished character.',
      icon: Flame
    },
    {
      id: 'atmavikas',
      sanskritName: 'आत्मविकास (Self-Development)',
      englishName: 'Holistic Self-Realization',
      subTitleHi: 'शारीरिक, बौद्धिक व आध्यात्मिक उन्नति',
      subTitleEn: 'Harmonious Growth of Being',
      descHi: 'योग, प्राणायाम, शुद्ध सात्त्विक आहार एवं स्वाध्याय के माध्यम से शरीर, मन और आत्मा का संतुलित विकास।',
      descEn: 'Integrated growth of physical health, keen intellect, and spiritual tranquility through Yogic living.',
      icon: UserCheck
    }
  ];

  return (
    <section
      id="teachings-values"
      className="section-pad"
      style={{
        backgroundColor: 'var(--color-bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--spacing-12) auto' }}>
          <div style={{ marginBottom: 'var(--spacing-2)' }}>
            <span className="vedic-badge badge-gold">
              <Sparkles size={13} />
              <span>{language === 'hi' ? 'गुरुकुल के ६ मूल स्तम्भ' : 'Core Values & Principles'}</span>
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
            {language === 'hi' ? 'दयानन्द शिक्षा-आदर्श एवं जीवन मूल्य' : 'Dayanand Educational Values & Principles'}
          </h2>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
            {language === 'hi'
              ? 'स्वामी दयानन्द सरस्वती द्वारा निर्देशित वैदिक मर्यादाओं पर आधारित छह शाश्वत जीवन-मूल्य।'
              : 'Six foundational pillars inspired by Vedic heritage and the reformative vision of Swami Dayanand Saraswati.'}
          </p>
        </div>

        {/* 6 Core Value Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-6)'
          }}
        >
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="value-card"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid var(--color-border)',
                  padding: 'var(--spacing-6)',
                  boxShadow: '0 4px 18px rgba(42, 30, 23, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: 'var(--spacing-3)' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'rgba(197, 154, 78, 0.12)',
                      border: '1px solid rgba(197, 154, 78, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      flexShrink: 0
                    }}
                    className="value-card-icon"
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading-devanagari)',
                        fontSize: '1.25rem',
                        color: 'var(--color-text-main)',
                        margin: '0 0 2px 0',
                        fontWeight: 700
                      }}
                    >
                      {language === 'hi' ? v.sanskritName : v.sanskritName}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                      {language === 'hi' ? v.subTitleHi : v.englishName}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi' ? v.descHi : v.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Philosophy Link */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-10)' }}>
          <button
            onClick={() => onNavigate('philosophy')}
            className="btn btn-outline"
            style={{ padding: '0.8rem 2rem', fontSize: '0.95rem', borderRadius: 'var(--radius-full)' }}
          >
            <span>{language === 'hi' ? 'सत्यार्थ प्रकाश एवं शिक्षा-दर्शन का विस्तार' : 'Explore Satyarth Prakash & Educational Pedagogy'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(42, 30, 23, 0.10) !important;
          border-color: var(--color-gold) !important;
        }
        .value-card:hover .value-card-icon {
          background-color: var(--color-gold);
          color: #1E140D;
          transform: scale(1.06);
          transition: all 0.25s ease;
        }
      `}</style>
    </section>
  );
};
