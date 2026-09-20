import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LifeAtGurukulSectionProps {
  onNavigate: (page: PageId) => void;
}

interface GalleryPhoto {
  id: string;
  titleHi: string;
  titleEn: string;
  categoryHi: string;
  categoryEn: string;
  imageUrl: string;
  descHi: string;
  descEn: string;
}

export const LifeAtGurukulSection: React.FC<LifeAtGurukulSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 'photo-study-courtyard',
      titleHi: 'वटवृक्ष तले प्रातःकालीन स्वाध्याय',
      titleEn: 'Morning Study Beneath Ancient Banyan',
      categoryHi: 'स्वाध्याय एवं कक्षा',
      categoryEn: 'Shastra Study',
      imageUrl: '/assets/images/gallery/vedic_study_courtyard.jpg',
      descHi: 'पवित्र तपोवन वटवृक्ष की सुखद छाया में ब्रह्मचारियों द्वारा वेदों व व्याकरण का सस्वर स्वाध्याय।',
      descEn: 'Disciples engaged in traditional recitation and study under the serene shade of the campus Banyan tree.'
    },
    {
      id: 'photo-library-grantha',
      titleHi: 'प्राचीन पाणिनीय ग्रन्थागार व पाण्डुलिपि',
      titleEn: 'Ancient Vedic Library & Manuscripts',
      categoryHi: 'ग्रन्थागार',
      categoryEn: 'Manuscript Library',
      imageUrl: '/assets/images/gallery/vedic_library_grantha.jpg',
      descHi: 'ताड़पत्र व प्राचीन भोजपत्र पाण्डुलिपियों का शोधपरक अनुशीलन एवं ग्रन्थागार स्वाध्याय।',
      descEn: 'Preservation and in-depth study of classical Sanskrit commentaries, palm-leaf manuscripts, and Darshanas.'
    },
    {
      id: 'photo-daily-hawan',
      titleHi: 'नित्य दैनिक प्रातः अग्निहोत्र देवयज्ञ',
      titleEn: 'Daily Morning Agnihotra Hawan Yajna',
      categoryHi: 'यज्ञ व संस्कार',
      categoryEn: 'Sacred Rituals',
      imageUrl: '/assets/images/gallery/vedic_daily_hawan.jpg',
      descHi: 'सूर्य की प्रथम किरण के साथ वातावरण-शुद्धि एवं चित्त-एकाग्रता हेतु सामूहिक दैनिक देवयज्ञ।',
      descEn: 'Sacred daily fire ritual with pure cow ghee and herbal samidha for atmospheric purification and mental focus.'
    },
    {
      id: 'photo-yoga-sadhana',
      titleHi: 'कमल सरोवर तट पर योग एवं प्राणायाम साधना',
      titleEn: 'Sunrise Yoga & Pranayama Sadhana',
      categoryHi: 'योग व स्वास्थ्य',
      categoryEn: 'Yoga & Wellness',
      imageUrl: '/assets/images/gallery/vedic_yoga_sadhana.jpg',
      descHi: 'प्रातःकालीन ब्राह्म मुहूर्त में पद्मासन, प्राणायाम एवं सूर्य नमस्कार द्वारा कायिक व मानसिक शुद्धि।',
      descEn: 'Patanjali Ashtanga Yoga, deep breathwork, and meditation amidst natural gardens and lotus ponds at dawn.'
    },
    {
      id: 'photo-shastrartha-debate',
      titleHi: 'मण्डप प्रांगण में शास्त्रार्थ एवं संवाद',
      titleEn: 'Shastrartha & Philosophical Discourse',
      categoryHi: 'शास्त्रार्थ',
      categoryEn: 'Debate & Dialectics',
      imageUrl: '/assets/images/gallery/vedic_shastrartha_debate.jpg',
      descHi: 'विद्यार्थियों के मध्य न्याय, वैशेषिक एवं व्याकरण के गूढ़ सूत्रों पर तार्किक विचार-विमर्श।',
      descEn: 'Rigorous interactive debate between students to sharpen logic, dialectical reasoning, and scriptural clarity.'
    },
    {
      id: 'photo-hero-mandap',
      titleHi: 'गङ्गा तट पावन गुरुकुल मण्डप',
      titleEn: 'Sacred Mandapa by the River Ganges',
      categoryHi: 'परिसर दर्शन',
      categoryEn: 'Campus Architecture',
      imageUrl: '/assets/images/hero/vedic_hero_mandap.jpg',
      descHi: 'पावन जाह्नवी तट पर स्थित भव्य प्रस्तर मण्डप, जहाँ ब्रह्मचारी ऋषि-तुल्य गुरुजनों से ज्ञान प्राप्त करते हैं।',
      descEn: 'Pristine sandstone mandapa pavilions where Acharyas impart timeless wisdom in a peaceful natural environment.'
    }
  ];

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  return (
    <section
      id="life-at-gurukul"
      className="section-pad"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--spacing-12) auto' }}>
          <div style={{ marginBottom: 'var(--spacing-2)' }}>
            <span className="vedic-badge badge-gold">
              <Camera size={13} />
              <span>{language === 'hi' ? 'गुरुकुल जीवन दर्शन' : 'Life at the Gurukul'}</span>
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
            {language === 'hi' ? 'गुरुकुल जीवन की एक झलक' : 'A Glimpse of Gurukul Life'}
          </h2>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
            {language === 'hi'
              ? 'स्वाध्याय, दैनिक यज्ञ, योग-साधना एवं प्राकृतिक शांति से युक्त आश्रम जीवन का जीवन्त अनुभव।'
              : 'Authentic moments of daily contemplation, sacred Hawan Yajna, rigorous debate, and harmonious living in nature.'}
          </p>
        </div>

        {/* Responsive Masonry / Visual Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-6)'
          }}
          className="gurukul-gallery-grid"
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpenLightbox(idx)}
              className="gallery-grid-card"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1.5px solid var(--color-gold-border)',
                boxShadow: '0 8px 24px rgba(42, 30, 23, 0.08)',
                cursor: 'pointer',
                backgroundColor: '#1E140D',
                height: '320px'
              }}
            >
              {/* Image */}
              <img
                src={photo.imageUrl}
                alt={language === 'hi' ? photo.titleHi : photo.titleEn}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="gallery-card-img"
              />

              {/* Gradient Shading Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(20, 14, 10, 0.85) 100%)',
                  transition: 'background 0.3s ease'
                }}
                className="gallery-card-overlay"
              />

              {/* Top Category Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  zIndex: 3
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#FFF8EE',
                    backgroundColor: 'rgba(28, 20, 14, 0.75)',
                    border: '1px solid rgba(197, 154, 78, 0.5)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    backdropFilter: 'blur(6px)'
                  }}
                >
                  {language === 'hi' ? photo.categoryHi : photo.categoryEn}
                </span>
              </div>

              {/* Hover Zoom Icon on Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 20, 14, 0.75)',
                  border: '1px solid rgba(197, 154, 78, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5D77F',
                  opacity: 0.8,
                  zIndex: 3
                }}
                className="gallery-zoom-icon"
              >
                <Maximize2 size={16} />
              </div>

              {/* Bottom Caption Info */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '18px',
                  right: '18px',
                  zIndex: 3,
                  color: '#FFFFFF'
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading-devanagari)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#FFF8EE',
                    margin: '0 0 4px 0',
                    lineHeight: 1.3
                  }}
                >
                  {language === 'hi' ? photo.titleHi : photo.titleEn}
                </h3>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: '#D4C3AF',
                    margin: 0,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {language === 'hi' ? photo.descHi : photo.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-10)' }}>
          <button
            onClick={() => onNavigate('gallery')}
            className="btn btn-outline"
            style={{ padding: '0.8rem 2rem', fontSize: '0.95rem', borderRadius: 'var(--radius-full)' }}
          >
            <span>{language === 'hi' ? 'सम्पूर्ण चित्र दीर्घा एवं 360° परिसर दर्शन' : 'Explore Full Photo Gallery & 360° Tour'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(12, 8, 5, 0.94)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '960px',
                width: '100%',
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1.5px solid var(--color-gold)',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 20, 14, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20
                }}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '40%',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 20, 14, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '40%',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 20, 14, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 20
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Modal Image */}
              <div style={{ height: 'clamp(300px, 55vh, 520px)', backgroundColor: '#140E0A', overflow: 'hidden' }}>
                <img
                  src={photos[activePhotoIndex].imageUrl}
                  alt={language === 'hi' ? photos[activePhotoIndex].titleHi : photos[activePhotoIndex].titleEn}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Modal Caption Info */}
              <div style={{ padding: '1.25rem 1.75rem', backgroundColor: 'var(--color-bg-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Sparkles size={14} color="var(--color-gold)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                    {language === 'hi' ? photos[activePhotoIndex].categoryHi : photos[activePhotoIndex].categoryEn} • {activePhotoIndex + 1}/{photos.length}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.35rem', color: 'var(--color-text-main)', margin: '0 0 6px 0' }}>
                  {language === 'hi' ? photos[activePhotoIndex].titleHi : photos[activePhotoIndex].titleEn}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {language === 'hi' ? photos[activePhotoIndex].descHi : photos[activePhotoIndex].descEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-grid-card:hover .gallery-card-img {
          transform: scale(1.06);
        }
        .gallery-grid-card:hover {
          border-color: var(--color-gold) !important;
          box-shadow: 0 16px 36px rgba(42, 30, 23, 0.16) !important;
        }
        .gallery-grid-card:hover .gallery-zoom-icon {
          background-color: var(--color-gold) !important;
          color: #1E140D !important;
        }
      `}</style>
    </section>
  );
};
