import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BaseThemeMode, VedicThemeId, VedicTheme } from '../types/theme';
import { VEDIC_THEMES, getDailyVedicTheme, getVedicThemeById } from '../data/vedicThemes';

interface ThemeContextType {
  // Base display mode (Sandalwood Dark vs Parchment Light)
  theme: BaseThemeMode;
  setTheme: (mode: BaseThemeMode) => void;
  toggleTheme: () => void;

  // 11 Specialized Vedic Sanskrit Themes
  vedicTheme: VedicThemeId;
  activeThemeData: VedicTheme;
  setVedicTheme: (id: VedicThemeId) => void;

  // 24-Hour Daily AI Vedic Cycle
  isDailyMode: boolean;
  toggleDailyMode: () => void;

  // Interactive Theme Selector Modal state
  isThemeModalOpen: boolean;
  openThemeModal: () => void;
  closeThemeModal: () => void;

  // All available themes
  availableThemes: VedicTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Base display mode
  const [theme, setThemeState] = useState<BaseThemeMode>(() => {
    const saved = localStorage.getItem('vedic_gurukul_theme');
    return saved === 'sandalwood' || saved === 'parchment' ? saved : 'sandalwood';
  });

  // 2. Daily mode boolean
  const [isDailyMode, setIsDailyMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vedic_gurukul_daily_theme_mode');
    return saved !== null ? saved === 'true' : true; // Default to daily mode
  });

  // 3. Vedic accent theme
  const [vedicThemeId, setVedicThemeId] = useState<VedicThemeId>(() => {
    const savedManual = localStorage.getItem('vedic_gurukul_vedic_theme') as VedicThemeId | null;
    const isDaily = localStorage.getItem('vedic_gurukul_daily_theme_mode') !== 'false';

    if (isDaily || !savedManual) {
      return getDailyVedicTheme().id;
    }
    return savedManual;
  });

  // 4. Modal Open State
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Active theme object computed
  const activeThemeData = useMemo(() => {
    if (isDailyMode) {
      return getDailyVedicTheme();
    }
    return getVedicThemeById(vedicThemeId);
  }, [isDailyMode, vedicThemeId]);

  // Set Base Theme
  const setTheme = (mode: BaseThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('vedic_gurukul_theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  };

  const toggleTheme = () => {
    const nextMode = theme === 'parchment' ? 'sandalwood' : 'parchment';
    setTheme(nextMode);
  };

  // Set Specific Vedic Theme
  const setVedicTheme = (id: VedicThemeId) => {
    setVedicThemeId(id);
    setIsDailyMode(false);
    localStorage.setItem('vedic_gurukul_daily_theme_mode', 'false');
    localStorage.setItem('vedic_gurukul_vedic_theme', id);
  };

  // Toggle Daily Theme Mode
  const toggleDailyMode = () => {
    setIsDailyMode((prev) => {
      const next = !prev;
      localStorage.setItem('vedic_gurukul_daily_theme_mode', String(next));
      if (next) {
        setVedicThemeId(getDailyVedicTheme().id);
      }
      return next;
    });
  };

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);

  // Dynamic CSS Variable Engine Injection
  useEffect(() => {
    const root = document.documentElement;
    const data = activeThemeData;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-vedic-theme', data.id);

    // Inject Primary & Accent Colors
    root.style.setProperty('--color-primary', data.primaryColor);
    root.style.setProperty('--color-primary-dark', data.primaryColor);
    root.style.setProperty('--color-primary-hover', data.secondaryColor);
    root.style.setProperty(
      '--color-primary-light',
      theme === 'parchment' ? `rgba(${data.rgb}, 0.12)` : `rgba(${data.rgb}, 0.20)`
    );
    root.style.setProperty('--color-primary-glow', `rgba(${data.rgb}, 0.40)`);

    // Gold / Secondary accents
    root.style.setProperty('--color-gold', data.secondaryColor);
    root.style.setProperty('--color-gold-border', `rgba(${data.rgb}, 0.38)`);
    root.style.setProperty('--color-gold-glow', `rgba(${data.rgb}, 0.35)`);

    // High-tech Accent System
    root.style.setProperty('--accent-color', data.primaryColor);
    root.style.setProperty('--accent-hover', data.secondaryColor);
    root.style.setProperty('--accent-gradient', data.gradient);
    root.style.setProperty('--accent-rgb', data.rgb);
    root.style.setProperty('--accent-glow', `rgba(${data.rgb}, 0.50)`);

    // Full-page Sacred Background Geometry Pattern
    root.style.setProperty('--bg-pattern-image', `url("${data.patternSvg}")`);
    root.style.setProperty('--bg-pattern-size', data.patternSize);
    root.style.setProperty(
      '--bg-pattern-opacity',
      String(theme === 'sandalwood' ? data.patternOpacityDark : data.patternOpacityLight)
    );
  }, [theme, activeThemeData]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        vedicTheme: activeThemeData.id,
        activeThemeData,
        setVedicTheme,
        isDailyMode,
        toggleDailyMode,
        isThemeModalOpen,
        openThemeModal,
        closeThemeModal,
        availableThemes: VEDIC_THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
