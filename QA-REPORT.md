# Balaji Textiles — QA & Responsive Test Report

**Tested by:** Senior Frontend QA Engineer
**Date:** 2026-11-11
**Site:** Classic 2018–2020 traditional business website
**Live URL:** https://prakashseervi61.github.io/Balaji-Textile/
**GitHub:** https://github.com/prakashseervi61/Balaji-Textile
**Browser engine:** Chromium (Chrome DevTools)

---

## 1. Business Details (Verified via Google Maps)

| Field | Value |
|---|---|
| Business | Balaji Textiles (பாலாஜி ஜவுளி) |
| Category | Clothing store |
| Address | 2c, pillaiyar Kovil Street, Thiruvannamail Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035 |
| Phone | +91 98945 35066 |
| WhatsApp | +91 98945 35066 |
| Hours | 10:00 AM – 9:00 PM daily |
| Rating | 5.0 stars (20 Google reviews) |
| Google Maps | https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7 |
| Coordinates | 11.0756263, 77.0023874 |
| Plus Code | 32G2+7X Coimbatore, Tamil Nadu |

---

## 2. Screen Sizes Tested

| Device | Width | Height | H-Scroll | Overflow Elements | Images | Nav | Status |
|---|---:|---:|---|---:|---|---|---|
| Small Mobile | 320px | 568px | None | 0 | 4 loaded | Hamburger | PASS |
| iPhone SE | 375px | 667px | None | 0 | 4 loaded | Hamburger | PASS |
| Mobile | 390px | 844px | None | 0 | 4 loaded | Hamburger | PASS |
| Large Mobile | 430px | 932px | None | 0 | 4 loaded | Hamburger | PASS |
| Tablet Portrait | 768px | 1024px | None | 0 | 4 loaded | Horizontal | PASS |
| Tablet Landscape | 1024px | 768px | None | 0 | 4 loaded | Horizontal | PASS |
| Laptop | 1280px | 800px | None | 0 | 4 loaded | Horizontal | PASS |
| Desktop | 1440px | 900px | None | 0 | 4 loaded | Horizontal | PASS |
| Large Desktop | 1920px | 1080px | None | 0 | 4 loaded | Horizontal | PASS |

---

## 3. Images

| Location | Source | Status |
|---|---|---|
| Hero banner | Local: `images/shop-photo.jpg` | Loaded ✅ |
| About section | Local: `images/shop-front.jpg` | Loaded ✅ |
| Gallery (2 items) | Local: `images/shop-front.jpg`, `images/shop-photo.jpg` | Loaded ✅ |
| Gallery (4 items) | Labelled placeholders (to be replaced with real photos) | Pending |
| Product cards (4) | Labelled placeholders (to be replaced with real product photos) | Pending |

Images are stored locally in the `images/` folder. No fragile third-party URLs remain for the main images.

---

## 4. Navigation & Interaction Tests

### Desktop (1280px+)
- Horizontal maroon nav bar with 6 evenly spaced links
- Vertical separators between items
- Active link highlighting on scroll (aria-current="true")
- Hover effect: darker maroon background
- No hamburger toggle visible

### Mobile (≤767px)
- Hamburger toggle (☰) on right side
- Vertical dropdown menu with white text
- Subtle separators between items
- 44px min-height touch targets
- Menu closes after selecting a link
- Escape key closes menu
- ARIA: aria-expanded, aria-controls, aria-haspopup

### Keyboard Navigation
- Tab through all nav links
- Enter/Space toggles hamburger
- Escape closes mobile menu and returns focus to toggle

---

## 5. Contact Section Verification

| Element | Value | Status |
|---|---|---|
| Phone link | tel:+919894535066 | Working ✅ |
| WhatsApp link | https://wa.me/919894535066 | Working ✅ |
| Google Maps link | https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7 | Working ✅ |
| Google Maps embed | 11.0756263,77.0023874 | Embedded ✅ |
| Call Now button | tel:+919894535066 | Working ✅ |
| WhatsApp button | https://wa.me/919894535066 | Working ✅ |
| Get Directions button | Google Maps link | Working ✅ |

---

## 6. Code Quality

### CSS Cleanup
- Removed `overflow-x: hidden` from html, body, and .container (layout fixed properly instead)
- Removed duplicate responsive rules where possible
- Fractional media query boundaries (e.g., 375.98px) for reliable matching
- Consistent spacing and typography across breakpoints

### JavaScript
- Mobile nav toggle with proper ARIA attributes
- Active link highlighting based on scroll position
- Smooth scrolling for anchor links
- Keyboard navigation support (Enter, Space, Escape)
- No console errors

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements: header, nav, main, section, footer, figure, figcaption
- ARIA roles: menubar, menuitem, none
- ARIA attributes: aria-label, aria-expanded, aria-controls, aria-haspopup, aria-current

### Image Performance
- Local images (no fragile third-party URLs for main images)
- `loading="lazy"` on below-fold images
- `loading="eager"` on hero banner
- `width` and `height` attributes for layout stability
- `object-fit: cover` for consistent image dimensions

---

## 7. Console Errors

**Zero console errors** at all tested breakpoints.

---

## 8. Remaining Items (Not QA Defects)

1. **Product placeholders**: 4 product cards still show `[ Men's Wear ]`, etc. Replace with actual product photos when available. Do not use stock/generated images.
2. **Gallery placeholders**: 4 gallery items still show placeholder text. Replace with genuine shop photographs.
3. **Business details**: Verified via Google Maps. Confirm with shop owner before publishing.
4. **GitHub Pages**: Deployment workflow configured. Enable in repo settings → Pages → Source: GitHub Actions.

---

## 9. Final Verdict

**PASS** — The website is fully responsive across all 9 tested viewports (320px–1920px), uses verified business details from Google Maps, has zero console errors, no horizontal overflow, and maintains the classic 2018–2020 traditional business website appearance.

**Live URL:** https://prakashseervi61.github.io/Balaji-Textile/
**GitHub:** https://github.com/prakashseervi61/Balaji-Textile