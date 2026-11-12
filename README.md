# Balaji Textiles

A classic, traditional small-business website for **Balaji Textiles**, a textile and readymade clothing store in Saravanampatti, Coimbatore, Tamil Nadu.

Redesigned with a blue theme matching the shop's real billboard. Features a searchable, filterable product catalogue with WhatsApp enquiries.

## Overview

This is an informational business website (NOT an e-commerce platform). No shopping cart, login, online payment, checkout, or customer dashboard.

## File Structure

```
Balaji Textile/
├── index.html          # Home page
├── products.html       # Searchable, filterable product catalogue
├── styles.css          # All styles (mobile-first, CSS custom properties)
├── script.js           # Vanilla JS (nav, catalogue search/filters, live hours badge)
├── images/
│   ├── shop-front.jpg  # Shop front photo (from Google Maps)
│   ├── shop-photo.jpg  # Shop photo (from Google Maps)
│   └── products/       # 18 local SVG placeholder illustrations (4:3, 800×600)
├── README.md
├── QA-REPORT.md
└── .github/workflows/
    └── deploy.yml      # GitHub Pages deployment
```

## Sections

- **Top Bar** — Phone, live IST Open/Closed badge, WhatsApp link
- **Header** — Logo with Tamil name, sticky with shadow on scroll
- **Navigation** — Home | About Us | Products | Reviews | Contact Us
- **Hero** — Full-width with navy gradient overlay, h1, Tamil tagline, intro, two CTA buttons
- **Why Choose Us** — 4 icon boxes (Family Collections, Best Prices, Perfect Lining & Fall, Open 8 AM–9 PM)
- **About Us** — Two-column layout (image left, text right)
- **Our Products** — Four icon category cards linking to filtered catalogue tabs
- **Products page** — 37-product catalogue of white cards with 4:3 pastel
  illustration panels, uppercase category labels and navy WhatsApp Enquire
  buttons; centered sticky filter tabs with live counts, search, deep links
  (`#men`, `#women`, `#kids`, `#tailoring`), an empty state, compact reviews
  strip and a bottom WhatsApp card
- **Customer Reviews** — Cards with sky-blue left border, quote mark, 5.0★ badge
- **Contact Us** — Two-column (details left, map right), Call/WhatsApp/Directions buttons
- **Footer** — 3 columns (About blurb / Quick links / Contact & hours) + copyright
- **Floating WhatsApp** — Green circle button (desktop)
- **Mobile Sticky Bar** — Call | WhatsApp (mobile only)

## Business Information (Verified via Google Maps)

- Business: Balaji Textiles (பாலாஜி ஜவுளி)
- Category: Clothing store
- Address: 2c, Pillaiyar Kovil Street, Thiruvannamail Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035
- Phone: +91 98945 35066
- Hours: 8:00 AM – 9:00 PM daily (`SHOP_CONFIG` in script.js)
- Rating: 5.0 stars (20 Google reviews)
- Google Maps: https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7
- Coordinates: 11.0756263, 77.0023874
- Plus code: 32G2+7X Coimbatore, Tamil Nadu

## Color Palette

| Color | Hex | Usage |
|---|---|---|
| Navy | #0A1445 | Header, footer, hero overlay |
| Blue | #1A3CC8 | Primary buttons, links, headings |
| Steel | #1E5AA0 | Hover, borders |
| Sky | #4DB8FF | Active tab underline, highlights |
| Tint | #EAF3FF | Alternate section background |
| Text | #1B2433 | Body text |
| White | #FFFFFF | Backgrounds |
| Accent | #F5B82E | Warm accent (used sparingly) |
| WhatsApp | #0F7A3F | WhatsApp buttons |

## Before Launch Checklist

- [ ] Owner verifies business details (address, phone, hours) against Google Maps listing
- [ ] Verify spelling of "Thiruvannamail Nagar" against the Google Maps listing
- [ ] Replace the SVG placeholders in `images/products/` with real 4:3 product photos when available
- [ ] Add more shop photos to `images/` and update gallery in index.html
- [ ] Test on real mobile devices
- [ ] Enable GitHub Pages: Settings → Pages → Source: GitHub Actions

### To Enable Gallery
The gallery section is hidden by default. To enable it:
1. Add at least 4 distinct real photos to `images/gallery/`
2. Remove `style="display: none;"` from the gallery section in `index.html`
3. Add the gallery link back to nav and footer
4. Update the gallery grid with the new photos

## Images

| Filename | Location | Description | Status |
|---|---|---|---|
| `shop-photo.jpg` | `images/` | Shop banner/hero photo | ✅ Have |
| `shop-front.jpg` | `images/` | Shop front photo | ✅ Have |
| 18 SVG files | `images/products/` | 4:3 placeholder illustrations shared by the 37 cards | ✅ Have (placeholders) |

The placeholder illustrations are decorative (`alt=""`) and easy to replace
one-for-one. Keep the 4:3 ratio, update the card's `src`, and add meaningful alt
text when real product photos are available. No stock photography is used.

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom, mobile-first, CSS custom properties)
- Vanilla JavaScript (IIFE, "use strict", `SHOP_CONFIG` for hours, catalogue search/filters)

## Getting Started

Open `index.html` in a browser. No build step or installation is required.

Serve locally:
```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/index.html