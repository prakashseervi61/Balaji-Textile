# Balaji Textiles — QA & Test Report

**Date:** 2026-11-16
**Scope:** Review follow-up batch — catalogue imagery, homepage hero, focus
states, mobile chrome, search/copy helpers, SEO files, 404 page
**Live URL:** https://prakashseervi61.github.io/Balaji-Textile/
**Tested locally:** http://127.0.0.1:8765 (Python static server)
**GitHub:** https://github.com/prakashseervi61/Balaji-Textile

---

## 1. What Changed

### Catalogue imagery
- All 37 cards now use a **unique** 4:3 SVG illustration (37 files in
  `images/products/`, previously 18 shared files). No two products share art.
- The first four images load `eager` with `fetchpriority="high"`; the rest stay
  `loading="lazy" decoding="async"`.
- Six unused SVGs and the duplicate `images/gallery/` folder were deleted.

### Catalogue behaviour
- Every card has a stable id (`#p-men-full-sleeve-shirts`, …) for deep links.
- Search now matches the product **name and the category label**, so
  "tailoring" finds all six tailoring items.
- A clear (×) button appears while the query is non-empty; Escape clears too.
- The empty state repeats the query ("No products match “zzzz”.") and the
  WhatsApp link carries that query.
- Product deep links (`#p-…`) no longer reset the active category filter.
- "Copy link" button copies the current view URL and confirms with an
  `aria-live` toast; falls back to `execCommand` when the Clipboard API is
  unavailable.
- A 38th tile ("Can't find it?") closes the desktop grid. It is not a product:
  counts ignore it and it hides during search or when nothing matches.

### Homepage
- Hero rebuilt as a two-column panel: navy weave/bloom ground on the left, the
  native 400×291 shop photo in a white frame on the right. No upscaled,
  blurred full-bleed photo.
- Removed the empty, hidden gallery section, its lightbox markup, the lightbox
  CSS and all its JavaScript.
- About image dimensions corrected to the real 338×600.

### Chrome, focus and touch
- Focus rings are now **steel `#1E5AA0` on light surfaces** and **sky on navy
  surfaces** (top bar, footer, drawer, hero) with a white ring on the mobile
  action bar. Sky on white was only 2.18:1; steel is 6.93:1.
- Hover lift/scale effects are disabled on touch devices (`@media (hover: none)`).
- Under 600px the top bar is one row: shop status plus WhatsApp. The phone
  number moves to the mobile action bar, contact section and footer.
- Footer links and top-bar links have padded hit areas; mobile filter tabs are
  more compact so the strip needs less scrolling, keeping the edge fades.
- `:target` highlights a card after a product deep link.

### SEO / meta
- Home CSP now uses `script-src 'self'` (no `'unsafe-inline'`); `meta keywords`
  removed.
- New 1200×630 `images/og-cover.png` used by OG and Twitter tags, with
  `og:image:alt`.
- JSON-LD: `ClothingStore` extended with `@id`, `image[]`, `hasMap`,
  `areaServed`, `currenciesAccepted`; catalogue gained `CollectionPage` and
  `BreadcrumbList`.
- Added `robots.txt`, `sitemap.xml` and a self-contained `404.html`.
- Tamil text is marked `lang="ta"` (logo and hero tagline); the emoji phone
  glyph was replaced with an inline SVG icon.

No products, prices, stock, delivery promises, reviews or business details were
invented. No ecommerce functionality was added.

---

## 2. Catalogue Data Integrity

| Category | Products | Expected | Result |
|---|---|---|---|
| Men | 10 | 10 | PASS |
| Women | 12 | 12 | PASS |
| Kids | 9 | 9 | PASS |
| Tailoring & Matching | 6 | 6 | PASS |
| **Total** | **37** | **37** | **PASS** |

- 37 distinct `images/products/*.svg` references, 37 files on disk, 0 unused
- 37 unique card ids, no duplicate ids on either page
- Tab counts computed from the DOM: `(37) (10) (12) (9) (6)`
- `node --check script.js` passes

---

## 3. Functional Tests

### Filters, search and clear

| Action | Result | Result |
|---|---|---|
| `saree` | 2 items: Sarees, Saree Hangings (Latkans) | PASS |
| `tailoring` (category match) | 6 items | PASS |
| `zzzz` | 0 items, empty state shown | PASS |
| Empty-state title | `No products match “zzzz”.` | PASS |
| Empty-state WhatsApp link | carries `zzzz` | PASS |
| Clear button | empties field, shows 37 items, returns focus to search | PASS |
| Clear button hidden when empty | yes | PASS |
| Women tab + `leggings` | 2 items, hash `#women` | PASS |
| Copy link | toast shows "Link copied" | PASS |
| Enquiry tile during search | hidden | PASS |

### Deep links and sticky tabs

