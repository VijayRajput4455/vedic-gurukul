import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageId, PhilosophyPillar } from '../types';
import { philosophyPillars } from '../data/philosophy';
import { ShlokaAudioPlayer } from '../components/common/ShlokaAudioPlayer';
import { Compass, Sparkles, BookOpen, Brain, Heart, Users } from 'lucide-react';

interface PhilosophyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = () => {
  const { language } = useLanguage();

  return (
    <div className="philosophy-page-wrapper">
      
      {/* 1. Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <Compass size={13} />
            <span>{language === 'hi' ? 'वैदिक दर्शन एवं दयानन्द सिद्धान्त' : 'Vedic Philosophy & Dayanand Principles'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'सत्य, विद्या और संस्कारों का शाश्वत प्रकाश' : 'The Eternal Light of Truth, Wisdom & Character'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'महर्षि दयानन्द सरस्वती के वैदिक पुनर्जागरण, तर्कनिष्ठ शिक्षण पद्धति एवं अष्टाध्यायी व्याकरण का दार्शनिक आधार।'
              : 'The scholarly foundations of Vedic revivalism, rational epistemological inquiry, and Paninian linguistics.'}
          </p>
        </div>
      </section>

      {/* 2. The Triad: Vidya • Sanskar • Seva */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                {language === 'hi' ? 'त्रिसूत्रीय आधार' : 'The Core Triad'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'विद्या • संस्कार • सेवा' : 'Vidya • Sanskar • Seva'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'ज्ञान, सदाचार और निःस्वार्थ लोक-कल्याण के त्रिवेणी संगम पर आधारित शिक्षण पद्धति।'
                : 'A holistic educational philosophy weaving intellectual mastery, moral character, and selfless service.'}
            </p>
            <div className="ornamental-divider">
              <Sparkles size={16} />
            </div>
          </div>

          <div className="grid-3">
            
            {/* Vidya */}
            <div className="vedic-card-ornate">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Brain size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'विद्या (तत्व-ज्ञान एवं विवेक)' : 'Vidya (Knowledge & Inquiry)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                "सा विद्या या विमुक्तये" (Knowledge is that which liberates)
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {language === 'hi'
                  ? 'विद्या केवल सूचनाओं का संग्रह नहीं है। यह सत्य और असत्य का विवेक है। पाणिनीय व्याकरण, वेदों की संहिताएं और आधुनिक विज्ञान बुद्धि को प्रखर और स्वतंत्र बनाते हैं।'
                  : 'True knowledge is not rote information; it is the faculty of discernment between truth and falsehood through classical grammar, Vedic texts, and empirical sciences.'}
              </p>
            </div>

            {/* Sanskar */}
            <div className="vedic-card-ornate">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-gold-light)',
                color: 'var(--color-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-gold-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'संस्कार (सदाचार एवं ब्रह्मचर्य)' : 'Sanskar (Values & Discipline)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                "आचारः परमो धर्मः" (Right conduct is the highest virtue)
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {language === 'hi'
                  ? 'विद्या बिना चरित्र के निष्प्राण है। दैनिक अग्निहोत्र, सन्ध्योपासन, योगाभ्यास और संयमित जीवनशैली बालक के अन्तःकरण में उच्च मानवीय मूल्यों की प्रतिष्ठा करती है।'
                  : 'Knowledge without character is futile. Daily Agnihotra, Sandhya meditation, Yogic discipline, and a sattvic lifestyle firmly establish moral rectitude in every learner.'}
              </p>
            </div>

            {/* Seva */}
            <div className="vedic-card-ornate">
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Users size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'सेवा (लोकोपकार एवं त्याग)' : 'Seva (Selfless Action)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                "परोपकाराय सतां विभूतयः" (Noble lives exist for the welfare of all)
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {language === 'hi'
                  ? 'व्यक्तिगत स्वार्थ से ऊपर उठकर राष्ट्र, समाज और असहाय जनों के कल्याण हेतु अपने ज्ञान और सामर्थ्य का समर्पण करना ही गुरुकुल शिक्षा का अन्तिम लक्ष्य है।'
                  : 'Dedication of one\'s talents, energy, and knowledge to the upliftment of society, rural education, and the disadvantaged under the ethos of Vedic Gurukul Trust.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The 6 Dayanand Saraswati Educational Principles */}
      <section className="section-pad" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                {language === 'hi' ? 'सत्यार्थ प्रकाश के मार्गदर्शक सूत्र' : 'Principles from Satyarth Prakash'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'महर्षि दयानन्द सरस्वती के ६ आधारभूत शैक्षणिक सिद्धान्त' : 'Six Foundational Principles of Swami Dayanand Saraswati'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'तर्क, सत्य, विज्ञान एवं समानता पर आधारित शिक्षा पद्धति का विस्तृत विश्लेषण।'
                : 'A comprehensive study of the pedagogical rules guiding ethical and intellectual awakening.'}
            </p>
            <div className="ornamental-divider">
              <Compass size={16} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
            {philosophyPillars.map((pillar: PhilosophyPillar) => (
              <div key={pillar.id} className="vedic-card" style={{
                borderLeft: '4px solid var(--color-primary)',
                padding: 'var(--spacing-6)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span className="vedic-badge badge-gold" style={{ fontSize: '11px' }}>
                    {language === 'hi' ? pillar.dayanandPrincipleRefHi : pillar.dayanandPrincipleRefEn}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600 }}>
                    {pillar.sanskritTitle}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-heading-devanagari)',
                  color: 'var(--color-primary-dark)',
                  marginBottom: '0.5rem'
                }}>
                  {pillar.number}. {language === 'hi' ? pillar.titleHi : pillar.titleEn}
                </h3>

                {/* Sanskrit Aphorism Banner */}
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderLeft: '3px solid var(--color-gold)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '0.75rem'
                }}>
                  <p style={{
                    fontFamily: 'var(--font-heading-devanagari)',
                    fontSize: '1rem',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    margin: 0
                  }}>
                    {pillar.aphorismSanskrit}
                  </p>
                </div>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {language === 'hi' ? pillar.descriptionHi : pillar.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Vedic Pedagogy: Shravana, Manana, Nididhyasana */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                {language === 'hi' ? 'प्राचीन शिक्षण प्रविधि' : 'Classical Pedagogy'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'श्रवण, मनन एवं निदिध्यासन की त्रिपदीय विधि' : 'The Threefold Pedagogical Method: Shravana, Manana & Nididhyasana'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'केवल स्मरण नहीं, अपितु तार्किक विश्लेषण और आत्मसात् करने की वैज्ञानिक प्रक्रिया।'
                : 'From receptive audition and rigorous logical scrutiny to profound experiential assimilation.'}
            </p>
            <div className="ornamental-divider">
              <BookOpen size={16} />
            </div>
          </div>

          <div className="grid-3" style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="vedic-card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                १
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'श्रवण (श्रुति एवं कण्ठस्थीकरण)' : 'Shravana (Attentive Audition)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {language === 'hi'
                  ? 'आचार्य के मुख से वेदमन्त्रों एवं अष्टाध्यायी सूत्रों का एकाग्रचित्त होकर शुद्ध उच्चारण सहित श्रवण एवं स्मृति में धारण करना।'
                  : 'Receptive listening with pristine phonetic accuracy, memorizing foundational root sutras directly from the preceptor.'}
              </p>
            </div>

