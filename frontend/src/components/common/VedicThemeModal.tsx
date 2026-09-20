import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Sun, Moon, Sparkles, Check, RefreshCw } from 'lucide-react';
import { vedicAudio } from '../../utils/audio';

export const VedicThemeModal: React.FC = () => {
  const {
    theme,
    toggleTheme,
    vedicTheme,
    setVedicTheme,
    isDailyMode,
    toggleDailyMode,
    isThemeModalOpen,
    closeThemeModal,
    availableThemes,
    activeThemeData
  } = useTheme();
  const { language } = useLanguage();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isThemeModalOpen) {
        closeThemeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isThemeModalOpen, closeThemeModal]);

  if (!isThemeModalOpen) return null;

  const handleSelectTheme = (id: typeof vedicTheme) => {
    setVedicTheme(id);
    try {
      vedicAudio.playBellChime();
    } catch {
      // Audio fallback
    }
  };

  return (
    <div
      className="vedic-theme-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(14, 10, 7, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onClick={closeThemeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Vedic Sanskrit Theme Studio"
    >
      <div
        className="vedic-theme-modal-card"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          backgroundColor:
            theme === 'parchment'
              ? 'rgba(255, 252, 246, 0.96)'
              : 'rgba(24, 18, 13, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1.5px solid var(--color-gold-border)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 30px var(--color-gold-glow)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalScaleUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background:
              theme === 'parchment'
                ? 'linear-gradient(180deg, rgba(244, 232, 220, 0.6) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(43, 33, 26, 0.6) 0%, transparent 100%)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3px' }}>
              <span style={{ fontSize: '1.4rem' }}>{activeThemeData.symbol}</span>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                  margin: 0,
                  fontFamily: 'var(--font-heading-latin)'
                }}
              >
                {language === 'hi' ? 'वैदिक सौन्दर्य चक्र (११ दिव्य भाव)' : 'Vedic Aesthetic Studio (11 Sacred Themes)'}
              </h2>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.04em' }}>
              {language === 'hi'
                ? 'ॐ असतो मा सद्गमय • तमसो मा ज्योतिर्गमय • मृत्योर्मामृतं गमय'
                : 'Sacred Sanskrit Geometries, Elemental Accents & Ambient Full-Page Textures'}
            </div>
          </div>

          <button
            onClick={closeThemeModal}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Controls Bar: Base Display Mode & 24h Daily Cycle */}
        <div
          style={{
            padding: '0.85rem 1.75rem',
            backgroundColor:
              theme === 'parchment'
                ? 'rgba(245, 236, 222, 0.5)'
                : 'rgba(18, 13, 9, 0.5)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Base Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              {language === 'hi' ? 'आधार स्वरूप (Base Mode):' : 'Display Mode:'}
            </span>
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '9999px',
                padding: '3px',
                border: '1px solid var(--color-border)'
              }}
            >
              <button
                onClick={() => theme !== 'sandalwood' && toggleTheme()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: theme === 'sandalwood' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'sandalwood' ? '#FFFFFF' : 'var(--color-text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Moon size={13} />
                <span>{language === 'hi' ? 'चन्दन तमस्' : 'Sandalwood Dark'}</span>
              </button>
              <button
                onClick={() => theme !== 'parchment' && toggleTheme()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: theme === 'parchment' ? 'var(--color-primary)' : 'transparent',
                  color: theme === 'parchment' ? '#FFFFFF' : 'var(--color-text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sun size={13} />
                <span>{language === 'hi' ? 'भोजपत्र गौर' : 'Parchment Light'}</span>
              </button>
            </div>
          </div>

          {/* 24-Hour Daily Mode Switcher */}
          <button
            onClick={toggleDailyMode}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: isDailyMode
                ? '1px solid var(--color-gold)'
                : '1px solid var(--color-border)',
              backgroundColor: isDailyMode
                ? 'var(--color-primary-light)'
                : 'var(--color-bg-secondary)',
              color: isDailyMode ? 'var(--color-primary)' : 'var(--color-text-muted)',
              transition: 'all 0.2s ease'
            }}
            title="Automatically cycles a sacred theme every 24 hours"
          >
            <RefreshCw size={13} className={isDailyMode ? 'spin-slow' : ''} />
            <span>
              {isDailyMode
                ? language === 'hi'
                  ? '🔄 २४-घंटे दैनिक चक्र (सक्रिय)'
                  : '🔄 24h Daily Vedic Cycle (Active)'
                : language === 'hi'
                ? '🎯 हस्तचालित चयन (दैनिक चक्र चालू करें)'
                : '🎯 Manual Lock (Click to Enable Daily Cycle)'}
            </span>
          </button>
        </div>

        {/* Scrollable Grid of 11 Vedic Themes */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
            flex: 1
          }}
        >
          {availableThemes.map((item, idx) => {
            const isSelected = activeThemeData.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectTheme(item.id)}
                className={`vedic-theme-card-item ${isSelected ? 'selected' : ''}`}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  padding: '1rem',
                  backgroundColor:
                    isSelected
                      ? theme === 'parchment'
                        ? 'rgba(255, 255, 255, 0.95)'
                        : 'rgba(38, 28, 21, 0.95)'
                      : theme === 'parchment'
                      ? 'rgba(255, 253, 249, 0.65)'
                      : 'rgba(30, 22, 17, 0.65)',
                  border: isSelected
                    ? `2px solid ${item.primaryColor}`
                    : '1px solid var(--color-border)',
                  boxShadow: isSelected
                    ? `0 8px 25px rgba(${item.rgb}, 0.28), 0 0 12px rgba(${item.rgb}, 0.25)`
                    : 'var(--shadow-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                {/* Top Row: Symbol, Index & Checkmark */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{item.symbol}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        color: 'var(--color-text-muted)',
                        backgroundColor: 'var(--color-bg-secondary)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      #{idx + 1}
                    </span>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: item.primaryColor,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 8px ${item.primaryColor}`
                      }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Theme Titles */}
                <div>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: 'var(--color-text-main)',
                      fontFamily: 'var(--font-heading-devanagari, serif)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{language === 'hi' ? item.nameHi : item.nameEn}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: item.primaryColor, fontWeight: 700, marginTop: '1px' }}>
                    {item.sanskritName} • {item.vedicElement}
                  </div>
                </div>

                {/* Gradient & Pattern Indicator Bar */}
                <div
                  style={{
                    height: '10px',
                    borderRadius: '9999px',
                    background: item.gradient,
                    boxShadow: `0 2px 8px rgba(${item.rgb}, 0.35)`
                  }}
                />

                {/* Pattern Geometry Name & Vibe */}
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                    📐 {language === 'hi' ? item.patternNameHi : item.patternNameEn}
                  </div>
                  <div style={{ opacity: 0.85 }}>
                    {language === 'hi' ? item.vibeHi : item.vibeEn}
                  </div>
                </div>

                {/* Shloka Quote Snippet */}
                <div
                  style={{
                    fontSize: '0.68rem',
                    fontStyle: 'italic',
                    color: 'var(--color-text-muted)',
                    borderTop: '1px dashed var(--color-border)',
                    paddingTop: '0.4rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={item.shlokaQuote}
                >
                  {item.shlokaQuote}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              theme === 'parchment'
                ? 'rgba(255, 252, 246, 0.9)'
                : 'rgba(20, 14, 10, 0.9)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <Sparkles size={14} color="var(--color-primary)" />
            <span>
              {language === 'hi'
                ? `वर्तमान सक्रिय: ${activeThemeData.nameHi} (${activeThemeData.vedicElement})`
                : `Active: ${activeThemeData.nameEn} (${activeThemeData.vedicElement})`}
            </span>
          </div>

          <button
            onClick={closeThemeModal}
            style={{
              padding: '0.5rem 1.4rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-gold))',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px var(--color-primary-glow)'
            }}
          >
            {language === 'hi' ? 'स्वीकार करें (Done)' : 'Done'}
          </button>
        </div>
      </div>

      <style>{`
        .vedic-theme-card-item:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary) !important;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3) !important;
        }

        .spin-slow {
          animation: spinAnimation 8s linear infinite;
        }

        @keyframes spinAnimation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.93) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
