import React from 'react';
import type { PageId } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { HeroPillarsRibbon } from '../components/home/HeroPillarsRibbon';
import { VisionBanner } from '../components/home/VisionBanner';
import { HeritageSection } from '../components/home/HeritageSection';
import { PhilosophyTeaser } from '../components/home/PhilosophyTeaser';
import { ProgramsTeaser } from '../components/home/ProgramsTeaser';
import { TrustPreview } from '../components/home/TrustPreview';
import { DailyVedicVichar } from '../components/home/DailyVedicVichar';
import { useLanguage } from '../context/LanguageContext';
import { Compass, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div className="homepage-wrapper">
      {/* 1. Cinematic Hero Section (Golden Horizon Vedic Gurukul) */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. 4-Pillar Quick Navigation Ribbon */}
      <HeroPillarsRibbon onNavigate={onNavigate} />

      {/* 3. Deckle-Edge "OUR VISION" Section */}
      <VisionBanner onNavigate={onNavigate} />

      {/* 4. Heritage Introduction */}
      <HeritageSection onNavigate={onNavigate} />

      {/* 5. Educational Philosophy & Dayanand Saraswati Principles */}
      <PhilosophyTeaser onNavigate={onNavigate} />

      {/* 6. Academic Programs Highlights */}
      <ProgramsTeaser onNavigate={onNavigate} />

      {/* 7. Vedic Gurukul Trust & Seva Preview */}
      <TrustPreview onNavigate={onNavigate} />

      {/* 8. Daily Shloka of the Day & Audio Resonator */}
      <DailyVedicVichar />

      {/* 9. Virtual Tour & Campus Callout Banner */}
      <section
        style={{
          padding: 'var(--spacing-16) 0',
          background: 'linear-gradient(135deg, var(--color-bg-dark-accent), #36261B)',
          color: '#FFFDF7',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: '1200px' }}>
          <div className="vedic-badge badge-gold" style={{ marginBottom: '1rem' }}>
            <Compass size={14} />
            <span>{language === 'hi' ? 'परिसर दर्शन एवं प्रवेश' : 'Campus Visit & Admissions'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontFamily: 'var(--font-heading-devanagari)',
              color: '#FFFFFF',
              marginBottom: '1rem'
            }}
          >
            {language === 'hi'
              ? 'आधुनिक युग में प्राचीन वैदिक ज्ञान एवं संस्कारों का अनुभव करें'
              : 'Experience Ancient Vedic Wisdom & Disciplined Living Firsthand'}
          </h2>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: '#D8C9B9',
              lineHeight: 1.7,
              marginBottom: 'var(--spacing-8)'
            }}
          >
            {language === 'hi'
              ? 'सत्र 2026-2027 हेतु प्रथमा, मध्यमा, शास्त्री एवं सप्ताहान्त सरल संस्कृत सम्भाषण कक्षाओं में प्रवेश प्रारम्भ हैं। बाल विद्या सहायता योजना के अंतर्गत पात्र विद्यार्थियों को निःशुल्क शिक्षा का प्रावधान है।'
              : 'Admissions are now open for the 2026-2027 academic session in Prathama, Madhyama, Shastri, and weekend Sanskrit programs. Full scholarships available for deserving underprivileged students under the Vedic Gurukul Trust.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigate('admissions')}
              className="btn btn-gold btn-lg"
              style={{ boxShadow: '0 4px 20px rgba(197, 154, 78, 0.4)' }}
            >
              <GraduationCap size={18} />
              <span>{language === 'hi' ? 'प्रवेश पूछताछ फॉर्म भरें' : 'Submit Admission Inquiry'}</span>
              <ArrowRight size={16} />
            </button>

            <button onClick={() => onNavigate('gallery')} className="btn btn-outline-gold btn-lg">
              <Compass size={18} />
              <span>{language === 'hi' ? 'आभासी परिसर दर्शन (360° Map)' : 'Virtual Campus Tour (360° Map)'}</span>
            </button>
          </div>

          <div
            style={{
              marginTop: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '11px',
              color: 'var(--color-gold-light)',
              opacity: 0.9
            }}
          >
            <ShieldCheck size={14} color="var(--color-gold)" />
            <span>
              {language === 'hi'
                ? 'वैदिक गुरुकुल ट्रस्ट द्वारा समर्थित • पारदर्शी एवं प्रामाणिक शिक्षण'
                : 'Supported by Vedic Gurukul Trust • Authentic & Transparent Education'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
