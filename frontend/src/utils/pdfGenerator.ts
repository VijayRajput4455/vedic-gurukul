// @ts-ignore
import html2pdf from 'html2pdf.js';

export interface GeneratePdfOptions {
  language?: 'hi' | 'en';
  filename?: string;
}

export const generateVedicDossierPdf = async (options: GeneratePdfOptions = {}): Promise<void> => {
  const lang = options.language || 'hi';
  const isHi = lang === 'hi';
  const filename = options.filename || 'vedicgurukul.pdf';

  // Create an off-screen container for rendering the pristine Vedic document
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = '794px'; // Exact standard A4 width in pixels at 96 DPI (210mm)
  container.style.zIndex = '-9999';
  container.style.backgroundColor = '#FAF6F0';
  container.style.color = '#2D2319';
  container.style.fontFamily = isHi ? "'Gotu', 'Martel', 'Segoe UI', serif" : "'Outfit', 'Cinzel', 'Segoe UI', sans-serif";

  container.innerHTML = `
    <div style="width: 794px; background: #FAF6F0; padding: 0; margin: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
      
      <!-- PAGE 1: Official Institutional Contact & Etiquette -->
      <div style="width: 794px; height: 1120px; max-height: 1120px; box-sizing: border-box; background: #FFFDF9; border: 3.5px solid #C59A4E; border-radius: 12px; padding: 16px; margin-bottom: 20px; page-break-after: always; break-after: page; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        
        <div style="border: 1.5px dashed rgba(197, 154, 78, 0.65); border-radius: 8px; padding: 18px 22px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          
          <!-- Watermark ॐ -->
          <div style="position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%); font-size: 240px; color: #A65F2B; opacity: 0.035; pointer-events: none; font-family: 'Gotu', serif; user-select: none; z-index: 0;">
            ॐ
          </div>

          <div style="position: relative; z-index: 1; display: flex; flex-direction: column; gap: 10px;">
            
            <!-- Shloka Banner -->
            <div style="background: #F4ECE1; border: 1px solid #D8C3A5; padding: 6px 14px; border-radius: 6px; font-style: italic; font-size: 11px; color: #783E18; text-align: center; font-weight: 600; letter-spacing: 0.03em;">
              ॥ ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
            </div>

            <!-- Royal Header -->
            <div style="text-align: center; border-bottom: 2px solid #C59A4E; padding-bottom: 12px;">
              <h1 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 21px; font-weight: 800; color: #A65F2B; margin: 0 0 3px 0; letter-spacing: 0.04em; text-transform: uppercase;">
                ${isHi ? 'संस्कृत वैदिक गुरुकुल एवं ट्रस्ट' : 'SANSKRIT VEDIC GURUKUL & TRUST'}
              </h1>
              <p style="font-size: 11px; color: #6E5A44; margin: 0 0 3px 0;">
                ${isHi ? 'प्राचीन ऋषि परम्परा, वेदाध्ययन, चरित्र निर्माण एवं निःशुल्क गुरुकुल शिक्षा संस्थान' : 'Center for Vedic Studies, Sanskrit Scriptures, Character Building & Holistic Education'}
              </p>
              <div style="font-size: 11px; color: #A65F2B; font-weight: 700;">
                ${isHi ? 'गंगा तट मार्ग, हरिद्वार (उत्तराखण्ड), भारत — २४९४०८' : 'Ganga Coastline Marg, Haridwar (Uttarakhand), India — 249408'}
              </div>
            </div>

            <!-- Metadata Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F9F4EB; border: 1px solid #E2D3BE; padding: 5px 12px; border-radius: 6px; font-size: 10.5px; font-weight: 600; color: #5C4B37;">
              <div><strong>${isHi ? 'दस्तावेज:' : 'Doc Ref:'}</strong> SVG-DOSSIER-${new Date().getFullYear()}</div>
              <div><strong>${isHi ? 'जीपीएस:' : 'GPS:'}</strong> 29.9457° N, 78.1642° E</div>
              <div><strong>${isHi ? 'तिथि:' : 'Date:'}</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>

            <!-- Section 1: Official Contacts -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #A65F2B; border-radius: 6px; padding: 11px 14px;">
              <h2 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 6px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '१. आधिकारिक सम्पर्क एवं परिसर पता' : '1. Official Address & Contact Points'}
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 11px;">
                <div>
                  <div style="font-weight: 700; color: #4A3A2A; margin-bottom: 2px;">${isHi ? 'गुरुकुल एवं ट्रस्ट परिसर:' : 'Campus Location:'}</div>
                  <div style="color: #5C4B37; line-height: 1.45;">
                    ${isHi ? 'संस्कृत वैदिक गुरुकुल एवं वैदिक गुरुकुल ट्रस्ट, गंगा तट मार्ग, हरिद्वार (उत्तराखण्ड), भारत — २४९४०८' : 'Sanskrit Vedic Gurukul & Trust, Ganga Coastline Marg, Haridwar (UK), India — 249408'}
                  </div>
                </div>
                <div>
                  <div style="font-weight: 700; color: #4A3A2A; margin-bottom: 2px;">${isHi ? 'हेल्पलाइन एवं फोन:' : 'Telephone & Helpline:'}</div>
                  <div style="color: #5C4B37;">+91 98765 43210 / +91 1334 220000 (09:00 AM – 05:00 PM)</div>
                  <div style="color: #5C4B37; margin-top: 3px;"><strong>Email:</strong> contact@vedicgurukul.org / trust@vedicgurukul.org</div>
                </div>
              </div>
            </div>

            <!-- Section 2: Visiting Hours -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #C59A4E; border-radius: 6px; padding: 11px 14px;">
              <h2 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 6px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '२. परिसर दर्शन एवं दैनिक समय-सारणी' : '2. Visiting Hours & Schedule'}
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 11px;">
                <div>
                  <div style="font-weight: 700; color: #4A3A2A; margin-bottom: 2px;">${isHi ? 'आगंतुक दर्शन समय:' : 'Guest Visiting Timings:'}</div>
                  <div style="color: #5C4B37;">${isHi ? 'प्रतिदिन प्रातः ९:०० से सायं ५:०० बजे तक' : 'Daily: 9:00 AM to 5:00 PM (Prior appointment recommended)'}</div>
                  <div style="color: #5C4B37; margin-top: 3px;"><strong>${isHi ? 'अभिभावक भेंट:' : 'Parent Hours:'}</strong> ${isHi ? 'सायं ४:४५ से ५:४५ अथवा भोजन विराम' : '4:45 PM – 5:45 PM daily'}</div>
                </div>
                <div>
                  <div style="font-weight: 700; color: #4A3A2A; margin-bottom: 2px;">${isHi ? 'दैनिक यज्ञ एवं आरती समय:' : 'Daily Yajna & Hawan Schedule:'}</div>
                  <div style="color: #5C4B37;">${isHi ? 'प्रातःकालीन यज्ञ: ०६:०० से ०७:३० बजे तक' : 'Morning Agnihotra: 6:00 AM – 7:30 AM'}</div>
                  <div style="color: #5C4B37;">${isHi ? 'सायंकालीन संध्या व आरती: ०६:३० से ०७:३० बजे' : 'Evening Sandhya: 6:30 PM – 7:30 PM'}</div>
                </div>
              </div>
            </div>

            <!-- Section 3: Campus Rules -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #A65F2B; border-radius: 6px; padding: 11px 14px;">
              <h2 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 6px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '३. परिसर दर्शन मर्यादा एवं नियम' : '3. Campus Etiquette & Visiting Rules'}
              </h2>
              <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #4A3A2A; line-height: 1.5;">
                <li style="margin-bottom: 3px;">${isHi ? 'परिसर में पूर्ण सात्त्विक, नशामुक्त, धूम्रपान रहित एवं शान्त आध्यात्मिक वातावरण बनाए रखें।' : 'Maintain a peaceful, tobacco-free, strictly vegetarian, and sattvic atmosphere throughout the premises.'}</li>
                <li style="margin-bottom: 3px;">${isHi ? 'यज्ञशाला, ग्रंथागार एवं अध्ययन कक्षों में प्रवेश से पूर्व निर्धारित स्थान पर जूते-चप्पल उतारें।' : 'Footwear must be removed at designated shoe counters before entering Yajnashala and Classrooms.'}</li>
                <li style="margin-bottom: 3px;">${isHi ? 'परिसर दर्शन के समय मर्यादित एवं पारम्परिक भारतीय वेशभूषा का पालन करें।' : 'Visitors are requested to observe modest and traditional attire during their visit.'}</li>
                <li>${isHi ? 'यज्ञशाला एवं अध्ययनरत विद्यार्थियों की फोटोग्राफी हेतु कार्यालय से पूर्व अनुमति आवश्यक है।' : 'Photography during sacred Hawan rituals and student study courtyards requires prior permission.'}</li>
              </ul>
            </div>

          </div>

          <!-- Page 1 Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #C59A4E; padding-top: 10px; font-size: 10.5px; color: #6E5A44; position: relative; z-index: 1;">
            <div>${isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार (उत्तराखण्ड)' : 'Sanskrit Vedic Gurukul Trust, Haridwar (Uttarakhand)'}</div>
            <div style="border: 1px solid #C59A4E; color: #783E18; padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 9.5px; text-transform: uppercase; background: #FFF9EE;">
              ${isHi ? 'पृष्ठ १ / २ (जारी आगे)' : 'Page 1 of 2 (Continued Overleaf)'}
            </div>
          </div>

        </div>
      </div>

      <!-- PAGE 2: Transit Guide, Landmarks & Emergency -->
      <div style="width: 794px; height: 1120px; max-height: 1120px; box-sizing: border-box; background: #FFFDF9; border: 3.5px solid #C59A4E; border-radius: 12px; padding: 16px; page-break-after: avoid; break-after: avoid; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        
        <div style="border: 1.5px dashed rgba(197, 154, 78, 0.65); border-radius: 8px; padding: 18px 22px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
          
          <!-- Watermark ॐ -->
          <div style="position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%); font-size: 240px; color: #A65F2B; opacity: 0.035; pointer-events: none; font-family: 'Gotu', serif; user-select: none; z-index: 0;">
            ॐ
          </div>

          <div style="position: relative; z-index: 1; display: flex; flex-direction: column; gap: 10px;">
            
            <!-- Page 2 Header -->
            <div style="text-align: center; border-bottom: 2px solid #C59A4E; padding-bottom: 10px;">
              <h2 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 17px; font-weight: 800; color: #A65F2B; margin: 0 0 2px 0; letter-spacing: 0.03em; text-transform: uppercase;">
                ${isHi ? 'परिसर आवागमन एवं प्रमुख स्थल संदर्शिका' : 'CAMPUS NAVIGATION & LANDMARKS DIRECTORY'}
              </h2>
              <div style="font-size: 11px; color: #6E5A44;">
                ${isHi ? 'संस्कृत वैदिक गुरुकुल — पावन गंगा तट, हरिद्वार' : 'Sanskrit Vedic Gurukul — Holy Ganges Bank, Haridwar'}
              </div>
            </div>

            <!-- Section 4: Multi-Modal Transit Guide -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #C59A4E; border-radius: 6px; padding: 11px 14px;">
              <h3 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 6px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '४. आवागमन साधन (गुरुकुल कैसे पहुँचें)' : '4. How to Reach (Transit Guide)'}
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 10.5px;">
                <div style="background: #FAF7F2; border: 1px solid #E8DFD3; border-radius: 5px; padding: 8px 10px;">
                  <div style="font-weight: 700; color: #A65F2B; margin-bottom: 2px;">${isHi ? 'रेलवे (HW जंक्शन)' : 'By Train (Haridwar HW)'}</div>
                  <div style="color: #5C4B37; line-height: 1.4;">${isHi ? 'हरिद्वार जंक्शन से १२ किमी। २४x७ ऑटो, टैक्सी एवं ई-रिक्शा सीधे मुख्य द्वार तक उपलब्ध।' : '12 km from Haridwar Jn. 24/7 prepaid taxis and autos direct to campus gate.'}</div>
                </div>
                <div style="background: #FAF7F2; border: 1px solid #E8DFD3; border-radius: 5px; padding: 8px 10px;">
                  <div style="font-weight: 700; color: #C59A4E; margin-bottom: 2px;">${isHi ? 'हवाई मार्ग (देहरादून DED)' : 'By Air (Dehradun DED)'}</div>
                  <div style="color: #5C4B37; line-height: 1.4;">${isHi ? 'जौली ग्रांट विमानपत्तन से ३८ किमी। NH-58 मार्ग द्वारा ४५ मिनट में सीधी टैक्सी सेवा।' : '38 km from Jolly Grant Airport. Direct 45-min highway drive via NH-58.'}</div>
                </div>
                <div style="background: #FAF7F2; border: 1px solid #E8DFD3; border-radius: 5px; padding: 8px 10px;">
                  <div style="font-weight: 700; color: #A65F2B; margin-bottom: 2px;">${isHi ? 'सड़क मार्ग (NH 58)' : 'By Road (NH-58)'}</div>
                  <div style="color: #5C4B37; line-height: 1.4;">${isHi ? 'दिल्ली-हरिद्वार एक्सप्रेसवे से ४.५ घंटे। परिसर में विशाल निःशुल्क पार्किंग व्यवस्था।' : '4.5 hrs from Delhi NCR via NH-58. Free visitor parking on campus.'}</div>
                </div>
              </div>
            </div>

            <!-- Section 5: Campus Landmarks -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #A65F2B; border-radius: 6px; padding: 11px 14px;">
              <h3 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 6px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '५. परिसर के प्रमुख स्थल एवं भवन' : '5. Campus Landmarks & Key Zones'}
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; color: #4A3A2A;">
                <div><strong>• ${isHi ? 'दिव्य यज्ञशाला:' : 'Divya Yajnashala:'}</strong> ${isHi ? 'दैनिक प्रातः एवं सायं वैदिक अग्निहोत्र प्रांगण' : 'Sacred fire arena for daily Agnihotra'}</div>
                <div><strong>• ${isHi ? 'शास्त्र ग्रंथागार:' : 'Shastra Granthagar:'}</strong> ${isHi ? '५,०००+ दुर्लभ संस्कृत पाण्डुलिपियां एवं ग्रन्थ' : 'Library with 5,000+ rare Sanskrit scriptures'}</div>
                <div><strong>• ${isHi ? 'गुरुकुल निवास:' : 'Brahmacharya Niwas:'}</strong> ${isHi ? 'विद्यार्थी आवास, सात्त्विक भोजनालय व ध्यान कक्ष' : 'Residential quarters, dining hall & sadhana halls'}</div>
                <div><strong>• ${isHi ? 'आयुर्वेद वन व गौशाला:' : 'Ayurveda & Gaushala:'}</strong> ${isHi ? 'देशी गौ-सेवा केन्द्र एवं औषधीय वनस्पति वाटिका' : 'Indigenous cow sanctuary & medicinal herb garden'}</div>
              </div>
            </div>

            <!-- Section 6: Emergency & Reception Contacts -->
            <div style="background: #FFFFFF; border: 1px solid #E6DBCF; border-left: 4.5px solid #C59A4E; border-radius: 6px; padding: 11px 14px;">
              <h3 style="font-family: 'Cinzel', 'Gotu', serif; font-size: 12.5px; font-weight: 700; color: #783E18; margin: 0 0 5px 0; border-bottom: 1px solid #F0E6D8; padding-bottom: 3px;">
                ${isHi ? '६. स्वागत कक्ष एवं आपातकालीन सहायता' : '6. Reception & Emergency Contacts'}
              </h3>
              <div style="font-size: 11px; color: #5C4B37; line-height: 1.5;">
                <div><strong>${isHi ? 'स्वागत कक्ष टेलीफोन:' : 'Reception Desk:'}</strong> +91 98765 43210 (प्रातः ०९:०० से सायं ०५:०० IST)</div>
                <div><strong>${isHi ? 'गुरुकुल द्वार १ (मुख्य प्रवेश):' : 'Main Gate 1 Access:'}</strong> NH-58 से केवल ३०० मीटर, निःशुल्क आगंतुक वाहन पार्किंग</div>
              </div>
            </div>

          </div>

          <!-- Page 2 Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #C59A4E; padding-top: 10px; font-size: 10.5px; color: #6E5A44; position: relative; z-index: 1;">
            <div>
              <strong style="color: #A65F2B;">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</strong>
              <div style="font-size: 9.5px;">${isHi ? 'संस्कृत वैदिक गुरुकुल ट्रस्ट, हरिद्वार' : 'Sanskrit Vedic Gurukul Trust, Haridwar'}</div>
            </div>
            <div style="border: 1px solid #C59A4E; color: #783E18; padding: 3px 10px; border-radius: 12px; font-weight: 700; font-size: 9.5px; text-transform: uppercase; background: #FFF9EE;">
              ${isHi ? 'पृष्ठ २ / २ (संपूर्ण)' : 'Page 2 of 2 (Complete)'}
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: {
        unit: 'px' as const,
        format: [794, 1120],
        orientation: 'portrait' as const,
        hotfixes: ['px_scaling']
      }
    };

    await (html2pdf() as any).set(opt).from(container).save();
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};
