import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PageId, EventItem, NoticeItem } from '../types';
import { eventsData } from '../data/events';
import { Calendar, Clock, MapPin, Sparkles, Bell, CheckCircle, Download, ArrowRight, X } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { notices } = useData();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  const upcomingEvents = eventsData.filter((e: EventItem) => e.isUpcoming);
  const pastEvents = eventsData.filter((e: EventItem) => !e.isUpcoming);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName.trim() && rsvpPhone.trim()) {
      setRsvpSuccess(true);
      setTimeout(() => {
        setRsvpSuccess(false);
        setSelectedEvent(null);
        setRsvpName('');
        setRsvpPhone('');
      }, 3000);
    }
  };

  const handleExportIcs = (event: EventItem) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vedic Gurukul//Events//EN
BEGIN:VEVENT
SUMMARY:${event.titleEn}
DESCRIPTION:${event.descriptionEn}
LOCATION:${event.locationEn}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="events-page-wrapper">
      
      {/* 1. Header */}
      <section style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0 var(--spacing-12) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="vedic-badge badge-saffron" style={{ marginBottom: '0.75rem' }}>
            <Calendar size={13} />
            <span>{language === 'hi' ? 'वैदिक उत्सव एवं सूचनाएं' : 'Vedic Festivals & Events'}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading-devanagari)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: 'var(--color-primary-dark)',
            marginBottom: '0.75rem'
          }}>
            {language === 'hi' ? 'आगामी कार्यक्रम, संगोष्ठियाँ एवं सूचना पटल' : 'Upcoming Gatherings, Seminars & Notice Board'}
          </h1>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            maxWidth: '1080px',
            margin: '0 auto'
          }}>
            {language === 'hi'
              ? 'ऋषि बोधोत्सव, वेद पारायण सप्ताह, संस्कृत सम्भाषण गोष्ठी एवं गुरुकुल के वार्षिक उत्सव।'
              : 'Join us for Veda Parayan weeks, Sanskrit conferences, and community Yajna assemblies.'}
          </p>
        </div>
      </section>

      {/* 2. Official Notice Board Ticker & List */}
      <section className="section-pad-sm" style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="section-header" style={{ marginBottom: 'var(--spacing-6)' }}>
            <div className="section-tag">
              <span className="vedic-badge badge-gold">
                <Bell size={13} />
                <span>{language === 'hi' ? 'आधिकारिक सूचना पटल' : 'Official Notice Board'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.6rem' }}>
              {language === 'hi' ? 'गुरुकुल एवं ट्रस्ट की नवीनतम घोषणाएं' : 'Institutional Announcements & Circulars'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notices.map((n: NoticeItem) => (
              <div key={n.id} style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 auto' }}>
                  <span className={`vedic-badge ${n.isUrgent ? 'badge-saffron' : 'badge-gold'}`} style={{ fontSize: '10px' }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    {language === 'hi' ? n.titleHi : n.titleEn}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{n.date}</span>
                  {n.targetPage && (
                    <button
                      onClick={() => onNavigate(n.targetPage!)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.25rem 0.6rem' }}
                    >
                      <span>{language === 'hi' ? 'देखें' : 'View'}</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Upcoming Events Catalog */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-bg-main)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <span className="vedic-badge badge-saffron">
                <Calendar size={13} />
                <span>{language === 'hi' ? 'आगामी उत्सव' : 'Upcoming Celebrations'}</span>
              </span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-heading-devanagari)' }}>
              {language === 'hi' ? 'आगामी वैदिक महामहोत्सव एवं संगोष्ठियाँ' : 'Upcoming Events & Spiritual Gatherings'}
            </h2>
            <div className="ornamental-divider">
              <Sparkles size={16} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', maxWidth: '1400px', margin: '0 auto var(--spacing-16) auto' }}>
            {upcomingEvents.map((evt: EventItem) => (
              <div key={evt.id} className="vedic-card-ornate" style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.25rem',
                borderLeft: '5px solid var(--color-primary)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="vedic-badge badge-gold" style={{ fontSize: '11px' }}>
                      {evt.sanskritTitle}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 600 }}>
                      ● {language === 'hi' ? 'पंजीकरण खुला है' : 'Open for Attendees'}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-heading-devanagari)',
                    color: 'var(--color-primary-dark)',
                    marginBottom: '0.5rem'
                  }}>
                    {language === 'hi' ? evt.titleHi : evt.titleEn}
                  </h3>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} color="var(--color-primary)" />
                      <span>{language === 'hi' ? evt.dateHi : evt.dateEn}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} color="var(--color-gold)" />
                      <span>{language === 'hi' ? evt.timeHi : evt.timeEn}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} color="var(--color-secondary)" />
                      <span>{language === 'hi' ? evt.locationHi : evt.locationEn}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>
                    {language === 'hi' ? evt.descriptionHi : evt.descriptionEn}
                  </p>

                  {/* Highlights list */}
                  <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <h5 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                      {language === 'hi' ? 'कार्यक्रम के मुख्य आकर्षण:' : 'Event Program Details:'}
                    </h5>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-main)' }}>
                      {(language === 'hi' ? evt.highlightsHi : evt.highlightsEn).map((h: string, i: number) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: 'var(--color-gold)' }}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="btn btn-primary btn-sm"
                    >
                      <span>{language === 'hi' ? 'उपस्थिति हेतु RSVP / पंजीकरण' : 'RSVP / Register Free'}</span>
                    </button>

                    <button
                      onClick={() => handleExportIcs(evt)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Download size={14} />
                      <span>{language === 'hi' ? 'कैलेंडर में जोड़ें (.ics)' : 'Add to Calendar (.ics)'}</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* 4. Past Events Archive */}
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: '1.3rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
              borderBottom: '1px dashed var(--color-border)',
              paddingBottom: '0.5rem'
            }}>
              {language === 'hi' ? 'सम्पन्न कार्यक्रम अभिलेखागार' : 'Past Concluded Events'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pastEvents.map((pe: EventItem) => (
                <div key={pe.id} style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  opacity: 0.85
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading-devanagari)', color: 'var(--color-text-main)', margin: 0 }}>
                      {language === 'hi' ? pe.titleHi : pe.titleEn}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{pe.dateEn}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {language === 'hi' ? pe.descriptionHi : pe.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)} aria-label="Close RSVP">
              <X size={18} />
            </button>

            <h3 style={{
              fontFamily: 'var(--font-heading-devanagari)',
              fontSize: '1.35rem',
              color: 'var(--color-primary-dark)',
              marginBottom: '0.25rem'
            }}>
              {language === 'hi' ? 'कार्यक्रम उपस्थिति पंजीकरण' : 'Event Attendee RSVP'}
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              {language === 'hi' ? selectedEvent.titleHi : selectedEvent.titleEn}
            </p>

            {rsvpSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle size={40} color="var(--color-success)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ color: 'var(--color-success)', marginBottom: '0.25rem' }}>
                  {language === 'hi' ? 'पंजीकरण सफलतापूर्वक दर्ज हुआ!' : 'RSVP Recorded Successfully!'}
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {language === 'hi' ? 'हम आपके आगमन की प्रतीक्षा करेंगे। सादर धन्यवाद।' : 'We look forward to welcoming you to the Gurukul grounds.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'आपका नाम' : 'Full Name'} <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Ramesh Sharma"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'hi' ? 'मोबाइल / व्हाट्सएप नम्बर' : 'Mobile Number'} <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button type="button" onClick={() => setSelectedEvent(null)} className="btn btn-secondary btn-sm">
                    {t.common.close}
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <span>{language === 'hi' ? 'पंजीकरण पुष्टि करें' : 'Confirm Free RSVP'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
