import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { Eye, Target, Sparkles, ArrowRight } from 'lucide-react';

interface VisionMissionSectionProps {
  onNavigate: (page: PageId) => void;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section
      id="vision-mission"
      className="section-pad"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      {/* Background Subtle Geometry */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(var(--color-gold) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--spacing-12) auto' }}>
          <div style={{ marginBottom: 'var(--spacing-2)' }}>
            <span className="vedic-badge badge-gold">
              <Sparkles size={13} />
              <span>{language === 'hi' ? 'ध्येय एवं संकल्प' : 'Our Guiding Light'}</span>
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              color: 'var(--color-text-main)',
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: 'var(--spacing-3)'
            }}
          >
            {language === 'hi' ? 'हमारा ध्येय एवं संकल्प' : 'Our Vision & Mission'}
          </h2>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {language === 'hi'
              ? 'महर्षि दयानन्द सरस्वती के शिक्षा-आदर्शों पर आधारित, ज्ञानवान् एवं संस्कारवान् समाज का निर्माण।'
              : 'Rooted in the educational principles of Swami Dayanand Saraswati, shaping noble individuals committed to truth and humanity.'}
          </p>
        </div>

        {/* Dual Premium Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-8)'
          }}
        >
          {/* 1. VISION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="vision-mission-card"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-gold-border)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(42, 30, 23, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Top Gold Corner Filigree */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '90px',
                height: '90px',
                background: 'linear-gradient(225deg, rgba(197, 154, 78, 0.18) 0%, transparent 70%)',
                borderTopRightRadius: 'var(--radius-xl)',
                pointerEvents: 'none'
              }}
            />

            <div>
              {/* Icon & Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--spacing-5)' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(197, 154, 78, 0.12)',
                    border: '1px solid rgba(197, 154, 78, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-dark)'
                  }}
                  className="vm-icon-box"
                >
                  <Eye size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {language === 'hi' ? 'हमारा ध्येय' : 'OUR VISION'}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.5rem', color: 'var(--color-text-main)', margin: 0 }}>
                    {language === 'hi' ? 'दृष्टि एवं ध्येय' : 'Vision Statement'}
                  </h3>
                </div>
              </div>

              {/* Sanskrit Essence Tag */}
              <div
                style={{
                  fontFamily: 'var(--font-heading-devanagari)',
                  fontSize: '1.15rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  marginBottom: 'var(--spacing-4)',
                  lineHeight: 1.4
                }}
              >
                “विद्या • संस्कार • सेवा”
              </div>

              {/* Exact Vision Description */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 'var(--spacing-6)'
                }}
              >
                {language === 'hi'
                  ? 'वैदिक ज्ञान, संस्कृत शिक्षा का प्रसार तथा सनातन मूल्यों, प्रज्ञा एवं चरित्र से युक्त श्रेष्ठ नागरिकों का निर्माण करना जो राष्ट्र और विश्व-कल्याण हेतु समर्पित हों।'
                  : 'Promote Vedic knowledge, Sanskrit education, and the development of individuals rooted in values, knowledge, and character.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('philosophy')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.92rem',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'gap 0.2s ease'
              }}
              className="vm-learn-more"
            >
              <span>{language === 'hi' ? 'दर्शन विस्तार से जानें' : 'Explore Vision in Depth'}</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* 2. MISSION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="vision-mission-card"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-gold-border)',
              padding: 'clamp(2rem, 4vw, 3rem)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(42, 30, 23, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Top Forest Green Corner Filigree */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '90px',
                height: '90px',
                background: 'linear-gradient(225deg, rgba(45, 106, 79, 0.16) 0%, transparent 70%)',
                borderTopRightRadius: 'var(--radius-xl)',
                pointerEvents: 'none'
              }}
            />

            <div>
              {/* Icon & Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'var(--spacing-5)' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'rgba(45, 106, 79, 0.12)',
                    border: '1px solid rgba(45, 106, 79, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-secondary)'
                  }}
                  className="vm-icon-box"
                >
                  <Target size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {language === 'hi' ? 'हमारा संकल्प' : 'OUR MISSION'}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.5rem', color: 'var(--color-text-main)', margin: 0 }}>
                    {language === 'hi' ? 'लक्ष्य एवं कर्तव्य' : 'Mission Statement'}
                  </h3>
                </div>
              </div>

              {/* Sanskrit Essence Tag */}
              <div
                style={{
                  fontFamily: 'var(--font-heading-devanagari)',
                  fontSize: '1.15rem',
                  color: 'var(--color-secondary)',
                  fontWeight: 600,
                  marginBottom: 'var(--spacing-4)',
                  lineHeight: 1.4
                }}
              >
                “स्वाध्याय • तप • परम्परा संरक्षण”
              </div>

              {/* Exact Mission Description */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: 'var(--spacing-6)'
                }}
              >
                {language === 'hi'
                  ? 'एक ऐसा पवित्र शैक्षिक वातावरण प्रदान करना जो ज्ञान-पिपासा, कठोर अनुशासन, आत्मविकास तथा वैदिक परम्पराओं के संरक्षण को निरंतर प्रोत्साहित करे।'
                  : 'Provide an educational environment that encourages learning, discipline, self-development, and the preservation of Vedic traditions.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('education')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-secondary)',
                fontWeight: 600,
                fontSize: '0.92rem',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'gap 0.2s ease'
              }}
              className="vm-learn-more"
            >
              <span>{language === 'hi' ? 'शैक्षणिक पाठ्यक्रम देखें' : 'View Academic Programs'}</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .vision-mission-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(42, 30, 23, 0.12) !important;
          border-color: var(--color-gold) !important;
        }
        .vision-mission-card:hover .vm-icon-box {
          transform: scale(1.08);
          transition: transform 0.3s ease;
        }
        .vision-mission-card:hover .vm-learn-more {
          gap: 0.8rem !important;
        }
      `}</style>
    </section>
  );
};
