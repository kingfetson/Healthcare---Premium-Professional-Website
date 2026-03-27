# American Healthcare Partners - Premium Healthcare Website

> A professional, accessible, HIPAA-conscious healthcare website built for American medical practices. Designed to build trust, drive appointments, and provide exceptional patient experience.

![Healthcare Website](https://img.shields.io/badge/Design-Professional-blue) ![Accessibility](https://img.shields.io/badge/WCAG-AA-green) ![HIPAA](https://img.shields.io/badge/HIPAA-Conscious-yellow) ![Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration Guide](#-configuration-guide)
- [🎨 Customization](#-customization)
- [♿ Accessibility Compliance](#-accessibility-compliance)
- [🔒 HIPAA Considerations](#-hipaa-considerations)
- [🔍 SEO Optimization](#-seo-optimization)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

### 🏥 Healthcare-Specific Design
- **Trust-Building UI**: Professional blue/teal palette with coral CTAs, Joint Commission badge prominence
- **Emergency Banner**: Always-visible 911/emergency contact information (sticky top)
- **Patient-Centric Navigation**: Clear paths to appointments, telehealth, portal, and resources
- **Provider Profiles**: Board certification badges, specialties, patient ratings
- **Location Cards**: Hours, contact info, services offered per clinic

### ⚡ Performance & Accessibility
- **Zero Frameworks**: Pure HTML/CSS/JS for maximum performance and control
- **WCAG 2.1 AA Compliant**: Keyboard navigation, ARIA labels, focus management, reduced motion support
- **Semantic HTML5**: Proper landmark roles, heading hierarchy, form labels
- **Optimized Assets**: Lazy-loaded images, minimal CSS/JS bundle (~60KB total)
- **Print Styles**: Professional output for patient handouts

### 🎯 Conversion Optimization
- **Sticky Header**: Always-accessible "Schedule" and "Patient Portal" CTAs
- **Floating Call Button**: Pulse animation, hides in appointment section to avoid redundancy
- **Smart Form Validation**: Real-time feedback with HIPAA disclaimer notices
- **Trust Indicators**: "150+ physicians", "4.9/5 rating", "Same-day appointments"
- **Multiple CTAs**: In-person, telehealth, phone consultation options

### 🔒 Privacy & Compliance Ready
- **HIPAA Disclaimer Prominence**: Clear notices on forms about PHI transmission limits
- **Consent Checkboxes**: Required acknowledgments for communications and privacy
- **Secure Form Design**: Frontend validation only; backend integration guidance included
- **Privacy Policy Links**: Prominent in footer and form sections
- **No PHI in Frontend**: Form fields designed for appointment requests only

### 🌐 American Market Optimized
- **US Phone Validation**: (555) 123-4567 format with real-time formatting
- **Insurance Section**: Dedicated area for coverage verification
- **Location-Based Content**: Multi-clinic support with local hours/contact info
- **Telehealth Emphasis**: Prominent virtual care options for US patients
- **Structured Data**: JSON-LD for MedicalOrganization schema (SEO)

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Markup** | HTML5 | Semantic structure, ARIA roles, microdata |
| **Styling** | CSS3 (Variables, Grid, Flexbox) | Responsive design, theming, animations |
| **Interactivity** | Vanilla JavaScript (ES6+) | Form validation, modals, scroll effects |
| **Icons** | Font Awesome 6.4 (CDN) | Medical icons, UI elements, accessibility |
| **Fonts** | Google Fonts (Manrope + Inter) | Professional, readable typography |
| **Maps** | Google Maps Embed (placeholder) | Location visualization |
| **Analytics** | GA4 Ready | Conversion tracking hooks included |

**No build step required** - works immediately in any modern browser.

---

## 📁 Project Structure
