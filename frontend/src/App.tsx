import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { ScrollControls } from './components/common/ScrollControls';
import { CustomCursor } from './components/common/CustomCursor';
import { VedicBackground } from './components/common/VedicBackground';
import { IdleOmAnimation } from './components/common/IdleOmAnimation';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PhilosophyPage } from './pages/PhilosophyPage';
import { EducationPage } from './pages/EducationPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { TrustPage } from './pages/TrustPage';
import { GalleryPage } from './pages/GalleryPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/animations.css';

const parseHash = (): PageId => {
  const hash = window.location.hash.replace('#', '').toLowerCase() as PageId;
  const validPages: PageId[] = [
    'home',
    'about',
    'philosophy',
    'education',
    'admissions',
    'trust',
    'gallery',
    'events',
    'contact',
    'admin'
  ];
  return validPages.includes(hash) ? hash : 'home';
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(parseHash());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parseHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dynamic Full-Page Sacred Vedic Geometry Pattern & Ambient Background */}
      <VedicBackground />

      {/* 3-Layer Hardware-Accelerated Cybernetic Custom Cursor */}
      <CustomCursor />

      {/* 3-Second Idle Mouse Stillness Sacred Om Animation */}
      <IdleOmAnimation />

      {/* 3.5px Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Header with Logo, Navigation & Theme / Language Controls */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Dynamic View */}
      <main style={{ flex: 1, paddingTop: currentPage === 'home' ? 0 : '86px' }}>
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'philosophy' && <PhilosophyPage onNavigate={navigateTo} />}
        {currentPage === 'education' && <EducationPage onNavigate={navigateTo} />}
        {currentPage === 'admissions' && <AdmissionsPage onNavigate={navigateTo} />}
        {currentPage === 'trust' && <TrustPage onNavigate={navigateTo} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={navigateTo} />}
        {currentPage === 'events' && <EventsPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
        {currentPage === 'admin' && <AdminPage onNavigate={navigateTo} />}
      </main>

      {/* Comprehensive Institutional Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Bottom-Right Quick-Navigation Capsule (ScrollControls) */}
      <ScrollControls />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
