import React from 'react';
import type { PageId } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { VisionBanner } from '../components/home/VisionBanner';
import { WelcomeSection } from '../components/home/WelcomeSection';
import { VisionMissionSection } from '../components/home/VisionMissionSection';
import { LearningOfferingsSection } from '../components/home/LearningOfferingsSection';
import { LifeAtGurukulSection } from '../components/home/LifeAtGurukulSection';
import { TeachingsValuesSection } from '../components/home/TeachingsValuesSection';
import { TrustPreview } from '../components/home/TrustPreview';
import { DailyVedicVichar } from '../components/home/DailyVedicVichar';
import { ClosingCtaSection } from '../components/home/ClosingCtaSection';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="homepage-wrapper">
      {/* SECTION 1: Full-Screen Cinematic Hero Section */}
      <div id="home">
        <HeroSection onNavigate={onNavigate} />
      </div>

      {/* Panoramic Deckle-Edge "OUR VISION" Banner */}
      <VisionBanner onNavigate={onNavigate} />

      {/* SECTION 2: Welcome to Our Gurukul (Split Layout with Courtyard Photography) */}
      <div id="welcome">
        <WelcomeSection onNavigate={onNavigate} />
      </div>

      {/* SECTION 3: Our Vision and Mission (Dual Premium Cards) */}
      <div id="vision">
        <VisionMissionSection onNavigate={onNavigate} />
      </div>

      {/* SECTION 4: Sanskrit & Vedic Learning (6 Educational Offering Cards) */}
      <div id="education-offerings">
        <LearningOfferingsSection onNavigate={onNavigate} />
      </div>

      {/* SECTION 5: Life at the Gurukul (Responsive Masonry Gallery & Lightbox) */}
      <div id="life-gallery">
        <LifeAtGurukulSection onNavigate={onNavigate} />
      </div>

      {/* SECTION 6: Teachings and Values (6 Core Dayanand Pillars) */}
      <div id="values">
        <TeachingsValuesSection onNavigate={onNavigate} />
      </div>

      {/* SECTION 7: Our Trust (Vedic Gurukul Trust & Seva) */}
      <div id="trust-preview">
        <TrustPreview onNavigate={onNavigate} />
      </div>

      {/* Interactive Sacred Shloka of the Day & Audio Resonator */}
      <div id="daily-vichar">
        <DailyVedicVichar />
      </div>

      {/* SECTION 8: Call to Action ("Begin Your Journey Towards Knowledge") */}
      <div id="closing-cta">
        <ClosingCtaSection onNavigate={onNavigate} />
      </div>
    </div>
  );
};


