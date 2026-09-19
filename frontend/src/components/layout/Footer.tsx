import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PageId } from '../../types';
import { Flame, HeartHandshake, Mail, MapPin, Phone, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [emailSub, setEmailSub] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmailSub('');
    }
  };

  return (
    <footer style={{
      backgroundColor: 'var(--color-bg-dark-accent)',
      color: '#DACEC0',
      borderTop: '3px solid var(--color-gold)',
      paddingTop: 'var(--spacing-16)',
      paddingBottom: 'var(--spacing-8)',
      position: 'relative'
    }}>
      {/* Traditional Ornate Border Accent Top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-gold), var(--color-secondary), var(--color-gold), var(--color-primary))'
      }} />

      <div className="container">
        {/* Sanskrit Universal Benediction Banner */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--color-gold-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          textAlign: 'center',
          marginBottom: 'var(--spacing-12)'
        }}>
          <p style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-gold)',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em'
          }}>
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत् ॥
          </p>
          <p style={{
            fontFamily: 'var(--font-serif-accent)',
            fontSize: 'var(--text-xs)',
            color: '#B5A695',
            fontStyle: 'italic',
            margin: 0
          }}>
            {language === 'hi'
              ? 'सब सुखी हों, सब रोगमुक्त हों, सब मंगलमय घटनाओं के साक्षी बनें और कोई भी दुःख का भागी न हो।'
              : 'May all beings be happy; may all be free from illness; may all behold what is auspicious; may none suffer grief.'}
          </p>
        </div>

        {/* Footer 4-Column Grid */}
        <div className="grid-4" style={{ marginBottom: 'var(--spacing-12)' }}>
          
          {/* Col 1: About Gurukul & Trust */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-gold))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Flame size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.1rem',
                color: '#FFFDF7',
                fontWeight: 700
              }}>
                {language === 'hi' ? 'संस्कृत वैदिक गुरुकुल' : 'Sanskrit Vedic Gurukul'}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: '#B5A695', lineHeight: 1.7, marginBottom: '1rem' }}>
              {language === 'hi'
                ? 'महर्षि दयानन्द सरस्वती के शिक्षा-दर्शन एवं वैदिक मूल्यों पर आधारित एक प्रामाणिक गुरुकुल संस्थान। वैदिक गुरुकुल ट्रस्ट द्वारा निःशुल्क बाल शिक्षा एवं सेवा कार्य संचालित।'
                : 'An authentic traditional Sanskrit Gurukul dedicated to classical Vedic scholarship, Paninian grammar, and moral excellence under the patronship of Vedic Gurukul Trust.'}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 91, 67, 0.3)',
              border: '1px solid rgba(59, 91, 67, 0.6)',
              fontSize: '11px',
              color: '#A5D6A7'
            }}>
              <HeartHandshake size={14} />
              <span>{language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट सेवा संवर्ग' : 'Vedic Gurukul Trust Initiative'}</span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'hi' ? 'शैक्षणिक पाठ्यक्रम' : 'Academic Streams'}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-xs)' }}>
              <li>
                <button onClick={() => onNavigate('education')} style={{ color: '#DACEC0', textAlign: 'left' }}>
                  {language === 'hi' ? 'प्रथमा (वेद व व्याकरण प्रारम्भ)' : 'Prathama (Foundational Veda & Grammar)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('education')} style={{ color: '#DACEC0', textAlign: 'left' }}>
                  {language === 'hi' ? 'मध्यमा (माध्यमिक संस्कृत शास्त्र)' : 'Madhyama (Intermediate Sanskrit)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('education')} style={{ color: '#DACEC0', textAlign: 'left' }}>
                  {language === 'hi' ? 'शास्त्री (वेद, व्याकरण व दर्शन स्नातक)' : 'Shastri (B.A. Vedic Philosophy)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('education')} style={{ color: '#DACEC0', textAlign: 'left' }}>
                  {language === 'hi' ? 'आचार्य (परास्नातक शोध उपाधि)' : 'Acharya (Master of Vedic Studies)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('education')} style={{ color: '#DACEC0', textAlign: 'left' }}>
                  {language === 'hi' ? 'सरल संस्कृत सम्भाषण (प्रमाण-पत्र)' : 'Spoken Sanskrit Certificate'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Navigation */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'hi' ? 'संस्थागत पृष्ठ' : 'Quick Navigation'}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-xs)' }}>
              <li>
                <button onClick={() => onNavigate('about')} style={{ color: '#DACEC0' }}>
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('philosophy')} style={{ color: '#DACEC0' }}>
                  {t.nav.philosophy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trust')} style={{ color: '#DACEC0' }}>
                  {t.nav.trust}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admissions')} style={{ color: '#DACEC0' }}>
                  {t.nav.admissions}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} style={{ color: '#DACEC0' }}>
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} style={{ color: '#DACEC0' }}>
                  {t.nav.events}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} style={{ color: '#DACEC0' }}>
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Updates */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'hi' ? 'सम्पर्क एवं सूचना' : 'Contact & Updates'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-xs)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>[Official Gurukul & Trust Campus Address Placeholder]</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>+91 98765 [Official Phone Placeholder]</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>contact@vedicgurukul.org</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div>
              <p style={{ fontSize: '11px', color: '#B5A695', marginBottom: '0.4rem' }}>
                {language === 'hi' ? 'दैनिक मन्त्र एवं गुरुकुल सूचनाएं प्राप्त करें:' : 'Receive daily Vedic contemplation & notices:'}
              </p>
              {isSubscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#81C784', fontSize: '11px' }}>
                  <CheckCircle size={14} />
                  <span>{language === 'hi' ? 'सफलतापूर्वक पंजीकृत!' : 'Subscribed successfully!'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.3rem' }}>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    style={{
                      padding: '0.4rem 0.6rem',
                      fontSize: '11px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid var(--color-border-ornate)',
                      color: '#FFF',
                      flex: 1
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-gold btn-sm"
                    style={{ padding: '0.4rem 0.6rem' }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Transparency & Disclaimer Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 'var(--spacing-6)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '11px',
          color: '#9E8E7E'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={14} color="var(--color-gold)" />
            <span>
              {language === 'hi'
                ? 'वैदिक गुरुकुल ट्रस्ट द्वारा संचालित। समस्त आधिकारिक विवरण एवं 80G पंजीकरण सत्यापन उपरांत मान्य।'
                : 'Managed by Vedic Gurukul Trust. All official details and 80G registration subject to official verification.'}
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} Sanskrit Vedic Gurukul & Vedic Gurukul Trust. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
        </div>

      </div>
    </footer>
  );
};
