# Balaji Textiles — QA & Test Report

**Branch:** blue-redesign
**Date:** 2026-11-12
**Live URL:** https://prakashseervi61.github.io/Balaji-Textile/
**Tested locally:** http://127.0.0.1:8765 (Python static server)
**GitHub:** https://github.com/prakashseervi61/Balaji-Textile

---

## 1. What Changed

The products page was redesigned as a card catalogue matching the supplied brief.

### Catalogue page
- Light blue (`#EAF3FF`) catalogue area inside a centered 1150px container
- White page header retained; Products nav item uses `aria-current="page"`
- Centered, sticky category tabs: All, Men, Women, Kids, Tailoring & Matching
- Tab counts computed from the 37 cards in the DOM at runtime; no hardcoded counts
- Single grid of 37 `<article class="product-card" data-category="...">` cards
- Each card has a 4:3 pastel illustration panel, uppercase category label, bold
  product name and a navy pill-shaped Enquire button
- Every Enquire button opens WhatsApp at +91 98945 35066 with a message generated
  from the product's category and name
- Search by product name, combined with the active category tab
- Empty state with a prefilled WhatsApp link when nothing matches
- Deep links `#men`, `#women`, `#kids`, `#tailoring` activate the matching tab
  without scrolling the page; the active tab is centered in the scroll strip
- Shade-matching callout, compact reviews strip, contact section and bottom
  WhatsApp card retained and restyled to fit the catalogue
- With JavaScript disabled, search/tabs/meta are hidden and all 37 products,
  their WhatsApp links and the static hours remain visible

### Placeholder illustrations
- 18 new local SVGs in `images/products/`, all 800×600 (4:3), pastel backgrounds
- No stock photography, no generated product photos, no external image requests
- Images use `alt=""` because they are decorative placeholders; the product name
  is adjacent. Replace with real 4:3 photos and meaningful alt text later.
- The four old maroon SVGs (`mens-wear`, `womens-wear`, `kids-wear`, `fabrics`)
  are no longer referenced

### Shared header fix
- `.logo` changed from a column flex container to `display: block`, keeping
  "Balaji Textiles" on one line with the Tamil name beneath it. The homepage
  header was checked and is unaffected.

No products, prices, stock, delivery promises, reviews or business details were
invented. No ecommerce functionality was added.

---

## 2. Catalogue Data Integrity

Static audit of `products.html`:

| Category | Products | Expected | Result |
|---|---|---|---|
| Men | 10 | 10 | PASS |
| Women | 12 | 12 | PASS |
| Kids | 9 | 9 | PASS |
| Tailoring & Matching | 6 | 6 | PASS |
| **Total** | **37** | **37** | **PASS** |

- 37 cards, 37 unique `(category, name)` pairs, 0 duplicates
- 0 unexpected products and 0 products missing from the brief
- Every card label matched its category (`Men's Wear`, `Women's Wear`,
  `Kids' Wear`, `Tailoring & Matching`)
- Tab `data-filter` values match `VALID_FILTERS` in `script.js` exactly
- No Fabrics category was added
- `node --check script.js` passes

---

## 3. Functional Test Results

Tested in headless Chrome via the DevTools Protocol at 1440px unless noted.

### Category filters

| Action | Visible cards | Result count | Hash | Result |
|---|---|---|---|---|
| All | 37 | Showing 37 items | `#all` | PASS |
| Men | 10 | Showing 10 items | `#men` | PASS |
| Women | 12 | Showing 12 items | `#women` | PASS |
| Kids | 9 | Showing 9 items | `#kids` | PASS |
| Tailoring & Matching | 6 | Showing 6 items | `#tailoring` | PASS |

Exactly one tab has `aria-pressed="true"` after each change.

### Search

| Query | Visible results | Result |
|---|---|---|
| `shirt` | 6 (4 Men, 2 Kids) | PASS |
| `saree` | 2 (Sarees, Saree Hangings) | PASS |
| `innerwear` | 3 (Men, Women, Kids) | PASS |
| `zzzz` | 0, empty state shown | PASS |

Empty-state WhatsApp link: `https://wa.me/919894535066?text=Hi%20Balaji%20Textiles%2C%20I%27m%20looking%20for%3A%20zzzz`

