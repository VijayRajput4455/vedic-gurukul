import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { PageId } from '../../types';
import {
  Search,
  BookOpen,
  HeartHandshake,
  Compass,
  GraduationCap,
  Calendar,
  Phone,
  Moon,
  Sun,
  Globe,
  Flame,
  Volume2,
  X,
  ArrowRight
} from 'lucide-react';
import { vedicAudio } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

interface SearchItem {
  id: string;
  titleHi: string;
  titleEn: string;
  categoryHi: string;
  categoryEn: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchItems: SearchItem[] = [
    // Navigation Pages
    {
      id: 'page-home',
      titleHi: 'मुख्य पृष्ठ (Home)',
      titleEn: 'Home Page',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: Flame,
      action: () => { onNavigate('home'); onClose(); }
    },
    {
      id: 'page-about',
      titleHi: 'गुरुकुल परिचय एवं दिनचर्या (About Gurukul)',
      titleEn: 'About Gurukul & Daily Routine',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: Compass,
      action: () => { onNavigate('about'); onClose(); }
    },
    {
      id: 'page-philosophy',
      titleHi: 'दयानन्द शिक्षा दर्शन एवं मूल्य (Philosophy)',
      titleEn: 'Dayanand Educational Philosophy',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: BookOpen,
      action: () => { onNavigate('philosophy'); onClose(); }
    },
    {
      id: 'page-education',
      titleHi: 'पाठ्यक्रम एवं शिक्षा विधाएं (Education)',
      titleEn: 'Education & Academic Programs',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: GraduationCap,
      action: () => { onNavigate('education'); onClose(); }
    },
    {
      id: 'page-admissions',
      titleHi: 'प्रवेश पूछताछ एवं आवेदन (Admissions)',
      titleEn: 'Admission Inquiry Form',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: GraduationCap,
      action: () => { onNavigate('admissions'); onClose(); }
    },
    {
      id: 'page-trust',
      titleHi: 'वैदिक गुरुकुल ट्रस्ट एवं सेवा सहयोग (Trust & Seva)',
      titleEn: 'Vedic Gurukul Trust & Seva Portal',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: HeartHandshake,
      action: () => { onNavigate('trust'); onClose(); }
    },
    {
      id: 'page-gallery',
      titleHi: 'परिसर दीर्घा एवं 360° वर्चुअल टूर (Campus & Gallery)',
      titleEn: 'Campus Photo Gallery & 360° Virtual Tour',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: Compass,
      action: () => { onNavigate('gallery'); onClose(); }
    },
    {
      id: 'page-events',
      titleHi: 'उत्सव, पर्व एवं सूचना पटल (Events & Notices)',
      titleEn: 'Events, Vedic Festivals & Notices',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: Calendar,
      action: () => { onNavigate('events'); onClose(); }
    },
    {
      id: 'page-contact',
      titleHi: 'सम्पर्क एवं परिसर दर्शन नियम (Contact & Rules)',
      titleEn: 'Contact Us & Campus Visit Guidelines',
      categoryHi: 'पृष्ठ नेविगेशन',
      categoryEn: 'Pages',
      icon: Phone,
      action: () => { onNavigate('contact'); onClose(); }
    },

    // Academic Programs
    {
      id: 'prog-prathama',
      titleHi: 'प्रथमा पाठ्यक्रम (कक्षा ६ से ८)',
      titleEn: 'Prathama Program (Classes 6-8)',
      categoryHi: 'पाठ्यक्रम',
      categoryEn: 'Programs',
      icon: BookOpen,
      action: () => { onNavigate('education'); onClose(); }
    },
    {
      id: 'prog-madhyama',
      titleHi: 'मध्यमा पाठ्यक्रम (कक्षा ९ एवं १०)',
      titleEn: 'Madhyama Program (Classes 9-10)',
      categoryHi: 'पाठ्यक्रम',
      categoryEn: 'Programs',
      icon: BookOpen,
      action: () => { onNavigate('education'); onClose(); }
    },
    {
      id: 'prog-shastri',
      titleHi: 'शास्त्री पाठ्यक्रम (स्नातक B.A. Sanskrit)',
      titleEn: 'Shastri Degree (B.A. Sanskrit Shastra)',
      categoryHi: 'पाठ्यक्रम',
      categoryEn: 'Programs',
      icon: BookOpen,
      action: () => { onNavigate('education'); onClose(); }
    },
    {
      id: 'prog-acharya',
      titleHi: 'आचार्य पाठ्यक्रम (परास्नातक M.A. Sanskrit)',
      titleEn: 'Acharya Postgraduate Degree (M.A. Sanskrit)',
      categoryHi: 'पाठ्यक्रम',
      categoryEn: 'Programs',
      icon: BookOpen,
      action: () => { onNavigate('education'); onClose(); }
    },

    // Trust Initiatives
    {
      id: 'trust-balvidya',
      titleHi: 'बाल विद्या सहायता योजना (१००% निःशुल्क शिक्षा)',
      titleEn: 'Bal Vidya Sahayata (100% Free Child Education)',
      categoryHi: 'ट्रस्ट सेवा',
      categoryEn: 'Trust Seva',
      icon: HeartHandshake,
      action: () => { onNavigate('trust'); onClose(); }
    },
    {
      id: 'trust-manuscript',
      titleHi: 'वेद एवं पाण्डुलिपि संरक्षण प्रकल्प',
      titleEn: 'Rare Vedic Manuscript Preservation',
      categoryHi: 'ट्रस्ट सेवा',
      categoryEn: 'Trust Seva',
      icon: HeartHandshake,
      action: () => { onNavigate('trust'); onClose(); }
    },

    // Quick Utility Actions
    {
      id: 'act-theme',
      titleHi: theme === 'parchment' ? 'सांध्य डार्क मोड सक्रिय करें (Sandalwood Dark)' : 'स्वर्ण पार्चमेंट लाइट मोड सक्रिय करें (Parchment Light)',
      titleEn: theme === 'parchment' ? 'Switch to Sandalwood Dark Theme' : 'Switch to Parchment Light Theme',
      categoryHi: 'त्वरित क्रिया',
      categoryEn: 'Actions',
      icon: theme === 'parchment' ? Moon : Sun,
      action: () => { toggleTheme(); onClose(); }
    },
    {
      id: 'act-lang',
      titleHi: language === 'hi' ? 'Switch to English Language' : 'हिन्दी भाषा में बदलें',
      titleEn: language === 'hi' ? 'Switch to English Language' : 'Switch to Hindi Language',
      categoryHi: 'त्वरित क्रिया',
      categoryEn: 'Actions',
      icon: Globe,
      action: () => { toggleLanguage(); onClose(); }
    },
    {
      id: 'act-chime',
      titleHi: 'पवित्र ४३२Hz वैदिक ओंकार नाद बजाएं',
      titleEn: 'Play Sacred 432Hz Om Resonance Chime',
      categoryHi: 'वैदिक नाद',
      categoryEn: 'Sacred Sound',
      icon: Volume2,
      action: () => { vedicAudio.playResonance(432, 6); onClose(); }
    }
  ];

