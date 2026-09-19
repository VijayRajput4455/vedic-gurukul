import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { shlokasData } from '../../data/shlokas';
import { vedicAudio } from '../../utils/audio';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, Sparkles, BookOpen } from 'lucide-react';

export const ShlokaAudioPlayer: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentShloka = shlokasData[currentIndex];

  const handleTogglePlay = () => {
    if (isPlaying) {
      vedicAudio.stop();
      setIsPlaying(false);
    } else {
      const started = vedicAudio.playResonance(currentShloka.audioFrequencyHz, 12);
      if (started) {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 12000);
      }
    }
  };

  const handleNext = () => {
    vedicAudio.stop();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % shlokasData.length);
  };

  const handlePrev = () => {
    vedicAudio.stop();
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + shlokasData.length) % shlokasData.length);
  };

  return (
    <div className="vedic-card-ornate" style={{
      maxWidth: '1240px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Top Banner with Source & Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px dashed var(--color-gold-border)',
        paddingBottom: '0.75rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="vedic-badge badge-gold">
            <Sparkles size={12} />
            <span>{language === 'hi' ? currentShloka.titleHi : currentShloka.titleEn}</span>
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <BookOpen size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {currentShloka.vedaSource}
          </span>
        </div>

        {/* Mantra Switcher navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            onClick={handlePrev}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.5rem' }}
            title="Previous Mantra"
            aria-label="Previous Mantra"
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
            {currentIndex + 1} / {shlokasData.length}
          </span>
          <button
            onClick={handleNext}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.5rem' }}
            title="Next Mantra"
            aria-label="Next Mantra"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Sanskrit Verse Presentation */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <p className="shloka-sanskrit" style={{
          fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
          lineHeight: 1.8,
          color: 'var(--color-primary)',
          maxWidth: '1080px',
          margin: '0 auto 1rem auto'
        }}>
          {currentShloka.sanskritVerse}
        </p>

        <p className="shloka-transliteration" style={{ maxWidth: '980px', margin: '0 auto' }}>
          {currentShloka.transliteration}
        </p>
      </div>

      {/* Audio Playback Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        margin: '1.5rem 0'
      }}>
        <button
          onClick={handleTogglePlay}
          className="btn btn-gold btn-sm"
          style={{
            padding: '0.6rem 1.4rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 14px var(--color-gold-glow)'
          }}
          aria-label={isPlaying ? t.common.pauseAudio : t.common.listenRecitation}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? (language === 'hi' ? 'नाद चल रहा है...' : 'Resonance Active...') : (language === 'hi' ? 'वैदिक नाद सुनें (432Hz)' : 'Listen Resonance (432Hz)')}</span>
        </button>

        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Volume2 size={13} /> {currentShloka.audioFrequencyHz}Hz Solfeggio
        </span>
      </div>

      {/* Meaning in Hindi / English */}
      <div style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem',
        border: '1px solid var(--color-border)',
        fontSize: 'var(--text-sm)',
        lineHeight: 1.65
      }}>
        <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span>{language === 'hi' ? 'भावार्थ एवं चिन्तन:' : 'Vedic Meaning & Contemplation:'}</span>
        </div>
        <p style={{ color: 'var(--color-text-main)', margin: 0 }}>
          {language === 'hi' ? currentShloka.hindiMeaning : currentShloka.englishMeaning}
        </p>
      </div>
    </div>
  );
};
