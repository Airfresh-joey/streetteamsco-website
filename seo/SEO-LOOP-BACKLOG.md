# Street Teams Co Daily SEO Ship Loop

One SEO play per day, gated by `npm run build`, pushed to `redesign-v5` (which also deploys to `main`/prod).

## Hard rules (binding, do not violate)

- This is a Vite/React SPA. Any NEW route MUST get a prerendered HTML page (see `scripts/generate-static.mjs` and `scripts/generators/*.mjs`), or crawlers only ever see the homepage. Re-run the sitemap generator (`generate-sitemap.cjs`) after adding routes — it already runs as part of `npm run build`.
- ABSOLUTELY NO PRICING OR RATES anywhere, including JSON-LD structured data. `/pricing` intentionally redirects to `/contact`. The business is custom-quote only. Never add a pricing page or dollar amounts.
- CONTENT SATURATION: before adding any new guide/blog page, grep `public/blog/` and existing routes for overlapping topics. This site already has 170+ blog posts and dozens of near-duplicate topic pages (cost/pricing guides, city guides, "how to choose" guides, etc.). Prefer improving existing pages over adding new ones.
- Never invent stats, client names, reviews, or case studies. Only reuse claims already present in the site copy (e.g. "500+ campaigns", "94% client retention", "1,000+ cities").
- No em dashes in site copy; use commas or periods.
- Additive changes only; never delete pages.
- Gate every change with `npm run build` (installs may be needed first: `npm install`) and require success before pushing.
- Stage only the files you touched, never `git add -A`.

## Important structural note (discovered on first run)

Meta title/description for key pages exist in **three separate places** that are NOT synced with each other:
1. `src/pages/*.tsx` (`useMetaTags` calls) — only takes effect client-side after JS hydration.
2. `scripts/generators/*.mjs` (`standalone-pages.mjs`, `service-pages.mjs`, etc.) — generates the actual prerendered static HTML under `dist/` that crawlers and social scrapers see. **This is the source of truth for SEO.**
3. Root `index.html` — hardcoded shell meta tags used for the `/` route specifically.

When auditing or changing title/meta/schema for any page, check all three locations, not just the React component.

## Starter plays (priority order, do the topmost unfinished one each run)

1. Title/meta audit on the 5 highest-value pages (home, /contact, top 3 service pages): exact keyword at start of title (under ~65 chars) and a clean, non-truncated meta description. **DONE 2026-07-22, see log below.**
2. Internal links from top blog/guide pages to main service pages with descriptive anchors (street team marketing, brand ambassadors, guerrilla marketing).
3. FAQ JSON-LD (FAQPage) on the homepage or top service page using existing FAQ copy only (verify no pricing leaks into it).
4. Competitive positioning content vs the real gatekeepers (Google Business Profile-led local results, Cvent, Instawork): one comparison or "how to choose a street team company" section on an existing page. Factual and neutral only.
5. Image alt-text pass on informative images, one page per day.
6. (repeatable) Improve one existing guide page per day: stronger keyword-first H1/first paragraph, one added FAQ, two internal links.

## Shipped log

2026-07-22 | Play 1: Title/meta audit (home, /contact, /services/street-teams, /services/brand-ambassadors, /services/guerrilla-marketing) | index.html, src/pages/HomePage.tsx, src/pages/Contact.tsx, src/pages/ServicePage.tsx, scripts/generators/service-pages.mjs, scripts/generators/standalone-pages.mjs | Trimmed home title from 73->62 chars and description from 199->132 chars (was truncating in SERPs). Reordered /contact title to lead with the target keyword. Fixed a real bug: the prerendered static service pages (the ones crawlers actually index) had meta descriptions ballooning to 176-223 chars with mid-sentence cutoffs (naive slice(0,120) plus an appended stats suffix produced broken sentences like "...connect. 500+ campaigns..."). Replaced with word-boundary truncation at a smaller budget across all 9 service pages (both the React ServicePage.tsx component and the static generator), landing all descriptions at 140-149 clean chars. Also shortened two service titles (street-teams, college-campus) that were over 65 chars. Build passed; no pricing/rate strings touched.
