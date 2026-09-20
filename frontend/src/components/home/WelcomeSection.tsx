import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface WelcomeSectionProps {
  onNavigate: (page: PageId) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section
      id="welcome-section"
      className="welcome-gurukul-section section-pad"
      style={{
        backgroundColor: 'var(--color-bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Watermark Om Symbol */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-2%',
          fontSize: 'clamp(180px, 22vw, 320px)',
          fontFamily: "'Noto Serif Devanagari', serif",
          color: 'var(--color-gold)',
          opacity: 0.04,
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1
        }}
      >
        ॐ
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--spacing-12)',
            alignItems: 'center'
          }}
          className="welcome-grid-layout"
        >
          {/* Left Column: Authentic Gurukul Photo in Ornate Heritage Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Main Image Container */}
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '2px solid rgba(197, 154, 78, 0.45)',
                boxShadow: '0 16px 40px rgba(42, 30, 23, 0.12)',
                position: 'relative',
                backgroundColor: '#2A1E17'
              }}
            >
              <img
                src="/assets/images/gallery/vedic_study_courtyard.jpg"
                alt="Students studying Vedic texts under ancient Banyan tree in Gurukul"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease'
                }}
                className="welcome-main-img"
              />

              {/* Gradient Vignette over image for depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 65%, rgba(20, 14, 10, 0.75) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Image Caption Label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  color: '#FFF8EE',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-heading-devanagari)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={14} color="#D4AF37" />
                <span>
                  {language === 'hi'
                    ? 'प्रातःकालीन स्वाध्याय — वटवृक्ष छाया, वैदिक गुरुकुल परिसर'
                    : 'Morning Shastra Adhyayana beneath the Sacred Banyan Tree'}
                </span>
              </div>
            </div>

            {/* Overlaid Floating Accreditation / Trust Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-12px',
                backgroundColor: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1.15rem',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                maxWidth: '280px',
                backdropFilter: 'blur(10px)'
              }}
              className="welcome-floating-badge"
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(197, 154, 78, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  flexShrink: 0
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  {language === 'hi' ? 'दयानन्द ऋषि परम्परा' : 'Authentic Rishi Lineage'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                  {language === 'hi' ? 'सत्यार्थ प्रकाश एवं वैदिक पद्धति' : 'Vedic Pedagogy & Character'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text, Story, & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section Tag */}
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <span className="vedic-badge badge-gold">
                <BookOpen size={13} />
                <span>{language === 'hi' ? 'गुरुकुल परिचय' : 'Welcome to Our Gurukul'}</span>
              </span>
            </div>

            {/* Section Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
                color: 'var(--color-text-main)',
                lineHeight: 1.22,
                marginBottom: 'var(--spacing-4)',
                fontWeight: 700
              }}
            >
              {language === 'hi'
                ? 'ज्ञान एवं चरित्र निर्माण की पावन यात्रा'
                : 'A Journey of Knowledge and Character'}
            </h2>

            {/* Intro Paragraph */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.75,
                marginBottom: 'var(--spacing-5)'
              }}
            >
              {language === 'hi'
                ? 'वैदिक गुरुकुल ट्रस्ट द्वारा संचालित हमारा गुरुकुल महर्षि दयानन्द सरस्वती के शिक्षा-दर्शन को समर्पित है। यहाँ आधुनिक जीवनशैली के कोलाहल से दूर, शुद्ध तपोवन वातावरण में विद्यार्थियों को वेद, संस्कृत व्याकरण, दर्शन एवं नैतिक आचार की शिक्षा प्रदान की जाती है।'
                : 'Operated under the Vedic Gurukul Trust, our Gurukul is dedicated to the timeless educational vision of Swami Dayanand Saraswati. Away from modern distractions, in a serene tapovan atmosphere, students cultivate Vedic wisdom, Paninian Sanskrit linguistics, ethics, and purposeful living.'}
            </p>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: 'var(--spacing-6)'
              }}
            >
              {language === 'hi'
                ? 'हमारा उद्देश्य केवल पुस्तकीय ज्ञान देना नहीं, अपितु ब्रह्मचर्य, स्वावलम्बन, दैनिक यज्ञ-संध्या एवं निःस्वार्थ समाज-सेवा द्वारा सम्पूर्ण व्यक्तित्व को संस्कारित करना है।'
                : 'Our mission goes beyond conventional rote learning — nurturing disciplined character through daily Sandhya, Agnihotra Hawan, physical wellness, and selfless community service.'}
            </p>

            {/* 3 Key Quick Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: 'var(--spacing-8)'
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{ color: 'var(--color-primary)' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    {language === 'hi' ? 'आवासीय गुरुकुल व्यवस्था' : 'Residential Gurukulam'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {language === 'hi' ? 'प्रातः ४:३० से रात्रि ९:३० दिनचर्या' : '4:30 AM – 9:30 PM Dinacharya'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{ color: 'var(--color-secondary)' }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    {language === 'hi' ? 'बाल विद्या सहायता' : '100% Free Scholarship'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {language === 'hi' ? 'साधनहीन बालकों हेतु पूर्ण संरक्षण' : 'For underprivileged learners'}
                  </div>
                </div>
              </div>
            </div>

            {/* Read More / Explore CTA */}
            <button
              onClick={() => onNavigate('about')}
              className="btn btn-outline"
              style={{
                padding: '0.75rem 1.6rem',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span>{language === 'hi' ? 'गुरुकुल का सम्पूर्ण इतिहास पढ़ें' : 'Read Our Institutional Story'}</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .welcome-grid-layout {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
        .welcome-main-img:hover {
          transform: scale(1.03);
        }
        @media (max-width: 640px) {
          .welcome-floating-badge {
            position: static !important;
            margin-top: 1rem;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
