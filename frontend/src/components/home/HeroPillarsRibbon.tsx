import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { BookOpen, Leaf, Users, Sparkles, ArrowRight } from 'lucide-react';

interface HeroPillarsRibbonProps {
  onNavigate: (page: PageId) => void;
}

export const HeroPillarsRibbon: React.FC<HeroPillarsRibbonProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const pillars = [
    {
      id: 'education',
      targetPage: 'education' as PageId,
      icon: BookOpen,
      titleHi: 'वैदिक शिक्षा (Vedic Education)',
      titleEn: 'Vedic Education',
      descHi: 'आधुनिक मस्तिष्क हेतु प्राचीन ग्रन्थों एवं वेदों का सांगोपांग ज्ञान।',
      descEn: 'Rooted in timeless knowledge for modern minds.',
      actionHi: 'विस्तार से जानें',
      actionEn: 'Learn More'
    },
    {
      id: 'character',
      targetPage: 'philosophy' as PageId,
      icon: Leaf,
      titleHi: 'चरित्र निर्माण (Character Building)',
      titleEn: 'Character Building',
      descHi: 'श्रेष्ठ समाज के निर्माण हेतु अनुशासन, नैतिक मूल्य एवं जीवन कौशल।',
      descEn: 'Discipline, values and life skills for a better tomorrow.',
      actionHi: 'विस्तार से जानें',
      actionEn: 'Learn More'
    },
    {
      id: 'seva',
      targetPage: 'trust' as PageId,
      icon: Users,
      titleHi: 'सेवा एवं समाज प्रभाव (Seva & Social Impact)',
      titleEn: 'Seva & Social Impact',
      descHi: 'बाल विद्या सहायता एवं निःशुल्क शिक्षा द्वारा जीवन संवर्धन।',
      descEn: 'Empowering lives through education and support.',
      actionHi: 'विस्तार से जानें',
      actionEn: 'Learn More'
    },
    {
      id: 'future',
      targetPage: 'about' as PageId,
      icon: Sparkles,
      titleHi: 'उज्ज्वल भविष्य (A Brighter Tomorrow)',
      titleEn: 'A Brighter Tomorrow',
      descHi: 'ज्ञानवान्, संस्कारवान् एवं संवेदनशील समाज के निर्माण का संकल्प।',
      descEn: 'Together for a knowledgeable and compassionate society.',
      actionHi: 'विस्तार से जानें',
      actionEn: 'Learn More'
    }
  ];

  return (
    <section
      className="hero-pillars-ribbon"
      style={{
        backgroundColor: '#F8F3E9',
        borderTop: '1px solid rgba(197, 154, 78, 0.35)',
        borderBottom: '1px solid rgba(197, 154, 78, 0.35)',
        position: 'relative',
        zIndex: 5
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            position: 'relative'
          }}
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === pillars.length - 1;

            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.targetPage)}
                style={{
                  padding: 'var(--spacing-8) var(--spacing-6)',
                  borderRight: isLast ? 'none' : '1px solid rgba(197, 154, 78, 0.25)',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-base)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                className="pillar-hover-box"
              >
                <div>
                  {/* Subtle Ornamental Icon */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(197, 154, 78, 0.12)',
                      border: '1px solid rgba(197, 154, 78, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      marginBottom: 'var(--spacing-3)',
                      transition: 'transform var(--transition-fast)'
                    }}
                    className="pillar-icon"
                  >
                    <Icon size={22} color="var(--color-primary-dark)" />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-heading-latin)',
                      color: 'var(--color-text-main)',
                      marginBottom: '0.4rem',
                      fontWeight: 700
                    }}
                  >
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>

                  {/* Subtitle Description */}
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.55,
                      margin: '0 auto var(--spacing-4) auto',
                      maxWidth: '280px'
                    }}
                  >
                    {language === 'hi' ? item.descHi : item.descEn}
                  </p>
                </div>

                {/* Learn More Link */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    letterSpacing: '0.02em',
                    transition: 'gap var(--transition-fast)'
                  }}
                  className="pillar-learn-more"
                >
                  <span>{language === 'hi' ? item.actionHi : item.actionEn}</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pillar-hover-box:hover {
          background-color: rgba(255, 253, 249, 0.85);
        }
        .pillar-hover-box:hover .pillar-icon {
          transform: translateY(-3px) scale(1.05);
          background-color: rgba(197, 154, 78, 0.22);
        }
        .pillar-hover-box:hover .pillar-learn-more {
          gap: 0.6rem;
          color: var(--color-primary-hover);
        }
      `}</style>
    </section>
  );
};
