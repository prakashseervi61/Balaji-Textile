# Balaji Textiles — Responsive QA Report

**Tested by:** Senior Frontend QA Engineer  
**Date:** Wed Nov 11 2026  
**Site:** Classic 2018–2020 traditional business website  
**URL served locally:** `http://127.0.0.1:8765/index.html`  
**Browser engine:** Chromium headless (Playwright v1.65.0)

---

## 1. Screen Sizes Tested

| Device | Width | Height | Status |
|---|---:|---:|---|
| Small Mobile | 320px | 568px | PASSED |
| iPhone SE | 375px | 667px | PASSED |
| Mobile | 390px | 844px | PASSED |
| Large Mobile | 430px | 932px | PASSED |
| Tablet Portrait | 768px | 1024px | PASSED |
| Tablet Landscape | 1024px | 768px | PASSED |
| Laptop | 1280px | 800px | PASSED |
| Desktop | 1440px | 900px | PASSED |
| Large Desktop | 1920px | 1080px | PASSED |

Screenshots captured for every viewport in `qa-screenshots/`.

---

## 2. Issues Discovered

**No critical responsive issues were found.** All checkpoints passed:

| Checkpoint | Result |
|---|---|
| No horizontal scrollbar at any viewport | PASS — confirmed at all 9 viewports |
| No overlapping elements | PASS — no overflowing bounding boxes |
| No clipped text | PASS — no elements extend beyond viewport edges |
| No broken images | N/A — labelled placeholders used (intentional) |
| No inaccessible buttons | PASS — all 4 buttons present & tappable |
| No navigation overflow | PASS — hamburger on mobile, horizontal bar on desktop |
| No console errors | PASS — zero errors at all breakpoints |
| No broken navigation links | PASS — all 5 anchor links verified |

### Minor observation (non-blocking)
On the smallest mobile viewports (320px–430px), the `.container` element's right edge aligns exactly with the viewport edge (`right == vw`). This does **not** produce a horizontal scrollbar and is a standard full-width mobile container. No fix required.

---

## 3. Fixes Implemented

None required — the website was already responsive. The CSS media-query architecture handles all breakpoints:

- **320px–375px:** Single-column product grid, stacked About section, hamburger menu
- **376px–480px:** Single-column grid (max-width 170px items), stacked layout
- **481px–767px:** Two-column product/gallery grid, hamburger menu
- **768px–1024px:** Three-column grids, horizontal navigation bar
- **1025px–1440px:** Four-column grids, horizontal navigation
- **1441px+:** Wider container (max-width 1180px), four-column grids

---

## 4. Navigation & Button Test Results

### Hamburger menu (mobile, 375px)
- Toggle visible on load: YES
- Click → menu opens (`display: block`, `aria-expanded="true"`): PASS
- Click nav link → menu closes (`aria-expanded="false"`): PASS
- Smooth scroll to section after link click: PASS (scrollY = 666)

### Navigation links (all viewports)
- `#home`, `#about`, `#products`, `#gallery`, `#contact`: all present and functional

### Contact buttons
- Call Now → `tel:+919442413304`: PASS
- WhatsApp → `https://wa.me/919442413304`: PASS
- Get Directions → `https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7`: PASS
- Google Maps embed: PASS

---

## 5. Responsive Behavior Verified

| Section | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| Navigation | Horizontal maroon bar | Horizontal maroon bar | Hamburger menu |
| About Us | Two-column (image left, text right) | Two-column | Stacked vertically |
| Products grid | 4 columns | 3 columns | 1 column |
| Gallery grid | 4 columns | 3 columns | 1 column |
| Footer | Single centered block | Single centered block | Stacked, centered |

---

## 6. Remaining Issues

**None.** All viewports pass.

---

## 7. Pre-Publish Reminders (not QA defects)

1. Replace labelled placeholder boxes (e.g. `[ Shop Banner Photograph ]`, `[ Men's Wear ]`) with genuine shop photographs. Do not present stock/generated images as inventory.
2. Verify the address, phone (`+91 94424 13304`), and hours (`10:00 AM – 9:30 PM daily`) with the shop owner before publishing.

---

## Conclusion

The Balaji Textiles website is **fully responsive and passes QA at all nine required viewport sizes** (320px–1920px) while preserving the classic 2018–2020 traditional business website appearance. It is ready for deployment.