  // Filter items
  const filtered = searchItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.titleHi.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.categoryHi.toLowerCase().includes(q) ||
      item.categoryEn.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          inputRef.current?.focus();
        }
      }
      if (isOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
          e.preventDefault();
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(18, 12, 9, 0.75)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(2rem, 8vh, 6rem) 1rem 2rem 1rem',
        animation: 'fadeIn 180ms ease'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search & Command Palette"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--color-bg-card)',
          border: '1.5px solid var(--color-gold-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          animation: 'scaleUp 200ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Search Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)'
          }}
        >
          <Search size={20} color="var(--color-primary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'गुरुकुल, पाठ्यक्रम, सेवा अथवा दर्शन खोजें... (Ctrl + K)'
                : 'Search courses, philosophy, seva or pages... (Ctrl + K)'
            }
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--color-text-main)',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close Command Palette"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '0.5rem'
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--color-text-muted)' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                {language === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No matching results found.'}
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                    border: isSelected ? '1px solid rgba(197, 154, 78, 0.4)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    marginBottom: '0.2rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                        color: isSelected ? '#FFFFFF' : 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                        {language === 'hi' ? item.titleHi : item.titleEn}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {language === 'hi' ? item.categoryHi : item.categoryEn}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-primary)', opacity: isSelected ? 1 : 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>
                      {language === 'hi' ? 'खोलें' : 'Open'}
                    </span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.65rem 1.25rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            fontSize: '11px',
            color: 'var(--color-text-muted)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>↑↓ नेविगेट करें</span>
            <span>↵ चयन करें</span>
            <span>Esc बन्द करें</span>
          </div>
          <span style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>
            {language === 'hi' ? 'संस्कृत वैदिक गुरुकुल' : 'Sanskrit Vedic Gurukul'}
          </span>
        </div>
      </div>
    </div>
  );
};
