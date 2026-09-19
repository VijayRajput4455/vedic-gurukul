import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShlokaAudioPlayer } from '../common/ShlokaAudioPlayer';
import { Sparkles } from 'lucide-react';

export const DailyVedicVichar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="vedic-badge badge-gold">
              <Sparkles size={13} />
              <span>{t.dailyVichar.tag}</span>
            </span>
          </div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
            {t.dailyVichar.title}
          </h2>
          <p className="section-subtitle">
            {t.common.verifiedSourceNote}
          </p>
          <div className="ornamental-divider">
            <Sparkles size={16} />
          </div>
        </div>

        {/* Shloka Audio Player Card */}
        <ShlokaAudioPlayer />

      </div>
    </section>
  );
};
