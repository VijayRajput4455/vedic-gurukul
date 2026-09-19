import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ShieldCheck, Info } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { language, t } = useLanguage();
  const { addContactMessage } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'general' | 'admissions' | 'trust' | 'visit' | 'media'>('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

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
      
      {/* 1. Header */}
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
            maxWidth: '740px',
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
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                      [Official Sanskrit Vedic Gurukul & Vedic Gurukul Trust Address Placeholder]
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
                      +91 98765 [Official Phone Placeholder]
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
                      {language === 'hi' ? 'प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक' : 'Daily: 9:00 AM to 5:00 PM (Prior Appointment Recommended)'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Visiting Guidelines Callout */}
              <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-ornate)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Info size={16} color="var(--color-primary)" />
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', margin: 0 }}>
                    {language === 'hi' ? 'परिसर दर्शन मर्यादा एवं नियम' : 'Campus Etiquette & Rules'}
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  <li>• {language === 'hi' ? 'परिसर में पूर्ण सात्त्विक, नशामुक्त एवं शान्त वातावरण बनाए रखें।' : 'Maintain a peaceful, tobacco-free, and sattvic atmosphere.'}</li>
                  <li>• {language === 'hi' ? 'यज्ञशाला एवं अध्ययन कक्षों में जूते-चप्पल बाहर उतारें।' : 'Remove footwear before entering the Yajnashala and classrooms.'}</li>
                  <li>• {language === 'hi' ? 'अभिभावक छात्रों से भोजन समय अथवा सायं ४:४५ से ५:४५ के मध्य मिल सकते हैं।' : 'Parents may meet students during scheduled visiting hours.'}</li>
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

    </div>
  );
};
