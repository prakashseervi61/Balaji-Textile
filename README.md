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
├── 404.html            # Self-contained "page not found" page (GitHub Pages)
├── styles.css          # All styles (mobile-first, CSS custom properties)
├── script.js           # Vanilla JS (nav, catalogue search/filters, live hours badge)
├── robots.txt          # Crawler rules + sitemap location
├── sitemap.xml         # Home and products URLs
├── images/
│   ├── shop-front.jpg  # Shop front photo (from Google Maps)
│   ├── shop-photo.jpg  # Shop photo (from Google Maps)
│   ├── og-cover.png    # 1200×630 social sharing card
│   └── products/       # 37 local SVG placeholder illustrations (4:3, 800×600)
├── README.md
├── QA-REPORT.md
└── .github/workflows/
    └── deploy.yml      # GitHub Pages deployment
```

## Sections

- **Top Bar** — Phone, live IST Open/Closed badge, WhatsApp link
- **Header** — Logo with Tamil name, sticky with shadow on scroll
- **Navigation** — Home | About Us | Products | Reviews | Contact Us
- **Hero** — Navy pattern panel with the Tamil tagline, h1, intro, two CTA buttons and a framed shop photo that keeps its native 400×291 size (two columns from 768px)
- **Why Choose Us** — 4 icon boxes (Family Collections, Best Prices, Perfect Lining & Fall, Open 8 AM–9 PM)
- **About Us** — Two-column layout (image left, text right)
- **Our Products** — Four icon category cards linking to filtered catalogue tabs
- **Products page** — 37-product catalogue of white cards with a unique 4:3 pastel
  illustration panel each, uppercase category labels and navy WhatsApp Enquire
  buttons; sticky filter tabs with live counts, search that also matches the
  category label, a clear button, one 38th enquiry tile, copy-link button with
  toast, deep links (`#men`, `#women`, `#kids`, `#tailoring` and per-product
  `#p-…` ids), an empty state that repeats the query, compact reviews strip and
  a bottom WhatsApp card
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
| Navy | #0A1445 | Header/footer ground, hero panel, CTA tile |
| Blue | #1A3CC8 | Primary buttons, links, headings |
| Steel | #1E5AA0 | Hover, borders, focus ring on light surfaces |
| Sky | #4DB8FF | Active tab underline, highlights, focus ring on navy |
| Tint | #EAF3FF | Alternate section background |
| Text | #1B2433 | Body text |
| White | #FFFFFF | Backgrounds |
| Accent | #F5B82E | Warm accent (used sparingly) |
| WhatsApp | #0F7A3F | WhatsApp buttons |

## Before Launch Checklist

- [ ] Owner verifies business details (address, phone, hours) against Google Maps listing
- [ ] Verify spelling of "Thiruvannamail Nagar" against the Google Maps listing
- [ ] Replace the SVG placeholders in `images/products/` with real 4:3 product photos when available
- [ ] Add real shop photos when the owner supplies more (the old hidden gallery was removed)
- [ ] Test on real mobile devices
- [ ] Enable GitHub Pages: Settings → Pages → Source: GitHub Actions

## Images

| Filename | Location | Description | Status |
|---|---|---|---|
| `shop-photo.jpg` | `images/` | Shop interior photo used in the hero figure | ✅ Have |
| `shop-front.jpg` | `images/` | Shop front photo used in About Us | ✅ Have |
| `og-cover.png` | `images/` | 1200×630 Open Graph / Twitter card | ✅ Have |
| 37 SVG files | `images/products/` | One 4:3 placeholder illustration per product | ✅ Have (placeholders) |

Each product card now points at its own SVG, so illustrations can be replaced
one-for-one without touching other cards. Keep the 4:3 ratio, update the card's
`src`, and add meaningful alt text when real product photos are available. The
placeholders are decorative (`alt=""`) because the product name is adjacent. No
stock photography is used.

## SEO and Sharing

- `robots.txt` allows all crawlers and points at `sitemap.xml`
- `sitemap.xml` lists the home page and the catalogue with a `lastmod` date
- Open Graph and Twitter card tags use the 1200×630 `images/og-cover.png`
- JSON-LD: `ClothingStore` on the home page; `CollectionPage` + `BreadcrumbList`
  on the catalogue
- `404.html` is self-contained (GitHub Pages can serve it from any missing path,
  so it does not depend on a relative stylesheet) and links to the live URLs

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