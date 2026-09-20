import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId, DonationPledge, TrustInitiative } from '../types';
import { trustInitiativesData, trustFinancialPlaceholder } from '../data/trust';
import { ReceiptModal } from '../components/common/ReceiptModal';
import { HeartHandshake, ShieldCheck, Sparkles, Building, CheckCircle, Lock } from 'lucide-react';

interface TrustPageProps {
  onNavigate: (page: PageId) => void;
}

export const TrustPage: React.FC<TrustPageProps> = () => {
  const { language, t } = useLanguage();
  const { addDonationPledge } = useData();

  // Donation Form State
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>(trustInitiativesData[0].id);
  const [amount, setAmount] = useState<number>(5100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [panNumber, setPanNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [is80G, setIs80G] = useState<boolean>(true);
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'NetBanking' | 'Card' | 'Cheque'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedDonation, setCompletedDonation] = useState<DonationPledge | null>(null);

  const predefinedAmounts = [1100, 2500, 5100, 11000, 21000, 51000];

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(Number(val))) {
      setAmount(Number(val));
    }
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !email.trim() || amount <= 0) return;

    setIsSubmitting(true);
    try {
      const init = trustInitiativesData.find((i: TrustInitiative) => i.id === selectedInitiativeId);
      const res = await addDonationPledge({
        donorName,
        email,
        phone,
        panNumber,
        address,
        amount,
        initiativeId: selectedInitiativeId,
        initiativeTitle: init ? (language === 'hi' ? init.titleHi : init.titleEn) : 'General Seva',
        is80GRequested: is80G,
        paymentMode
      });

      setCompletedDonation(res);
      // Reset fields
      setDonorName('');
      setEmail('');
      setPhone('');
      setPanNumber('');
      setAddress('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trust-page-wrapper">
      
      {/* 1. Header Banner */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-forest" style={{ marginBottom: '0.75rem' }}>
            <HeartHandshake size={13} />
            <span>{language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट • सेवा एवं परोपकार' : 'Vedic Gurukul Trust • Philanthropy & Seva'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-secondary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'बाल विद्या संवर्धन एवं वैदिक धरोहर संरक्षण' : 'Empowering Child Education & Preserving Vedic Heritage'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'आर्थिक रूप से वंचित बालकों की निःशुल्क शिक्षा, दुर्लभ पाण्डुलिपियों के डिजिटलीकरण एवं गौ-संरक्षण हेतु समर्पित ट्रस्ट।'
              : 'Dedicated to fully sponsored child education, rare Vedic manuscript preservation, and holistic community nourishment.'}
          </p>
        </div>
      </section>

      {/* 2. Three Main Seva Initiatives */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-forest">
                {language === 'hi' ? 'ट्रस्ट सेवा प्रकल्प' : 'Core Trust Initiatives'}
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-secondary-dark)' }}>
              {language === 'hi' ? 'समाज एवं राष्ट्र कल्याण की प्रमुख योजनाएं' : 'Pillars of Social & Heritage Service'}
            </h2>
            <div className="ornamental-divider" style={{ color: 'var(--color-secondary)' }}>
              <Sparkles size={16} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)', maxWidth: '1440px', margin: '0 auto var(--spacing-16) auto' }}>
            {trustInitiativesData.map((init: TrustInitiative) => (
              <div key={init.id} className="vedic-card-ornate" style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                borderLeft: '5px solid var(--color-primary)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <span className="vedic-badge badge-forest" style={{ fontSize: '11px' }}>
                      {init.sanskritTitle}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-text-main)',
                    marginBottom: '0.5rem'
                  }}>
                    {language === 'hi' ? init.titleHi : init.titleEn}
                  </h3>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {language === 'hi' ? init.descriptionHi : init.descriptionEn}
                  </p>

                  {/* Key points */}
                  <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                      {language === 'hi' ? 'योजना के मुख्य बिन्दु:' : 'Key Operational Highlights:'}
                    </h5>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-main)' }}>
                      {(language === 'hi' ? init.keyPointsHi : init.keyPointsEn).map((pt: string, i: number) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle size={14} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Transparency footer inside card */}
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={14} color="var(--color-secondary)" />
                    <span>{language === 'hi' ? init.transparencyNoteHi : init.transparencyNoteEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Interactive Contribution / Donation Portal */}
          <div id="donation-portal" style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-gold-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-10)',
            maxWidth: '1240px',
            margin: '0 auto var(--spacing-16) auto',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
              <div className="vedic-badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                <HeartHandshake size={13} />
                <span>{language === 'hi' ? 'पवित्र सहयोग संवर्ग' : 'Support Our Causes'}</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading-devanagari)',
                fontSize: '1.75rem',
                color: 'var(--color-primary-dark)',
                marginBottom: '0.4rem'
              }}>
                {language === 'hi' ? 'विद्यादान एवं सेवा सहयोग पोर्टल' : 'Online Seva Contribution & 80G Receipt Portal'}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '900px', margin: '0 auto' }}>
                {language === 'hi'
                  ? 'आपका प्रत्येक सहयोग सीधे बालकों के पोषण, शिक्षा और वैदिक ग्रन्थों के संरक्षण में प्रयुक्त होता है।'
                  : 'Every contribution directly funds child education, nutrition, and Sanskrit manuscript preservation.'}
              </p>
            </div>

            <form onSubmit={handleDonationSubmit}>
              
              {/* Cause Selection */}
              <div className="form-group">
                <label className="form-label">
                  {language === 'hi' ? 'सहयोग हेतु योजना चुनें' : 'Select Seva Initiative'} <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={selectedInitiativeId}
                  onChange={(e) => setSelectedInitiativeId(e.target.value)}
                >
                  {trustInitiativesData.map((init: TrustInitiative) => (
                    <option key={init.id} value={init.id}>
                      {language === 'hi' ? init.titleHi : init.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Predefined Amounts */}
              <div className="form-group">
                <label className="form-label">
                  {language === 'hi' ? 'सहयोग राशि चुनें (₹ INR)' : 'Select Contribution Amount (₹ INR)'} <span className="required">*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {predefinedAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleAmountClick(val)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 700,
                        backgroundColor: amount === val && !customAmount ? 'var(--color-primary)' : 'var(--color-bg-card)',
                        color: amount === val && !customAmount ? '#FFFFFF' : 'var(--color-text-main)',
                        border: `1.5px solid ${amount === val && !customAmount ? 'var(--color-primary)' : 'var(--color-border)'}`,
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      ₹ {val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <input
                  type="number"
                  className="form-control"
                  placeholder={language === 'hi' ? 'अथवा अन्य राशि दर्ज करें (उदा. १५०००)' : 'Or enter custom amount in ₹ INR'}
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>

              {/* Donor Information */}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'दानदाता / सहयोगी का नाम' : 'Full Name of Donor'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'ईमेल पता (रसीद हेतु)' : 'Email Address (For Receipt)'} <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="donor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'मोबाइल / व्हाट्सएप नम्बर' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'पैन नम्बर (80G आयकर छूट हेतु)' : 'PAN Card (For 80G Tax Exemption)'}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ABCDE1234F"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'hi' ? 'पता एवं राज्य (वैकल्पिक)' : 'Postal Address & City'}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 12/B Heritage Enclave, Varanasi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Payment Mode Selection */}
              <div className="form-group">
                <label className="form-label">
                  {language === 'hi' ? 'भुगतान माध्यम (सिमुलेटेड)' : 'Simulated Payment Gateway Mode'}
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {(['UPI', 'NetBanking', 'Card', 'Cheque'] as const).map((mode) => (
                    <label key={mode} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="paymode"
                        checked={paymentMode === mode}
                        onChange={() => setPaymentMode(mode)}
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 80G Checkbox */}
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={is80G}
                    onChange={(e) => setIs80G(e.target.checked)}
                  />
                  <span>
                    {language === 'hi'
                      ? 'हाँ, मुझे आयकर धारा 80G के अन्तर्गत छूट की रसीद की आवश्यकता है।'
                      : 'I request an 80G Tax Exemption certificate & receipt.'}
                  </span>
                </label>
              </div>

              {/* Submit Action */}
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-forest btn-lg"
                  style={{ width: '100%', maxWidth: '420px', margin: '0 auto', boxShadow: '0 4px 18px var(--color-secondary-glow)' }}
                >
                  <Lock size={16} />
                  <span>
                    {isSubmitting
                      ? t.common.submitting
                      : language === 'hi'
                        ? `₹ ${amount.toLocaleString('en-IN')} का सहयोग करें एवं रसीद प्राप्त करें`
                        : `Contribute ₹ ${amount.toLocaleString('en-IN')} & Generate Receipt`}
                  </span>
                </button>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  {language === 'hi' ? 'सुरक्षित एवं पारदर्शी प्रक्रिया • तत्काल डिजिटल पावती उपलब्ध' : 'Secure and transparent flow • Instant printable acknowledgment generated'}
                </p>
              </div>

            </form>
          </div>

          {/* 4. Statutory & Bank Account Information Placeholders */}
          <div className="vedic-card" style={{
            maxWidth: '1240px',
            margin: '0 auto',
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: '1.15rem',
              color: 'var(--color-primary-dark)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Building size={18} color="var(--color-primary)" />
              <span>{language === 'hi' ? 'वैधानिक एवं बैंक विवरण (पारदर्शिता संवर्ग)' : 'Statutory & Official Bank Account Details'}</span>
            </h4>

            <div className="grid-2" style={{ fontSize: 'var(--text-xs)', gap: '1rem' }}>
              <div>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'ट्रस्ट का नाम:' : 'Trust Name:'}</strong> {trustFinancialPlaceholder.trustName}</p>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'पंजीकरण संख्या:' : 'Reg. Number:'}</strong> {trustFinancialPlaceholder.registrationNumber}</p>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'पैन संख्या:' : 'Trust PAN:'}</strong> {trustFinancialPlaceholder.panNumber}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'बैंक का नाम:' : 'Bank:'}</strong> {trustFinancialPlaceholder.bankDetails.bankName}</p>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'खाता संख्या:' : 'Account No:'}</strong> {trustFinancialPlaceholder.bankDetails.accountNumber}</p>
                <p style={{ margin: '0 0 0.35rem 0' }}><strong>{language === 'hi' ? 'IFSC कोड:' : 'IFSC Code:'}</strong> {trustFinancialPlaceholder.bankDetails.ifscCode}</p>
              </div>
            </div>

            <div style={{
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px dashed var(--color-border)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic'
            }}>
              {language === 'hi'
                ? '[सूचना: वास्तविक बैंक खातों और सरकारी विनियामक विवरणों को आधिकारिक पुष्टि के उपरांत अपडेट किया जाएगा]'
                : '[Notice: Official verified banking credentials and audit filings will be populated upon institutional signoff]'}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Instant 80G Receipt Modal */}
      <ReceiptModal
        donation={completedDonation}
        onClose={() => setCompletedDonation(null)}
      />

    </div>
  );
};
