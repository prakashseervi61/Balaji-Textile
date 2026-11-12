# Balaji Textiles — QA & Test Report

**Branch:** products-ux (stacked on blue-redesign)
**Date:** 2026-11-12
**Live URL:** https://prakashseervi61.github.io/Balaji-Textile/
**GitHub:** https://github.com/prakashseervi61/Balaji-Textile

---

## 1. What Changed on products-ux

### Products page
- Page heading is now `Our Products` with a Home / Products breadcrumb
- Removed the placeholder product gallery and duplicate section
- Added a labelled search field that filters products by name
- Tab counts are computed from the real 37 catalogue items:
  All 37, Men 10, Women 12, Kids 9, Tailoring & Matching 6
- Tabs are a sticky, single-row scroll strip under the header with edge fades
- Tab and search filters combine; an empty state offers a prefilled WhatsApp link
- Category deep links (`#men`, `#women`, `#kids`, `#tailoring`) activate the tab
  and update the URL hash without scrolling the page
- Every product pill has a WhatsApp icon and a prefilled enquiry message
- Group headings have category icons and live per-group item counts
- Shade-matching callout added under Tailoring & Matching (photo → WhatsApp → check in store)
- Reviews reduced to a compact strip linking to the Google listing
- Bottom WhatsApp card added after the contact section
- With JavaScript disabled, search and tabs are hidden and all 37 items stay visible

### Home page
- Replaced dashed product previews with four icon category cards linking to the
  filtered products page
- Split the review star from the rating text so the orange star is decorative
  and `5.0` keeps a high-contrast navy colour

### Top bar
- Live Open/Closed badge on both pages using `Intl.DateTimeFormat` with
  `Asia/Kolkata`, refreshed every 60 seconds
- Badge states: `Open now · until 9:00 PM` and `Closed · opens 8:00 AM`
- The HTML fallback remains `Open daily 8:00 AM – 9:00 PM`

### Accessibility and layout fixes
- Removed the desktop navigation `max-width` that caused horizontal overflow
- Closed mobile drawer is removed from the tab order (`visibility: hidden`)
- Opening the drawer moves focus to the first link and traps Tab inside it
- Escape closes the drawer and returns focus to the toggle
- Added a hidden `Product catalogue` h2 so heading order is h1 → h2 → h3 → h4
- Anchor and skip-link offsets now follow the measured header height
- Reduced-motion mode disables drawer, reveal and hover movement transitions
- Added safe-area padding for the fixed mobile bar

### Carry-over from blue-redesign
- Blue palette, Playfair Display / Lato / Noto Sans Tamil typography
- Sticky white header, full-width hero, navy footer
- WhatsApp green `#0F7A3F` with white text (above 4.5:1 contrast)
- Google Maps embed with a descriptive title
- Gallery section remains hidden until real photos are available

---

## 2. Business Details (Verified via Google Maps)

| Field | Value |
|---|---|
| Business | Balaji Textiles (பாலாஜி ஜவுளி) |
| Category | Clothing store |
| Address | 2c, Pillaiyar Kovil Street, Thiruvannamail Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035 |
| Phone | +91 98945 35066 |
| WhatsApp | +91 98945 35066 |
| Hours | 8:00 AM – 9:00 PM daily |
| Rating | 5.0 stars (20 Google reviews) |
| Google Maps | https://maps.app.goo.gl/wDFzEVDRk7n2RnBJ7 |

---

## 3. Responsive Testing Results

Both pages were checked at these viewports with Chrome DevTools emulation.

| Viewport | Page | H-Scroll | Document width | Header | Status |
|---|---|---|---|---|---|
| 320px | Home / Products | None | 320px | 72px | PASS |
| 375px | Home / Products | None | 375px | 72px | PASS |
| 768px | Home / Products | None | 753px | 72px | PASS |
| 1024px | Home / Products | None | 1009px | 72px | PASS |
| 1440px | Home / Products | None | 1425px | 72px | PASS |

The 768/1024/1440 values are browser client widths after the scrollbar; the
document never exceeded the client width.

Additional checks:
- Sticky tabs sit at 72px, directly under the header, while scrolling the catalogue
- Tab strip fades indicate overflow on either side and hides at the ends
- All 37 pills and their WhatsApp links remain reachable at every width
- Home category cards stay at 2 columns on phones and 4 columns from 768px

---

## 4. Lighthouse Audit Results (Desktop, local server)

| Page | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|
| index.html | 100 | 77 | 100 | 100 |
| products.html | 100 | 77 | 100 | 100 |

**Best Practices: 77/100** — both failures come from the Google Maps embed:
1. Third-party cookies set by Google Maps
2. Issues reported in Chrome's Issues panel for the same embed

These are inherent to the requested map embed and not caused by page code.

---

## 5. Keyboard and No-JS Testing

- ✅ Skip link scrolls to `main` and the next Tab enters the page content
- ✅ Closed mobile drawer links are not in the tab order
- ✅ Drawer opens from the toggle, moves focus to Home, and traps Tab/Shift+Tab
- ✅ Escape closes the drawer and returns focus to the toggle
- ✅ Tabs expose `aria-pressed` and activate with Enter/Space
- ✅ Search input is labelled and combines with the active tab
- ✅ Pill links, category cards and WhatsApp buttons have visible focus rings
- ✅ No-JS: search/tabs are hidden, all 37 products and the static hours remain visible
- ✅ `prefers-reduced-motion` removes reveal, hover and drawer movement transitions

---

## 6. Remaining Items

1. **Product photos** — add real photos when available; the catalogue currently
   uses text pills by design.
2. **Gallery photos** — at least 4 distinct real photos are needed to enable the
   hidden gallery section.
3. **Business details** — owner to confirm address spelling, phone and hours.
4. **GitHub Pages** — enable Settings → Pages → Source: GitHub Actions if not
   already enabled.
5. **Address spelling** — verify “Thiruvannamail Nagar” against the Google Maps listing.
6. **Tamil tagline** — owner to supply final wording for the hero section.
7. **Reviews wording** — the five review texts on the home page are copied
   verbatim from Google and should stay unchanged.

---

## 7. Assumptions

- The catalogue is informational; prices, stock and delivery are never promised.
- Shade matching is described as a photo-based check in store, with no delivery
  or turnaround claim.
- Opening hours come from the Google listing: 8:00 AM – 9:00 PM daily.
- The live badge treats 8:00 AM as open and 9:00 PM as closed.
- The map embed is retained because it was requested for the contact section.
- Gallery stays hidden until real photos exist.

---

## 8. Security and Code Quality

- ✅ Content-Security-Policy meta tag retained
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ No production dependencies or third-party JavaScript libraries
- ✅ All external links use `rel="noopener"` with `target="_blank"`
- ✅ `node --check script.js` passes
- ✅ No duplicate IDs or missing local anchor targets
- ✅ All images have alt text
- ✅ Passive scroll listeners and feature checks for optional APIs
- ℹ️ `X-Content-Type-Options`, `X-Frame-Options` and `Permissions-Policy` are
  response headers; meta-tag versions were removed because browsers ignore them
  for these policies.

### Tools used
- Chrome DevTools MCP for viewport, keyboard and interaction checks
- Lighthouse (desktop) for accessibility, SEO and best-practice audits
- Manual review of HTML, CSS and JavaScript

---

## 9. Final Verdict

**PASS** — Both pages score 100 for accessibility and SEO, all tested widths
have zero horizontal overflow, the catalogue filters and deep links work, and
the closed drawer is fully out of the keyboard tab order. `products-ux` is ready
for review as a stacked PR into `blue-redesign`.
