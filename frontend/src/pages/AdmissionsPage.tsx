import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId } from '../types';
import { programsData } from '../data/programs';
import { GraduationCap, CheckCircle, Send, ArrowLeft, ArrowRight } from 'lucide-react';

interface AdmissionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { addAdmissionInquiry } = useData();

  // Wizard Step (1: Student, 2: Parent/Contact, 3: Program, 4: Review, 5: Success)
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{ refNo: string; name: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: 'male' as 'male' | 'female' | 'other',
    previousEducation: '',
    parentName: '',
    email: '',
    phone: '',
    stateCity: '',
    programId: programsData[0].id,
    hostelRequired: true,
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = language === 'hi' ? 'कृपया छात्र का नाम भरें' : 'Student name is required';
      if (!formData.dob) newErrors.dob = language === 'hi' ? 'कृपया जन्मतिथि चुनें' : 'Date of birth is required';
      if (!formData.previousEducation.trim()) newErrors.previousEducation = language === 'hi' ? 'पूर्व शिक्षा विवरण भरें' : 'Previous education required';
    } else if (currentStep === 2) {
      if (!formData.parentName.trim()) newErrors.parentName = language === 'hi' ? 'अभिभावक का नाम भरें' : 'Parent name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = language === 'hi' ? 'मान्य ईमेल भरें' : 'Valid email is required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = language === 'hi' ? 'मान्य फोन नम्बर भरें' : 'Valid 10-digit phone number is required';
      if (!formData.stateCity.trim()) newErrors.stateCity = language === 'hi' ? 'राज्य एवं नगर का नाम भरें' : 'City and state required';
    } else if (currentStep === 3) {
      if (!formData.programId) newErrors.programId = language === 'hi' ? 'कृपया पाठ्यक्रम चुनें' : 'Please select a program';
    } else if (currentStep === 4) {
      if (!formData.consent) newErrors.consent = language === 'hi' ? 'कृपया नियम व शर्तों से सहमति दें' : 'Please agree to terms and privacy consent';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const selectedProg = programsData.find((p) => p.id === formData.programId);
      const res = await addAdmissionInquiry({
        studentName: formData.studentName,
        parentName: formData.parentName,
        dob: formData.dob,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        programId: formData.programId,
        programName: selectedProg ? (language === 'hi' ? selectedProg.titleHi : selectedProg.titleEn) : 'General Program',
        previousEducation: formData.previousEducation,
        hostelRequired: formData.hostelRequired,
        stateCity: formData.stateCity,
        message: formData.message
      });

      setSubmissionResult({ refNo: res.referenceNumber, name: res.studentName });
      setStep(5); // Success step
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      dob: '',
      gender: 'male',
      previousEducation: '',
      parentName: '',
      email: '',
      phone: '',
      stateCity: '',
      programId: programsData[0].id,
      hostelRequired: true,
      message: '',
      consent: false
    });
    setSubmissionResult(null);
    setStep(1);
  };

  return (
    <div className="admissions-page-wrapper">
      
      {/* Header */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <GraduationCap size={13} />
            <span>{language === 'hi' ? 'सत्र 2026-2027 प्रवेश प्रारम्भ' : 'Session 2026-2027 Admissions Open'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'गुरुकुल प्रवेश प्रक्रिया एवं ऑनलाइन पूछताछ' : 'Gurukul Admission Process & Online Inquiry'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '740px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'सरल, पारदर्शी एवं संस्कार-आधारित प्रवेश प्रक्रिया। पात्र विद्यार्थियों हेतु बाल विद्या सहायता योजना के अन्तर्गत निःशुल्क शिक्षा।'
              : 'A transparent, values-based admission process. Full scholarships available for deserving students under Vedic Gurukul Trust.'}
          </p>
        </div>
      </section>

      {/* 5-Step Process Roadmap */}
      <section className="section-pad-sm" style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-4" style={{ gap: '1rem' }}>
            
            <div className="vedic-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>१</div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{language === 'hi' ? 'पूछताछ व पंजीकरण' : '1. Online Inquiry'}</h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                {language === 'hi' ? 'फॉर्म द्वारा प्राथमिक विवरण भेजें' : 'Submit profile & academic interest'}
              </p>
            </div>

            <div className="vedic-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-gold)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>२</div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{language === 'hi' ? 'परामर्श एवं सम्पर्क' : '2. Counseling Call'}</h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                {language === 'hi' ? 'आचार्य मण्डल द्वारा मार्गदर्शन' : 'Interaction with preceptors'}
              </p>
            </div>

            <div className="vedic-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>३</div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{language === 'hi' ? 'परिसर दर्शन व परीक्षा' : '3. Campus Assessment'}</h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                {language === 'hi' ? 'सरल मौखिक व लिखित मूल्यांकन' : 'Simple aptitude & Sanskrit basics'}
              </p>
            </div>

            <div className="vedic-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--color-primary-dark)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>४</div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{language === 'hi' ? 'उपनयन एवं प्रवेश' : '4. Enrolment & Sanskar'}</h4>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                {language === 'hi' ? 'पारम्परिक दीक्षा एवं आवास' : 'Sacred initiation into Gurukul'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Interactive Form Wizard */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          
          <div className="vedic-card-ornate" style={{ padding: 'var(--spacing-8)' }}>
            
            {/* Wizard Progress Indicator */}
            {step < 5 && (
              <div style={{ marginBottom: 'var(--spacing-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  <span>{language === 'hi' ? `चरण ${step} / ४` : `Step ${step} of 4`}</span>
                  <span>
                    {step === 1 && (language === 'hi' ? 'छात्र विवरण' : 'Student Profile')}
                    {step === 2 && (language === 'hi' ? 'अभिभावक विवरण' : 'Parent / Contact')}
                    {step === 3 && (language === 'hi' ? 'पाठ्यक्रम चयन' : 'Program Selection')}
                    {step === 4 && (language === 'hi' ? 'समीक्षा एवं पुष्टि' : 'Review & Submit')}
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(step / 4) * 100}%`,
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-gold))',
                    transition: 'width var(--transition-smooth)'
                  }} />
                </div>
              </div>
            )}

            {/* Step 1: Student Information */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? '१. छात्र का व्यक्तिगत विवरण' : '1. Student Personal Profile'}
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'छात्र का पूरा नाम' : 'Full Name of Student'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Aarav Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  {errors.studentName && <span className="form-error-msg">{errors.studentName}</span>}
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'जन्मतिथि (आयु १०-२५ वर्ष)' : 'Date of Birth'} <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                    {errors.dob && <span className="form-error-msg">{errors.dob}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'लिंग' : 'Gender'} <span className="required">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    >
                      <option value="male">{language === 'hi' ? 'पुरुष (बालक)' : 'Male (Boy)'}</option>
                      <option value="female">{language === 'hi' ? 'महिला (बालिका - सप्ताहान्त)' : 'Female (Day Scholar / Weekend)'}</option>
                      <option value="other">{language === 'hi' ? 'अन्य' : 'Other'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'पूर्व उत्तीर्ण कक्षा / शैक्षणिक पृष्ठभूमि' : 'Previous Schooling / Class Completed'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={language === 'hi' ? 'उदा. कक्षा ५ उत्तीर्ण / ८वीं उत्तीर्ण' : 'e.g. Class 5 Passed / Class 8 Passed'}
                    value={formData.previousEducation}
                    onChange={(e) => setFormData({ ...formData, previousEducation: e.target.value })}
                  />
                  {errors.previousEducation && <span className="form-error-msg">{errors.previousEducation}</span>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button onClick={handleNext} className="btn btn-primary">
                    <span>{t.common.next}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Parent / Guardian & Location */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? '२. अभिभावक एवं सम्पर्क विवरण' : '2. Parent & Contact Details'}
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'माता / पिता / अभिभावक का नाम' : 'Parent / Guardian Full Name'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  />
                  {errors.parentName && <span className="form-error-msg">{errors.parentName}</span>}
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'ईमेल पता' : 'Email Address'} <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {language === 'hi' ? 'मोबाइल / फोन नम्बर' : 'Mobile / Phone Number'} <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'राज्य एवं शहर / जिला' : 'State & City / District'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Haridwar, Uttarakhand / Varanasi, UP"
                    value={formData.stateCity}
                    onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
                  />
                  {errors.stateCity && <span className="form-error-msg">{errors.stateCity}</span>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <button onClick={handlePrev} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>{t.common.back}</span>
                  </button>
                  <button onClick={handleNext} className="btn btn-primary">
                    <span>{t.common.next}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Program & Accommodation */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? '३. इच्छित पाठ्यक्रम एवं आवासीय चयन' : '3. Program & Boarding Preference'}
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'प्रवेश हेतु इच्छित पाठ्यक्रम' : 'Select Desired Program'} <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.programId}
                    onChange={(e) => setFormData({ ...formData, programId: e.target.value })}
                  >
                    {programsData.map((p) => (
                      <option key={p.id} value={p.id}>
                        {language === 'hi' ? p.titleHi : p.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'आवासीय छात्रावास आवश्यकता' : 'Hostel / Boarding Required?'}
                  </label>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.35rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
                      <input
                        type="radio"
                        name="hostel"
                        checked={formData.hostelRequired === true}
                        onChange={() => setFormData({ ...formData, hostelRequired: true })}
                      />
                      <span>{language === 'hi' ? 'हाँ, पूर्ण आवासीय छात्रावास' : 'Yes, Full Residential Boarding'}</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
                      <input
                        type="radio"
                        name="hostel"
                        checked={formData.hostelRequired === false}
                        onChange={() => setFormData({ ...formData, hostelRequired: false })}
                      />
                      <span>{language === 'hi' ? 'नहीं, डे-स्कॉलर / सप्ताहान्त' : 'No, Day-Scholar / Weekend'}</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'विशेष जिज्ञासा / पारिवारिक पृष्ठभूमि (वैकल्पिक)' : 'Specific Aspirations / Notes (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder={language === 'hi' ? 'छात्र की संस्कृत में रुचि या छात्रवृत्ति आवश्यकता का उल्लेख करें...' : 'Mention student’s Sanskrit background or scholarship request...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <button onClick={handlePrev} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>{t.common.back}</span>
                  </button>
                  <button onClick={handleNext} className="btn btn-primary">
                    <span>{t.common.next}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Summary & Submission */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="animate-fade-in">
                <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? '४. विवरण समीक्षा एवं पुष्टि' : '4. Review & Final Confirmation'}
                </h3>

                {/* Summary Table */}
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '1.5rem'
                }}>
                  <div><strong>{language === 'hi' ? 'छात्र का नाम:' : 'Student Name:'}</strong> {formData.studentName} ({formData.gender}, {formData.dob})</div>
                  <div><strong>{language === 'hi' ? 'अभिभावक का नाम:' : 'Parent Name:'}</strong> {formData.parentName}</div>
                  <div><strong>{language === 'hi' ? 'सम्पर्क:' : 'Contact:'}</strong> {formData.phone} | {formData.email}</div>
                  <div><strong>{language === 'hi' ? 'स्थान:' : 'Location:'}</strong> {formData.stateCity}</div>
                  <div><strong>{language === 'hi' ? 'चयनित पाठ्यक्रम:' : 'Selected Program:'}</strong> {programsData.find((p) => p.id === formData.programId)?.titleEn}</div>
                  <div><strong>{language === 'hi' ? 'छात्रावास:' : 'Boarding:'}</strong> {formData.hostelRequired ? (language === 'hi' ? 'हाँ' : 'Yes') : (language === 'hi' ? 'नहीं' : 'No')}</div>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <span>
                      {language === 'hi'
                        ? 'मैं प्रमाणित करता हूँ कि उपरोक्त सभी विवरण सत्य हैं एवं मैं गुरुकुल के नियमों तथा अनुशासन का पालन करने हेतु सहमत हूँ।'
                        : 'I hereby confirm that the details provided are true to the best of my knowledge and I agree to adhere to the disciplinary guidelines of the Sanskrit Vedic Gurukul.'}
                    </span>
                  </label>
                  {errors.consent && <span className="form-error-msg">{errors.consent}</span>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <button type="button" onClick={handlePrev} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>{t.common.back}</span>
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    <Send size={16} />
                    <span>{isSubmitting ? t.common.submitting : (language === 'hi' ? 'प्रवेश पूछताछ जमा करें' : 'Submit Admission Inquiry')}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 5: Success Confirmation Screen */}
            {step === 5 && submissionResult && (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-6) 0' }} className="animate-fade-in">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <CheckCircle size={36} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading-devanagari)',
                  fontSize: '1.6rem',
                  color: 'var(--color-primary-dark)',
                  marginBottom: '0.5rem'
                }}>
                  {language === 'hi' ? 'प्रवेश पूछताछ सफलतापूर्वक प्राप्त हुई!' : 'Admission Inquiry Submitted Successfully!'}
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
                  {language === 'hi'
                    ? `सादर धन्यवाद। ${submissionResult.name} के प्रवेश सम्बन्धी आवेदन की संदर्भ संख्या नीचे दी गई है। हमारे आचार्य शीघ्र आपसे सम्पर्क करेंगे।`
                    : `Thank you. The inquiry for ${submissionResult.name} has been logged. Our admissions preceptor will contact you shortly.`}
                </p>

                {/* Reference Box */}
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1.5px dashed var(--color-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  maxWidth: '360px',
                  margin: '0 auto 2rem auto'
                }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                    {language === 'hi' ? 'आवेदन संदर्भ संख्या (Reference ID)' : 'Inquiry Reference Number'}
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>
                    {submissionResult.refNo}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={resetForm} className="btn btn-secondary">
                    <span>{language === 'hi' ? 'नया फॉर्म भरें' : 'Submit Another Inquiry'}</span>
                  </button>
                  <button onClick={() => onNavigate('home')} className="btn btn-primary">
                    <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Home'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
