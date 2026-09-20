export interface GeneratePdfOptions {
  language?: 'hi' | 'en';
  filename?: string;
}

export const generateVedicDossierPdf = async (options: GeneratePdfOptions = {}): Promise<void> => {
  const lang = options.language || 'hi';
  const isHi = lang === 'hi';
  const filename = options.filename || 'vedicgurukul';
  const cleanTitle = filename.replace(/\.pdf$/i, '');

  // Use a hidden iframe for 100% reliable, pristine native vector PDF generation
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  iframe.setAttribute('aria-hidden', 'true');

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <title>${cleanTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Gotu&family=Martel:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4 portrait;
            margin: 7mm 9mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            background-color: #FAF6F0 !important;
            color: #2D2319 !important;
            font-family: ${isHi ? "'Gotu', 'Martel', serif" : "'Outfit', 'Cinzel', sans-serif"};
            font-size: 11.5px;
            line-height: 1.45;
          }
          .vedic-page-sheet {
            width: 100%;
            height: 278mm;
            max-height: 278mm;
            box-sizing: border-box;
            background: #FFFDF9 !important;
            border: 3px solid #C59A4E !important;
            border-radius: 10px;
            padding: 12px;
            position: relative;
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            break-inside: avoid;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
          }
          .vedic-page-sheet:last-of-type {
            page-break-after: avoid;
            break-after: avoid;
          }
          .inner-border {
            border: 1.4px dashed rgba(197, 154, 78, 0.65) !important;
            border-radius: 7px;
            padding: 14px 18px;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 210px;
            color: #A65F2B;
            opacity: 0.035;
            pointer-events: none;
            font-family: 'Gotu', serif;
            z-index: 0;
            user-select: none;
          }
          .content-body {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 9px;
          }
          .shloka-banner {
            background: #F4ECE1 !important;
            border: 1px solid #D8C3A5 !important;
            padding: 5px 12px;
            border-radius: 5px;
            font-style: italic;
            font-size: 10.5px;
            color: #783E18 !important;
            text-align: center;
            font-weight: 600;
            letter-spacing: 0.02em;
          }
          .institution-title {
            font-family: 'Cinzel', 'Gotu', serif;
            font-size: 19px;
            font-weight: 800;
            color: #A65F2B !important;
            margin: 2px 0;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            text-align: center;
          }
          .institution-subtitle {
            font-size: 10.5px;
            color: #6E5A44 !important;
            text-align: center;
            margin-bottom: 2px;
          }
          .institution-loc {
            font-size: 10.5px;
            color: #A65F2B !important;
            font-weight: 700;
            text-align: center;
          }
          .header-divider {
            border-bottom: 1.5px solid #C59A4E !important;
            padding-bottom: 8px;
            margin-bottom: 6px;
            text-align: center;
          }
          .meta-bar {
            display: flex;
            justify-content: space-between;
            background: #F9F4EB !important;
            border: 1px solid #E2D3BE !important;
            padding: 4px 10px;
            border-radius: 5px;
            font-size: 9.5px;
            font-weight: 600;
            color: #5C4B37 !important;
          }
          .section-card {
            background: #FFFFFF !important;
            border: 1px solid #E6DBCF !important;
            border-left: 4.5px solid #A65F2B !important;
            border-radius: 5px;
            padding: 9px 12px;
          }
          .section-card-gold {
            background: #FFFFFF !important;
            border: 1px solid #E6DBCF !important;
            border-left: 4.5px solid #C59A4E !important;
            border-radius: 5px;
            padding: 9px 12px;
          }
          .section-heading {
            font-family: 'Cinzel', 'Gotu', serif;
            font-size: 11.5px;
            font-weight: 700;
            color: #783E18 !important;
            margin: 0 0 6px 0;
            border-bottom: 1px solid #F0E6D8 !important;
            padding-bottom: 3px;
          }
          .grid-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .grid-row-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 8px;
          }
          .info-label {
            font-weight: 700;
            color: #4A3A2A !important;
            font-size: 10px;
            margin-bottom: 1px;
          }
          .info-val {
            color: #5C4B37 !important;
            font-size: 10px;
            line-height: 1.4;
          }
          .rules-list {
            padding-left: 16px;
            margin: 2px 0;
          }
          .rules-list li {
            margin-bottom: 3px;
            color: #4A3A2A !important;
            font-size: 10px;
            line-height: 1.35;
          }
          .transit-box {
            background: #FAF7F2 !important;
            border: 1px solid #E8DFD3 !important;
            border-radius: 5px;
            padding: 7px 9px;
          }
          .transit-title {
            font-weight: 700;
            color: #A65F2B !important;
            font-size: 10px;
            margin-bottom: 2px;
          }
          .footer-seal-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1.5px solid #C59A4E !important;
            padding-top: 8px;
            font-size: 9.5px;
            color: #6E5A44 !important;
            position: relative;
            z-index: 1;
          }
          .seal-badge {
            border: 1px solid #C59A4E !important;
            color: #783E18 !important;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 8.5px;
            text-transform: uppercase;
            background: #FFF9EE !important;
          }
        </style>
      </head>
      <body>
        
        <!-- PAGE 1 -->
        <div class="vedic-page-sheet">
          <div class="inner-border">
            <div class="watermark">ॐ</div>
            
            <div class="content-body">
              <div class="shloka-banner">
                ॥ ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
              </div>

              <div class="header-divider">
                <div class="institution-title">${isHi ? 'संस्कृत वैदिक गुरुकुल एवं ट्रस्ट' : 'SANSKRIT VEDIC GURUKUL & TRUST'}</div>
                <div class="institution-subtitle">${isHi ? 'प्राचीन ऋषि परम्परा, वेदाध्ययन, चरित्र निर्माण एवं निःशुल्क गुरुकुल शिक्षा संस्थान' : 'Center for Vedic Studies, Sanskrit Scriptures, Character Building & Holistic Education'}</div>
                <div class="institution-loc">${isHi ? 'हरिद्वार, उत्तराखण्ड, भारत — २४९४०८' : 'Haridwar, Uttarakhand, India — 249408'}</div>
              </div>

              <div class="meta-bar">
                <div><strong>${isHi ? 'दस्तावेज:' : 'Doc Ref:'}</strong> SVG-DOSSIER-${new Date().getFullYear()}</div>
                <div><strong>${isHi ? 'जीपीएस:' : 'GPS:'}</strong> 29.9457° N, 78.1642° E</div>
                <div><strong>${isHi ? 'अद्यतन:' : 'Updated:'}</strong> ${new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
              </div>

              <div class="section-card">
                <div class="section-heading">${isHi ? '१. आधिकारिक सम्पर्क एवं परिसर पता' : '1. Official Address & Contact Points'}</div>
                <div class="grid-row-2">
                  <div>
                    <div class="info-label">${isHi ? 'गुरुकुल एवं ट्रस्ट परिसर:' : 'Campus Location:'}</div>
                    <div class="info-val">${isHi ? 'संस्कृत वैदिक गुरुकुल एवं वैदिक गुरुकुल ट्रस्ट, गंगा तट मार्ग, हरिद्वार (उत्तराखण्ड), भारत — २४९४०८' : 'Sanskrit Vedic Gurukul & Trust, Ganga Coastline Marg, Haridwar (UK), India — 249408'}</div>
                  </div>
                  <div>
                    <div class="info-label">${isHi ? 'हेल्पलाइन एवं फोन:' : 'Telephone & Helpline:'}</div>
                    <div class="info-val">+91 98765 43210 / +91 1334 220000 (09:00 AM – 05:00 PM)</div>
                    <div class="info-val" style="margin-top:2px;"><strong>Email:</strong> contact@vedicgurukul.org / trust@vedicgurukul.org</div>
                  </div>
                </div>
              </div>

              <div class="section-card-gold">
                <div class="section-heading" style="color:#A65F2B !important;">${isHi ? '२. परिसर दर्शन एवं दैनिक समय-सारणी' : '2. Visiting Hours & Schedule'}</div>
                <div class="grid-row-2">
                  <div>
                    <div class="info-label">${isHi ? 'आगंतुक दर्शन समय:' : 'Guest Visiting Timings:'}</div>
                    <div class="info-val">${isHi ? 'प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक' : 'Daily: 9:00 AM to 5:00 PM (Prior appointment recommended)'}</div>
                    <div class="info-val" style="margin-top:2px;"><strong>${isHi ? 'अभिभावक भेंट:' : 'Parent Hours:'}</strong> ${isHi ? 'सायं ४:४५ से ५:४५ अथवा भोजन विराम' : '4:45 PM – 5:45 PM daily'}</div>
                  </div>
                  <div>
                    <div class="info-label">${isHi ? 'दैनिक यज्ञ एवं आरती समय:' : 'Daily Yajna & Hawan Schedule:'}</div>
                    <div class="info-val">${isHi ? 'प्रातःकालीन यज्ञ: ०६:०० से ०७:३० बजे तक' : 'Morning Agnihotra: 6:00 AM – 7:30 AM'}</div>
                    <div class="info-val">${isHi ? 'सायंकालीन संध्या व आरती: ०६:३० से ०७:३० बजे' : 'Evening Sandhya: 6:30 PM – 7:30 PM'}</div>
                  </div>
                </div>
              </div>

              <div class="section-card">
                <div class="section-heading">${isHi ? '३. परिसर दर्शन मर्यादा एवं नियम' : '3. Campus Etiquette & Visiting Rules'}</div>
                <ul class="rules-list">
                  <li>${isHi ? 'परिसर में पूर्ण सात्त्विक, नशामुक्त, धूम्रपान रहित एवं शान्त आध्यात्मिक वातावरण बनाए रखें।' : 'Maintain a peaceful, tobacco-free, strictly vegetarian, and sattvic atmosphere throughout the premises.'}</li>
                  <li>${isHi ? 'यज्ञशाला, ग्रंथागार एवं अध्ययन कक्षों में प्रवेश से पूर्व निर्धारित स्थान पर जूते-चप्पल उतारें।' : 'Footwear must be removed at designated shoe counters before entering Yajnashala and Classrooms.'}</li>
                  <li>${isHi ? 'परिसर दर्शन के समय मर्यादित एवं पारम्परिक भारतीय वेशभूषा का पालन करें।' : 'Visitors are requested to observe modest and traditional attire during their visit.'}</li>
                  <li>${isHi ? 'यज्ञशाला एवं अध्ययनरत विद्यार्थियों की फोटोग्राफी हेतु कार्यालय से पूर्व अनुमति आवश्यक है।' : 'Photography during sacred Hawan rituals and student study courtyards requires prior permission.'}</li>
                </ul>
              </div>

            </div>

            <div class="footer-seal-box">
              <div>${isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार (उत्तराखण्ड)' : 'Sanskrit Vedic Gurukul Trust, Haridwar (Uttarakhand)'}</div>
              <div class="seal-badge">${isHi ? 'पृष्ठ १ / २ (जारी आगे)' : 'Page 1 of 2 (Continued Overleaf)'}</div>
            </div>

          </div>
        </div>

        <!-- PAGE 2 -->
        <div class="vedic-page-sheet">
          <div class="inner-border">
            <div class="watermark">ॐ</div>

            <div class="content-body">
              <div class="header-divider">
                <div class="institution-title">${isHi ? 'परिसर आवागमन एवं प्रमुख स्थल संदर्शिका' : 'CAMPUS NAVIGATION & LANDMARKS DIRECTORY'}</div>
                <div class="institution-subtitle">${isHi ? 'संस्कृत वैदिक गुरुकुल — पावन गंगा तट, हरिद्वार' : 'Sanskrit Vedic Gurukul — Holy Ganges Bank, Haridwar'}</div>
              </div>

              <div class="section-card-gold">
                <div class="section-heading" style="color:#A65F2B !important;">${isHi ? '४. आवागमन साधन (गुरुकुल कैसे पहुँचें)' : '4. How to Reach (Transit Guide)'}</div>
                <div class="grid-row-3">
                  <div class="transit-box">
                    <div class="transit-title">${isHi ? 'रेलवे (HW जंक्शन)' : 'By Train (Haridwar HW)'}</div>
                    <div class="info-val">${isHi ? 'हरिद्वार जंक्शन से १२ किमी। २४x७ ऑटो, टैक्सी एवं ई-रिक्शा सीधे मुख्य द्वार तक उपलब्ध।' : '12 km from Haridwar Jn. 24/7 prepaid taxis and autos direct to campus gate.'}</div>
                  </div>
                  <div class="transit-box">
                    <div class="transit-title" style="color:#C59A4E !important;">${isHi ? 'हवाई मार्ग (देहरादून DED)' : 'By Air (Dehradun DED)'}</div>
                    <div class="info-val">${isHi ? 'जौली ग्रांट विमानपत्तन से ३८ किमी। NH-58 मार्ग द्वारा ४५ मिनट में सीधी टैक्सी सेवा।' : '38 km from Jolly Grant Airport. Direct 45-min highway drive via NH-58.'}</div>
                  </div>
                  <div class="transit-box">
                    <div class="transit-title">${isHi ? 'सड़क मार्ग (NH 58)' : 'By Road (NH-58)'}</div>
                    <div class="info-val">${isHi ? 'दिल्ली-हरिद्वार एक्सप्रेसवे से ४.५ घंटे। परिसर में विशाल निःशुल्क पार्किंग व्यवस्था।' : '4.5 hrs from Delhi NCR via NH-58. Free visitor parking on campus.'}</div>
                  </div>
                </div>
              </div>

              <div class="section-card">
                <div class="section-heading">${isHi ? '५. परिसर के प्रमुख स्थल एवं भवन' : '5. Campus Landmarks & Key Zones'}</div>
                <div class="grid-row-2">
                  <div class="info-val"><strong>• ${isHi ? 'दिव्य यज्ञशाला:' : 'Divya Yajnashala:'}</strong> ${isHi ? 'दैनिक प्रातः एवं सायं वैदिक अग्निहोत्र प्रांगण' : 'Sacred fire arena for daily Agnihotra'}</div>
                  <div class="info-val"><strong>• ${isHi ? 'शास्त्र ग्रंथागार:' : 'Shastra Granthagar:'}</strong> ${isHi ? '५,०००+ दुर्लभ संस्कृत पाण्डुलिपियां एवं ग्रन्थ' : 'Library with 5,000+ rare Sanskrit scriptures'}</div>
                  <div class="info-val"><strong>• ${isHi ? 'गुरुकुल निवास:' : 'Brahmacharya Niwas:'}</strong> ${isHi ? 'विद्यार्थी आवास, सात्त्विक भोजनालय व ध्यान कक्ष' : 'Residential quarters, dining hall & sadhana halls'}</div>
                  <div class="info-val"><strong>• ${isHi ? 'आयुर्वेद वन व गौशाला:' : 'Ayurveda & Gaushala:'}</strong> ${isHi ? 'देशी गौ-सेवा केन्द्र एवं औषधीय वनस्पति वाटिका' : 'Indigenous cow sanctuary & medicinal herb garden'}</div>
                </div>
              </div>

              <div class="section-card-gold">
                <div class="section-heading" style="color:#A65F2B !important;">${isHi ? '६. स्वागत कक्ष एवं आपातकालीन सहायता' : '6. Reception & Emergency Contacts'}</div>
                <div class="info-val">
                  <div><strong>${isHi ? 'स्वागत कक्ष टेलीफोन:' : 'Reception Desk:'}</strong> +91 98765 43210 (प्रातः ०९:०० से सायं ०५:०० IST)</div>
                  <div><strong>${isHi ? 'गुरुकुल द्वार १ (मुख्य प्रवेश):' : 'Main Gate 1 Access:'}</strong> NH-58 से केवल ३०० मीटर, निःशुल्क आगंतुक वाहन पार्किंग</div>
                </div>
              </div>

            </div>

            <div class="footer-seal-box">
              <div>
                <strong style="color: #A65F2B;">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</strong>
                <div style="font-size: 9.5px;">${isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार' : 'Sanskrit Vedic Gurukul Trust, Haridwar'}</div>
              </div>
              <div class="seal-badge">${isHi ? 'पृष्ठ २ / २ (संपूर्ण)' : 'Page 2 of 2 (Complete)'}</div>
            </div>

          </div>
        </div>

      </body>
    </html>
  `);
  doc.close();

  // Wait briefly for styles/fonts to attach, then trigger print with default title 'vedicgurukul'
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } finally {
      // Clean up after 60s
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 60000);
    }
  }, 400);
};
