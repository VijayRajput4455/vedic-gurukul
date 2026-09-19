import { Program } from '../types';

export const programsData: Program[] = [
  {
    id: 'prog-prathama',
    titleEn: 'Prathama (Foundational Veda & Sanskrit Grammar)',
    titleHi: 'प्रथमा (प्रारम्भिक वेद एवं पाणिनीय व्याकरण)',
    sanskritTitle: 'प्रथमा कक्षा (संस्कृत-व्याकरण-प्रारम्भः)',
    category: 'vedic',
    durationEn: '3 Years (Full-time Residential)',
    durationHi: '३ वर्ष (पूर्णकालिक आवासीय)',
    eligibilityEn: 'Boys aged 10-12 years who have completed primary schooling (Class 5).',
    eligibilityHi: '१० से १२ वर्ष के बालक जिन्होंने कक्षा ५ उत्तीर्ण की हो।',
    scheduleEn: 'Residential: 4:30 AM to 9:30 PM (includes Sandhya, Swadhyaya, Games)',
    scheduleHi: 'आवासीय: प्रातः ४:३० से रात्रि ९:३० (सन्ध्या, स्वाध्याय, व्यायाम सहित)',
    descriptionEn: 'An intensive foundational immersion into Paninian Sanskrit grammar (Ashtadhyayi sutra memorization), Vedic Samhita chanting, Sandhyopasana, moral discipline, and foundational mathematics and science.',
    descriptionHi: 'पाणिनीय अष्टाध्यायी सूत्रों का कण्ठस्थीकरण, वेद संहिताओं का शुद्ध सस्वर पाठ, दैनिक सन्ध्योपासन, चरित्र निर्माण एवं आधारभूत आधुनिक विषयों (गणित, विज्ञान, हिन्दी, अंग्रेजी) का प्रारम्भिक अध्ययन।',
    subjectsEn: [
      'Panini Ashtadhyayi (Sutra Patha & Dhatupatha)',
      'Rigveda / Yajurveda Samhita Recitation & Svaras',
      'Daily Sandhyopasana & Panch Maha Yajna Vidhi',
      'Basic Sanskrit Speaking & Composition',
      'Elementary Mathematics, General Science & English'
    ],
    subjectsHi: [
      'पाणिनीय अष्टाध्यायी (सूत्रपाठ एवं धातुपाठ कण्ठस्थ)',
      'ऋग्वेद / यजुर्वेद संहिता सस्वर पाठ एवं स्वर-ज्ञान',
      'दैनिक सन्ध्योपासन एवं पञ्च महायज्ञ विधि',
      'सरल संस्कृत सम्भाषण एवं रचना',
      'आधारभूत गणित, सामान्य विज्ञान एवं अंग्रेजी'
    ],
    highlightsEn: [
      'Complete traditional Brahmacharya environment',
      'Memory enhancement through phonetic chanting',
      'Nutritious sattvic diet & daily Yogasanas',
      'Tuition & accommodation support for eligible candidates'
    ],
    highlightsHi: [
      'पारम्परिक ब्रह्मचर्य एवं गुरु-शिष्य परम्परा',
      'सस्वर पाठ द्वारा स्मरण शक्ति एवं वाक्-शुद्धि का विकास',
      'पौष्टिक सात्त्विक आहार एवं दैनिक योगाभ्यास',
      'योग्य छात्रों हेतु निःशुल्क छात्रवृत्ति व्यवस्था'
    ],
    isResidential: true,
    isAdmissionOpen: true,
    iconName: 'BookOpen'
  },
  {
    id: 'prog-madhyama',
    titleEn: 'Madhyama (Intermediate Sanskrit & Vedic Sciences)',
    titleHi: 'मध्यमा (माध्यमिक संस्कृत एवं वैदिक शास्त्र)',
    sanskritTitle: 'मध्यमा कक्षा (व्याकरण-साहित्य-दर्शन-प्रवेशः)',
    category: 'sanskrit',
    durationEn: '2 Years (Full-time Residential)',
    durationHi: '२ वर्ष (पूर्णकालिक आवासीय)',
    eligibilityEn: 'Students who have passed Prathama or equivalent Class 8 with Sanskrit foundation.',
    eligibilityHi: 'प्रथमा अथवा कक्षा ८ उत्तीर्ण संस्कृत के आधारभूत ज्ञान सहित।',
    scheduleEn: 'Residential: Advanced studies & Shastrartha practice',
    scheduleHi: 'आवासीय: गहन स्वाध्याय एवं शास्त्रार्थ अभ्यास',
    descriptionEn: 'Advanced study of the Kashika commentary, Siddhanta Kaumudi, classical Sanskrit poetry (Raghuvamsham), Introduction to the 6 Darshanas, along with high-school equivalent modern sciences.',
    descriptionHi: 'काशिका वृत्ति, सिद्धान्तकौमुदी, रघुवंशम् आदि महाकाव्य, षड्दर्शन परिचय, वैदिक सूक्तों के व्याख्यात्मक अध्ययन के साथ-साथ माध्यमिक स्तर का विज्ञान, गणित और सामाजिक अध्ययन।',
    subjectsEn: [
      'Ashtadhyayi Mahabhashya (Selected Ahn वजहs) & Kashika',
      'Classical Sanskrit Sahitya (Kalidasa, Bharavi)',
      'Introduction to Nyaya & Vaisheshika Darshanas',
      'Upanishadic Core Concepts (Isha, Kena, Katha)',
      'Secondary School Mathematics, Science & Social Studies'
    ],
    subjectsHi: [
      'अष्टाध्यायी काशिकावृत्ति एवं सिद्धान्तकौमुदी',
      'संस्कृत साहित्य (कालिदास, भारवि कृत महाकाव्य)',
      'न्याय एवं वैशेषिक दर्शन का प्रारम्भिक परिचय',
      'उपनिषद् स्वाध्याय (ईश, केन, कठ उपनिषद्)',
      'माध्यमिक स्तरीय गणित, विज्ञान एवं सामाजिक अध्ययन'
    ],
    highlightsEn: [
      'Debate (Shastrartha) in fluent Sanskrit',
      'Manuscript reading and transcription skills',
      'Deepening of Vedic philosophical rationale',
      'Preparation for university-level Shastri degree'
    ],
    highlightsHi: [
      'संस्कृत में धाराप्रवाह सम्भाषण एवं शास्त्रार्थ अभ्यास',
      'पाण्डुलिपि पठन एवं देवनागरी लिपिशास्त्र',
      'वैदिक एवं दार्शनिक अवधारणाओं की तार्किक समझ',
      'विश्वविद्यालय शास्त्री उपाधि हेतु सुदृढ़ आधार'
    ],
    isResidential: true,
    isAdmissionOpen: true,
    iconName: 'Scroll'
  },
  {
    id: 'prog-shastri',
    titleEn: 'Shastri (B.A. in Sanskrit & Vedic Philosophy)',
    titleHi: 'शास्त्री (स्नातक स्तर: वेद, व्याकरण एवं दर्शन)',
    sanskritTitle: 'शास्त्री पाठ्यक्रमः (वेद-व्याकरण-दर्शन-स्नातकः)',
    category: 'higher',
    durationEn: '3 Years (Residential / Degree Stream)',
    durationHi: '३ वर्ष (आवासीय / उपाधि पाठ्यक्रम)',
    eligibilityEn: 'Passed Madhyama or 10+2 with Sanskrit as a major subject.',
    eligibilityHi: 'मध्यमा अथवा १२वीं कक्षा संस्कृत विषय सहित उत्तीर्ण।',
    scheduleEn: 'University Curriculum + Traditional Gurukul Swadhyaya',
    scheduleHi: 'मान्यता प्राप्त पाठ्यक्रम + पारम्परिक स्वाध्याय',
    descriptionEn: 'A rigorous scholarly undergraduate degree focusing on Panini Mahabhashya, Mimamsa, Sankhya, Yoga Sutras, Vedic Hermeneutics, and comparative Indian and Western philosophy.',
    descriptionHi: 'महाभाष्य, न्याय, सांख्य, योगसूत्र, मीमांसा दर्शन, वैदिक भाषा-विज्ञान एवं तुलनात्मक दर्शनशास्त्र का गहन स्नातक स्तरीय अध्ययन।',
    subjectsEn: [
      'Patanjali Mahabhashya (Navahnika)',
      'Yoga Sutras of Patanjali with Vyasa Bhashya',
      'Sankhya Karika & Nyaya Sutra Bhashya',
      'Vedic Philology & Nirukta of Yaska',
      'Modern Research Methodology & Digital Sanskrit Tools'
    ],
    subjectsHi: [
      'पतञ्जलि महाभाष्य (नवाह्निक)',
      'पातञ्जल योगसूत्र (व्यास भाष्य सहित)',
      'सांख्यकारिका एवं न्यायदर्शन भाष्य',
      'यास्क प्रणीत निरुक्त एवं वैदिक भाषाशास्त्र',
      'शोध प्रविधि एवं डिजिटल संस्कृत कम्प्यूटिंग'
    ],
    highlightsEn: [
      'Scholarly mastery of Vedic commentaries',
      'Eligibility for higher academia, civil services & teaching',
      'Comprehensive training in Yoga and meditation pedagogy',
      'Guidance from seasoned Acharyas and guest scholars'
    ],
    highlightsHi: [
      'वैदिक भाष्यों एवं प्रमाण मीमांसा में विशेषज्ञता',
      'उच्च शिक्षा, अध्यापन एवं शोध हेतु पूर्ण योग्यता',
      'योगाभ्यास एवं ध्यान-साधना का क्रियात्मक प्रशिक्षण',
      'वरिष्ठ आचार्यों एवं विद्वानों का सान्निध्य'
    ],
    isResidential: true,
    isAdmissionOpen: true,
    iconName: 'Award'
  },
  {
    id: 'prog-acharya',
    titleEn: 'Acharya (Master of Sanskrit & Vedic Studies)',
    titleHi: 'आचार्य (परास्नातक स्तर: विशेषज्ञता उपाधि)',
    sanskritTitle: 'आचार्य पदवी (वेद-वेदाङ्ग-दर्शन-शोधः)',
    category: 'higher',
    durationEn: '2 Years (Full-time Research & Teaching Fellowship)',
    durationHi: '२ वर्ष (शोध एवं शिक्षण फैलोशिप सहित)',
    eligibilityEn: 'Passed Shastri or B.A. (Hons.) Sanskrit with minimum 55% marks.',
    eligibilityHi: 'शास्त्री अथवा बी.ए. संस्कृत न्यूनतम ५५% अंकों के साथ।',
    scheduleEn: 'Advanced Seminars, Thesis Writing & Gurukul Teaching Assistance',
    scheduleHi: 'शोध संगोष्ठी, शोध-प्रबन्ध एवं कनिष्ठ अध्यापन',
    descriptionEn: 'Postgraduate master\'s program offering specialized expertise in specific branches: Veda Samhita Bhashya, Vyakarana Shastra, or Sarva Darshana, culminating in scholarly research publications.',
    descriptionHi: 'वेद भाष्य, व्याकरण शास्त्र अथवा सर्वदर्शन में विशेषज्ञता हेतु परास्नातक उपाधि। इसमें मूल ग्रन्थों का अनुशीलन तथा शोध-निबन्ध अनिवार्य होता है।',
    subjectsEn: [
      'Rigveda & Yajurveda Bhashya (Dayanand & Yaska Traditions)',
      'Vakyapadiya of Bhartrihari & Mahabhashya Deep Dive',
      'Brahma Sutra Shankar & Dayanand Hermeneutics',
      'Comparative Linguistics & Sanskrit Computational Models',
      'Acharya Dissertation & Shastrartha Defense'
    ],
    subjectsHi: [
      'ऋग्वेद व यजुर्वेद भाष्य (दयानन्द एवं यास्क परम्परा)',
      'भर्तृहरि कृत वाक्यपदीय एवं महाभाष्य विमर्श',
      'ब्रह्मसूत्र एवं दर्शन ग्रन्थों की मीमांसा',
      'तुलनात्मक भाषा विज्ञान एवं पाण्डुलिपि विज्ञान',
      'आचार्य शोध-प्रबन्ध एवं शास्त्रार्थ'
    ],
    highlightsEn: [
      'Preparation for university professorship (NET/JRF)',
      'Active participation in national Vedic conferences',
      'Mentoring junior Brahmacharis in Gurukul daily life',
      'Publication of academic articles in recognized journals'
    ],
    highlightsHi: [
      'विश्वविद्यालयीय प्राध्यापक पद (NET/JRF) हेतु तैयारी',
      'राष्ट्रीय वैदिक संगोष्ठियों में शोध-पत्र प्रस्तुति',
      'गुरुकुल के कनिष्ठ ब्रह्मचारियों का मार्गदर्शन',
      'शोध पत्रिकाओं में शोध आलेखों का प्रकाशन'
    ],
    isResidential: true,
    isAdmissionOpen: true,
    iconName: 'GraduationCap'
  },
  {
    id: 'prog-sanskrit-speaking',
    titleEn: 'Saral Sanskrit Sambhashan (Spoken Sanskrit Certificate)',
    titleHi: 'सरल संस्कृत सम्भाषण एवं मन्त्रोच्चार (प्रमाण-पत्र पाठ्यक्रम)',
    sanskritTitle: 'सरल-संस्कृत-सम्भाषण-प्रशिक्षणम्',
    category: 'short-term',
    durationEn: '3 Months (Weekend / Hybrid)',
    durationHi: '३ माह (सप्ताहान्त / ऑनलाइन एवं प्रत्यक्ष)',
    eligibilityEn: 'Open to all truth-seekers and students aged 14+ years (no prior knowledge needed).',
    eligibilityHi: '१४ वर्ष से अधिक आयु के सभी जिज्ञासुओं हेतु खुला (पूर्व ज्ञान आवश्यक नहीं)।',
    scheduleEn: 'Saturdays & Sundays (2 hours per session)',
    scheduleHi: 'शनिवार एवं रविवार (२ घण्टे प्रति सत्र)',
    descriptionEn: 'A practical, conversational course designed to make Sanskrit accessible to modern seekers, focusing on daily dialogue, phonetic accuracy, and understanding the meanings of common mantras.',
    descriptionHi: 'दैनिक जीवन में सरल संस्कृत सम्भाषण, शुद्ध मन्त्रोच्चारण और वैदिक प्रार्थनाओं के अर्थ-बोध हेतु तैयार किया गया व्यावहारिक पाठ्यक्रम।',
    subjectsEn: [
      'Everyday Spoken Sanskrit & Sentence Structures',
      'Gayatri, Sandhya & Shanti Path Chanting Rules',
      'Basic Sanskrit Vocabulary for Modern Concepts',
      'Reading Devanagari & Simple Vedic Stotras'
    ],
    subjectsHi: [
      'दैनिक संस्कृत सम्भाषण एवं वाक्य रचना',
      'गायत्री, सन्ध्या एवं शान्ति पाठ के उच्चारण नियम',
      'व्यावहारिक संस्कृत शब्दावली',
      'देवनागरी वाचन एवं सरल सूक्तों का अर्थ'
    ],
    highlightsEn: [
      'Interactive conversational method without rote grammar tables',
      'Digital certificate issued upon completion',
      'Flexible weekend timing suitable for working professionals & youth'
    ],
    highlightsHi: [
      'व्याकरण के जटिल नियमों के बिना प्रत्यक्ष सम्भाषण विधि',
      'पाठ्यक्रम पूर्ण होने पर डिजिटल प्रमाण-पत्र',
      'कार्यरत व्यक्तियों एवं युवाओं हेतु अनुकूल समय'
    ],
    isResidential: false,
    isAdmissionOpen: true,
    iconName: 'MessageSquare'
  },
  {
    id: 'prog-youth-gurukul',
    titleEn: 'Bal & Yuva Sanskar Shivir (Weekend Vedic Camp)',
    titleHi: 'बाल एवं युवा संस्कार शिविर (सप्ताहान्त गुरुकुल)',
    sanskritTitle: 'बाल-संस्कार-केन्द्रम् (नैतिक-प्रशिक्षणम्)',
    category: 'youth',
    durationEn: 'Ongoing (Every Sunday)',
    durationHi: 'निरन्तर (प्रत्येक रविवार)',
    eligibilityEn: 'School-going children and youth (Ages 7-18 years).',
    eligibilityHi: 'विद्यालयी छात्र एवं युवा (आयु ७ से १८ वर्ष)।',
    scheduleEn: 'Sundays 8:00 AM to 12:30 PM (includes Breakfast & Yajna)',
    scheduleHi: 'रविवार प्रातः ८:०० से दोपहर १२:३० (यज्ञ एवं सात्त्विक अल्पाहार सहित)',
    descriptionEn: 'A weekend values-based initiative to impart ancient Indian cultural heritage, Vedic Agnihotra, moral stories from the Upanishads and Satyarth Prakash, Yoga, and character development.',
    descriptionHi: 'बच्चों में सदाचार, माता-पिता व गुरुजनों के प्रति सम्मान, दैनिक हवन-यज्ञ विधि, योगासन, सूर्य नमस्कार एवं देशप्रेम के संस्कारों का बीजारोपण।',
    subjectsEn: [
      'Havan & Agnihotra Practice for Children',
      'Suryanamaskar, Asanas & Pranayama',
      'Inspiring Moral Biographies (Rishi Dayanand, Ram, Krishna)',
      'Debating Skills, Self-Discipline & Vedic Science'
    ],
    subjectsHi: [
      'बालकों हेतु सरल दैनिक यज्ञ-हवन विधि',
      'सूर्य नमस्कार, योगासन एवं प्राणायाम',
      'प्रेरक जीवन-चरित्र (महर्षि दयानन्द, राम, कृष्ण, आदि)',
      'तर्क-क्षमता, अनुशासन एवं वैदिक विज्ञान'
    ],
    highlightsEn: [
      'Holistic personality development alongside school education',
      'Completely free initiative organized by Vedic Gurukul Trust',
      'Parental workshops on positive Vedic parenting'
    ],
    highlightsHi: [
      'स्कूली शिक्षा के साथ सर्वांगीण व्यक्तित्व विकास',
      'वैदिक गुरुकुल ट्रस्ट द्वारा निःशुल्क संचालित',
      'अभिभावकों हेतु संस्कार एवं मार्गदर्शन सत्र'
    ],
    isResidential: false,
    isAdmissionOpen: true,
    iconName: 'Sun'
  }
];