### Combined search + filter
- Query `shirt` with Men selected → 4 items (the four men's shirt styles)
- Result count and URL hash update together
- Switching category keeps the search query; clearing search restores the category view

### Deep links
Each link was loaded as a fresh page:

| URL | Active tab | Visible | Search | Result |
|---|---|---|---|---|
| `products.html#men` | Men | 10 | empty | PASS |
| `products.html#women` | Women | 12 | empty | PASS |
| `products.html#kids` | Kids | 9 | empty | PASS |
| `products.html#tailoring` | Tailoring & Matching | 6 | empty | PASS |

At 320px, loading `#tailoring` centered the tab in the scroll strip
(`scrollLeft 293 / max 293`), exposed the left edge fade and left `scrollY` at 0.

### Sticky tabs
- After scrolling 1495px: header occupies `0–72px`, sticky tabs start at `72px`
- Overlap: `0px`; `--header-height` resolved to `72px` from the measured header

### WhatsApp enquiries
All 37 links were audited individually:

- Base: `https://wa.me/919894535066?text=...` (37/37)
- Message: `Hello Balaji Textiles, I am interested in <Category> <Product>. Could you please share the available options and prices?` (37/37)
- `target="_blank"` and `rel="noopener"` present (37/37)
- `aria-label="Enquire about <Product> on WhatsApp"` present (37/37)
- No prices or stock claims in any message

Example:
> Hello Balaji Textiles, I am interested in Men's Full Sleeve Shirts. Could you please share the available options and prices?

### Other interactions
- Empty state appears only when the combined filter returns 0 cards
- All 37 `<img>` elements loaded (`naturalWidth > 0`), 0 broken
- 0 browser console errors or uncaught exceptions during the full run
- Contact section scroll-reveal activates (`opacity: 1`, `.visible`)

---

## 4. Responsive Test Results

Measured with Chrome device emulation. "H-scroll" compares
`documentElement.scrollWidth` with `clientWidth`.

| Width | Grid columns | Card width | H-scroll | Result |
|---|---|---|---|---|
| 320px | 1 | 272px | None | PASS |
| 375px | 2 | 157px | None | PASS |
| 390px | 2 | 164px | None | PASS |
| 430px | 2 | 184px | None | PASS |
| 600px | 2 | 269px | None | PASS |
| 768px | 3 | 228px | None | PASS |
| 1024px | 4 | 229px | None | PASS |
| 1280px | 4 | 261px | None | PASS |
| 1440px | 4 | 261px | None | PASS |
| 1920px | 4 | 261px | None | PASS |

- Grid: 1 column at 320px, 2 columns from 375px, 3 at 768px, 4 from 1024px
- Category tabs fit on one centered row at 768px and above
- Below 768px the tab strip scrolls horizontally with edge fades; every tab is
  reachable by touch, keyboard focus or deep link
- No horizontal page overflow at any tested width

---

## 5. Accessibility

- **Focus rings:** real keyboard Tab produced `outline: 2px solid #4DB8FF`
  with `2px` offset on filter buttons and Enquire links
- **Tabs:** `aria-pressed` reflects the active filter; buttons activate with
  Enter/Space; `aria-controls="product-grid"` is correct
- **Result count:** `role="status"` and `aria-live="polite"` announce updates
- **Heading order:** h1 → visually hidden h2 (Product catalogue) → h3 cards →
  h3 shade callout → h2 Contact → h2 bottom CTA
- **Drawer:** closed state uses `visibility: hidden` and is out of the tab order;
  opening moves focus to "Home", Tab/Shift+Tab wrap inside the drawer, Escape
  closes it, restores focus to the toggle (verified with a real mouse click) and
  unlocks body scroll
- **Skip link** and all local anchors resolve; no duplicate IDs on either page
- **Reduced motion:** with `prefers-reduced-motion: reduce`, card/image
  transitions compute to `0s`, transforms to `none`, and reveal content is visible
- **Decorative images:** placeholder SVGs have empty alt text; product names are
  real headings, so card content is still announced correctly

### Text contrast (WCAG AA requires 4.5:1)

| Pair | Ratio |
|---|---|
| Navy `#0A1445` on white | 17.52:1 |
| Navy on tint `#EAF3FF` | 15.65:1 |
| Blue `#1A3CC8` on white | 8.32:1 |
| Blue on tint | 7.43:1 |
| Category label `#1E5AA0` on white | 6.94:1 |
| Muted `#4A5568` on tint | 6.72:1 |
| White on navy Enquire button | 17.52:1 |
| White on WhatsApp green `#0F7A3F` | 5.42:1 |

All pass AA.

---

## 6. No-JavaScript Test

With script execution disabled:

| Check | Result |
|---|---|
| Product cards visible | 37 / 37 |
| Tab bar | Hidden |
| Search field | Hidden |
| Catalogue meta/count line | Hidden |
| Static top-bar hours | Visible (`Open daily 8:00 AM – 9:00 PM`) |
| Contact hours | Visible in static HTML |
| WhatsApp links | Present and usable |

---

## 7. Code Quality and Security

- ✅ No libraries, frameworks, CDNs or build step added
- ✅ CSP and referrer policy unchanged; only Google Fonts and the Maps frame are external
- ✅ Every `target="_blank"` link has `rel="noopener"` (both pages)
- ✅ No duplicate IDs; no missing local anchor targets
- ✅ Catalogue JS remains ES5-compatible and inside the existing IIFE
- ✅ Cards are static HTML; the catalogue is never generated in JS
- ✅ `node --check script.js` passes
- ✅ No new dependencies

### Test tools used
- Headless Chrome + DevTools Protocol (custom Node script) for widths, filters,
  search, deep links, sticky offsets, drawer keyboard behavior, focus rings,
  reduced motion and image loading
- Static Node audit of card data, labels, counts, WhatsApp messages and assets
- Manual visual review of screenshots at 320, 375, 768, 1440 and 1920px

No Lighthouse audit was re-run for this iteration.

---

## 8. Remaining Items

1. **Real product photos** — replace the 18 SVG placeholders with real 4:3
   photos when available and add meaningful alt text per card.
2. **Unused legacy SVGs** — `mens-wear.svg`, `womens-wear.svg`, `kids-wear.svg`
   and `fabrics.svg` are unreferenced and can be removed when convenient.
3. **Owner verification** — confirm address spelling, phone and hours against the
   Google Maps listing.
4. **Gallery** — at least 4 distinct real photos are needed before enabling the
   hidden gallery section on the homepage.
5. **Tamil tagline** — owner to confirm final hero wording.
6. **Reviews** — the five Google review texts on the homepage are verbatim and
   must stay unchanged.

---

## 9. Final Verdict

**PASS** — all 37 products are present with correct categories and dynamic
counts; all five filters, search combinations, empty state and deep links work;
every Enquire button carries the correct product-specific WhatsApp message;
37/37 images load; there is no horizontal overflow at any of the ten tested
widths; keyboard, reduced-motion and no-JS behavior pass; and the console is
clean. The catalogue is ready for review.
