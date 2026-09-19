export type Language = 'en' | 'hi';
export type Theme = 'parchment' | 'sandalwood';

export type PageId =
  | 'home'
  | 'about'
  | 'philosophy'
  | 'education'
  | 'admissions'
  | 'trust'
  | 'gallery'
  | 'events'
  | 'contact'
  | 'admin';

export interface NavigationItem {
  id: PageId;
  labelEn: string;
  labelHi: string;
  path: string;
}

export interface Program {
  id: string;
  titleEn: string;
  titleHi: string;
  sanskritTitle: string;
  category: 'vedic' | 'sanskrit' | 'higher' | 'short-term' | 'youth';
  durationEn: string;
  durationHi: string;
  eligibilityEn: string;
  eligibilityHi: string;
  scheduleEn: string;
  scheduleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  subjectsEn: string[];
  subjectsHi: string[];
  highlightsEn: string[];
  highlightsHi: string[];
  isResidential: boolean;
  isAdmissionOpen: boolean;
  iconName: string;
}

export interface AdmissionInquiry {
  id: string;
  referenceNumber: string;
  studentName: string;
  parentName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  programId: string;
  programName: string;
  previousEducation: string;
  hostelRequired: boolean;
  stateCity: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'admitted';
  createdAt: string;
}

export interface TrustInitiative {
  id: string;
  titleEn: string;
  titleHi: string;
  sanskritTitle: string;
  summaryEn: string;
  summaryHi: string;
  descriptionEn: string;
  descriptionHi: string;
  iconName: string;
  keyPointsEn: string[];
  keyPointsHi: string[];
  transparencyNoteEn: string;
  transparencyNoteHi: string;
}

export interface DonationPledge {
  id: string;
  receiptNumber: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber?: string;
  address?: string;
  amount: number;
  initiativeId: string;
  initiativeTitle: string;
  is80GRequested: boolean;
  paymentMode: 'UPI' | 'NetBanking' | 'Card' | 'Cheque';
  status: 'Completed (Simulated)' | 'Pending Verification';
  createdAt: string;
}

export interface PhilosophyPillar {
  id: string;
  number: number;
  titleEn: string;
  titleHi: string;
  sanskritTitle: string;
  aphorismSanskrit: string;
  aphorismTransliteration: string;
  descriptionEn: string;
  descriptionHi: string;
  dayanandPrincipleRefEn: string;
  dayanandPrincipleRefHi: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  sanskritTitle: string;
  category: 'campus' | 'pathshala' | 'library' | 'yoga' | 'utsav';
  imageUrl: string;
  captionEn: string;
  captionHi: string;
}

export interface EventItem {
  id: string;
  titleEn: string;
  titleHi: string;
  sanskritTitle: string;
  dateEn: string;
  dateHi: string;
  timeEn: string;
  timeHi: string;
  locationEn: string;
  locationHi: string;
  category: 'utsav' | 'conference' | 'shivir' | 'samavartan' | 'announcement';
  descriptionEn: string;
  descriptionHi: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
  highlightsEn: string[];
  highlightsHi: string[];
}

export interface ShlokaItem {
  id: string;
  titleEn: string;
  titleHi: string;
  vedaSource: string;
  sanskritVerse: string;
  transliteration: string;
  englishMeaning: string;
  hindiMeaning: string;
  contextNoteEn: string;
  contextNoteHi: string;
  audioFrequencyHz: number;
}

export interface NoticeItem {
  id: string;
  titleEn: string;
  titleHi: string;
  date: string;
  category: 'Admissions' | 'Trust' | 'Events' | 'Academic';
  isUrgent?: boolean;
  linkText?: string;
  targetPage?: PageId;
}

export interface ContactMessage {
  id: string;
  referenceNo: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: 'general' | 'admissions' | 'trust' | 'visit' | 'media';
  message: string;
  status: 'new' | 'replied';
  createdAt: string;
}

export interface FacultyMember {
  id: string;
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  sanskritRole: string;
  expertiseEn: string;
  expertiseHi: string;
  qualification: string;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'admissions' | 'trust' | 'academics';
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}
