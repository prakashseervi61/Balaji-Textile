# AGENTS.md

## Project

Static, informational website for Balaji Textiles (no cart, checkout, login, or prices).
Plain HTML5 + CSS3 + vanilla JS only. No package manager, framework, build step, bundler, or test runner.

- `index.html` — home page, reviews, contact, category cards
- `products.html` — the product catalogue
- `404.html` — self-contained not-found page for GitHub Pages (absolute links)
- `styles.css` — all styles and design tokens
- `script.js` — nav drawer, hours badge, catalogue filters/search, copy link, reveal
- `robots.txt`, `sitemap.xml` — crawler entry points
- `images/og-cover.png` — 1200×630 social share card (regenerate if branding changes)
- `.github/workflows/deploy.yml` — deploys `main` to GitHub Pages

## Commands

- Preview: `python3 -m http.server 8765 --bind 127.0.0.1` from the repo root.
- JS syntax check: `node --check script.js`
- No lint, typecheck, test, or build command exists. Do not add one for a small change.
- Pages deploys only on pushes to `main`. The blue redesign has landed; work on a
  short-lived branch and target PRs at `main` unless the owner specifies another base.

## Products catalogue

This is the high-risk area. The catalogue has no data file, CMS, or JS rendering:
every product is a hand-written `<article class="product-card" data-category="...">`
inside the single `#product-grid` in `products.html`.

- Valid categories are `men`, `women`, `kids`, `tailoring`. The same values are the
  tab `data-filter`s, URL hashes (`#men`, `#women`, `#kids`, `#tailoring`), and
  `VALID_FILTERS` in `script.js`. `all` is a view, not a card category.
- Each card contains `.product-media > img`, `.product-category`, `.product-name`,
  and one `.product-enquire` link, plus `id="p-<category>-<slug>"` for deep links.
  To add a product, add a card with a prefilled `wa.me/919894535066?text=...`
  enquiry and matching `data-category`. Do not hardcode counts: tab `.count`
  values are computed from `.product-card` at runtime.
- Exactly one SVG per product in `images/products/` (4:3, 800×600), so no two
  cards share art. They are decorative placeholders with `alt=""`; replace the
  `src` with a real 4:3 photo and add meaningful alt text when available. The
  first four cards load eagerly; the rest are lazy.
- The 38th grid item is the `data-cta="true"` enquiry tile, not a product. It is
  excluded from counts and hidden during search or an empty result. Keep that
  contract if you restyle the grid.
- Search matches the product name **and** `.product-category`, so a query like
  `tailoring` matches all six tailoring items. The clear button and Escape reset
  the query; the empty state must repeat the query and carry it into WhatsApp.
- Hash routing: `#all`/`#men`/`#women`/`#kids`/`#tailoring` change the filter;
  a product hash (`#p-…`) must **not** change it, so deep links keep the user's
  current category.
- Keep search and tab filtering working together, including the empty state and
  its WhatsApp link. With JS disabled, search/tabs/meta are hidden by the
  `noscript` block and all products must remain visible — never generate products
  in JS.
- Product names, categories, and enquiries are real business information. Never
  invent products, prices, offers, stock, delivery promises, reviews, or photos.
- Sticky tabs and anchor offsets depend on `--header-height`, written by
  `script.js` from the measured header. Do not replace it with a hardcoded 72px;
  72px is only the CSS fallback before script runs.

## Constraints and conventions

- No libraries, CDNs, or frameworks. The CSP in both HTML files allowlists Google
  Fonts and the Google Maps frame; any other external source needs a CSP change
  and a strong reason. Prefer no external source.
- Reuse the color/spacing tokens in `styles.css` `:root` instead of adding a
  near-duplicate value.
- `SHOP_CONFIG` in `script.js` is the single source for opening hours (8:00–21:00,
  `Asia/Kolkata`). Keep the static HTML hours fallback for no-JS.
- The top bar, header/nav, footer, floating WhatsApp button, and mobile bar are
  duplicated in both HTML files. Mirror shared changes in `index.html` and
  `products.html`.
- Preserve accessibility behavior: skip link, focus-visible rings, 4.5:1 contrast,
  `aria-pressed` tabs, `aria-live` result counts, reduced-motion rules, the closed
  mobile drawer out of the tab order, focus trap and Escape handling. The focus
  ring is steel `#1E5AA0` on light surfaces and sky on navy ones — sky on white
  fails the 3:1 indicator minimum.
- Hover-only effects (lift, image zoom) must stay disabled under
  `@media (hover: none)`, and phone/top-bar and footer links keep padded hit areas.
- The old homepage gallery and lightbox were removed. Do not reintroduce a
  hidden gallery section; add real photos to `index.html` as content when the
  owner supplies them.
- The five Google review texts on `index.html` are verbatim and must stay unchanged.
  Rating 5.0 with 20 reviews is verified. Business details are in `README.md`;
  do not embellish them.

## Verify products changes

Check widths 320/375/390/430/600/768/1024/1280/1440/1920 with no horizontal
scroll, sticky tabs directly under the header, search + tabs combined, the clear
button and empty state, every category deep link and a `#p-…` product link,
WhatsApp prefills, the 38th enquiry tile, and keyboard-only drawer behavior. Also
load `products.html` with JS disabled and confirm all products and the static
hours remain visible.
