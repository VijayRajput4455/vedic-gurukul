import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId, DonationPledge, AdmissionInquiry, ContactMessage, NoticeItem } from '../types';
import { ReceiptModal } from '../components/common/ReceiptModal';
import { Shield, Users, Mail, HeartHandshake, Bell, CheckCircle, Trash2, Plus, Search, Printer, AlertTriangle } from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = () => {
  const { language } = useLanguage();
  const {
    admissionInquiries,
    updateInquiryStatus,
    contactMessages,
    donations,
    notices,
    addNotice,
    deleteNotice
  } = useData();

  const [activeTab, setActiveTab] = useState<'admissions' | 'contacts' | 'donations' | 'notices' | 'checklist'>('admissions');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationPledge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // New Notice Modal State
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState('');
  const [newNoticeTitleHi, setNewNoticeTitleHi] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Admissions' | 'Trust' | 'Events' | 'Academic'>('Admissions');

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitleEn.trim() || !newNoticeTitleHi.trim()) return;

    addNotice({
      id: `notice-${Date.now()}`,
      titleEn: newNoticeTitleEn,
      titleHi: newNoticeTitleHi,
      date: new Date().toISOString().split('T')[0],
      category: newNoticeCategory,
      isUrgent: false
    });

    setNewNoticeTitleEn('');
    setNewNoticeTitleHi('');
    setShowAddNotice(false);
  };

  const filteredAdmissions = admissionInquiries.filter((a: AdmissionInquiry) =>
    a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.phone.includes(searchQuery)
  );

  return (
    <div className="admin-page-wrapper">
      
      {/* Header */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-10) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.5rem' }}>
            <Shield size={13} />
            <span>{language === 'hi' ? 'गुरुकुल एवं ट्रस्ट प्रशासनिक पटल' : 'Administrative Management Console'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: '2rem',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.35rem'
          }}>
            {language === 'hi' ? 'प्रशासनिक डैशबोर्ड एवं रिकॉर्ड' : 'Institutional Records & Operations'}
          </h1>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {language === 'hi' ? 'प्रवेश आवेदन, सम्पर्क सन्देश, दान रसीदें एवं सूचना प्रबंधन' : 'Review admissions, contact messages, donation logs, and live notifications'}
          </p>
        </div>
      </section>

      {/* Main Admin Body */}
      <section className="section-pad-sm" style={{ backgroundColor: 'var(--color-bg-main)', minHeight: '600px' }}>
        <div className="container">
          
          {/* Admin Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            borderBottom: '2px solid var(--color-border)',
            paddingBottom: '0.5rem',
            marginBottom: 'var(--spacing-8)'
          }}>
            <button
              onClick={() => setActiveTab('admissions')}
              className={`btn btn-sm ${activeTab === 'admissions' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Users size={14} />
              <span>{language === 'hi' ? 'प्रवेश आवेदन' : 'Admissions'} ({admissionInquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`btn btn-sm ${activeTab === 'contacts' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Mail size={14} />
              <span>{language === 'hi' ? 'सम्पर्क सन्देश' : 'Messages'} ({contactMessages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('donations')}
              className={`btn btn-sm ${activeTab === 'donations' ? 'btn-forest' : 'btn-secondary'}`}
            >
              <HeartHandshake size={14} />
              <span>{language === 'hi' ? 'दान एवं 80G रसीदें' : 'Donations & 80G'} ({donations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`btn btn-sm ${activeTab === 'notices' ? 'btn-gold' : 'btn-secondary'}`}
            >
              <Bell size={14} />
              <span>{language === 'hi' ? 'सूचना पटल' : 'Notices'} ({notices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`btn btn-sm ${activeTab === 'checklist' ? 'btn-primary' : 'btn-secondary'}`}
            >
              <CheckCircle size={14} />
              <span>{language === 'hi' ? 'संस्थागत चेकलिस्ट' : 'Compliance Tracker'}</span>
            </button>
          </div>

          {/* TAB 1: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)' }}>
                  {language === 'hi' ? 'प्राप्त प्रवेश पूछताछ रिकॉर्ड' : 'Received Admission Inquiries'}
                </h3>
                <div style={{ position: 'relative', width: '260px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, ref..."
                    style={{ padding: '0.4rem 0.6rem 0.4rem 2rem', fontSize: 'var(--text-xs)' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={14} color="var(--color-text-muted)" style={{ position: 'absolute', left: '8px', top: '10px' }} />
                </div>
              </div>

              {filteredAdmissions.length === 0 ? (
                <div className="vedic-card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <Users size={36} color="var(--color-text-muted)" style={{ margin: '0 auto 0.5rem auto' }} />
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>No admission inquiries matching query.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredAdmissions.map((adm: AdmissionInquiry) => (
                    <div key={adm.id} className="vedic-card" style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.04em' }}>
                            {adm.referenceNumber}
                          </span>
                          <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading-devanagari)', margin: '0.1rem 0' }}>
                            {adm.studentName} <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>({adm.gender}, DOB: {adm.dob})</span>
                          </h4>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                            <strong>Parent:</strong> {adm.parentName} | <strong>Phone:</strong> {adm.phone} | <strong>Email:</strong> {adm.email}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <select
                            className="form-select"
                            style={{ fontSize: '11px', padding: '0.25rem 0.5rem', width: 'auto' }}
                            value={adm.status}
                            onChange={(e) => updateInquiryStatus(adm.id, e.target.value as any)}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="admitted">Admitted</option>
                          </select>
                        </div>
                      </div>

                      <div style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '11px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        color: 'var(--color-text-secondary)'
                      }}>
                        <span><strong>Program:</strong> {adm.programName}</span>
                        <span><strong>Education:</strong> {adm.previousEducation}</span>
                        <span><strong>Hostel:</strong> {adm.hostelRequired ? 'Yes' : 'No'}</span>
                        <span><strong>City:</strong> {adm.stateCity}</span>
                        {adm.message && <span><strong>Notes:</strong> {adm.message}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {activeTab === 'contacts' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                {language === 'hi' ? 'वेबसाइट सम्पर्क एवं पूछताछ सन्देश' : 'Website Contact Inquiries'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contactMessages.map((msg: ContactMessage) => (
                  <div key={msg.id} className="vedic-card" style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div>
                        <span className="vedic-badge badge-gold" style={{ fontSize: '10px' }}>{msg.inquiryType.toUpperCase()}</span>
                        <strong style={{ marginLeft: '8px', fontSize: 'var(--text-sm)' }}>{msg.name}</strong>
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{msg.referenceNo}</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      Email: {msg.email} {msg.phone ? `| Phone: ${msg.phone}` : ''}
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-main)', margin: 0, backgroundColor: 'var(--color-bg-secondary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DONATIONS & 80G */}
          {activeTab === 'donations' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-secondary-dark)', marginBottom: '1rem' }}>
                {language === 'hi' ? 'सहयोग एवं दान लॉग (80G रसीदें)' : 'Donations & Contribution Ledger'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {donations.map((don: DonationPledge) => (
                  <div key={don.id} className="vedic-card" style={{ padding: '1rem 1.25rem', borderLeft: '4px solid var(--color-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-secondary-dark)' }}>{don.receiptNumber}</span>
                        <h4 style={{ fontSize: '1.05rem', margin: '0.1rem 0' }}>{don.donorName} {don.panNumber ? `(PAN: ${don.panNumber})` : ''}</h4>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                          Cause: {don.initiativeTitle} | Mode: {don.paymentMode} | {new Date(don.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          ₹ {don.amount.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => setSelectedReceipt(don)}
                          className="btn btn-secondary btn-sm"
                        >
                          <Printer size={14} />
                          <span>View Receipt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTICES */}
          {activeTab === 'notices' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)' }}>
                  {language === 'hi' ? 'लाइव सूचना प्रबंधन' : 'Live Notice Management'}
                </h3>
                <button
                  onClick={() => setShowAddNotice(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} />
                  <span>{language === 'hi' ? 'नवीन सूचना जोड़ें' : 'Add New Notice'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notices.map((n: NoticeItem) => (
                  <div key={n.id} className="vedic-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem' }}>
                    <div>
                      <span className="vedic-badge badge-gold" style={{ fontSize: '10px' }}>{n.category}</span>
                      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-main)', margin: '0.25rem 0 0 0' }}>
                        {n.titleEn}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
                        {n.titleHi} ({n.date})
                      </p>
                    </div>

                    <button
                      onClick={() => deleteNotice(n.id)}
                      style={{ color: 'var(--color-error)', padding: '0.4rem' }}
                      title="Delete notice"
                      aria-label="Delete notice"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMPLIANCE TRACKER */}
          {activeTab === 'checklist' && (
            <div className="animate-fade-in">
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                {language === 'hi' ? 'संस्थागत प्रामाणिकता एवं प्लेसहोल्डर ट्रैकर' : 'Institutional Authenticity & Signoff Checklist'}
              </h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                Ensuring no fabricated history, unverified affiliations, or fictional statistics are published in production.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="vedic-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="var(--color-success)" />
                  <div style={{ fontSize: 'var(--text-xs)' }}>
                    <strong>Swami Dayanand Saraswati Philosophy:</strong> Verified 6 educational principles and quotations from Satyarth Prakash.
                  </div>
                </div>

                <div className="vedic-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="var(--color-success)" />
                  <div style={{ fontSize: 'var(--text-xs)' }}>
                    <strong>Sanskrit & Devanagari Typography:</strong> Verified conjuncts, mantras (Gayatri, Shanti Path, Asato Ma, Sangathan Sukta) and Panini references.
                  </div>
                </div>

                <div className="vedic-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertTriangle size={20} color="var(--color-warning)" />
                  <div style={{ fontSize: 'var(--text-xs)' }}>
                    <strong>Trust 80G Registration Number:</strong> Marked with verified placeholder format. Pending final certificate scan.
                  </div>
                </div>

                <div className="vedic-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertTriangle size={20} color="var(--color-warning)" />
                  <div style={{ fontSize: 'var(--text-xs)' }}>
                    <strong>Official Bank Account IFSC & Branch:</strong> Labeled with placeholders for pre-launch signoff.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Add Notice Modal */}
      {showAddNotice && (
        <div className="modal-overlay" onClick={() => setShowAddNotice(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              Create New Live Notice
            </h3>
            <form onSubmit={handleCreateNotice}>
              <div className="form-group">
                <label className="form-label">Title in English</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Sanskrit Speaking Workshop Registration"
                  value={newNoticeTitleEn}
                  onChange={(e) => setNewNoticeTitleEn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title in Hindi (हिन्दी)</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="उदा. संस्कृत सम्भाषण कार्यशाला पंजीकरण प्रारम्भ"
                  value={newNoticeTitleHi}
                  onChange={(e) => setNewNoticeTitleHi(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                >
                  <option value="Admissions">Admissions</option>
                  <option value="Trust">Trust</option>
                  <option value="Events">Events</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddNotice(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 80G Receipt Modal */}
      <ReceiptModal
        donation={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

    </div>
  );
};
