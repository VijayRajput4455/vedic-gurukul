import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId, NavigationItem } from '../../types';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavigationItem[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', path: '/' },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय', path: '/about' },
    { id: 'education', labelEn: 'Education', labelHi: 'शिक्षा', path: '/education' },
    { id: 'philosophy', labelEn: 'Our Philosophy', labelHi: 'दर्शन', path: '/philosophy' },
    { id: 'trust', labelEn: 'Trust & Seva', labelHi: 'ट्रस्ट एवं सेवा', path: '/trust' },
    { id: 'gallery', labelEn: 'Gallery', labelHi: 'दीर्घा', path: '/gallery' },
    { id: 'events', labelEn: 'Events', labelHi: 'कार्यक्रम', path: '/events' },
    { id: 'admissions', labelEn: 'Admissions', labelHi: 'प्रवेश', path: '/admissions' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'सम्पर्क', path: '/contact' }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="site-header"
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 1000,
        margin: '0 auto',
        padding: '0 1rem',
        maxWidth: '1540px'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(253, 250, 244, 0.95)',
          border: '1.5px solid rgba(197, 154, 78, 0.45)',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 20px rgba(42, 30, 23, 0.08)',
          backdropFilter: 'blur(12px)',
          padding: '0.45rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          transition: 'all var(--transition-base)'
        }}
      >
        {/* Emblem & Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          role="button"
          tabIndex={0}
          aria-label="Go to Homepage"
        >
          {/* Golden Sacred Lotus SVG Emblem */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(197, 154, 78, 0.15)',
              border: '1px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-gold-dark)'
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 3c-1.5 2.5-3 5-3 7.5 0 2.5 1.5 4.5 3 4.5s3-2 3-4.5C15 8 13.5 5.5 12 3zm-4.5 3c-.5 2-1 4.5 0 6.5 1 2 2.5 3 4.5 3.5-1.5-1-2.5-2.5-3-4.5-.5-2 0-4-1.5-5.5zm9 0c-1.5 1.5-1 3.5-1.5 5.5-.5 2-1.5 3.5-3 4.5 2-.5 3.5-1.5 4.5-3.5 1-2 .5-4.5 0-6.5zm-11 5c-.5 1.5-.5 3 .5 4.5 1.5 2 3.5 2.5 6 2.5-2-1-3.5-2-4.5-4-1-1.5-1.5-2.5-2-3zm13 0c-.5.5-1 1.5-2 3-1 2-2.5 3-4.5 4 2.5 0 4.5-.5 6-2.5 1-1.5 1-3 .5-4.5zM12 16.5c-3 0-5.5 1-7 2.5 2.5.5 5.5.5 7 .5s4.5 0 7-.5c-1.5-1.5-4-2.5-7-2.5z" />
            </svg>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading-latin)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#2A1E17',
                lineHeight: 1.1,
                letterSpacing: '0.04em'
              }}
            >
              {language === 'hi' ? 'SANSKRIT VEDIC GURUKUL' : 'SANSKRIT VEDIC GURUKUL'}
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                letterSpacing: '0.06em',
                lineHeight: 1.1
              }}
            >
              — विद्या संस्कार सेवा —
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav" aria-label="Main Navigation">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: 'var(--radius-full)',
                      color: isActive ? 'var(--color-primary-dark)' : '#3F3228',
                      backgroundColor: isActive ? 'rgba(197, 154, 78, 0.16)' : 'transparent',
                      border: isActive ? '1px solid rgba(197, 154, 78, 0.35)' : '1px solid transparent',
                      transition: 'all var(--transition-fast)',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'hi' ? item.labelHi : item.labelEn}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Controls: Language Switcher & "Support Our Trust" Button */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-cta">
          {/* Bilingual Toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#3F3228',
              backgroundColor: 'rgba(197, 154, 78, 0.1)',
              border: '1px solid rgba(197, 154, 78, 0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.75rem',
              cursor: 'pointer'
            }}
            title="Toggle Language (EN / हिंदी)"
          >
            <span style={{ color: language === 'en' ? 'var(--color-primary)' : '#857568' }}>EN</span>
            <span style={{ margin: '0 4px', color: 'var(--color-gold)' }}>|</span>
            <span style={{ color: language === 'hi' ? 'var(--color-primary)' : '#857568' }}>हिंदी</span>
          </button>

          {/* Support Our Trust Pill Button */}
          <button
            onClick={() => handleNavClick('trust')}
            style={{
              backgroundColor: '#984B22',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.5rem 1.15rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(152, 75, 34, 0.35)',
              transition: 'all var(--transition-fast)'
            }}
            className="btn-header-trust"
          >
            <Heart size={14} fill="currentColor" />
            <span>{language === 'hi' ? 'ट्रस्ट सहयोग' : 'Support Our Trust'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-toggle">
          <button
            onClick={toggleLanguage}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-gold-border)'
            }}
          >
            {language === 'hi' ? 'EN' : 'हिन्दी'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'rgba(253, 250, 244, 0.95)',
              color: '#2A1E17',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(253, 250, 244, 0.98)',
            border: '1.5px solid var(--color-gold-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            marginTop: '0.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(14px)'
          }}
          className="animate-fade-in-up"
        >
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'rgba(197, 154, 78, 0.18)' : 'transparent',
                      color: isActive ? 'var(--color-primary-dark)' : '#2A1E17',
                      border: isActive ? '1px solid rgba(197, 154, 78, 0.4)' : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                    {isActive && <span style={{ color: 'var(--color-primary)' }}>●</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => handleNavClick('trust')}
              style={{
                width: '100%',
                backgroundColor: '#984B22',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.65rem',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Heart size={15} fill="currentColor" />
              <span>{language === 'hi' ? 'ट्रस्ट सेवा सहयोग' : 'Support Our Trust'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive Breakpoint Rules */}
      <style>{`
        @media (min-width: 1080px) {
          .desktop-nav { display: block !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        .btn-header-trust:hover {
          background-color: #7E3C1A !important;
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(152, 75, 34, 0.45) !important;
        }
      `}</style>
    </header>
  );
};
