import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageId } from '../types';
import { dailyRoutineSchedule } from '../data/philosophy';
import { facultyData, faqsData } from '../data/faculty';
import { BookOpen, Compass, Sun, ShieldCheck, Flame, Users, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="about-page-wrapper">
      
      {/* Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <Flame size={13} />
            <span>{language === 'hi' ? 'गुरुकुल परिचय एवं परम्परा' : 'About the Gurukul'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'संस्कृत वैदिक गुरुकुल की गौरवमयी परम्परा' : 'Heritage, Vision & Living Tradition'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'वैदिक मूल्यों, पाणिनीय व्याकरण, योग एवं आधुनिक ज्ञान के समन्वय से संस्कारयुक्त विद्वानों का निर्माण।'
              : 'Nurturing noble scholars through a profound integration of Vedic texts, Paninian grammar, Yogic discipline, and contemporary sciences.'}
          </p>
        </div>
      </section>

      {/* 1. History & Mission Overview */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-tag">
                <span className="vedic-badge badge-gold">
                  {language === 'hi' ? 'संस्थापना एवं उद्देश्य' : 'Founding Purpose'}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.85rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                {language === 'hi' ? 'अविद्या के नाश और विद्या के प्रसार का संकल्प' : 'A Sacred Vow to Eradicate Ignorance & Spread Wisdom'}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                {language === 'hi'
                  ? 'संस्कृत वैदिक गुरुकुल की स्थापना प्राचीन ऋषि-परम्परा के पुनर्जीवन हेतु की गई। जहाँ प्राचीन काल में नालन्दा और तक्षशिला जैसे विश्व-प्रसिद्ध विद्या-केन्द्रों में चरित्र और ज्ञान की सांगोपांग दीक्षा दी जाती थी, उसी आदर्श को आज के संदर्भ में साकार करना हमारा ध्येय है।'
                  : 'The Sanskrit Vedic Gurukul was established to revive the sacred Acharya-Kula tradition of ancient India. In the spirit of historical centers of learning, we seek to cultivate holistic character, unshakeable intellectual integrity, and deep scriptural understanding in every learner.'}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {language === 'hi'
                  ? 'गुरुकुल में अध्ययन करने वाले प्रत्येक ब्रह्मचारी को वेद संहिताओं, पाणिनीय अष्टाध्यायी, निरुक्त, दर्शन ग्रन्थों एवं आधुनिक वैज्ञानिक विषयों का सन्तुलित ज्ञान दिया जाता है। यहाँ विद्यार्थी केवल उपाधि प्राप्त नहीं करते, अपितु जीवन-पर्यन्त सत्य के मार्ग पर चलने की साधना करते हैं।'
                  : 'Every student receives balanced instruction across Vedic Samhitas, Paninian grammar, Nirukta, the 6 Darshanas, and modern scientific subjects. Education here is not merely for academic degrees, but a lifelong spiritual discipline for righteous living.'}
              </p>

              <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderLeft: '4px solid var(--color-primary)',
                padding: '1rem 1.25rem',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>
                  {language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट का संरक्षण' : 'Supported by Vedic Gurukul Trust'}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  {language === 'hi'
                    ? 'ट्रस्ट द्वारा आर्थिक रूप से कमजोर एवं साधनहीन बालकों को पूर्णतः निःशुल्क आवासीय शिक्षा, भोजन, वस्त्र व चिकित्सा की सुविधा उपलब्ध कराई जाती है।'
                    : 'The Trust provides 100% free residential education, meals, clothing, and health support to deserving and underprivileged students under its Bal Vidya Sahayata initiative.'}
                </p>
              </div>
            </div>

            {/* Visual Box */}
            <div style={{ position: 'relative' }}>
              <div className="img-zoom-wrapper" style={{ borderRadius: 'var(--radius-xl)', border: '2px solid var(--color-border-ornate)' }}>
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                  alt="Pathshala classroom studies"
                  style={{ width: '100%', height: '380px', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '20px',
                backgroundColor: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <GraduationCap size={20} color="var(--color-primary)" />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {language === 'hi' ? 'विद्या • संस्कार • सेवा का संगम' : 'Vidya • Sanskar • Seva'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dedicated Section: Relationship with Swami Dayanand Saraswati's Principles */}
      <section className="section-pad" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                {language === 'hi' ? 'मार्गदर्शक दार्शनिक आधार' : 'Guiding Philosophical Alignment'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'महर्षि दयानन्द सरस्वती के शिक्षा-दर्शन से सम्बन्ध' : 'Relationship with Swami Dayanand Saraswati’s Educational Principles'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'तर्कसंगत विवेक, पाणिनीय अष्टाध्यायी पद्धति एवं वेदों के सार्वभौमिक स्वाध्याय का प्रतिपादन।'
                : 'Commitment to rational inquiry, Paninian grammatical methodology, and egalitarian Vedic literacy.'}
            </p>
            <div className="ornamental-divider">
              <Compass size={16} />
            </div>
          </div>

          <div className="vedic-card-ornate" style={{ maxWidth: '1400px', margin: '0 auto var(--spacing-8) auto' }}>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
              {language === 'hi'
                ? 'हमारा गुरुकुल महर्षि दयानन्द सरस्वती द्वारा सत्यार्थ प्रकाश एवं संस्कार विधि में प्रतिपादित शैक्षणिक नियमों को अपने मूल आधार के रूप में स्वीकार करता है। महर्षि दयानन्द का स्पष्ट मत था कि शिक्षा का उद्देश्य केवल आजीविका कमाना नहीं, अपितु व्यक्ति का आत्मिक, बौद्धिक एवं शारीरिक विकास कर उसे एक न्यायप्रिय, सत्यनिष्ठ एवं परोपकारी मनुष्य बनाना है।'
                : 'Our Gurukul embraces the educational principles articulated by Swami Dayanand Saraswati in foundational works such as Satyarth Prakash and Sanskar Vidhi. Dayanand Saraswati emphasized that authentic education is not merely a tool for material livelihood, but the ultimate discipline for intellectual illumination, physical vigor, ethical rectitude, and universal social service.'}
            </p>

            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-primary-dark)', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                  {language === 'hi' ? '१. पाणिनीय अष्टाध्यायी की वैज्ञानिक विधि' : '1. Scientific Paninian Methodology'}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi'
                    ? 'स्वामी जी ने बल दिया कि संस्कृत भाषा को रटने के बजाय अष्टाध्यायी एवं महाभाष्य के मूल सूत्रों के माध्यम से प्रत्यक्ष वैज्ञानिक रूप से समझा जाए, जिससे अल्प समय में गूढ़तम ग्रन्थों का मर्म स्पष्ट हो जाता है।'
                    : 'Dayanand Saraswati advocated studying Sanskrit through Panini’s original Ashtadhyayi and Patanjali’s Mahabhashya rather than convoluted secondary grammars, unlocking root scientific etymologies.'}
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-primary-dark)', fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'var(--font-heading-devanagari)' }}>
                  {language === 'hi' ? '२. अन्धविश्वास से मुक्ति एवं तर्क-विद्या' : '2. Freedom from Dogma & Rational Logic'}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {language === 'hi'
                    ? 'विद्यार्थी को किसी भी विचार को अन्धे होकर स्वीकार न करने और न्याय दर्शन के आठ प्रमाणों की कसौटी पर कसने का शिक्षण दिया जाता है।'
                    : 'Students are trained to subject every claim to the epistemological standards of the Nyaya Darshana, rejecting unverified superstitions and cultivating fearless love for truth.'}
                </p>
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              fontSize: '11px',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShieldCheck size={16} color="var(--color-primary)" />
              <span>
                {language === 'hi'
                  ? 'प्रामाणिकता सूचना: संस्था स्वामी दयानन्द सरस्वती के वैचारिक आदर्शों का निष्ठापूर्वक पालन करती है। किसी भी अनधिकृत दावे से मुक्त।'
                  : 'Authenticity Note: The Gurukul adheres to the philosophical ideals of Swami Dayanand Saraswati with strict fidelity to verified source texts.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Daily Dinacharya (4:30 AM to 9:30 PM Timetable) */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                <Sun size={13} />
                <span>{language === 'hi' ? 'दिनचर्या एवं अनुशासन' : 'Gurukul Dinacharya'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'गुरुकुल की आदर्श दैनिक दिनचर्या' : 'The Disciplined Daily Routine of a Brahmachari'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'प्रातः ४:३० से रात्रि ९:३० तक योग, यज्ञ, स्वाध्याय, अध्ययन, शारीरिक व्यायाम एवं विश्राम का सन्तुलन।'
                : 'From 4:30 AM to 9:30 PM: A disciplined schedule harmonizing Yoga, Agnihotra, study, sports, and reflection.'}
            </p>
            <div className="ornamental-divider">
              <Sun size={16} />
            </div>
          </div>

          <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dailyRoutineSchedule.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                transition: 'all var(--transition-fast)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    minWidth: '130px',
                    textAlign: 'center'
                  }}>
                    {item.time}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', margin: 0, fontFamily: 'var(--font-heading-devanagari)' }}>
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </h4>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, maxWidth: '600px' }}>
                  {item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Faculty / Acharyas Section */}
      <section className="section-pad" style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                <Users size={13} />
                <span>{language === 'hi' ? 'आचार्य मण्डल' : 'Acharyas & Faculty'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'विद्वत् आचार्य एवं मार्गदर्शक' : 'Revered Acharyas & Faculty Mentors'}
            </h2>
            <p className="section-subtitle">
              {language === 'hi'
                ? 'वेद, व्याकरण, दर्शन एवं आधुनिक विज्ञान के निष्णात विद्वानों द्वारा प्रत्यक्ष मार्गदर्शन।'
                : 'Dedicated scholars guiding students through classical shastras and modern disciplines.'}
            </p>
            <div className="ornamental-divider">
              <Users size={16} />
            </div>
          </div>

          <div className="grid-4" style={{ marginBottom: 'var(--spacing-8)' }}>
            {facultyData.map((fac) => (
              <div key={fac.id} className="vedic-card" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-gold))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  margin: '0 auto 1rem auto'
                }}>
                  <Flame size={28} />
                </div>

                <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.2rem' }}>
                  {language === 'hi' ? fac.nameHi : fac.nameEn}
                </h3>

                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-gold-dark)', marginBottom: '0.5rem' }}>
                  {language === 'hi' ? fac.roleHi : fac.roleEn}
                </p>

                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {language === 'hi' ? fac.expertiseHi : fac.expertiseEn}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic'
          }}>
            {language === 'hi'
              ? '[सूचना: आचार्य मण्डल के आधिकारिक नामों की पुष्टि संस्थागत सत्यापन के उपरांत की जाएगी]'
              : '[Notice: Official names of the faculty will be updated upon institutional verification]'}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                {language === 'hi' ? 'जिज्ञासा एवं समाधान' : 'Frequently Asked Questions'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'सामान्य प्रश्न एवं उत्तर' : 'Frequently Asked Questions'}
            </h2>
            <div className="ornamental-divider">
              <BookOpen size={16} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqsData.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)'
                }}>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)'
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{language === 'hi' ? faq.questionHi : faq.questionEn}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1rem 1.25rem',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.65,
                      borderTop: '1px dashed var(--color-border)'
                    }}>
                      <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                        {language === 'hi' ? faq.answerHi : faq.answerEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-8)' }}>
            <button
              onClick={() => onNavigate('contact')}
              className="btn btn-outline"
            >
              <span>{language === 'hi' ? 'कोई अन्य प्रश्न है? सम्पर्क करें' : 'Have More Questions? Contact Us'}</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
