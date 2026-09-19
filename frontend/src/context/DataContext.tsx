import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdmissionInquiry, ContactMessage, DonationPledge, NoticeItem } from '../types';

interface DataContextType {
  admissionInquiries: AdmissionInquiry[];
  addAdmissionInquiry: (data: Omit<AdmissionInquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<AdmissionInquiry>;
  updateInquiryStatus: (id: string, status: AdmissionInquiry['status']) => void;
  
  contactMessages: ContactMessage[];
  addContactMessage: (data: Omit<ContactMessage, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => Promise<ContactMessage>;
  
  donations: DonationPledge[];
  addDonationPledge: (data: Omit<DonationPledge, 'id' | 'receiptNumber' | 'createdAt' | 'status'>) => Promise<DonationPledge>;
  
  notices: NoticeItem[];
  addNotice: (notice: NoticeItem) => void;
  deleteNotice: (id: string) => void;
}

const defaultNotices: NoticeItem[] = [
  {
    id: 'n1',
    titleEn: 'Admissions Open for Academic Session 2026-2027: Veda Samhita & Sanskrit Vyakarana',
    titleHi: 'सत्र 2026-2027 हेतु प्रवेश प्रारम्भ: वेद संहिता एवं पाणिनीय व्याकरण',
    date: '2026-04-15',
    category: 'Admissions',
    isUrgent: true,
    linkText: 'Apply Online',
    targetPage: 'admissions'
  },
  {
    id: 'n2',
    titleEn: 'Bal Vidya Sahayata: Sponsorship applications invited for rural & underprivileged students',
    titleHi: 'बाल विद्या सहायता योजना: वंचित बालकों हेतु निःशुल्क गुरुकुल शिक्षा आवेदन',
    date: '2026-05-01',
    category: 'Trust',
    isUrgent: false,
    linkText: 'Learn More',
    targetPage: 'trust'
  },
  {
    id: 'n3',
    titleEn: 'Rishi Bodhotsav & Annual Veda Parayan Saptaha Celebration',
    titleHi: 'ऋषि बोधोत्सव एवं वार्षिक वेद पारायण सप्ताह महामहोत्सव',
    date: '2026-06-10',
    category: 'Events',
    isUrgent: false,
    linkText: 'Event Schedule',
    targetPage: 'events'
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inquiries State
  const [admissionInquiries, setAdmissionInquiries] = useState<AdmissionInquiry[]>(() => {
    const saved = localStorage.getItem('vedic_admissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'adm-demo-1',
        referenceNumber: 'VG-ADM-2026-108',
        studentName: 'Aarav Sharma',
        parentName: 'Ramesh Sharma',
        dob: '2014-07-12',
        gender: 'male',
        email: 'ramesh.sharma@example.com',
        phone: '+91 98765 43210',
        programId: 'prog-prathama',
        programName: 'Prathama (Foundation Veda & Sanskrit)',
        previousEducation: 'Class 5 Passed',
        hostelRequired: true,
        stateCity: 'Varanasi, Uttar Pradesh',
        message: 'Eager to learn Panini Ashtadhyayi and Rigveda under traditional Acharya guidance.',
        status: 'reviewed',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Contact Messages State
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('vedic_contacts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'msg-demo-1',
        referenceNo: 'VG-MSG-402',
        name: 'Dr. Surendra Arya',
        email: 'surendra.arya@example.org',
        phone: '+91 94123 45678',
        inquiryType: 'visit',
        message: 'Seeking permission for a research group visit to study ancient manuscript conservation.',
        status: 'new',
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Donations State
  const [donations, setDonations] = useState<DonationPledge[]>(() => {
    const saved = localStorage.getItem('vedic_donations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'don-demo-1',
        receiptNumber: 'VGT-80G-2026-0042',
        donorName: 'Devrat Shastri',
        email: 'devrat@example.com',
        phone: '+91 98234 56789',
        panNumber: 'ABCDE1234F',
        address: 'New Delhi, India',
        amount: 11000,
        initiativeId: 'init-bal-vidya',
        initiativeTitle: 'Bal Vidya Sahayata (Student Education Support)',
        is80GRequested: true,
        paymentMode: 'UPI',
        status: 'Completed (Simulated)',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];
  });

  // Notices State
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('vedic_notices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultNotices;
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('vedic_admissions', JSON.stringify(admissionInquiries));
  }, [admissionInquiries]);

  useEffect(() => {
    localStorage.setItem('vedic_contacts', JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem('vedic_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('vedic_notices', JSON.stringify(notices));
  }, [notices]);

  // Actions
  const addAdmissionInquiry = async (
    data: Omit<AdmissionInquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
  ): Promise<AdmissionInquiry> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newInquiry: AdmissionInquiry = {
      ...data,
      id: `adm-${Date.now()}`,
      referenceNumber: `VG-ADM-2026-${randomSuffix}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setAdmissionInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: AdmissionInquiry['status']) => {
    setAdmissionInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const addContactMessage = async (
    data: Omit<ContactMessage, 'id' | 'referenceNo' | 'createdAt' | 'status'>
  ): Promise<ContactMessage> => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      referenceNo: `VG-MSG-${randomSuffix}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMessage, ...prev]);
    return newMessage;
  };

  const addDonationPledge = async (
    data: Omit<DonationPledge, 'id' | 'receiptNumber' | 'createdAt' | 'status'>
  ): Promise<DonationPledge> => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newDonation: DonationPledge = {
      ...data,
      id: `don-${Date.now()}`,
      receiptNumber: `VGT-80G-2026-${randomNum}`,
      status: 'Completed (Simulated)',
      createdAt: new Date().toISOString()
    };
    setDonations((prev) => [newDonation, ...prev]);
    return newDonation;
  };

  const addNotice = (notice: NoticeItem) => {
    setNotices((prev) => [notice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        admissionInquiries,
        addAdmissionInquiry,
        updateInquiryStatus,
        contactMessages,
        addContactMessage,
        donations,
        addDonationPledge,
        notices,
        addNotice,
        deleteNotice
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
