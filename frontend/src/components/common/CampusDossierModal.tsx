import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Download,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Train,
  Plane,
  Car,
  ShieldCheck,
  Flame,
  Compass,
  CheckCircle2,
  FileText,
  Printer,
  Sparkles
} from 'lucide-react';

interface CampusDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusDossierModal: React.FC<CampusDossierModalProps> = ({ isOpen, onClose }) => {
  const { language: currentLang } = useLanguage();
  const [docLang, setDocLang] = useState<'hi' | 'en'>(currentLang || 'hi');
  const isHi = docLang === 'hi';

  if (!isOpen) return null;

  const handlePrint = () => {
    const page1 = document.getElementById('vedic-dossier-page-1');
    const page2 = document.getElementById('vedic-dossier-page-2');
    if (!page1 || !page2) return;

    const printWindow = window.open('', '_blank', 'width=950,height=1050');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${docLang}">
        <head>
          <title>${isHi ? 'वैदिक गुरुकुल — परिसर एवं सम्पर्क संदर्शिका (दस्तावेज)' : 'Vedic Gurukul — Campus & Contact Dossier'}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Gotu&family=Martel:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: A4 portrait;
              margin: 7mm 9mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              font-family: ${isHi ? "'Gotu', 'Martel', serif" : "'Outfit', 'Cinzel', sans-serif"};
              background-color: #FAF6F0;
              color: #2D2319;
              margin: 0;
              padding: 0;
              font-size: 11.5px;
              line-height: 1.45;
            }
            .vedic-page-sheet {
              width: 100%;
              height: 278mm;
              max-height: 278mm;
              box-sizing: border-box;
              background: #FFFDF9;
              border: 3px solid #C59A4E;
              border-radius: 10px;
              padding: 12px;
              position: relative;
              page-break-after: always;
              break-after: page;
              page-break-inside: avoid;
              break-inside: avoid;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              overflow: hidden;
            }
            .vedic-page-sheet:last-of-type {
              page-break-after: avoid;
              break-after: avoid;
            }
            .inner-border {
              border: 1.4px dashed rgba(197, 154, 78, 0.6);
              border-radius: 7px;
              padding: 14px 16px;
              height: 100%;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 210px;
              color: #A65F2B;
              opacity: 0.035;
              pointer-events: none;
              font-family: 'Gotu', serif;
              z-index: 0;
              user-select: none;
            }
            .content-body {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              gap: 9px;
            }
            .shloka-banner {
              background: #F4ECE1;
              border: 1px solid #D8C3A5;
              padding: 5px 10px;
              border-radius: 5px;
              font-style: italic;
              font-size: 10px;
              color: #783E18;
              text-align: center;
              font-weight: 600;
              letter-spacing: 0.02em;
            }
            .institution-title {
              font-family: 'Cinzel', 'Gotu', serif;
              font-size: 18px;
              font-weight: 800;
              color: #A65F2B;
              margin: 2px 0;
              letter-spacing: 0.03em;
              text-transform: uppercase;
              text-align: center;
            }
            .institution-subtitle {
              font-size: 10px;
              color: #6E5A44;
              text-align: center;
              margin-bottom: 2px;
            }
            .institution-loc {
              font-size: 10px;
              color: #A65F2B;
              font-weight: 700;
              text-align: center;
            }
            .header-divider {
              border-bottom: 1.5px solid #C59A4E;
              padding-bottom: 8px;
              margin-bottom: 8px;
            }
            .meta-bar {
              display: flex;
              justify-content: space-between;
              background: #F9F4EB;
              border: 1px solid #E2D3BE;
              padding: 4px 10px;
              border-radius: 5px;
              font-size: 9.5px;
              font-weight: 600;
              color: #5C4B37;
            }
            .section-card {
              background: #FFFFFF;
              border: 1px solid #E6DBCF;
              border-left: 4px solid #A65F2B;
              border-radius: 5px;
              padding: 9px 12px;
            }
            .section-card-gold {
              background: #FFFFFF;
              border: 1px solid #E6DBCF;
              border-left: 4px solid #C59A4E;
              border-radius: 5px;
              padding: 9px 12px;
            }
            .section-heading {
              font-family: 'Cinzel', 'Gotu', serif;
              font-size: 11.5px;
              font-weight: 700;
              color: #783E18;
              margin: 0 0 6px 0;
              display: flex;
              align-items: center;
              gap: 5px;
              border-bottom: 1px solid #F0E6D8;
              padding-bottom: 3px;
            }
            .grid-row-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            .grid-row-3 {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 8px;
            }
            .info-label {
              font-weight: 700;
              color: #4A3A2A;
              font-size: 10px;
              margin-bottom: 1px;
            }
            .info-val {
              color: #5C4B37;
              font-size: 10px;
              line-height: 1.35;
            }
            .rules-list {
              padding-left: 15px;
              margin: 2px 0;
            }
            .rules-list li {
              margin-bottom: 3px;
              color: #4A3A2A;
              font-size: 10px;
              line-height: 1.35;
            }
            .transit-box {
              background: #FAF7F2;
              border: 1px solid #E8DFD3;
              border-radius: 5px;
              padding: 7px 9px;
            }
            .transit-title {
              font-weight: 700;
              color: #A65F2B;
              font-size: 10px;
              margin-bottom: 2px;
            }
            .footer-seal-box {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-top: 1.5px solid #C59A4E;
              padding-top: 8px;
              font-size: 9.5px;
              color: #6E5A44;
              position: relative;
              z-index: 1;
            }
            .seal-badge {
              border: 1px solid #C59A4E;
              color: #783E18;
              padding: 2px 8px;
              border-radius: 12px;
              font-weight: 700;
              font-size: 8.5px;
              text-transform: uppercase;
              background: #FFF9EE;
            }
            .page-num {
              font-weight: 700;
              color: #A65F2B;
            }
          </style>
        </head>
        <body>
          <div class="vedic-page-sheet">
            <div class="inner-border">
              <div class="watermark">ॐ</div>
              ${page1.innerHTML}
            </div>
          </div>
          <div class="vedic-page-sheet">
            <div class="inner-border">
              <div class="watermark">ॐ</div>
              ${page2.innerHTML}
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '940px',
          width: '95%',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-bg-main)',
          border: '2px solid var(--color-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)'
        }}
      >
        {/* Top Control Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1.5px solid var(--color-border)',
          marginBottom: '1.25rem'
        }}>
          {/* Left: Modal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.15rem',
                color: 'var(--color-primary-dark)',
                margin: 0
              }}>
                {isHi ? 'वैदिक परिसर एवं सम्पर्क संदर्शिका (2-पृष्ठ A4 PDF)' : 'Vedic Campus & Contact Dossier (2-Page A4 PDF)'}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>
                {isHi ? 'प्रत्येक पृष्ठ पर पूर्ण वैदिक बॉर्डर एवं अधिकृत विवरण' : 'Each page formatted with independent royal Vedic border'}
              </p>
            </div>
          </div>

          {/* Right: Actions & Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {/* Language Switcher */}
            <div style={{
              display: 'flex',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '3px',
              border: '1px solid var(--color-border)'
            }}>
              <button
                onClick={() => setDocLang('hi')}
                className="btn btn-sm"
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '11px',
                  backgroundColor: isHi ? 'var(--color-primary)' : 'transparent',
                  color: isHi ? '#FFF' : 'var(--color-text-secondary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setDocLang('en')}
                className="btn btn-sm"
                style={{
                  padding: '0.25rem 0.6rem',
                  fontSize: '11px',
                  backgroundColor: !isHi ? 'var(--color-primary)' : 'transparent',
                  color: !isHi ? '#FFF' : 'var(--color-text-secondary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                English
              </button>
            </div>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="btn btn-primary btn-sm"
              style={{ gap: '0.4rem', padding: '0.45rem 1rem' }}
            >
              <Download size={14} />
              <span>{isHi ? 'PDF डाउनलोड / प्रिंट' : 'Download / Print PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem', minWidth: '32px', minHeight: '32px' }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Preview Area */}
        <div style={{
          overflowY: 'auto',
          maxHeight: 'calc(90vh - 120px)',
          paddingRight: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem'
        }}>
          
          {/* ========================================================
              PAGE 1: Official Institutional Dossier & Rules
             ======================================================== */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              padding: '0 0.25rem'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isHi ? 'पृष्ठ १: संस्थागत सम्पर्क एवं परिसर मर्यादा' : 'Page 1: Institutional Contact & Campus Etiquette'}
              </span>
              <span className="vedic-badge badge-saffron" style={{ fontSize: '10px' }}>
                {isHi ? 'पृष्ठ १/२' : 'Page 1 of 2'}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#FFFDF9',
                border: '3px solid #C59A4E',
                borderRadius: 'var(--radius-lg)',
                padding: '12px',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
              }}
            >
              <div
                id="vedic-dossier-page-1"
                style={{
                  border: '1.4px dashed rgba(197, 154, 78, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Watermark ॐ */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '180px',
                  fontFamily: 'var(--font-heading-devanagari)',
                  color: 'var(--color-primary)',
                  opacity: 0.035,
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>
                  ॐ
                </div>

                {/* Shloka Header Banner */}
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-ornate)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.4rem 0.85rem',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading-devanagari)',
                    fontSize: '0.82rem',
                    color: 'var(--color-primary-dark)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}>
                    ॥ ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
                  </span>
                </div>

                {/* Royal Institution Header */}
                <div style={{
                  textAlign: 'center',
                  borderBottom: '1.5px solid var(--color-gold)',
                  paddingBottom: '0.85rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <Flame size={20} color="var(--color-primary)" />
                    <h2 style={{
                      fontFamily: 'var(--font-heading-devanagari)',
                      fontSize: '1.4rem',
                      color: 'var(--color-primary-dark)',
                      margin: 0,
                      letterSpacing: '0.03em'
                    }}>
                      {isHi ? 'संस्कृत वैदिक गुरुकुल एवं ट्रस्ट' : 'SANSKRIT VEDIC GURUKUL & TRUST'}
                    </h2>
                    <Flame size={20} color="var(--color-primary)" />
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 0.2rem 0' }}>
                    {isHi
                      ? 'प्राचीन ऋषि परम्परा, वेदाध्ययन, चरित्र निर्माण एवं निःशुल्क गुरुकुल शिक्षा संस्थान'
                      : 'Center for Vedic Studies, Sanskrit Scriptures, Character Building & Holistic Gurukul Education'}
                  </p>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-primary)', fontWeight: 600 }}>
                    {isHi ? 'हरिद्वार, उत्तराखण्ड, भारत — २४९४०८' : 'Haridwar, Uttarakhand, India — 249408'}
                  </div>
                </div>

                {/* Metadata Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.35rem 0.75rem',
                  fontSize: '10.5px',
                  color: 'var(--color-text-secondary)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div>
                    <strong>{isHi ? 'दस्तावेज ID:' : 'Doc ID:'}</strong> SVG-DOSSIER-{new Date().getFullYear()}
                  </div>
                  <div>
                    <strong>{isHi ? 'जीपीएस स्थिति:' : 'GPS:'}</strong> 29.9457° N, 78.1642° E
                  </div>
                  <div>
                    <strong>{isHi ? 'अद्यतन तिथि:' : 'Updated:'}</strong> {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Section 1: Official Institutional Contact Details */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-primary-dark)',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <MapPin size={15} color="var(--color-primary)" />
                    <span>{isHi ? '१. आधिकारिक सम्पर्क एवं परिसर पता' : '1. Official Address & Contact Points'}</span>
                  </h4>

                  <div className="grid-2" style={{ gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                        {isHi ? 'गुरुकुल एवं ट्रस्ट परिसर पता:' : 'Campus Location:'}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                        {isHi
                          ? 'संस्कृत वैदिक गुरुकुल एवं वैदिक गुरुकुल ट्रस्ट, गंगा तट मार्ग, हरिद्वार (उत्तराखण्ड), भारत — २४९४०८'
                          : 'Sanskrit Vedic Gurukul Campus, Ganga Coastline Marg, Haridwar (Uttarakhand), India — 249408'}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                        {isHi ? 'हेल्पलाइन एवं फोन:' : 'Telephone & Helpline:'}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                        +91 98765 43210 / +91 1334 220000 (09:00 AM – 05:00 PM)
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        <strong>Email:</strong> contact@vedicgurukul.org / trust@vedicgurukul.org
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Visiting Hours & Daily Schedule */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-gold-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-gold-dark)',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <Clock size={15} color="var(--color-gold-dark)" />
                    <span>{isHi ? '२. परिसर दर्शन एवं दैनिक समय-सारणी' : '2. Visiting Hours & Schedule'}</span>
                  </h4>

                  <div className="grid-2" style={{ gap: '0.75rem' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                        {isHi ? 'सामान्य आगंतुक दर्शन समय:' : 'General Guest Timings:'}
                      </div>
                      <div>{isHi ? 'प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक' : 'Daily: 9:00 AM to 5:00 PM'}</div>
                      <div style={{ marginTop: '2px' }}>
                        <strong>{isHi ? 'अभिभावक भेंट समय:' : 'Parent Meeting Hours:'}</strong> {isHi ? 'सायं ४:४५ से ५:४५' : '4:45 PM – 5:45 PM daily'}
                      </div>
                    </div>

                    <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '2px' }}>
                        {isHi ? 'दैनिक यज्ञ एवं आरती समय:' : 'Daily Yajna & Hawan Schedule:'}
                      </div>
                      <div>{isHi ? 'प्रातःकालीन यज्ञ: ०६:०० से ०७:३० बजे' : 'Morning Hawan: 6:00 AM – 7:30 AM'}</div>
                      <div>{isHi ? 'सायंकालीन संध्या व आरती: ०६:३० से ०७:३० बजे' : 'Evening Sandhya: 6:30 PM – 7:30 PM'}</div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Campus Etiquette & Rules */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-primary-dark)',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <ShieldCheck size={15} color="var(--color-primary)" />
                    <span>{isHi ? '३. परिसर दर्शन मर्यादा एवं नियम' : '3. Campus Etiquette & Visiting Rules'}</span>
                  </h4>

                  <ul style={{
                    margin: 0,
                    paddingLeft: '1.2rem',
                    fontSize: '10.5px',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem'
                  }}>
                    <li>
                      {isHi
                        ? 'परिसर में पूर्ण सात्त्विक, नशामुक्त, धूम्रपान रहित एवं शान्त आध्यात्मिक वातावरण बनाए रखें।'
                        : 'Maintain a peaceful, tobacco-free, strictly vegetarian, and sattvic atmosphere throughout the premises.'}
                    </li>
                    <li>
                      {isHi
                        ? 'यज्ञशाला, ग्रंथागार एवं अध्ययन कक्षों में प्रवेश से पूर्व निर्धारित स्थान पर जूते-चप्पल उतारें।'
                        : 'Footwear must be removed at designated shoe counters before entering the Yajnashala and Classrooms.'}
                    </li>
                    <li>
                      {isHi
                        ? 'परिसर दर्शन के समय मर्यादित एवं पारम्परिक भारतीय वेशभूषा का पालन करें।'
                        : 'Visitors are requested to observe modest and traditional attire during their visit.'}
                    </li>
                    <li>
                      {isHi
                        ? 'यज्ञशाला एवं अध्ययनरत विद्यार्थियों की फोटोग्राफी हेतु कार्यालय से पूर्व अनुमति आवश्यक है।'
                        : 'Photography during sacred Hawan rituals and student study courtyards requires prior permission.'}
                    </li>
                  </ul>
                </div>

                {/* Page 1 Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  borderTop: '1.5px solid var(--color-gold)',
                  paddingTop: '0.65rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                    {isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार (उत्तराखण्ड)' : 'Sanskrit Vedic Gurukul Trust, Haridwar (Uttarakhand)'}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    border: '1px solid var(--color-primary)'
                  }}>
                    <CheckCircle2 size={12} />
                    <span>{isHi ? 'पृष्ठ १ / २ (जारी आगे)' : 'Page 1 of 2 (Continued Overleaf)'}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================
              PAGE 2: Transit Navigation Hub & Campus Landmarks
             ======================================================== */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
              padding: '0 0.25rem'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {isHi ? 'पृष्ठ २: आवागमन मार्गदर्शन एवं प्रमुख परिसर स्थल' : 'Page 2: Transit Guide & Campus Landmarks'}
              </span>
              <span className="vedic-badge badge-saffron" style={{ fontSize: '10px' }}>
                {isHi ? 'पृष्ठ २/२' : 'Page 2 of 2'}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#FFFDF9',
                border: '3px solid #C59A4E',
                borderRadius: 'var(--radius-lg)',
                padding: '12px',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
              }}
            >
              <div
                id="vedic-dossier-page-2"
                style={{
                  border: '1.4px dashed rgba(197, 154, 78, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Watermark ॐ */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '180px',
                  fontFamily: 'var(--font-heading-devanagari)',
                  color: 'var(--color-primary)',
                  opacity: 0.035,
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}>
                  ॐ
                </div>

                {/* Page 2 Header */}
                <div style={{
                  textAlign: 'center',
                  borderBottom: '1.5px solid var(--color-gold)',
                  paddingBottom: '0.65rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                    <Compass size={18} color="var(--color-primary)" />
                    <h3 style={{
                      fontFamily: 'var(--font-heading-devanagari)',
                      fontSize: '1.25rem',
                      color: 'var(--color-primary-dark)',
                      margin: 0,
                      letterSpacing: '0.03em'
                    }}>
                      {isHi ? 'परिसर आवागमन एवं प्रमुख स्थल संदर्शिका' : 'CAMPUS NAVIGATION & LANDMARKS DIRECTORY'}
                    </h3>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
                    {isHi ? 'संस्कृत वैदिक गुरुकुल — पावन गंगा तट, हरिद्वार' : 'Sanskrit Vedic Gurukul — Holy Ganges Bank, Haridwar'}
                  </div>
                </div>

                {/* Section 4: Multi-Modal Transit (How to Reach) */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-gold-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-gold-dark)',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <Navigation size={15} color="var(--color-gold-dark)" />
                    <span>{isHi ? '४. आवागमन साधन (गुरुकुल कैसे पहुँचें)' : '4. How to Reach (Transit Guide)'}</span>
                  </h4>

                  <div className="grid-3" style={{ gap: '0.65rem' }}>
                    <div style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '10.5px', marginBottom: '2px' }}>
                        <Train size={13} />
                        <span>{isHi ? 'रेलवे (HW जंक्शन)' : 'By Train (Haridwar HW)'}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {isHi
                          ? 'हरिद्वार जंक्शन से १२ किमी। २४x७ ऑटो, टैक्सी एवं ई-रिक्शा सीधे मुख्य द्वार तक उपलब्ध।'
                          : '12 km from Haridwar Jn. 24/7 prepaid taxis and autos direct to main campus gate.'}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--color-gold-dark)', fontSize: '10.5px', marginBottom: '2px' }}>
                        <Plane size={13} />
                        <span>{isHi ? 'हवाई मार्ग (देहरादून DED)' : 'By Air (Dehradun DED)'}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {isHi
                          ? 'जौली ग्रांट विमानपत्तन से ३८ किमी। NH-58 मार्ग द्वारा ४५ मिनट में सीधी टैक्सी सेवा।'
                          : '38 km from Jolly Grant Airport. Direct 45-min highway drive via NH-58.'}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--color-primary)', fontSize: '10.5px', marginBottom: '2px' }}>
                        <Car size={13} />
                        <span>{isHi ? 'सड़क मार्ग (NH 58)' : 'By Road (NH-58)'}</span>
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {isHi
                          ? 'दिल्ली-हरिद्वार एक्सप्रेसवे से ४.५ घंटे। परिसर में विशाल निःशुल्क पार्किंग व्यवस्था।'
                          : '4.5 hrs from Delhi NCR via NH-58. Free visitor parking available on campus.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Key Campus Landmarks */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-primary-dark)',
                    margin: '0 0 0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <Compass size={15} color="var(--color-primary)" />
                    <span>{isHi ? '५. परिसर के प्रमुख स्थल एवं भवन' : '5. Campus Landmarks & Zones'}</span>
                  </h4>

                  <div className="grid-2" style={{ gap: '0.6rem', fontSize: '10.5px', color: 'var(--color-text-secondary)' }}>
                    <div>
                      <strong>• {isHi ? 'दिव्य यज्ञशाला:' : 'Divya Yajnashala:'}</strong> {isHi ? 'दैनिक प्रातः एवं सायं वैदिक अग्निहोत्र प्रांगण' : 'Sacred fire arena for daily Vedic Agnihotra'}
                    </div>
                    <div>
                      <strong>• {isHi ? 'शास्त्र ग्रंथागार:' : 'Shastra Granthagar:'}</strong> {isHi ? '५,०००+ दुर्लभ संस्कृत पाण्डुलिपियां एवं ग्रन्थ' : 'Library with 5,000+ rare Sanskrit scriptures'}
                    </div>
                    <div>
                      <strong>• {isHi ? 'गुरुकुल निवास:' : 'Brahmacharya Niwas:'}</strong> {isHi ? 'विद्यार्थी आवास, सात्त्विक भोजनालय व ध्यान कक्ष' : 'Residential quarters, dining hall & sadhana halls'}
                    </div>
                    <div>
                      <strong>• {isHi ? 'आयुर्वेद वन व गौशाला:' : 'Ayurveda & Gaushala:'}</strong> {isHi ? 'देशी गौ-सेवा केन्द्र एवं औषधीय वनस्पति वाटिका' : 'Indigenous cow sanctuary & medicinal herb garden'}
                    </div>
                  </div>
                </div>

                {/* Section 6: Reception & Helpdesk Quick Assistance */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderLeft: '4.5px solid var(--color-gold-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-gold-dark)',
                    margin: '0 0 0.4rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    borderBottom: '1px solid #F4EDE2',
                    paddingBottom: '0.25rem'
                  }}>
                    <Phone size={14} color="var(--color-gold-dark)" />
                    <span>{isHi ? '६. स्वागत कक्ष एवं आपातकालीन सहायता' : '6. Reception & Emergency Contacts'}</span>
                  </h4>

                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <div>
                      <strong>{isHi ? 'स्वागत कक्ष:' : 'Reception Desk:'}</strong> +91 98765 43210 (प्रातः ०९:०० से सायं ०५:०० IST)
                    </div>
                    <div>
                      <strong>{isHi ? 'गुरुकुल द्वार १ (मुख्य प्रवेश):' : 'Main Gate 1 Access:'}</strong> NH-58 से केवल ३०० मीटर, निःशुल्क आगंतुक वाहन पार्किंग
                    </div>
                  </div>
                </div>

                {/* Page 2 Footer with Sanskrit Benediction */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  borderTop: '1.5px solid var(--color-gold)',
                  paddingTop: '0.65rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--color-text-muted)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                      ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
                    </div>
                    <div style={{ fontSize: '9.5px' }}>{isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार' : 'Sanskrit Vedic Gurukul Trust, Haridwar'}</div>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    border: '1px solid var(--color-primary)'
                  }}>
                    <CheckCircle2 size={12} />
                    <span>{isHi ? 'पृष्ठ २ / २ (संपूर्ण)' : 'Page 2 of 2 (Complete)'}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
