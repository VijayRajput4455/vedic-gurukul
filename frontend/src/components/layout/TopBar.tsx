import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { PageId } from '../../types';
import { Volume2, Moon, Sun, Globe, Bell, Shield, Phone, Mail } from 'lucide-react';
import { vedicAudio } from '../../utils/audio';

interface TopBarProps {
  onNavigate: (page: PageId) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { notices } = useData();

  const latestNotice = notices[0];

  const handlePlayChime = () => {
    vedicAudio.playResonance(432, 6);
  };

  return (
    <div className="topbar-wrapper" style={{
      backgroundColor: 'var(--color-bg-secondary)',
      borderBottom: '1px solid var(--color-border)',
      fontSize: 'var(--text-xs)',
      padding: '0.4rem 0',
      color: 'var(--color-text-secondary)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        
        {/* Notice Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '240px', flex: '1 1 auto' }}>
          <span className="vedic-badge badge-saffron" style={{ fontSize: '10px', padding: '0.15rem 0.5rem' }}>
            <Bell size={10} /> {language === 'hi' ? 'नवीन सूचना' : 'Notice'}
          </span>
          {latestNotice && (
            <button 
              onClick={() => latestNotice.targetPage && onNavigate(latestNotice.targetPage)}
              style={{
                textAlign: 'left',
                color: 'var(--color-text-main)',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '480px'
              }}
              title={language === 'hi' ? latestNotice.titleHi : latestNotice.titleEn}
            >
              {language === 'hi' ? latestNotice.titleHi : latestNotice.titleEn}
            </button>
          )}
        </div>

        {/* Quick Contact & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-contact-items">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={12} color="var(--color-primary)" /> +91 98765 [Placeholder]
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={12} color="var(--color-primary)" /> info@vedicgurukul.org
            </span>
          </div>

          {/* Sacred Sound Tone */}
          <button
            onClick={handlePlayChime}
            className="btn-vedic-chime"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-gold-light)',
              color: 'var(--color-gold-dark)',
              fontWeight: 600,
              fontSize: '11px',
              border: '1px solid var(--color-gold-border)'
            }}
            title={language === 'hi' ? 'वैदिक ओंकार नाद सुनें' : 'Play Sacred Resonance Tone (432Hz)'}
            aria-label="Play Vedic Resonance"
          >
            <Volume2 size={12} />
            <span>432Hz Om</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              fontWeight: 600,
              color: 'var(--color-primary)'
            }}
            aria-label="Switch Language"
          >
            <Globe size={12} />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '26px',
              height: '26px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-main)'
            }}
            title={theme === 'parchment' ? t.common.themeSandalwood : t.common.themeParchment}
            aria-label="Toggle Theme"
          >
            {theme === 'parchment' ? <Moon size={12} /> : <Sun size={12} />}
          </button>

          {/* Admin Shortcut */}
          <button
            onClick={() => onNavigate('admin')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--color-text-muted)',
              fontSize: '11px',
              fontWeight: 500
            }}
            title={t.common.adminPortal}
          >
            <Shield size={11} />
            <span>{t.common.adminPortal}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
