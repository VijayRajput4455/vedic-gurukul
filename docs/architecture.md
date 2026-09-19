# Technical Architecture: Sanskrit Vedic Gurukul & Vedic Gurukul Trust

## 1. Executive Summary

This web application delivers a high-fidelity digital presence for the **Sanskrit Vedic Gurukul** and its philanthropic wing, the **Vedic Gurukul Trust**, rooted in the educational philosophy and principles associated with Swami Dayanand Saraswati.

The platform balances ancient Indian Vedic aesthetics with modern, responsive, type-safe frontend engineering.

---

## 2. Technology Stack

- **Framework**: React 18+ with TypeScript & Vite 8+
- **Styling Architecture**: Bespoke Vedic Design System using pure CSS Custom Properties (Vanilla CSS) without external styling lock-in.
- **Icons**: Lucide React
- **Audio Engine**: Web Audio API Synthesizer generating 432Hz (Sacred Om resonance) and 528Hz Solfeggio harmonics with natural envelope decay.
- **Internationalization (i18n)**: Runtime English and Hindi translation dictionaries with Devanagari script support (`Noto Serif Devanagari`, `Yatra One`).
- **State & Local Persistence**: Reactive DataContext storing Admission Inquiries, Contact Submissions, Donation Pledges, and live Notice Announcements in `localStorage`.
- **Client Routing**: Deep linking hash/history router handling `#home`, `#about`, `#philosophy`, `#education`, `#admissions`, `#trust`, `#gallery`, `#events`, `#contact`, `#admin`.

---

## 3. Directory Structure

```text
vedic-gurukul/
├── frontend/
│   ├── public/
│   │   └── favicon.svg          # Vedic Diya / Gold emblem
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # ShlokaAudioPlayer, ReceiptModal, etc.
│   │   │   ├── home/            # HeroSection, HeritageSection, PhilosophyTeaser, etc.
│   │   │   └── layout/          # Header, Footer, TopBar
│   │   ├── context/             # LanguageContext, ThemeContext, DataContext
│   │   ├── data/                # programs.ts, philosophy.ts, trust.ts, gallery.ts, events.ts, shlokas.ts, faculty.ts
│   │   ├── i18n/                # en.ts, hi.ts
│   │   ├── pages/               # HomePage, AboutPage, PhilosophyPage, EducationPage, AdmissionsPage, TrustPage, GalleryPage, EventsPage, ContactPage, AdminPage
│   │   ├── styles/              # variables.css, base.css, components.css, animations.css
│   │   ├── types/               # index.ts (TypeScript models)
│   │   ├── utils/               # audio.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── docs/
│   ├── architecture.md
│   ├── content-requirements.md
│   └── deployment.md
├── .env.example
└── README.md
```

---

## 4. Key Functional Highlights

1. **Bilingual Engine**: Complete Hindi and English rendering across all sections, navigation bars, buttons, validation notices, and data tables.
2. **Interactive Admission Inquiry Wizard**: 4-step guided application flow with live validation, boarding selection, summary review, and automated tracking reference generation (`VG-ADM-2026-XXXX`).
3. **Trust Donation & Instant 80G Receipt Generator**: Multi-tier contribution form with PAN validation and immediate printable/downloadable official tax receipt modal.
4. **Authentic Sanskrit Shloka Audio Player**: Harmonic Web Audio synthesis and verified scriptural references (Rigveda, Yajurveda, Upanishads).
5. **Interactive 360° Virtual Campus Map & Accessible Lightbox**: Visual architectural guide of the Gurukul grounds with keyboard-navigable photo gallery.
6. **Admin Operations Portal**: Single-pane dashboard (`#admin`) to review student applications, manage contact inquiries, verify donation records, and publish/delete live website announcements.