            <div className="vedic-card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-gold-light)',
                color: 'var(--color-gold-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                २
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-gold-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'मनन (तर्क एवं शास्त्रार्थ)' : 'Manana (Critical Scrutiny)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {language === 'hi'
                  ? 'पढ़े गए सूत्रों और मन्त्रों पर शंका समाधान, तर्क-वितर्क और न्याय दर्शन के आधार पर अर्थ की परीक्षा करना।'
                  : 'Logical deliberation, debate (Shastrartha), and philosophical analysis to resolve doubts through rational deduction.'}
              </p>
            </div>

            <div className="vedic-card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontWeight: 700,
                fontSize: '1.2rem'
              }}>
                ३
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'निदिध्यासन (जीवन में साक्षात् आचरण)' : 'Nididhyasana (Living the Truth)'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {language === 'hi'
                  ? 'प्राप्त ज्ञान को ध्यान-साधना द्वारा आत्मसात् कर दैनिक आचरण, सदाचार और समाज सेवा में क्रियान्वित करना।'
                  : 'Deep meditative contemplation, embodying the verified truth in one’s daily conduct, discipline, and societal action.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Daily Vichar Audio Player Integration */}
      <section className="section-pad" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                {language === 'hi' ? 'मन्त्र रसस्वादन' : 'Vedic Chanting'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'दैनिक वैदिक मन्त्र एवं चिन्तन' : 'Vedic Mantra Contemplation & Audio Resonator'}
            </h2>
            <div className="ornamental-divider">
              <Sparkles size={16} />
            </div>
          </div>

          <ShlokaAudioPlayer />
        </div>
      </section>

    </div>
  );
};
