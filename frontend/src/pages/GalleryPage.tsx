import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageId, GalleryItem } from '../types';
import { galleryData } from '../data/gallery';
import { Compass, X, ChevronLeft, ChevronRight, Maximize2, MapPin, Flame, BookOpen, SunMedium, HeartHandshake } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const { language } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeMapHotspot, setActiveMapHotspot] = useState<string | null>('yajna');

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelHi: 'समस्त छायाचित्र' },
    { id: 'campus', labelEn: 'Campus & Yajnashala', labelHi: 'परिसर एवं यज्ञशाला' },
    { id: 'pathshala', labelEn: 'Pathshala & Classrooms', labelHi: 'पाठशाला एवं स्वाध्याय' },
    { id: 'library', labelEn: 'Library & Manuscripts', labelHi: 'ग्रन्थागार व पाण्डुलिपि' },
    { id: 'yoga', labelEn: 'Yoga & Daily Life', labelHi: 'योगाभ्यास व दिनचर्या' },
    { id: 'utsav', labelEn: 'Utsav & Celebrations', labelHi: 'उत्सव व दीक्षान्त' }
  ];

  const filteredItems = selectedCat === 'all'
    ? galleryData
    : galleryData.filter((item: GalleryItem) => item.category === selectedCat);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Campus Hotspots for Interactive Map
  const campusHotspots = [
    {
      id: 'yajna',
      nameEn: 'Maharshi Dayanand Yajnashala',
      nameHi: 'महर्षि दयानन्द यज्ञशाला',
      descEn: 'The spiritual heart of the Gurukul where daily morning and evening Agnihotra rituals take place.',
      descHi: 'गुरुकुल का केन्द्रीय तपोस्थल जहाँ नित्य प्रातः एवं सायं वैदिक मन्त्रोच्चार के साथ हवन-यज्ञ होता है।',
      icon: Flame
    },
    {
      id: 'library',
      nameEn: 'Saraswati Granthalaya (Manuscript Lab)',
      nameHi: 'सरस्वती ग्रन्थागार एवं पाण्डुलिपि कक्ष',
      descEn: 'Housing over 5,000 classical Sanskrit volumes and active digital archiving laboratories.',
      descHi: '५,००० से अधिक दुर्लभ संस्कृत ग्रन्थों, भाष्यों एवं पाण्डुलिपियों का आधुनिक संरक्षण केन्द्र।',
      icon: BookOpen
    },
    {
      id: 'pathshala',
      nameEn: 'Panini Pathshala Bhavan',
      nameHi: 'पाणिनी पाठशाला भवन (कक्षा कक्ष)',
      descEn: 'Traditional open-air and ventilated classrooms for memorization and analysis of Ashtadhyayi sutras.',
      descHi: 'पारम्परिक अष्टाध्यायी सूत्र कण्ठस्थीकरण एवं व्याकरण अध्ययन हेतु समर्पित कक्षा भवन।',
      icon: Compass
    },
    {
      id: 'yoga',
      nameEn: 'Yoga & Khel Vatika',
      nameHi: 'योग एवं खेल वाटिका',
      descEn: 'Open natural green grounds for early morning Suryanamaskar, Pranayama, and traditional martial arts.',
      descHi: 'प्रातःकालीन सूर्य नमस्कार, प्राणायाम एवं लाठी-आत्मरक्षा कला के प्रशिक्षण हेतु प्राकृतिक मैदान।',
      icon: SunMedium
    },
    {
      id: 'gaushala',
      nameEn: 'Kamadhenu Desi Gaushala',
      nameHi: 'कामधेनु देशी गौशाला',
      descEn: 'Sanctuary for indigenous Gir & Sahiwal cows providing pure A2 milk and organic farm compost.',
      descHi: 'देशी गीर एवं साहीवाल गौवंश की सेवा, जहाँ से विद्यार्थियों को पौष्टिक दुग्ध प्राप्त होता है।',
      icon: HeartHandshake
    }
  ];

  return (
    <div className="gallery-page-wrapper">
      
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
            <span>{language === 'hi' ? 'परिसर एवं दीर्घा' : 'Campus & Photo Gallery'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'गुरुकुल परिसर एवं दैनन्दिन जीवन की झलकियाँ' : 'A Glimpse into Gurukul Life & Sacred Grounds'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'यज्ञशाला, ग्रन्थागार, पाठशाला, योगाभ्यास एवं दीक्षान्त उत्सवों के प्रामाणिक छायाचित्र।'
              : 'Authentic moments from daily Agnihotra, scholarly debates, Yogic discipline, and convocation ceremonies.'}
          </p>
        </div>
      </section>

      {/* 2. Interactive 360° Virtual Campus Map */}
      <section className="section-pad-sm" style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'var(--spacing-8)' }}>
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                <MapPin size={13} />
                <span>{language === 'hi' ? 'आभासी परिसर मानचित्र' : 'Interactive Campus Map'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.8rem' }}>
              {language === 'hi' ? 'गुरुकुल परिसर के प्रमुख केन्द्र' : 'Key Locations Across the Gurukul Grounds'}
            </h2>
          </div>

          <div style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--color-gold-border)',
            padding: 'var(--spacing-6)',
            boxShadow: 'var(--shadow-md)'
          }}>
            {/* Hotspots Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {campusHotspots.map((spot) => {
                const isSelected = activeMapHotspot === spot.id;
                const IconComponent = spot.icon;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveMapHotspot(spot.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg-card)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{language === 'hi' ? spot.nameHi : spot.nameEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Hotspot Info Card */}
            {activeMapHotspot && (
              <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                maxWidth: '680px',
                margin: '0 auto',
                boxShadow: 'var(--shadow-subtle)'
              }} className="animate-fade-in">
                {(() => {
                  const currentSpot = campusHotspots.find((s) => s.id === activeMapHotspot);
                  if (!currentSpot) return null;
                  return (
                    <>
                      <h4 style={{
                        fontFamily: 'var(--font-heading-devanagari)',
                        fontSize: '1.2rem',
                        color: 'var(--color-primary-dark)',
                        marginBottom: '0.35rem'
                      }}>
                        {language === 'hi' ? currentSpot.nameHi : currentSpot.nameEn}
                      </h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                        {language === 'hi' ? currentSpot.descHi : currentSpot.descEn}
                      </p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Filterable Gallery Grid */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          
          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: 'var(--spacing-10)'
          }}>
            {categories.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-card)',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-main)',
                    border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {language === 'hi' ? cat.labelHi : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Photo Grid */}
          <div className="grid-3" style={{ gap: 'var(--spacing-8)' }}>
            {filteredItems.map((item: GalleryItem, idx: number) => (
              <div
                key={item.id}
                className="vedic-card"
                onClick={() => setLightboxIndex(idx)}
                style={{
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative'
                }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${item.titleEn}`}
              >
                <div className="img-zoom-wrapper" style={{ height: '260px', overflow: 'hidden' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '1rem' }}>
                  <span className="vedic-badge badge-gold" style={{ fontSize: '10px', marginBottom: '0.35rem' }}>
                    {item.sanskritTitle}
                  </span>
                  <h4 style={{
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-primary-dark)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3
                  }}>
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {language === 'hi' ? item.captionHi : item.captionEn}
                  </p>
                </div>

                {/* Hover overlay hint */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(28, 21, 16, 0.7)',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-subtle)'
                }}>
                  <Maximize2 size={14} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Full-Screen Accessible Lightbox Modal */}
      {activeLightboxItem && (
        <div className="modal-overlay" onClick={() => setLightboxIndex(null)} style={{ padding: 0 }}>
          <div
            style={{
              position: 'relative',
              maxWidth: '1240px',
              width: '94%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid var(--color-border)'
            }}>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {lightboxIndex! + 1} / {filteredItems.length}
                </span>
                <span style={{ marginLeft: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {activeLightboxItem.sanskritTitle}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)'
                }}
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image Container */}
            <div style={{ position: 'relative', flex: 1, backgroundColor: '#140E0A', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '60vh', overflow: 'hidden' }}>
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.titleEn}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! - 1 + filteredItems.length) % filteredItems.length);
                }}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(28, 21, 16, 0.75)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! + 1) % filteredItems.length);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(28, 21, 16, 0.75)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption Footer */}
            <div style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--color-bg-card)' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.15rem',
                color: 'var(--color-primary-dark)',
                marginBottom: '0.25rem'
              }}>
                {language === 'hi' ? activeLightboxItem.titleHi : activeLightboxItem.titleEn}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {language === 'hi' ? activeLightboxItem.captionHi : activeLightboxItem.captionEn}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
