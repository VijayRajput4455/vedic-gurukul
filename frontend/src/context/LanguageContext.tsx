import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vedic_gurukul_lang');
    return saved === 'hi' || saved === 'en' ? saved : 'hi'; // Default to Hindi or English
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vedic_gurukul_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = language === 'hi' ? hi : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
