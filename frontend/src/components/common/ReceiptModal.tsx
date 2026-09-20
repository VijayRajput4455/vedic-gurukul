import React from 'react';
import { DonationPledge } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { trustFinancialPlaceholder } from '../../data/trust';
import { X, Printer, Flame } from 'lucide-react';

interface ReceiptModalProps {
  donation: DonationPledge | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ donation, onClose }) => {
  const { language, t } = useLanguage();

  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          padding: '2rem',
          backgroundColor: '#FFFDF9',
          border: '2px solid var(--color-gold)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close receipt">
          <X size={18} />
        </button>

        {/* Printable Receipt Paper Container */}
        <div id="printable-receipt" style={{
          border: '2px solid #D4C3AF',
          padding: '1.75rem',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          backgroundColor: '#FCFAF6'
        }}>
          {/* Watermark Emblem */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.05,
            pointerEvents: 'none',
            fontSize: '140px',
            fontFamily: 'var(--font-heading-devanagari)',
            color: 'var(--color-primary)'
          }}>
            ॐ
          </div>

          {/* Receipt Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid var(--color-gold)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Flame size={20} color="var(--color-primary)" />
              <span style={{ fontFamily: 'var(--font-heading-devanagari)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {language === 'hi' ? 'वैदिक गुरुकुल ट्रस्ट' : 'VEDIC GURUKUL TRUST'}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 0.25rem 0' }}>
              {trustFinancialPlaceholder.registeredAddress}
            </p>
            <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', margin: 0, fontStyle: 'italic' }}>
              {trustFinancialPlaceholder.taxExemptionStatus}
            </p>
          </div>

          {/* Receipt Title & Number */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: 'var(--text-xs)' }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'रसीद संख्या:' : 'Receipt No:'} </span>
              <strong style={{ color: 'var(--color-primary)' }}>{donation.receiptNumber}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'दिनांक:' : 'Date:'} </span>
              <strong>{new Date(donation.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
            </div>
          </div>

          {/* Donor & Contribution Details Table */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6DBCF',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            fontSize: 'var(--text-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'सहयोगी/दानदाता का नाम:' : 'Donor Name:'}</span>
              <strong style={{ color: 'var(--color-text-main)' }}>{donation.donorName}</strong>
            </div>
            {donation.panNumber && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'पैन (PAN Number):' : 'PAN Number:'}</span>
                <strong>{donation.panNumber}</strong>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'सहयोग योजना / उद्देश्य:' : 'Purpose / Initiative:'}</span>
              <strong style={{ color: 'var(--color-primary-dark)' }}>{donation.initiativeTitle}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>{language === 'hi' ? 'भुगतान माध्यम:' : 'Payment Mode:'}</span>
              <span>{donation.paymentMode} ({donation.status})</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '0.5rem',
              borderTop: '1px dashed #D4C3AF',
              fontSize: '0.95rem'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>{language === 'hi' ? 'सहयोग राशि:' : 'Amount Donated:'}</span>
              <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.15rem' }}>
                ₹ {donation.amount.toLocaleString('en-IN')} /-
              </span>
            </div>
          </div>

          {/* Statutory Footer & Signature */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '10px',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ maxWidth: '320px' }}>
              <p style={{ margin: '0 0 2px 0' }}>
                * {language === 'hi' ? 'यह एक कम्प्यूटर-जनित आधिकारिक सहयोग पावती है।' : 'This is a computer-generated simulated acknowledgment receipt.'}
              </p>
              <p style={{ margin: 0 }}>
                {language === 'hi' ? 'आपके पवित्र सहयोग हेतु वैदिक गुरुकुल ट्रस्ट आपका आभारी है।' : 'Vedic Gurukul Trust gratefully acknowledges your generous contribution.'}
              </p>
            </div>

            <div style={{ textAlign: 'center', minWidth: '130px' }}>
              <div style={{ height: '30px', borderBottom: '1px solid #786C5E', marginBottom: '4px' }} />
              <span>{language === 'hi' ? 'प्राधिकृत हस्ताक्षरकर्ता' : 'Authorized Signatory'}</span>
              <div style={{ fontSize: '9px', color: 'var(--color-primary)' }}>Vedic Gurukul Trust</div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={15} />
            <span>{language === 'hi' ? 'रसीद प्रिंट करें' : 'Print Receipt'}</span>
          </button>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            <span>{t.common.close}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
