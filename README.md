# Balaji Textiles

A classic, traditional small-business website for **Balaji Textiles**, a textile and readymade clothing store in Saravanampatti, Coimbatore, Tamil Nadu.

Designed in a classic 2018–2020 business website style — full-width hero with maroon overlay, sticky header, card grids with soft shadows, gold-underlined Playfair headings, floating WhatsApp button, and 3-column footer.

## Overview

This is an informational business website (NOT an e-commerce platform). No shopping cart, login, online payment, checkout, or customer dashboard.

## File Structure

```
Balaji Textile/
├── index.html          # Main HTML file
├── styles.css          # All styles (mobile-first, CSS custom properties)
├── script.js           # Vanilla JS (nav, lightbox, scroll-spy, etc.)
├── images/
│   ├── shop-front.jpg  # Shop front photo (from Google Maps)
│   ├── shop-photo.jpg  # Shop photo (from Google Maps)
│   └── products/       # Product photos (to be added)
│       ├── mens-wear.jpg
│       ├── womens-wear.jpg
│       ├── kids-wear.jpg
│       └── fabrics.jpg
├── README.md
├── QA-REPORT.md
└── .github/workflows/
    └── deploy.yml      # GitHub Pages deployment
```

## Sections

- **Top Bar** — Phone, hours, WhatsApp link
- **Header** — Logo with Tamil name, sticky with shadow on scroll
- **Navigation** — Home | About Us | Products | Gallery | Reviews | Contact Us
- **Hero** — Full-width with maroon overlay, h1, Tamil tagline, intro, two CTA buttons
- **Why Choose Us** — 4 icon boxes (Family Collections, Best Prices, Perfect Lining & Fall, Open 10 AM–9 PM)
- **About Us** — Two-column layout (image left, text right)
- **Our Products** — 4 product cards with image, title, description, WhatsApp enquiry link
- **Photo Gallery** — Responsive grid with hover overlay and lightbox
- **Customer Reviews** — Cards with gold left border, quote mark, 5.0★ badge
- **Contact Us** — Two-column (details left, map right), Call/WhatsApp/Directions buttons
- **Footer** — 3 columns (About blurb / Quick links / Contact & hours) + copyright
- **Floating WhatsApp** — Green circle button (desktop)
- **Mobile Sticky Bar** — Call | WhatsApp (mobile only)
- **Back to Top** — Fixed button (appears on scroll)

## Business Information (Verified via Google Maps)

- Business: Balaji Textiles (பாலாஜி ஜவுளி)
- Category: Clothing store
- Address: 2c, Pillaiyar Kovil Street, Thiruvannamail Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035
- Phone: +91 98945 35066
- Hours: 10:00 AM – 9:00 PM daily
- Rating: 5.0 stars (20 Google reviews)
- Google Maps: https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7
- Coordinates: 11.0756263, 77.0023874
- Plus code: 32G2+7X Coimbatore, Tamil Nadu

## Before Launch Checklist

- [ ] Owner verifies business details (address, phone, hours) against Google Maps listing
- [ ] Verify spelling of "Thiruvannamail Nagar" against the Google Maps listing
- [ ] Replace footer note "Business details shown are preliminary..." (already removed from site)
- [ ] Add product photos to `images/products/`:
  - `mens-wear.jpg`
  - `womens-wear.jpg`
  - `kids-wear.jpg`
  - `fabrics.jpg`
- [ ] Add more shop photos to `images/` and update gallery in index.html
- [ ] Test on real mobile devices
- [ ] Enable GitHub Pages: Settings → Pages → Source: GitHub Actions

## Images Needed

| Filename | Location | Description | Status |
|---|---|---|---|
| `shop-photo.jpg` | `images/` | Shop banner/hero photo | ✅ Have |
| `shop-front.jpg` | `images/` | Shop front photo | ✅ Have |
| `mens-wear.jpg` | `images/products/` | Men's wear collection | ⏳ Needed |
| `womens-wear.jpg` | `images/products/` | Women's wear collection | ⏳ Needed |
| `kids-wear.jpg` | `images/products/` | Kids' wear collection | ⏳ Needed |
| `fabrics.jpg` | `images/products/` | Fabrics & dress materials | ⏳ Needed |

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom, mobile-first, CSS custom properties)
- Vanilla JavaScript (IIFE, "use strict")

## Getting Started

Open `index.html` in a browser. No build step or installation is required.

Serve locally:
```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/index.html