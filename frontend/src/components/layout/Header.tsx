import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PageId, NavigationItem } from '../../types';
import { Menu, X, Heart, Moon, Sun, Search, Compass, BookOpen, GraduationCap, Calendar, Phone, HeartHandshake, Sparkles } from 'lucide-react';
import { CommandPalette } from '../common/CommandPalette';
import { useScrollSpy } from '../../utils/useScrollSpy';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Section IDs for ScrollSpy tracking
  const sectionIds = ['home', 'about', 'education', 'philosophy', 'trust', 'gallery', 'events', 'admissions', 'contact'];
  const activeSpySection = useScrollSpy(sectionIds, 90);

  // Effective active section
  const effectiveActive = currentPage === 'home' && activeSpySection ? activeSpySection : currentPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: NavigationItem[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', path: '/' },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय', path: '/about' },
    { id: 'education', labelEn: 'Education', labelHi: 'शिक्षा', path: '/education' },
    { id: 'philosophy', labelEn: 'Philosophy', labelHi: 'दर्शन', path: '/philosophy' },
    { id: 'trust', labelEn: 'Trust & Seva', labelHi: 'ट्रस्ट एवं सेवा', path: '/trust' },
    { id: 'gallery', labelEn: 'Gallery', labelHi: 'दीर्घा', path: '/gallery' },
    { id: 'events', labelEn: 'Events', labelHi: 'कार्यक्रम', path: '/events' },
    { id: 'admissions', labelEn: 'Admissions', labelHi: 'प्रवेश', path: '/admissions' },
    { id: 'contact', labelEn: 'Contact', labelHi: 'सम्पर्क', path: '/contact' }
  ];

  const getNavIcon = (id: PageId) => {
    switch (id) {
      case 'home': return Sparkles;
      case 'about': return Compass;
      case 'education': return GraduationCap;
      case 'philosophy': return BookOpen;
      case 'trust': return HeartHandshake;
      case 'gallery': return Compass;
      case 'events': return Calendar;
      case 'admissions': return GraduationCap;
      case 'contact': return Phone;
      default: return Sparkles;
    }
  };

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);

    // If on homepage and target section exists in DOM, smooth scroll to it
    const element = document.getElementById(pageId);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Floating Header Top Bar */}
      <header
        className="site-navbar-fixed-container"
        style={{
          position: 'fixed',
          top: '14px',
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* 1. Left: Compact Sacred Lotus Emblem (Text Removed) */}
        <div
          className="navbar-brand-emblem"
          onClick={() => handleNavClick('home')}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            flex: '0 0 auto'
          }}
          role="button"
          tabIndex={0}
          aria-label="Sanskrit Vedic Gurukul Home"
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor:
                theme === 'parchment'
                  ? isScrolled
                    ? 'rgba(255, 252, 245, 0.94)'
                    : 'rgba(255, 252, 247, 0.88)'
                  : isScrolled
                    ? 'rgba(20, 14, 10, 0.94)'
                    : 'rgba(22, 15, 11, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold-dark)',
              boxShadow: isScrolled
                ? '0 10px 28px rgba(0, 0, 0, 0.2), 0 0 12px rgba(197, 154, 78, 0.25)'
                : '0 6px 20px rgba(0, 0, 0, 0.12), 0 0 10px rgba(197, 154, 78, 0.2)',
              transition: 'all 0.3s ease'
            }}
            title="Sanskrit Vedic Gurukul Home"
            className="emblem-badge-btn"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 3c-1.5 2.5-3 5-3 7.5 0 2.5 1.5 4.5 3 4.5s3-2 3-4.5C15 8 13.5 5.5 12 3zm-4.5 3c-.5 2-1 4.5 0 6.5 1 2 2.5 3 4.5 3.5-1.5-1-2.5-2.5-3-4.5-.5-2 0-4-1.5-5.5zm9 0c-1.5 1.5-1 3.5-1.5 5.5-.5 2-1.5 3.5-3 4.5 2-.5 3.5-1.5 4.5-3.5 1-2 .5-4.5 0-6.5zm-11 5c-.5 1.5-.5 3 .5 4.5 1.5 2 3.5 2.5 6 2.5-2-1-3.5-2-4.5-4-1-1.5-1.5-2.5-2-3zm13 0c-.5.5-1 1.5-2 3-1 2-2.5 3-4.5 4 2.5 0 4.5-.5 6-2.5 1-1.5 1-3 .5-4.5zM12 16.5c-3 0-5.5 1-7 2.5 2.5.5 5.5.5 7 .5s4.5 0 7-.5c-1.5-1.5-4-2.5-7-2.5z" />
            </svg>
          </div>
        </div>

        {/* 2. Center: Strictly Centered Floating Navigation Links Capsule (Absolute 50% Centering) */}
        <nav
          className="desktop-nav navbar-center-capsule-wrapper"
          aria-label="Main Navigation"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            zIndex: 10
          }}
        >
          <div
            className="navbar-center-capsule"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.18rem',
              backgroundColor:
                theme === 'parchment'
                  ? isScrolled
                    ? 'rgba(255, 252, 245, 0.94)'
                    : 'rgba(255, 252, 247, 0.88)'
                  : isScrolled
                    ? 'rgba(20, 14, 10, 0.94)'
                    : 'rgba(22, 15, 11, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '0.35rem 0.5rem',
              borderRadius: '9999px',
              border: '1.5px solid rgba(197, 154, 78, 0.42)',
              boxShadow: isScrolled
                ? '0 12px 35px rgba(0, 0, 0, 0.22), 0 0 15px rgba(197, 154, 78, 0.2)'
                : '0 8px 28px rgba(0, 0, 0, 0.12), 0 0 10px rgba(197, 154, 78, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {navItems.map((item) => {
              const isActive = effectiveActive === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    position: 'relative',
                    padding: '0.42rem 0.78rem',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: 'var(--radius-full)',
                    color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    border: isActive ? '1px solid rgba(197, 154, 78, 0.45)' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(197, 154, 78, 0.2)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                  className={`nav-link-btn ${isActive ? 'nav-active-pill' : ''}`}
                >
                  {/* Active Glowing Indicator Dot */}
                  {isActive && (
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                        boxShadow: '0 0 6px var(--color-primary)',
                        display: 'inline-block'
                      }}
                    />
                  )}
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* 3. Right Side: Action Controls Floating Dock OUTSIDE the Navigation Bar */}
        <div
          className="desktop-cta navbar-right-dock"
          style={{
            pointerEvents: 'auto',
            display: 'none',
            alignItems: 'center',
            gap: '0.5rem',
            marginLeft: 'auto',
            flex: '0 0 auto',
            backgroundColor:
              theme === 'parchment'
                ? isScrolled
                  ? 'rgba(255, 252, 245, 0.94)'
                  : 'rgba(255, 252, 247, 0.88)'
                : isScrolled
                  ? 'rgba(20, 14, 10, 0.94)'
                  : 'rgba(22, 15, 11, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '0.35rem 0.5rem',
            borderRadius: '9999px',
            border: '1.5px solid rgba(197, 154, 78, 0.42)',
            boxShadow: isScrolled
              ? '0 12px 35px rgba(0, 0, 0, 0.22), 0 0 15px rgba(197, 154, 78, 0.2)'
              : '0 8px 28px rgba(0, 0, 0, 0.12), 0 0 10px rgba(197, 154, 78, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Search Button (Ctrl+K / ⌘K) */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: theme === 'parchment' ? 'rgba(197, 154, 78, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(197, 154, 78, 0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '0.38rem 0.65rem',
              color: 'var(--color-text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.8rem'
            }}
            title="Search Gurukul Pages, Courses & Services (Ctrl + K)"
            aria-label="Open Command Palette Search"
            className="btn-search-trigger"
          >
            <Search size={15} color="var(--color-primary)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {language === 'hi' ? 'खोजें' : 'Search'}
            </span>
            <kbd
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: theme === 'parchment' ? '#FFFFFF' : '#2A1E17',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '1px 5px',
                color: 'var(--color-gold-dark)'
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Theme Mode Switcher (Moon / Sun) */}
          <button
            onClick={toggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: theme === 'parchment' ? 'rgba(197, 154, 78, 0.12)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(197, 154, 78, 0.3)',
              color: 'var(--color-text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title={theme === 'parchment' ? 'सांध्य डार्क मोड सक्रिय करें (Sandalwood Dark)' : 'स्वर्ण पार्चमेंट लाइट मोड सक्रिय करें (Parchment Light)'}
            aria-label="Toggle Light / Dark Mode"
            className="btn-theme-toggle"
          >
            {theme === 'parchment' ? (
              <Moon size={16} color="var(--color-text-secondary)" />
            ) : (
              <Sun size={16} color="var(--color-gold)" />
            )}
          </button>

          {/* Language Switcher (EN | हिंदी) */}
          <button
            onClick={toggleLanguage}
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-text-main)',
              backgroundColor: theme === 'parchment' ? 'rgba(197, 154, 78, 0.1)' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(197, 154, 78, 0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.7rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px'
            }}
            title="Toggle Language / भाषा बदलें"
            aria-label="Toggle Language"
            className="btn-lang-toggle"
          >
            <span style={{ color: language === 'en' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: language === 'en' ? 700 : 500 }}>
              EN
            </span>
            <span style={{ color: 'var(--color-gold)', opacity: 0.7 }}>|</span>
            <span style={{ color: language === 'hi' ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: language === 'hi' ? 700 : 500 }}>
              हिंदी
            </span>
          </button>

          {/* Support Our Trust Primary CTA Button */}
          <button
            onClick={() => handleNavClick('trust')}
            style={{
              background: 'linear-gradient(135deg, #984B22 0%, #C59A4E 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1.15rem',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(152, 75, 34, 0.35)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="btn-header-trust"
          >
            <Heart size={14} fill="currentColor" className="heart-beat-icon" />
            <span>{language === 'hi' ? 'ट्रस्ट सहयोग' : 'Support Trust'}</span>
          </button>
        </div>

        {/* 4. Mobile Right Controls Cluster: Search + Theme + Hamburger */}
        <div
          className="mobile-toggle navbar-mobile-dock"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginLeft: 'auto',
            backgroundColor:
              theme === 'parchment'
                ? isScrolled
                  ? 'rgba(255, 252, 245, 0.94)'
                  : 'rgba(255, 252, 247, 0.88)'
                : isScrolled
                  ? 'rgba(20, 14, 10, 0.94)'
                  : 'rgba(22, 15, 11, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '0.28rem 0.45rem',
            borderRadius: '9999px',
            border: '1.5px solid rgba(197, 154, 78, 0.42)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Open Search"
          >
            <Search size={16} />
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'parchment' ? <Moon size={15} /> : <Sun size={15} color="var(--color-gold)" />}
          </button>

          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--color-primary)',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-gold-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              cursor: 'pointer'
            }}
          >
            {language === 'hi' ? 'EN' : 'हिन्दी'}
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
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
      </header>

      {/* Slide-out Mobile Glassmorphic Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(18, 12, 9, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 200ms ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              backgroundColor:
                theme === 'parchment'
                  ? 'rgba(255, 252, 245, 0.95)'
                  : 'rgba(22, 15, 11, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1.5px solid var(--color-gold-border)',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              overflowY: 'auto',
              animation: 'slideInRight 250ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(197, 154, 78, 0.15)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-dark)'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 3c-1.5 2.5-3 5-3 7.5 0 2.5 1.5 4.5 3 4.5s3-2 3-4.5C15 8 13.5 5.5 12 3zm-4.5 3c-.5 2-1 4.5 0 6.5 1 2 2.5 3 4.5 3.5-1.5-1-2.5-2.5-3-4.5-.5-2 0-4-1.5-5.5zm9 0c-1.5 1.5-1 3.5-1.5 5.5-.5 2-1.5 3.5-3 4.5 2-.5 3.5-1.5 4.5-3.5 1-2 .5-4.5 0-6.5zm-11 5c-.5 1.5-.5 3 .5 4.5 1.5 2 3.5 2.5 6 2.5-2-1-3.5-2-4.5-4-1-1.5-1.5-2.5-2-3zm13 0c-.5.5-1 1.5-2 3-1 2-2.5 3-4.5 4 2.5 0 4.5-.5 6-2.5 1-1.5 1-3 .5-4.5zM12 16.5c-3 0-5.5 1-7 2.5 2.5.5 5.5.5 7 .5s4.5 0 7-.5c-1.5-1.5-4-2.5-7-2.5z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '0.04em' }}>
                    VEDIC GURUKUL
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    विद्या • संस्कार • सेवा
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Close Drawer"
              >
                <X size={17} />
              </button>
            </div>

            {/* Search Button in Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCommandPaletteOpen(true);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.9rem',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid rgba(197, 154, 78, 0.3)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-text-main)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={16} color="var(--color-primary)" />
                <span>{language === 'hi' ? 'खोजें एवं नेविगेट करें...' : 'Search & Navigate...'}</span>
              </div>
              <kbd style={{ fontSize: '10px', backgroundColor: 'var(--color-bg-card)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                ⌘K
              </kbd>
            </button>

            {/* Navigation Links */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
              {navItems.map((item) => {
                const isActive = effectiveActive === item.id;
                const ItemIcon = getNavIcon(item.id);

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                        color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                        border: isActive ? '1px solid rgba(197, 154, 78, 0.4)' : '1px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <ItemIcon size={16} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                        <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                      </div>
                      {isActive && <span style={{ color: 'var(--color-primary)', fontSize: '14px' }}>●</span>}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Drawer Bottom Actions */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => handleNavClick('trust')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #984B22 0%, #C59A4E 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(152, 75, 34, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <Heart size={16} fill="currentColor" />
                <span>{language === 'hi' ? 'वैदिक ट्रस्ट सेवा सहयोग' : 'Support Our Trust'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Command Palette Modal Component */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavClick}
      />

      {/* Responsive and Animation Styles */}
      <style>{`
        @media (min-width: 1200px) {
          .desktop-nav { display: block !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 1199px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }

        .emblem-badge-btn:hover {
          transform: scale(1.06);
          border-color: #FFFFFF !important;
          box-shadow: 0 0 16px rgba(197, 154, 78, 0.5) !important;
        }

        .nav-link-btn:hover {
          color: var(--color-primary-dark) !important;
          background-color: var(--color-primary-light) !important;
        }

        .btn-search-trigger:hover,
        .btn-theme-toggle:hover,
        .btn-lang-toggle:hover {
          background-color: rgba(197, 154, 78, 0.22) !important;
          border-color: var(--color-gold) !important;
          transform: translateY(-1px);
        }

        .btn-header-trust:hover {
          transform: translateY(-1.5px) scale(1.02);
          box-shadow: 0 6px 20px rgba(152, 75, 34, 0.5) !important;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .heart-beat-icon {
          animation: beat 2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};
