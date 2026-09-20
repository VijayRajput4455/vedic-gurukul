import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { Compass, GraduationCap, ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

interface ClosingCtaSectionProps {
  onNavigate: (page: PageId) => void;
}

export const ClosingCtaSection: React.FC<ClosingCtaSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section
      id="closing-cta"
      style={{
        padding: 'clamp(4.5rem, 9vh, 6.5rem) 0',
        background: 'linear-gradient(135deg, #261B14 0%, #3D2B1F 50%, #20150E 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid rgba(197, 154, 78, 0.4)'
      }}
    >
      {/* Background Subtle Radial Glow & Mandala Lattice */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          backgroundImage: 'radial-gradient(var(--color-gold) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none'
        }}
      />

      {/* Center Golden Light Bloom */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(197, 154, 78, 0.22) 0%, rgba(198, 93, 33, 0.08) 50%, transparent 80%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: '860px' }}>
        {/* Subtle Om Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'var(--spacing-3)' }}
        >
          <span className="vedic-badge badge-gold">
            <Sparkles size={13} />
            <span>॥ ॐ भूर्भुवः स्वः ॥</span>
          </span>
        </motion.div>

        {/* Heading: Begin Your Journey Towards Knowledge */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
            fontFamily: 'var(--font-heading-devanagari)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: 'var(--spacing-4)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
          }}
        >
          {language === 'hi'
            ? 'ज्ञान एवं संस्कार की यात्रा का शुभारम्भ करें'
            : 'Begin Your Journey Towards Knowledge'}
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.18rem)',
            color: '#E2D5C7',
            lineHeight: 1.7,
            marginBottom: 'var(--spacing-8)',
            maxWidth: '720px',
            margin: '0 auto var(--spacing-8) auto'
          }}
        >
          {language === 'hi'
            ? 'हमारे गुरुकुल, वैदिक शिक्षण पद्धति, आवासीय व्यवस्था एवं बाल विद्या सहायता छात्रवृत्ति के विषय में अधिक जानकारी प्राप्त करें अथवा हमसे सीधे सम्पर्क करें।'
            : 'Learn more about our Gurukul, educational approach, and opportunities to connect with our institution.'}
        </motion.p>

        {/* Buttons: Contact Us & Learn More */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          {/* Contact Us Primary Button */}
          <button
            onClick={() => onNavigate('contact')}
            style={{
              backgroundColor: '#C65D21',
              backgroundImage: 'linear-gradient(135deg, #D46B28 0%, #B84E1A 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.95rem 2.4rem',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              boxShadow: '0 6px 25px rgba(198, 93, 33, 0.45)',
              transition: 'all var(--transition-base)'
            }}
            className="hero-btn-primary"
          >
            <MessageSquare size={18} />
            <span>{language === 'hi' ? 'सम्पर्क करें (Contact Us)' : 'Contact Us'}</span>
            <ArrowRight size={16} />
          </button>

          {/* Learn More / Admissions Button */}
          <button
            onClick={() => onNavigate('admissions')}
            style={{
              backgroundColor: 'rgba(255, 253, 249, 0.08)',
              color: '#FFF8EE',
              border: '1.5px solid rgba(229, 169, 60, 0.7)',
              borderRadius: 'var(--radius-full)',
              padding: '0.95rem 2.4rem',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all var(--transition-base)'
            }}
            className="hero-btn-secondary"
          >
            <GraduationCap size={18} />
            <span>{language === 'hi' ? 'प्रवेश एवं विवरण (Learn More)' : 'Learn More'}</span>
          </button>
        </motion.div>

        {/* Trust Endorsement Note */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '12px',
            color: '#D4AF37',
            opacity: 0.9
          }}
        >
          <ShieldCheck size={15} color="#D4AF37" />
          <span>
            {language === 'hi'
              ? 'वैदिक गुरुकुल ट्रस्ट द्वारा संचालित • प्रामाणिक एवं पारदर्शी'
              : 'Governed by Vedic Gurukul Trust • Authentic, Non-Profit & Dedicated'}
          </span>
        </div>
      </div>
    </section>
  );
};
