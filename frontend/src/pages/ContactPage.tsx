import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck,
  Info,
  Navigation,
  Compass,
  ExternalLink,
  Copy,
  Check,
  Train,
  Plane,
  Car,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Building,
  Landmark,
  ChevronRight
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

interface CampusLandmark {
  id: string;
  nameHi: string;
  nameEn: string;
  descHi: string;
  descEn: string;
  zoneHi: string;
  zoneEn: string;
  icon: typeof Landmark;
  badgeColor: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { addContactMessage } = useData();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'general' | 'admissions' | 'trust' | 'visit' | 'media'>('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Map Feature States
  const [mapMode, setMapMode] = useState<'m' | 'k' | 'p'>('m'); // m: roadmap, k: satellite, p: terrain
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);
  const [selectedLandmark, setSelectedLandmark] = useState<string>('yajnashala');

  const gpsCoordinates = "29.9457° N, 78.1642° E";
  const mapEmbedUrl = `https://maps.google.com/maps?q=Haridwar%20Uttarakhand%20India&t=${mapMode}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Haridwar+Uttarakhand+India";
  const googleMapsViewUrl = "https://www.google.com/maps/search/?api=1&query=Haridwar+Uttarakhand+India";

  const campusLandmarks: CampusLandmark[] = [
    {
      id: 'yajnashala',
      nameHi: 'मुख्य यज्ञशाला एवं वेद मन्दिर',
      nameEn: 'Main Yajnashala & Veda Mandir',
      descHi: 'दैनिक प्रातः एवं सायं अग्निहोत्र तथा वैदिक मन्त्रोच्चार साधना स्थल।',
      descEn: 'Sacred central hall for daily morning & evening Vedic Hawan and Agnihotra.',
      zoneHi: 'केंद्रीय परिसर (Zone A)',
      zoneEn: 'Central Quadrant (Zone A)',
      icon: Landmark,
      badgeColor: 'badge-saffron'
    },
    {
      id: 'library',
      nameHi: 'हस्तलिखित ग्रन्थ संग्रहालय एवं पुस्तकालय',
      nameEn: 'Manuscripts Library & Grantha Nilayam',
      descHi: 'सहस्रों दुर्लभ वैदिक ग्रन्थ, व्याकरण सूत्र एवं दार्शनिक भाष्यों का शोध केंद्र।',
      descEn: 'Extensive research archives of rare Sanskrit manuscripts and philosophical commentaries.',
      zoneHi: 'अकादमिक ब्लॉक (Zone B)',
      zoneEn: 'Academic Wing (Zone B)',
      icon: Building,
      badgeColor: 'badge-gold'
    },
    {
      id: 'gaushala',
      nameHi: 'वैदिक गो-संवर्धन एवं कामधेनु केंद्र',
      nameEn: 'Vedic Gaushala & Dairy Sanctuary',
      descHi: 'देशी गीर व साहीवाल गायों का प्राकृतिक संरक्षण तथा शुद्ध हविष्य घृत निर्माण।',
      descEn: 'Natural sanctuary for indigenous cows providing pure A2 ghee for daily rituals.',
      zoneHi: 'पर्यावरण प्रांगण (Zone C)',
      zoneEn: 'Eco Sanctorum (Zone C)',
      icon: Sparkles,
      badgeColor: 'badge-gold'
    },
    {
      id: 'trust-office',
      nameHi: 'वैदिक गुरुकुल ट्रस्ट प्रशासनिक भवन',
      nameEn: 'Vedic Gurukul Trust HQ & Reception',
      descHi: 'दान सहयोग, छात्रवृत्ति सहायता, प्रवेश परामर्श एवं अतिथि पंजियन कार्यालय।',
      descEn: 'Administrative office for seva donations, scholarships, and visitor assistance.',
      zoneHi: 'प्रवेश द्वार १ (Gate 1)',
      zoneEn: 'Main Entrance (Gate 1)',
      icon: Compass,
      badgeColor: 'badge-saffron'
    }
  ];

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(gpsCoordinates);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 10));
  };

  const handleResetMap = () => {
    setZoomLevel(14);
    setMapMode('m');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await addContactMessage({
        name,
        email,
        phone,
        inquiryType,
        message
      });

      setSubmissionSuccess(res.referenceNo);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      
      {/* 1. Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <Mail size={13} />
            <span>{language === 'hi' ? 'सम्पर्क एवं मार्गदर्शन' : 'Contact & Campus Visit'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'गुरुकुल एवं ट्रस्ट से सम्पर्क करें' : 'Get in Touch with Gurukul & Trust'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'प्रवेश, ट्रस्ट सहयोग, शोध जिज्ञासा अथवा परिसर दर्शन हेतु सादर स्वागत है।'
              : 'Inquiries regarding admissions, trust initiatives, research collaborations, and campus visits.'}
          </p>
        </div>
      </section>

      {/* 2. Contact Information & Form Grid */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          
          <div className="grid-2" style={{ gap: 'var(--spacing-12)', alignItems: 'flex-start' }}>
            
            {/* Left: Official Contact Details & Visiting Guidelines */}
            <div>
              <div className="section-tag">
                <span className="vedic-badge badge-gold">
                  {language === 'hi' ? 'संस्थागत सम्पर्क सूत्र' : 'Official Details'}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.8rem', marginBottom: '1.25rem' }}>
                {language === 'hi' ? 'कार्यालय एवं परिसर पता' : 'Office & Campus Address'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: 'var(--spacing-8)' }}>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {language === 'hi' ? 'गुरुकुल एवं ट्रस्ट का पता' : 'Gurukul & Trust Campus'}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                      {language === 'hi'
                        ? 'संस्कृत वैदिक गुरुकुल एवं वैदिक गुरुकुल ट्रस्ट, गंगा तट मार्ग, हरिद्वार (उत्तराखण्ड), भारत — २४९४०८'
                        : 'Sanskrit Vedic Gurukul & Vedic Gurukul Trust Campus, Ganga Coastline Marg, Haridwar (Uttarakhand), India — 249408'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-gold-light)',
                    color: 'var(--color-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {language === 'hi' ? 'हेल्पलाइन एवं फोन' : 'Telephone & Helpline'}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      +91 98765 43210 / +91 1334 220000 (कार्यालय समय: प्रातः ९ से सायं ५)
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-secondary-light)',
                    color: 'var(--color-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {language === 'hi' ? 'ईमेल सम्पर्क' : 'Email Address'}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      contact@vedicgurukul.org / trust@vedicgurukul.org
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid var(--color-border)'
                  }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      {language === 'hi' ? 'परिसर दर्शन समय' : 'Visiting Hours for Guests & Parents'}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      {language === 'hi' ? 'प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक (पूर्व सूचना अनुशंसित)' : 'Daily: 9:00 AM to 5:00 PM (Prior Appointment Recommended)'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Visiting Guidelines Callout */}
              <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-ornate)',
                borderLeft: '4.5px solid var(--color-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Info size={16} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    {language === 'hi' ? 'परिसर दर्शन मर्यादा एवं नियम' : 'Campus Etiquette & Rules'}
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, paddingLeft: '1rem' }}>
                  <li>{language === 'hi' ? 'परिसर में पूर्ण सात्त्विक, नशामुक्त एवं शान्त वातावरण बनाए रखें।' : 'Maintain a peaceful, tobacco-free, and sattvic atmosphere.'}</li>
                  <li>{language === 'hi' ? 'यज्ञशाला एवं अध्ययन कक्षों में जूते-चप्पल बाहर उतारें।' : 'Remove footwear before entering the Yajnashala and classrooms.'}</li>
                  <li>{language === 'hi' ? 'अभिभावक छात्रों से भोजन समय अथवा सायं ४:४५ से ५:४५ के मध्य मिल सकते हैं।' : 'Parents may meet students during scheduled visiting hours.'}</li>
                </ul>
              </div>

            </div>

            {/* Right: Categorized Contact Form */}
            <div className="vedic-card-ornate">
              <h3 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.4rem',
                color: 'var(--color-primary-dark)',
                marginBottom: '1rem'
              }}>
                {language === 'hi' ? 'सन्देश अथवा पूछताछ भेजें' : 'Send an Inquiry / Message'}
              </h3>

              {submissionSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-fade-in">
                  <CheckCircle size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ color: 'var(--color-success)', marginBottom: '0.5rem' }}>
                    {language === 'hi' ? 'सन्देश सफलतापूर्वक प्राप्त हुआ!' : 'Message Sent Successfully!'}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    {language === 'hi'
                      ? `आपकी सन्दर्भ संख्या ${submissionSuccess} है। हमारा कार्यालय शीघ्र आपसे सम्पर्क करेगा।`
                      : `Your tracking reference is ${submissionSuccess}. Our administration will respond shortly.`}
                  </p>
                  <button onClick={() => setSubmissionSuccess(null)} className="btn btn-secondary btn-sm">
                    <span>{language === 'hi' ? 'अन्य सन्देश भेजें' : 'Send Another Message'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  
                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'पूछताछ का प्रकार' : 'Inquiry Category'} <span className="required">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                    >
                      <option value="general">{language === 'hi' ? 'सामान्य जानकारी' : 'General Inquiry'}</option>
                      <option value="admissions">{language === 'hi' ? 'गुरुकुल प्रवेश' : 'Admissions'}</option>
                      <option value="trust">{language === 'hi' ? 'ट्रस्ट एवं सेवा सहयोग' : 'Trust & Seva Support'}</option>
                      <option value="visit">{language === 'hi' ? 'परिसर दर्शन / यात्रा' : 'Campus Visit Appointment'}</option>
                      <option value="media">{language === 'hi' ? 'शोध अथवा मीडिया' : 'Research / Media'}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name'} <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Dr. Surendra Arya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        {language === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        {language === 'hi' ? 'फोन नम्बर' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'आपका सन्देश / प्रश्न' : 'Your Message / Inquiry Details'} <span className="required">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="form-control"
                      placeholder={language === 'hi' ? 'यहाँ अपना विस्तृत सन्देश लिखें...' : 'Type your detailed inquiry or question here...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? t.common.submitting : (language === 'hi' ? 'सन्देश प्रेषित करें' : 'Send Message')}</span>
                  </button>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                    marginTop: '0.75rem',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={13} color="var(--color-primary)" />
                    <span>{language === 'hi' ? 'आपकी जानकारी पूर्णतः सुरक्षित एवं गोपनीय रखी जाती है।' : 'Your contact information is strictly confidential.'}</span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE CAMPUS MAP & GEOGRAPHIC HUB */}
      <section className="section-pad" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">

          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                <Navigation size={13} />
                <span>{language === 'hi' ? 'भौगोलिक स्थिति एवं मार्गदर्शिका' : 'Geographic Location & Map'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)' }}>
              {language === 'hi' ? 'गुरुकुल परिसर लाइव मानचित्र एवं आवागमन' : 'Campus Live Map & Navigation Hub'}
            </h2>
            <div className="ornamental-divider">
              <Compass size={18} />
            </div>
            <p className="section-desc">
              {language === 'hi'
                ? 'हरिद्वार स्थित पावन गंगा तट के निकट शांत एवं सुरम्य वातावरण में अवस्थित गुरुकुल परिसर की लाइव सैटेलाइट व सड़क मार्ग स्थिति।'
                : 'Explore our peaceful campus location along the serene banks of the Holy Ganges in Haridwar with interactive map controls, GPS data, and live navigation.'}
            </p>
          </div>

          {/* Interactive Map Shell */}
          <div className="vedic-card-ornate" style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--spacing-12)' }}>
            
            {/* Top Interactive Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-bg-card)',
              borderBottom: '1.5px solid var(--color-border)'
            }}>
              {/* Left: Location Pin & Coordinates */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="vedic-badge badge-saffron" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={13} />
                  <span>Haridwar, Uttarakhand</span>
                </span>
                
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)'
                }}>
                  <span>GPS: {gpsCoordinates}</span>
                  <button
                    onClick={handleCopyCoords}
                    title="Copy GPS Coordinates"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: copiedCoords ? 'var(--color-success)' : 'var(--color-primary)',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {copiedCoords ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  {copiedCoords && (
                    <span style={{ fontSize: '10px', color: 'var(--color-success)', fontWeight: 600 }}>
                      {language === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Map Layer Switcher & Zoom Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                
                {/* Layer Mode Switcher */}
                <div style={{
                  display: 'flex',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '3px',
                  border: '1px solid var(--color-border)'
                }}>
                  <button
                    onClick={() => setMapMode('m')}
                    className="btn btn-sm"
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '11px',
                      backgroundColor: mapMode === 'm' ? 'var(--color-primary)' : 'transparent',
                      color: mapMode === 'm' ? '#FFF' : 'var(--color-text-secondary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {language === 'hi' ? 'मानचित्र' : 'Roadmap'}
                  </button>
                  <button
                    onClick={() => setMapMode('k')}
                    className="btn btn-sm"
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '11px',
                      backgroundColor: mapMode === 'k' ? 'var(--color-primary)' : 'transparent',
                      color: mapMode === 'k' ? '#FFF' : 'var(--color-text-secondary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <Layers size={11} style={{ marginRight: '3px' }} />
                    {language === 'hi' ? 'सैटेलाइट' : 'Satellite'}
                  </button>
                  <button
                    onClick={() => setMapMode('p')}
                    className="btn btn-sm"
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '11px',
                      backgroundColor: mapMode === 'p' ? 'var(--color-primary)' : 'transparent',
                      color: mapMode === 'p' ? '#FFF' : 'var(--color-text-secondary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {language === 'hi' ? 'स्थलाकृति' : 'Terrain'}
                  </button>
                </div>

                {/* Zoom & Reset Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem' }}
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem' }}
                  >
                    <ZoomOut size={14} />
                  </button>
                  <button
                    onClick={handleResetMap}
                    title="Reset Campus View"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem' }}
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* External Maps Link */}
                <a
                  href={googleMapsViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '11px', gap: '4px' }}
                >
                  <span>{language === 'hi' ? 'बड़ा मैप खोलें' : 'Full Map'}</span>
                  <ExternalLink size={12} />
                </a>

              </div>
            </div>

            {/* Embedded Live Iframe Map */}
            <div style={{ position: 'relative', width: '100%', height: '440px', backgroundColor: '#e5e3df' }}>
              <iframe
                title="Vedic Gurukul Campus Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Live Directions Overlay Box */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                backgroundColor: 'rgba(255, 253, 249, 0.94)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid var(--color-border-ornate)',
                borderLeft: '4.5px solid var(--color-primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1.15rem',
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
                maxWidth: '320px',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    {language === 'hi' ? 'गुरुकुल द्वार १ (मुख्य प्रवेश)' : 'Gurukul Gate 1 (Main Access)'}
                  </h4>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 0.6rem 0', lineHeight: 1.4 }}>
                  {language === 'hi'
                    ? 'राष्ट्रीय राजमार्ग ५८ से केवल ३०० मीटर, निःशुल्क आगंतुक वाहन पार्किंग उपलब्ध।'
                    : '300m off National Highway 58 with dedicated free visitor parking.'}
                </p>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', padding: '0.35rem 0.65rem', fontSize: '11px' }}
                >
                  <Navigation size={13} />
                  <span>{language === 'hi' ? 'लाइव दिशा-निर्देश प्राप्त करें' : 'Get Live Driving Directions'}</span>
                </a>
              </div>
            </div>

            {/* Bottom Campus Landmarks Bar */}
            <div style={{
              backgroundColor: 'var(--color-bg-card)',
              padding: '1.25rem',
              borderTop: '1px solid var(--color-border)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.85rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-text-main)', margin: 0 }}>
                  {language === 'hi' ? 'परिसर के प्रमुख स्थल एवं भवन:' : 'Campus Zones & Key Landmarks:'}
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  {language === 'hi' ? 'स्थल विवरण देखने के लिए क्लिक करें' : 'Click a zone for landmark details'}
                </span>
              </div>

              {/* Landmark Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem'
              }}>
                {campusLandmarks.map((lm) => {
                  const Icon = lm.icon;
                  const isSelected = selectedLandmark === lm.id;
                  return (
                    <div
                      key={lm.id}
                      onClick={() => setSelectedLandmark(lm.id)}
                      style={{
                        padding: '0.75rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'var(--color-bg-secondary)' : 'transparent',
                        border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Icon size={15} color={isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                          <span style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)'
                          }}>
                            {language === 'hi' ? lm.nameHi : lm.nameEn}
                          </span>
                        </div>
                        <span className={`vedic-badge ${lm.badgeColor}`} style={{ fontSize: '9px', padding: '0.15rem 0.45rem' }}>
                          {language === 'hi' ? lm.zoneHi : lm.zoneEn}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                        {language === 'hi' ? lm.descHi : lm.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 4. Multi-Modal Transit Guide (How to Reach) */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
              <div className="section-tag">
                <span className="vedic-badge badge-gold">
                  {language === 'hi' ? 'यात्रा मार्गदर्शन' : 'Transit Guide'}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.6rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                {language === 'hi' ? 'गुरुकुल कैसे पहुँचें? (परिवहन साधन)' : 'How to Reach Sanskrit Vedic Gurukul'}
              </h3>
            </div>

            <div className="grid-3" style={{ gap: 'var(--spacing-8)' }}>
              
              {/* By Train */}
              <div className="vedic-card-ornate">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Train size={24} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? 'रेलवे मार्ग (निकटतम स्टेशन)' : 'By Train (Railway)'}
                </h4>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, marginBottom: '0.65rem' }}>
                  {language === 'hi' ? 'हरिद्वार जंक्शन (HW) — १२ किमी' : 'Haridwar Junction (HW) — 12 km'}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi'
                    ? 'दिल्ली, मुम्बई, लखनऊ, कोलकाता व वाराणसी से सीधे सुपरफास्ट एक्सप्रेस ट्रेनें उपलब्ध। स्टेशन निकास द्वार से २४x७ ऑटो, ई-रिक्शा एवं टैक्सी सेवा उपलब्ध है।'
                    : 'Direct high-speed & superfast trains from Delhi, Mumbai, Kolkata, Lucknow, and Varanasi. 24/7 prepaid taxis and e-rickshaws available outside the station.'}
                </p>
              </div>

              {/* By Air */}
              <div className="vedic-card-ornate">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-gold-light)',
                  color: 'var(--color-gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Plane size={24} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-gold-dark)', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? 'हवाई मार्ग (निकटतम विमानपत्तन)' : 'By Air (Airport)'}
                </h4>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, marginBottom: '0.65rem' }}>
                  {language === 'hi' ? 'जौली ग्रांट एयरपोर्ट, देहरादून — ३८ किमी' : 'Jolly Grant Airport, Dehradun (DED) — 38 km'}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi'
                    ? 'दिल्ली, मुम्बई, बंगलुरु व अहमदाबाद से नियमित दैनिक उड़ानें। एयरपोर्ट से राष्ट्रीय राजमार्ग ५८ द्वारा ४५ मिनट में सीधी टैक्सी गुरुकुल परिसर पहुँचती है।'
                    : 'Regular daily flights from Delhi, Mumbai, Bengaluru, and Ahmedabad. Direct highway connectivity (45 mins drive via NH-58) to Gurukul reception.'}
                </p>
              </div>

              {/* By Road */}
              <div className="vedic-card-ornate">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Car size={24} />
                </div>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? 'सड़क मार्ग एवं बस सेवा' : 'By Road & Expressways'}
                </h4>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-gold)', fontWeight: 600, marginBottom: '0.65rem' }}>
                  {language === 'hi' ? 'दिल्ली-मेरठ-हरिद्वार एक्सप्रेसवे (NH 58)' : 'Delhi-Haridwar Highway (NH-58)'}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi'
                    ? 'दिल्ली एनसीआर से ४.५ घंटे की यात्रा। हरिद्वार बस टर्मिनल (१० किमी) तक नियमित वातानुकूलित बसें उपलब्ध हैं। परिसर में विशाल निःशुल्क पार्किंग व्यवस्था है।'
                    : 'Smooth 4.5-hour expressway drive from Delhi NCR. Regular AC & State Volvo buses to Haridwar Central Bus Stand (10 km). Ample free visitor parking on-site.'}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Campus Assistance Quick Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-main)',
        padding: 'var(--spacing-10) 0'
      }}>
        <div className="container">
          <div className="vedic-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '1.5rem 2rem'
          }}>
            <div>
              <span className="vedic-badge badge-saffron" style={{ marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'मार्गदर्शन एवं सहायता डेस्क' : 'Reception & Helpdesk'}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                {language === 'hi' ? 'क्या आपको परिसर आगमन में कोई सहायता चाहिए?' : 'Need Assistance with Campus Navigation or Guest Stay?'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>
                {language === 'hi'
                  ? 'हमारे स्वागत कक्ष से सीधे बात करें: +91 98765 43210 (प्रातः ९:०० से सायं ५:००)'
                  : 'Call our visitor reception desk directly: +91 98765 43210 (9:00 AM – 5:00 PM)'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Navigation size={15} />
                <span>{language === 'hi' ? 'दिशा-निर्देश खोलें' : 'Get Directions'}</span>
              </a>
              <button
                onClick={() => onNavigate('admissions')}
                className="btn btn-secondary"
              >
                <span>{language === 'hi' ? 'प्रवेश प्रक्रिया देखें' : 'View Admissions'}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

