import { FacultyMember, FaqItem } from '../types';

export const facultyData: FacultyMember[] = [
  {
    id: 'fac-1',
    nameEn: 'Acharya [Official Name Placeholder]',
    nameHi: 'आचार्य [आधिकारिक नाम]',
    roleEn: 'Kulapati & Head of Vedic Studies',
    roleHi: 'कुलपति एवं विभागाध्यक्ष (वेद विभाग)',
    sanskritRole: 'गुरुकुल-कुलपतिः (वेद-विद्)',
    expertiseEn: 'Rigveda & Yajurveda Bhashya, Vedic Hermeneutics, Dayanand Philosophy',
    expertiseHi: 'ऋग्वेद व यजुर्वेद भाष्य, वैदिक मीमांसा, दयानन्द दर्शन',
    qualification: 'Acharya (Veda), Ph.D. in Sanskrit'
  },
  {
    id: 'fac-2',
    nameEn: 'Acharya [Official Name Placeholder]',
    nameHi: 'आचार्य [आधिकारिक नाम]',
    roleEn: 'Senior Professor of Paninian Vyakarana',
    roleHi: 'वरिष्ठ प्राध्यापक (पाणिनीय व्याकरण)',
    sanskritRole: 'व्याकरणाचार्यः (महाभाष्य-विमर्शकः)',
    expertiseEn: 'Ashtadhyayi, Mahabhashya, Kashika, Siddhanta Kaumudi',
    expertiseHi: 'अष्टाध्यायी, पतञ्जलि महाभाष्य, काशिका, सिद्धान्तकौमुदी',
    qualification: 'Acharya (Vyakarana), Vyakaranatirtha'
  },
  {
    id: 'fac-3',
    nameEn: 'Dr. [Official Name Placeholder]',
    nameHi: 'डॉ. [आधिकारिक नाम]',
    roleEn: 'Professor of Darshana & Comparative Logic',
    roleHi: 'प्राध्यापक (षड्दर्शन एवं तर्कशास्त्र)',
    sanskritRole: 'दर्शन-विभागाध्यक्षः (न्याय-वैशेषिक)',
    expertiseEn: 'Nyaya, Sankhya, Yoga Sutras, Epistemology & Modern Science Interface',
    expertiseHi: 'न्याय, सांख्य, योगदर्शन, प्रमाणमीमांसा एवं आधुनिक विज्ञान',
    qualification: 'Ph.D. in Philosophy, M.A. Sanskrit'
  },
  {
    id: 'fac-4',
    nameEn: 'Yogacharya [Official Name Placeholder]',
    nameHi: 'योगाचार्य [आधिकारिक नाम]',
    roleEn: 'Director of Yoga & Sharirik Shiksha',
    roleHi: 'निदेशक (योगाभ्यास एवं शारीरिक शिक्षा)',
    sanskritRole: 'योगाचार्यः (शारीरिक-संस्कार-प्रमुखः)',
    expertiseEn: 'Patanjali Ashtanga Yoga, Pranayama, Suryanamaskar, Holistic Wellness',
    expertiseHi: 'अष्टाङ्ग योग, प्राणायाम, सूर्य नमस्कार, प्राकृतिक जीवनशैली',
    qualification: 'M.Sc. Yoga & Naturopathy'
  }
];

export const faqsData: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'admissions',
    questionEn: 'What is the minimum age for admission to the residential Gurukul?',
    questionHi: 'गुरुकुल में आवासीय प्रवेश हेतु न्यूनतम आयु क्या है?',
    answerEn: 'For the foundational Prathama program, boys aged 10 to 12 years who have completed Class 5 schooling are eligible. For higher programs (Shastri and Acharya), admission depends on prior Sanskrit qualifications.',
    answerHi: 'प्रथमा कक्षा (प्रारम्भिक स्तर) हेतु १० से १२ वर्ष के बालक जिन्होंने कक्षा ५ उत्तीर्ण की हो, पात्र हैं। शास्त्री एवं आचार्य कक्षाओं हेतु पूर्व योग्यता के आधार पर प्रवेश दिया जाता है।'
  },
  {
    id: 'faq-2',
    category: 'academics',
    questionEn: 'Are modern subjects like Mathematics, Science, and English taught alongside the Vedas?',
    questionHi: 'क्या वेदों के साथ-साथ गणित, विज्ञान और अंग्रेजी जैसे आधुनिक विषय भी पढ़ाए जाते हैं?',
    answerEn: 'Yes. In accordance with Swami Dayanand Saraswati\'s visionary curriculum, the Gurukul integrates classical Vedic studies (Paninian grammar, Vedas, Darshana) with state-standard Mathematics, Science, English, and Computer literacy.',
    answerHi: 'हाँ। महर्षि दयानन्द सरस्वती के शिक्षा-दर्शन के अनुसार वैदिक शास्त्रों, अष्टाध्यायी एवं दर्शन के साथ-साथ गणित, सामान्य विज्ञान, अंग्रेजी एवं कम्प्यूटर का भी शिक्षण दिया जाता है।'
  },
  {
    id: 'faq-3',
    category: 'trust',
    questionEn: 'How does the Vedic Gurukul Trust support underprivileged students?',
    questionHi: 'वैदिक गुरुकुल ट्रस्ट निर्धन व साधनहीन विद्यार्थियों का सहयोग कैसे करता है?',
    answerEn: 'Through our "Bal Vidya Sahayata" initiative, the Trust provides 100% free residential education, sattvic meals, clothing, textbooks, and medical care to deserving students from economically disadvantaged families.',
    answerHi: 'ट्रस्ट की "बाल विद्या सहायता योजना" के माध्यम से निर्धन परिवारों के मेधावी बालकों को सम्पूर्ण निःशुल्क आवासीय शिक्षा, भोजन, वस्त्र, पुस्तकें एवं स्वास्थ्य सुविधा उपलब्ध कराई जाती है।'
  },
  {
    id: 'faq-4',
    category: 'general',
    questionEn: 'Can parents and well-wishers visit the Gurukul campus?',
    questionHi: 'क्या अभिभावक और श्रद्धालु गुरुकुल परिसर में दर्शन हेतु आ सकते हैं?',
    answerEn: 'Yes, visitors are warmly welcome. Campus visiting hours are daily from 9:00 AM to 5:00 PM. Prior appointment or intimation is recommended to arrange for guided tours and interaction with the Acharyas.',
    answerHi: 'हाँ, गुरुकुल में दर्शन हेतु सभी का स्वागत है। मिलने का समय प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक है। पूर्व सूचना देकर आने पर आचार्य जी से भेंट एवं परिसर दर्शन सुगम रहता है।'
  },
  {
    id: 'faq-5',
    category: 'trust',
    questionEn: 'Are donations to the Vedic Gurukul Trust eligible for tax exemption?',
    questionHi: 'क्या वैदिक गुरुकुल ट्रस्ट को दिया गया दान आयकर छूट (80G) हेतु मान्य है?',
    answerEn: 'The Trust maintains legal compliance under applicable Indian statutory laws. Official 80G registration certificates and tax receipts are issued upon verified contribution confirmation.',
    answerHi: 'ट्रस्ट भारतीय नियामकों के अनुसार पूर्ण वैधानिक प्रक्रिया का पालन करता है। दान के उपरांत आधिकारिक 80G रसीद एवं प्रमाण-पत्र जारी किए जाते हैं।'
  }
];