| Check | Measured | Result |
|---|---|---|
| `#p-women-sarees` on load | All tab, 37 items, card is `:target` | PASS |
| Card position at 390px | card top 156px, tabs bottom 135px | PASS |
| `#men` → `#p-men-trousers` | filter stays Men, 10 items | PASS |
| Sticky tabs at 320/390/768 | tabs top 72px = header bottom, gap 0 | PASS |
| Tab strip at 390 | 484px content in 327px, right fade on | PASS |

---

## 4. Responsive Test Results

`documentElement.scrollWidth − clientWidth` on `products.html` after load:

| Width | H-scroll | Top bar | Result |
|---|---|---|---|
| 320px | 0 | One row, phone hidden | PASS |
| 375px | 0 | One row | PASS |
| 390px | 0 | One row | PASS |
| 430px | 0 | One row, compact tabs | PASS |
| 600px | 0 | One row, phone shown | PASS |
| 768px | 0 | One row, tabs fit | PASS |
| 1024px | 0 | One row | PASS |
| 1280px | 0 | One row | PASS |
| 1440px | 0 | One row | PASS |
| 1920px | 0 | One row | PASS |

The homepage was also checked at 390/768/1440 with no overflow.

---

## 5. Accessibility

- **Focus rings:** 3px ring with 2px offset; steel on white/tint surfaces
  (6.93:1 / 6.19:1), sky on navy surfaces (8.02:1), white on the mobile bar.
- **Tap targets (CSS px):** footer links 34 high, tabs 50, Enquire 50,
  Copy link 45, search clear 45 — all above the 24px WCAG 2.5.8 minimum.
- **Drawer:** closed state is `visibility: hidden` and out of the tab order;
  opening focuses "Home"; Tab from the last link wraps to the first; Escape
  closes and restores focus to the toggle; body scroll is locked/unlocked.
- **Tabs:** one `aria-pressed="true"` at a time, `aria-controls="product-grid"`.
- **Live regions:** results count, empty state, shop status and copy toast are
  announced (`role="status"` / `aria-live="polite"`).
- **Reduced motion:** transitions, transforms and the hero fade are disabled.
- **Headings:** h1 → visually hidden h2 → h3 cards on the catalogue.

### Text contrast (WCAG AA 4.5:1; indicator 3:1)

| Pair | Ratio |
|---|---|
| Navy on white | 17.5:1 |
| Blue `#1A3CC8` on white | 8.3:1 |
| Steel `#1E5AA0` on white (focus ring) | 6.9:1 |
| Steel on tint `#EAF3FF` | 6.2:1 |
| Sky `#4DB8FF` on navy (focus ring) | 8.0:1 |
| CTA note (tint) on navy | 15.7:1 |
| White on WhatsApp green `#0F7A3F` | 5.4:1 |

---

## 6. Assets, Console and No-JS

| Check | Result |
|---|---|
| Catalogue images loaded after a full scroll | 37 / 37, 0 broken |
| Homepage images | 2 / 2 |
| Console errors / page errors | 0 / 0 |
| JS disabled: products visible | 37 / 37 |
| JS disabled: tabs / search / meta | Hidden (noscript rules) |
| JS disabled: static hours | Visible in top bar, contact and footer |
| JS disabled: enquiry tile | Visible (a normal link) |
| `404.html` | Renders, `noindex`, links work, no overflow |

---

## 7. Code Quality and Security

- No libraries, frameworks, CDNs, build step or new tooling
- CSP tightened to `script-src 'self'` on both pages; no inline scripts
- Only external requests: Google Fonts and the Google Maps frame
- Every `target="_blank"` link keeps `rel="noopener"`
- Catalogue remains static HTML — products are never generated in JS
- `--header-height` is still measured at runtime; no hardcoded 72px in behaviour
- Shared top bar, header, footer, float and mobile bar stay in sync across
  `index.html` and `products.html`

---

## 8. Remaining Items

1. **Real product photos** — replace the 37 SVGs with real 4:3 photos and add
   meaningful alt text per card.
2. **Owner content** — Tamil tagline/translation review, FAQ/services wording
   and any extra shop photos still need owner input.
3. **Owner verification** — confirm address spelling, phone and hours against
   the Google Maps listing.
4. **Reviews** — the five Google review texts on the homepage are verbatim and
   must stay unchanged.
5. **Custom domain / analytics** — not added; both need an owner decision.

---

## 9. Final Verdict

**PASS** — the review items that can be completed without owner-supplied content
are done: 37 unique illustrations, rebuilt hero, gallery/lightbox removed,
contrast-safe focus rings, one-row mobile top bar, larger tap targets, tighter
tabs with edge fades, search clear + category matching + query echo, product
deep links that preserve the filter, copy-link toast, an enquiry tile, a real
1200×630 share image, tightened CSP, robots/sitemap and a 404 page. All 37
products still render with correct counts and WhatsApp links, there is no
horizontal overflow at any tested width, and the console is clean.
