import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId, NavigationItem } from '../../types';
import { Menu, X, Flame, GraduationCap, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { language, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavigationItem[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', path: '/' },
    { id: 'about', labelEn: 'About Gurukul', labelHi: 'गुरुकुल परिचय', path: '/about' },
    { id: 'philosophy', labelEn: 'Philosophy', labelHi: 'हमारा दर्शन', path: '/philosophy' },
    { id: 'education', labelEn: 'Education', labelHi: 'शिक्षा व पाठ्यक्रम', path: '/education' },
    { id: 'trust', labelEn: 'Trust & Seva', labelHi: 'ट्रस्ट एवं सेवा', path: '/trust' },
    { id: 'admissions', labelEn: 'Admissions', labelHi: 'प्रवेश', path: '/admissions' },
    { id: 'gallery', labelEn: 'Campus', labelHi: 'परिसर दीर्घा', path: '/gallery' },
    { id: 'events', labelEn: 'Events', labelHi: 'कार्यक्रम', path: '/events' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'सम्पर्क', path: '/contact' }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'var(--color-bg-card)',
      borderBottom: '1.5px solid var(--color-border)',
      boxShadow: 'var(--shadow-subtle)',
      transition: 'background-color var(--transition-base)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.65rem',
        paddingBottom: '0.65rem'
      }}>
        
        {/* Emblem & Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          role="button"
          tabIndex={0}
          aria-label="Go to Homepage"
        >
          {/* Sacred Diya / Emblem Icon */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 2px 10px var(--color-primary-glow)',
            flexShrink: 0
          }}>
            <Flame size={24} className="animate-flame" />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              lineHeight: 1.15
            }}>
              {language === 'hi' ? 'संस्कृत वैदिक गुरुकुलम्' : 'Sanskrit Vedic Gurukul'}
            </div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-secondary)',
              letterSpacing: '0.04em',
              lineHeight: 1.2
            }}>
              {language === 'hi' ? 'एवं वैदिक गुरुकुल ट्रस्ट • विद्या • संस्कार • सेवा' : '& Vedic Gurukul Trust • Vidya • Sanskar • Seva'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav" aria-label="Main Navigation">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const isTrust = item.id === 'trust';
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: 'var(--radius-md)',
                      color: isActive 
                        ? (isTrust ? 'var(--color-secondary)' : 'var(--color-primary)')
                        : 'var(--color-text-main)',
                      backgroundColor: isActive 
                        ? (isTrust ? 'var(--color-secondary-light)' : 'var(--color-primary-light)')
                        : 'transparent',
                      border: isActive 
                        ? `1px solid ${isTrust ? 'rgba(59,91,67,0.3)' : 'rgba(166,95,43,0.3)'}` 
                        : '1px solid transparent',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    {isTrust && <HeartHandshake size={14} color="var(--color-secondary)" />}
                    {language === 'hi' ? item.labelHi : item.labelEn}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick CTA Action (Desktop) */}
        <div style={{ display: 'none' }} className="desktop-cta">
          <button
            onClick={() => handleNavClick('admissions')}
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.5rem 1.1rem',
              boxShadow: '0 2px 8px var(--color-primary-glow)'
            }}
          >
            <GraduationCap size={16} />
            <span>{t.common.admissionInquiry}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-toggle">
          <button
            onClick={() => handleNavClick('admissions')}
            className="btn btn-primary btn-sm"
            style={{ padding: '0.35rem 0.65rem', fontSize: '11px' }}
          >
            <GraduationCap size={13} />
            <span>{language === 'hi' ? 'प्रवेश' : 'Apply'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--color-bg-main)',
          borderTop: '1px solid var(--color-border)',
          padding: '1rem',
          boxShadow: 'var(--shadow-lg)'
        }} className="animate-fade-in-up">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                      color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                      border: isActive ? '1px solid rgba(166,95,43,0.3)' : '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                    {isActive && <span style={{ color: 'var(--color-primary)' }}>●</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => handleNavClick('trust')}
              className="btn btn-forest"
              style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '12px' }}
            >
              <HeartHandshake size={14} />
              <span>{language === 'hi' ? 'ट्रस्ट सेवा कार्य' : 'Trust Initiatives'}</span>
            </button>
            <button
              onClick={() => handleNavClick('admissions')}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '12px' }}
            >
              <GraduationCap size={14} />
              <span>{t.common.admissionInquiry}</span>
            </button>
          </div>
        </div>
      )}

      {/* Style block for responsive breakpoints */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: block !important; }
          .desktop-cta { display: block !important; }
          .mobile-toggle { display: none !important; }
          .desktop-contact-items { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};
