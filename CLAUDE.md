# Wallcoverings By Don Dye — SEO Improvement Plan

> **Keep this file current.** When any fix below is implemented, check its box and add a brief note (date + what changed). This file is the single source of truth for SEO work on this project — stale checkboxes cause duplicate work and missed coverage.

---

## Implementation Checklist

Check items off as they are completed. Add a short note with the date when done.

### Phase 1 — Technical Fixes

- [x] **1.1** Replace raw `<img>` tags in home gallery carousel with `next/image` `<Image>` — add `priority` to first slide *(2026-05-02 — `Gallery.tsx`: wrapped each slide in a relative `div`, switched to `<Image fill>` with `object-cover`, `priority` on index 0, `sizes` hint added)*
- [x] **1.2** Fix logo alt texts: Nav → `"Wallcoverings By Don Dye logo"`, Footer WIA badge → `"Wallcovering Installers Association member badge"` *(2026-05-02 — `Nav.tsx`: updated from "Flowbite logo"; `Footer.tsx`: updated from "wia logo")*
- [x] **1.3** Migrate Montserrat font from CSS `@import` to `@next/font/google` *(2026-05-02 — `layout.tsx`: added `Montserrat` import from `@next/font/google` with `variable: '--font-montserrat'`, applied to `<body>`; `tailwind.config.js`: changed `'montserrat'` family to `var(--font-montserrat)`; `globals.css`: removed `@import url(googleapis)` line)*
- [x] **1.4** Add hero background image preload (`<link rel="preload" as="image">`) or convert to `<Image priority>` *(2026-05-02 — `layout.tsx`: added `<link rel="preload" as="image" href="/home-bg.jpg" />` to `<head>`; superseded 2026-05-03 by task 3a.1 — full `<Image fill priority>` conversion, preload link removed)*
- [x] **1.5** Verify sitemap includes all published Sanity pages with `_updatedAt` as `lastModified`; confirm sitemap submitted in Google Search Console *(2026-05-02 — `sanity-utils.ts`: added `_updatedAt` to `getPages` and `getProjects` GROQ queries; `types/Page.ts` + `types/Project.ts`: added `_updatedAt` field; `sitemap.ts`: static routes now resolve `lastModified` from Sanity `_updatedAt`, dynamic routes switched from `_createdAt` to `_updatedAt`; GSC submission is a manual step)*

### Phase 2 — Metadata & Structured Data

- [x] **2.1** Add `seo` object field (metaTitle, metaDescription, ogImage) to `page` and `project` Sanity schemas; update `generateMetadata()` in `[slug]/page.tsx` to read from these fields *(2026-05-02 — `page-schema.ts` + `project-schema.ts`: added `seo` object with metaTitle, metaDescription, ogImage; `types/Page.ts` + `types/Project.ts`: added `PageSeo`/`ProjectSeo` types; `sanity-utils.ts`: updated GROQ for `getPage` + `getProject` to fetch `seo { metaTitle, metaDescription, ogImageUrl }`; `[slug]/page.tsx`: `generateMetadata()` now reads Sanity SEO fields first, falls back to hardcoded map)*
- [x] **2.2** Add `AggregateRating` / `Review` structured data to `LocalBusinessSchema` *(2026-05-02 — deferred: `aggregateRating` block omitted until real reviews exist; adding fake counts risks a Google manual penalty. Revisit when task 3.4 (reviews page) is implemented)*
- [x] **2.3** Create `FAQSchema.tsx` with `FAQPage` JSON-LD and render on home page *(2026-05-02 — created `app/(site)/Components/FAQSchema.tsx` with 6 FAQs; imported and rendered in `app/(site)/page.tsx`)*
- [x] **2.4** Add `BreadcrumbList` JSON-LD to all inner pages (`[slug]/page.tsx`) *(2026-05-02 — `[slug]/page.tsx`: added inline `BreadcrumbSchema` component rendering 2-level breadcrumb JSON-LD, rendered above `<Header>`)*
- [x] **2.5** Enrich `LocalBusinessSchema` with `priceRange`, `image`, `email`, `sameAs`, `hasMap`, `paymentAccepted` *(2026-05-02 — `StructuredData.tsx`: added `image`, `paymentAccepted`, `hasMap`; expanded `areaServed` to all 8 Central Texas cities; `priceRange` and `sameAs` were already present)*

### Phase 3 — Content & Local SEO

- [x] **3.1** Create individual project pages (`app/(site)/gallery/[slug]/page.tsx`) with `generateStaticParams`, per-project metadata, and `ImageObject` JSON-LD; update gallery links and sitemap *(2026-05-02 — added `description` + `tags` fields to project Sanity schema; fixed `alt` GROQ bug (`image.alt` not top-level `alt`); created `app/(site)/gallery/[slug]/page.tsx` with `generateStaticParams`, `generateMetadata`, `ImageObject` + `BreadcrumbList` JSON-LD, image/tags/CTA; updated `[slug]/Gallery.tsx` to link each image to its project page; project routes added to sitemap)*
- [x] **3.2** Add city landing pages (`app/(site)/service-area/[city]/page.tsx`) for Round Rock, Cedar Park, Georgetown, Pflugerville, Kyle, Buda, San Marcos; update `areaServed` in schema and sitemap *(2026-05-02 — created `app/(site)/service-area/[city]/page.tsx` with static city config, unique copy per city, `generateStaticParams`, `generateMetadata`, `LocalBusiness` + `BreadcrumbList` JSON-LD, phone CTA, and cross-links to other city pages; city routes added to sitemap)*
- [-] **3.3** Add blog section: `post` Sanity schema + `app/(site)/blog/page.tsx` + `app/(site)/blog/[slug]/page.tsx` with `Article` JSON-LD *(2026-05-02 — defer to a later iteration)*
- [-] **3.4** Add `/reviews` page: `testimonial` Sanity schema, visible star ratings, `Review` JSON-LD per entry *(2026-05-02 — defer to a later iteration)*

### Phase 3a — Performance & Accessibility Fixes (Lighthouse Audit 2026-05-03)

> Lighthouse run on `http://localhost:3000/` — Performance **55/100**, Accessibility **86/100**, Best Practices **100/100**, SEO **92/100**.
> Core Web Vitals: LCP **5.0 s** (failing), FCP 1.1 s (passing), TBT **1,760 ms** (failing), CLS **0** (passing), TTI **30.7 s** (catastrophic).

- [x] **3a.1** Convert `div#hero-background` CSS background to `<Image priority fetchpriority="high">` *(2026-05-03 — `layout.tsx`: replaced `<div id="hero-background">` with `<div className="fixed inset-0 -z-10 opacity-75"><Image fill priority sizes="100vw">`, removed `<link rel="preload">`; `globals.css`: removed `#hero-background` rule)*

- [x] **3a.2** Audit and code-split `app/(site)/layout.js` *(2026-05-03 — `Nav.tsx`: rewrote entirely without `flowbite-react` — replaced `Navbar` with vanilla Tailwind + `useState` hamburger toggle, removing Flowbite from the layout bundle; `page.tsx`: Gallery wrapped in `dynamic(() => import(...), { ssr: false })` to defer Flowbite Carousel to a separate chunk)*

- [x] **3a.3** Fix oversized images — `home-bg.jpg` serves 186 KB with 50 KB wasted; `green-wallpaper-bg.webp` serves 75 KB with 42 KB savings available. Resize each to the largest display size needed. `home-bg.jpg` savings will come automatically now that it is served via `next/image` (auto WebP/AVIF + responsive sizes). `green-wallpaper-bg.webp` (nav background via Tailwind CSS) still needs manual resizing. *(Est. remaining savings: ~42 KiB)* *(2026-05-03 — `public/green-wallpaper-bg.webp`: resized from 445×445 to 200×200 using ImageMagick; file size 73 KB → 14 KB (~59 KB saved); tiles identically under nav's `bg-white bg-opacity-80` overlay)*

- [x] **3a.4** Fix `role="list"` missing `role="listitem"` children *(2026-05-03 — `Home.tsx`: changed wrapper `div[role="list"]` to `<ul className="list-none">`, updated PortableText serializer to return `<li>` instead of `<p>`)*

- [x] **3a.5** Fix low color-contrast — `text-gray-400` (2.53:1) *(2026-05-03 — `layout.tsx`: upgraded Freepik attribution `<span>` from `text-gray-400` to `text-gray-600` (~7:1 ratio))*

- [x] **3a.6** Fix heading order — `<h5>` in Footer skips heading levels *(2026-05-03 — `Footer.tsx`: changed all three section heading `<h5>` elements to `<h3>`)*

- [x] **3a.7** Fix label/accessible-name mismatch on CTA link *(2026-05-03 — `Home.tsx`: removed `aria-label` from `<a href="/contact">` — the button's visible text "Get Your Free Estimate Today!" is already descriptive)*

- [x] **3a.8** Fix "Read More" link text on About page *(2026-05-03 — `About.tsx`: changed button text from "Read More" to "Learn more about Don Dye")*

- [x] **3a.9** Increase touch target sizes *(2026-05-03 — `Nav.tsx`: all nav links and hamburger toggle get `min-h-[44px]`; CTA "Contact Us" button gets `min-h-[44px]`; `Home.tsx`: CTA "Get Your Free Estimate" button gets `min-h-[44px]`)*

### Phase 3b — Performance Follow-up (Lighthouse Audit 2026-05-03 #2)

> Lighthouse run on `http://localhost:3000/` — Performance **75/100** (up from 55/100).
> Core Web Vitals: LCP **2.2 s** (passing), FCP 1.1 s (passing), TBT **1,130 ms** (failing), CLS **0** (passing), TTI **22.2 s** (catastrophic).
> Note: audit was run on the dev server — run `npm run build && npm start` for accurate prod numbers before actioning these.

- [ ] **3b.1** Run production build (`npm run build && npm start`) and re-audit — dev mode inflates bundles and disables minification; several findings (unminified JS/CSS, missing source maps) are dev artifacts that vanish in prod
- [x] **3b.2** Replace Flowbite Carousel in `Gallery.tsx` with a lightweight alternative — `page.js` is 1.7 MB with a 1,092 ms long task driven by the carousel *(2026-05-03 — `Components/Gallery.tsx`: replaced `Flowbite`/`Carousel` with CSS `scroll-snap` + `useEffect` auto-advance; `flowbite` and `flowbite-react` uninstalled from `package.json`)*
- [x] **3b.3** Purge unused CSS — `layout.css` is 91% unused (15.8 KB wasted out of 17 KB), render-blocking (+300 ms FCP); verify Tailwind `content` glob covers all template files, then remove any leftover Flowbite global CSS imports *(2026-05-03 — `tailwind.config.js`: removed Flowbite from `content` array and `plugins`; added `sanity/**/*.{ts,tsx}` and `types/**/*.ts` to content glob; Flowbite global CSS eliminated by package removal)*
- [-] **3b.4** ~~Convert nav header CSS background to `<Image>`~~ — **will not do; inverted by 3d.11.** `bg-site-bg-image` is now used deliberately by *both* the nav and `PageHero`, because a repeating 200×200 tile cannot be expressed with `<Image fill>`. The tile is 14 KB and shared across every route, so the 47 KiB gap this targeted is gone.
- [ ] **3b.5** Update browserslist targets to drop legacy JS transforms — `@babel/plugin-transform-classes` in `main-app.js` adds 9 KB; add `"browserslist"` to `package.json` targeting last 2 versions of Chrome/Firefox/Safari/Edge
- [ ] **3b.6** Fix remaining touch target spacing — `<a href="/gallery">` and `<a href="/about">` still flagged (height is 48 px but gap between adjacent targets is below the required 12 px minimum)

### Phase 3c — Gallery Page Performance (Lighthouse Audit 2026-05-03)

> Lighthouse run on `http://localhost:3000/gallery` — Performance **74/100**.
> Core Web Vitals: LCP **10.8 s** (failing), FCP **1.7 s** (passing), TBT **0 ms** (passing), CLS **0.031** (passing), TTI **11.2 s** (failing).
> Root cause: the gallery grid images use hardcoded `width={1750} height={1500}` with no `sizes` prop, so Next.js requests the `w=3840` variant for every image (~300–530 KB each). The first image in the grid is also the LCP element but has no `priority` prop.

- [x] **3c.1** Add `priority` to the first gallery grid image (LCP fix) — **File**: `app/(site)/[slug]/Gallery.tsx` *(2026-05-03 — changed `.map((project)` to `.map((project, index)`, added `priority={index === 0}` to `<Image>`)*

- [x] **3c.2** Add `sizes` prop to all gallery grid images (image payload fix) — **File**: `app/(site)/[slug]/Gallery.tsx` *(2026-05-03 — added `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"` to all `<Image>` elements in the gallery grid)*

- [x] **3c.3** Fix render-blocking Flowbite CSS on the gallery route *(2026-05-03 — resolved by completing 3b.2 + 3b.3: Flowbite package removed, Tailwind purge configured; Flowbite CSS file will no longer be generated)*

- [x] **3c.4** Fix heading order on gallery page — Lighthouse flags a heading-order violation on `/gallery` *(2026-05-03 — `[slug]/Gallery.tsx`: wrapped return in `<>`, added `<h2 className="sr-only">Our Work</h2>` before the grid; `Header.tsx` already renders `<h1>` so sequence is now h1 → h2 → h3 footer)*

- [ ] **3c.5** Fix console 404 for Vercel Analytics — `/_vercel/insights/script.js` returns 404 in local dev. This is a dev-environment artifact (the Vercel injected script is absent on localhost). Not a production issue, but worth confirming it does not appear in production logs after the next deploy.

### Phase 3d — Layout & Visual System Redesign (2026-08-16)

> Motivation: the fussy homepage carousel (auto-advance fought manual scrolling) plus a full-viewport hero
> that pushed Gallery and About into a cramped strip above the footer. The fixed background image forced
> every content block to carry its own translucent panel, so nothing had room to breathe.

**The system** — three new primitives now shared by all routes:

| File | Role |
|------|------|
| `app/(site)/Components/PageHero.tsx` | Bounded band (`size="lg"` homepage ≈65vh, `size="sm"` page header). Holds the `<h1>`. Tiled `bg-site-bg-image` wallpaper — the same tile as the nav — under a cream gradient scrim for legibility + a seamless fade into the page. |
| `app/(site)/Components/Section.tsx` | The single source of vertical rhythm (`py-14 md:py-20`). `width="narrow"` (max-w-3xl) for copy/forms, `"wide"` (max-w-5xl) for grids. `tint` renders `bg-cream-deep` for alternating bands. |
| `app/(site)/fonts.ts` | All three fonts instantiated once; variables applied to `<body>`. Components just use `font-headers` / `font-sans`. |

**Rule: nothing below a PageHero sets its own `min-h-screen`.** Stacked `min-h-screen` on the wrapper *and*
the child was the cause of the arbitrary dead space on every inner page.

- [x] **3d.1** Solid `cream` (#FDF6E3) page surface replaces the persistent fixed background image *(2026-08-16 — `tailwind.config.js`: added `colors.cream` (DEFAULT #FDF6E3, `deep` #F7EDD4); `globals.css`: `html` background set to match so overscroll stays on-palette; `layout.tsx`: removed the `fixed inset-0 -z-10` hero `<Image>`, body now `bg-cream`)*
- [x] **3d.2** Hero image bounded to a hero band instead of persisting on scroll *(2026-08-16 — new `PageHero.tsx`; the image now appears only inside the band, under a `from-cream/60 via-cream/45 to-cream` gradient scrim. Initially `home-bg.jpg` via `<Image fill priority>`; superseded same day by 3d.11 below, which switched the band to the nav's tiled wallpaper)*
- [x] **3d.3** Replace the auto-advancing carousel with a static "Recent Work" grid *(2026-08-16 — `Components/Gallery.tsx`: rewritten as a server component; removed `'use client'`, `useRef`, and the `setInterval` scroll-hijack. `page.tsx`: dropped the `dynamic(..., { ssr: false })` wrapper. Homepage page JS: **1.7 MB → 188 B**, now `○ Static`)*
- [x] **3d.4** Homepage grid contents editable from the Studio *(2026-08-16 — `project-schema.ts`: added `featured` boolean ("Show on homepage") + `featuredOrder` number (hidden unless featured), plus `orderings` and a `preview` showing `★ Homepage · #n` in the document list; `sanity-utils.ts`: added `getFeaturedProjects(limit)` which orders by `coalesce(featuredOrder, 9999)` and **falls back to the newest projects if nothing is flagged**, so the grid is never empty; `types/Project.ts` updated)*
- [x] **3d.5** Remove stacked `min-h-screen` and translucent amber panels from all inner pages *(2026-08-16 — `[slug]/Components/Header.tsx` rewritten as PageHero + Section shell taking a `width` prop; `min-h-screen` removed from `[slug]/About.tsx`, `[slug]/Gallery.tsx`, `[slug]/ContactForm.tsx`, `gallery/[slug]/page.tsx`, `service-area/[city]/page.tsx`)*
- [x] **3d.6** Fix duplicate `<h1>` on the homepage *(2026-08-16 — `Components/About.tsx` used `<h1>About Don Dye</h1>` as a second h1. Now `<h2>`; homepage outline verified as h1 → h2 → h2 → h2 → h3×4)*
- [x] **3d.7** Gallery page intro copy no longer rendered as the first grid cell *(2026-08-16 — `[slug]/Gallery.tsx`: PortableText intro moved above the grid, which had been knocking the image columns out of alignment)*
- [x] **3d.8** Unify CTA styling; drop invalid `<button>`-inside-`<a>` nesting *(2026-08-16 — all CTAs are now a single styled `<a>`/`<Link>` with `min-h-[44px]`, consistent hover across every page. Contact form inputs switched `bg-gray-100` → `bg-white` for contrast against cream)*

  **CTA hover treatment (updated 2026-08-16)** — the amber-300 → green-700 colour flip was replaced by a lift-and-brighten: `shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-350 hover:text-gray-900 hover:shadow-lg`. `amber-350` (#EFC849) is defined in `tailwind.config.js`. Applied to all seven CTAs: `Components/Home.tsx`, `Components/About.tsx`, `Components/Gallery.tsx`, `Components/Nav.tsx` ("Contact Us"), `[slug]/About.tsx`, `[slug]/ContactForm.tsx` (submit), `gallery/[slug]/page.tsx`, `service-area/[city]/page.tsx`. **Any new CTA should copy this string** — it is not yet extracted into a shared component or `@apply` class, so it is duplicated by hand.

  **CTA hierarchy — two tiers (2026-08-16)** — CTAs are now split by *intent*, not by page. The
  conversion action is inverted to deep green so it outranks the lighter amber nav button.

  **Primary / conversion — `bg-green-900 text-amber-200`** (ask for the estimate):

  ```
  inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3
  text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800
  hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300
  ```

  Applied to: `Components/Home.tsx` (hero — adds `text-lg`, the only size variation), `[slug]/About.tsx`
  ("Get in Touch Today!"), `[slug]/ContactForm.tsx` (submit), `gallery/[slug]/page.tsx`
  ("Get a Free Estimate"), `service-area/[city]/page.tsx` ("Contact Us").

  Notes: no weight class, so these render at 400 — deliberate, set by hand. Amber-200 on green-900 is
  **7.3:1**, hover 5.7:1, both clear AA at that weight. The focus ring is amber because a green ring on a
  green button is nearly invisible. `hover:text-amber-200` is a no-op held over from the amber string;
  kept so the two tiers stay diffable.

  **Secondary / navigational — the amber `bg-amber-300 text-gray-800` string above** (move around the
  site): `Components/Nav.tsx` ("Contact Us" — must stay light, it is the contrast the primary tier is
  measured against), `Components/Gallery.tsx` ("View My Work"), `Components/About.tsx`
  ("Learn more about Don Dye").

  Neither tier is extracted into a shared component or `@apply` class, so both strings are duplicated by
  hand. `Components/Process.tsx` has a third, older amber button style — it is **not imported anywhere**
  and was left alone; delete the file or restyle it if it is ever wired up.

  Deliberately *not* given this treatment: the Nav hamburger toggle (icon button, keeps `hover:bg-gray-100` — an amber lift would read as a CTA), and text links (nav/footer/breadcrumb `hover:text-green-700`, phone links `hover:underline`).
- [x] **3d.9** Freepik attribution relocated *(2026-08-16 — was a floating `<span>` between `<main>` and the footer; moved into `Footer.tsx`'s copyright bar. **Now moot** — see 3d.13: the copyright bar is commented out and `home-bg.jpg`, the image the credit was for, is no longer displayed anywhere)*

- [x] **3d.11** Hero band uses the nav's tiled wallpaper instead of `home-bg.jpg` *(2026-08-16 — `PageHero.tsx`: replaced `<Image fill priority src="/home-bg.jpg">` with a tiled CSS background, `<div className="absolute inset-0 bg-site-bg-image bg-repeat" />`, scrim unchanged. **A CSS background is required here, not `next/image`**: the source is a 200×200 tile and `<Image fill>` + `object-cover` would scale that single tile to fill the band instead of repeating it. `bg-site-bg-image` is defined once in `tailwind.config.js`, so nav and hero cannot drift apart. Verified in a prod build: compiled CSS emits `background-repeat:repeat` with no `background-size`, so it tiles at natural 200px exactly like the nav.)*

  Consequences: hero image payload **186 KB → 14 KB**, and the tile is already cached from the nav on every route. `home-bg.jpg` is now unreferenced by the UI — its only remaining mention is the `LocalBusiness` JSON-LD `image` property in `StructuredData.tsx` (an absolute URL for Google, not rendered). LCP priority moved off the hero (a CSS background cannot carry `fetchPriority`) onto the first Recent Work grid image, which still has `priority`.

**Superseded by this phase** (do not action):
- **3b.4** — **inverted, do not do.** It wanted the nav's CSS background converted *to* `<Image>`; 3d.11 deliberately went the other way and gave the hero the same CSS background. Tiling requires it, and the tile is 14 KB, so there is nothing left to win here.
- **3c.3 / 3b.3** — Flowbite CSS: already gone; the carousel that needed it no longer exists.
- **3a.1 / 1.4** — hero `<Image priority>` and its preload: the element those tasks optimized no longer exists. The hero is now a tiled CSS background.

- [ ] **3d.10** Re-run Lighthouse on a production build for all four routes — not done here: `lighthouse` is not installed locally and the redesign changed enough that the Phase 3b/3c numbers are stale. Note `next dev` and `next start` share `.next`, so **stop the dev server before `npm run build && npm start`** or the prod build gets clobbered mid-run.

#### Follow-up polish (hand edits after the system landed, 2026-08-16)

Recorded so the file matches the code. These were design calls made directly in the editor, not from the plan above.

- **3d.12** `Nav.tsx` — added a `<p>Wallcoverings by Don Dye</p>` wordmark beside the logo, and **removed `sticky`** from the header, so the nav scrolls away instead of pinning. `Home.tsx` hero card widened `max-w-2xl → max-w-5xl` with roomier padding (`p-10 md:p-14`). `Footer.tsx` restyled to `bg-cream-deep` with a double amber top border, matching the nav's border treatment.
- **3d.13** `Footer.tsx` — the whole copyright block is commented out, so **neither the © line nor the Freepik credit renders**. The Freepik credit was specifically for `home-bg.jpg` (no longer displayed after 3d.11), so dropping it is defensible; note that `green-wallpaper-bg.webp` now carries the site's visual identity and its licensing provenance is not recorded anywhere in this repo. Worth confirming before launch.
- **3d.14** `Components/About.tsx` — `tint` removed, so the homepage is now uniform `cream` end to end. `tint` (`bg-cream-deep`) survives only in `service-area/[city]/page.tsx`. If alternating bands aren't wanted anywhere, that one is the last holdout.

- **3d.16** `Components/Home.tsx` — hero card resized and the `<h1>` made fluid *(2026-08-16)*. Card `max-w-5xl → max-w-4xl` (896px) with much heavier padding: `px-10 pt-16 pb-14 sm:px-14 md:px-16 md:pt-24 md:pb-20`. Note the card's old `max-w-5xl` was **inert** — `PageHero`'s inner wrapper is also `max-w-5xl`, so the card could never be narrower than its parent and `mx-auto` did nothing.

  The `<h1>` moved off breakpoint steps to a fluid `text-[clamp(2.25rem,6.1vw_-_0.7rem,2.875rem)]`. Reason: `page.title` ("Professional Wallpaper Installation") measures a fixed **15.58em**, so any step change at `md` overshoots the container somewhere in the range above it — `md:text-5xl` is 748px of text in a 592px box at vw=768. Scaling continuously holds the text-to-container ratio at a steady **~6% margin** and keeps it on one line from **~722px up**, with no breakpoint dip. Below ~722px it wraps by necessity (one line at 375px would need a ~16px font), so `[text-wrap:balance]` evens the wrap. Tailwind is **3.3.3**, which predates the `text-balance` shorthand — hence the arbitrary-property syntax. The underscores in the clamp are required: Tailwind converts them to spaces, and `6.1vw-0.7rem` without spaces is invalid CSS.

  **`font-extrabold` → `font-bold` here.** Ibarra Real Nova's variable weight axis stops at 700 (`wght@800` returns HTTP 400 from Google Fonts), so 800 makes the browser *synthesize* bold, widening glyphs by a browser-dependent amount that invalidates any width math. **Nine other headings still ask for `font-extrabold` on `font-headers`** and are silently synthesizing too — `[slug]/Components/Header.tsx`, `gallery/[slug]/page.tsx`, `service-area/[city]/page.tsx`, `Components/Gallery.tsx`, `Components/About.tsx`, `Components/Nav.tsx`, `Components/Process.tsx`, `[slug]/Components/Success.tsx`, `[slug]/Components/Failure.tsx`. Worth a sweep to `font-bold`; not done here to keep the change scoped.

- [ ] **3d.15** Decide whether the homepage local-SEO paragraph should come back — the hero's *"Serving Austin, Round Rock, Cedar Park, Leander, Georgetown, Pflugerville, and all of Central Texas"* line was removed with the CTA rework. It was the homepage's only inline city-keyword copy, and the `<h2 class="sr-only">` above it is not a substitute for body text. The footer's service-area links still carry the internal linking, so this is a content-signal question, not a crawl one.

### Phase 4 — Off-Page & Authority

- [ ] **4.1** Audit and fully optimize Google Business Profile (photos, categories, description, hours, Q&A, services)
- [ ] **4.2** NAP consistency audit across Yelp, Houzz, Angi, HomeAdvisor, Thumbtack, Facebook, WIA directory, BBB
- [ ] **4.3** Backlink outreach: Austin interior design blogs, real estate agents, home stagers, Houzz profile

### Phase 5 — Measurement

- [ ] **5.1** Google Search Console: sitemap submitted, coverage clean, Core Web Vitals passing
- [ ] **5.2** Core Web Vitals passing: LCP < 2.5s, CLS < 0.1, INP < 200ms (verify in PageSpeed Insights post-Phase 1)
- [ ] **5.3** Monthly rank tracking set up for target keywords

---

## Project Overview

Small business website for a professional wallpaper installation service based in Austin, TX.
Built with Next.js 13 (App Router) + Sanity CMS, deployed on Vercel.

- **Live URL**: https://www.wallcoveringsbydondye.com
- **Business**: Wallcoverings By Don Dye — wallpaper installation/removal, Central Texas
- **Primary Goal**: Rank locally for wallpaper installation searches in Austin and surrounding areas
- **CMS**: Sanity Studio at `/admin`

---

## Current SEO State (Audit Summary)

### What's Working Well
- Next.js native Metadata API — title templates, OG/Twitter cards, per-page metadata
- Dynamic sitemap via `app/sitemap.ts` (pulls live routes from Sanity)
- `app/robots.ts` — correctly blocks `/admin/`, `/api/`, `/_next/`
- JSON-LD structured data: `LocalBusinessSchema` + `ServiceSchema` in layout head
- Server-side rendering on all public pages (good for crawlability)
- Google Search Console verification tag in place
- Self-hosted fonts (`@next/font/google`) for Catamaran and Ibarra Real Nova
- Semantic HTML with ARIA labels on home page and contact form
- Google Analytics via `@vercel/analytics`

### Key Weaknesses Found

> **Historical snapshot — the original 2026-05-02 audit. Do not action from this list;** work from the
> Implementation Checklist above, which records what actually shipped. Most of these are fixed, and two
> are now deliberately "wrong" by design: the carousel in #1 no longer exists (Phase 3d), and the CSS
> `url()` hero in #5 is intentional (3d.11 — a repeating tile cannot use `next/image`).

1. Home gallery carousel uses raw `<img>` tags — no Next.js Image optimization
2. Generic alt texts on nav logo (`"Flowbite logo"`) and footer logo (`"wia logo"`)
3. Sanity `page` and `project` schemas have no SEO fields (meta description, OG image, keywords)
4. Montserrat font imported via raw CSS `@import url(googleapis)` — not using `@next/font`
5. Hero background image loaded via CSS `url()` — not responsive, not preloaded
6. No review/testimonial structured data (huge for local service businesses)
7. No FAQ structured data
8. No breadcrumb structured data on inner pages
9. No individual project/portfolio page routes — gallery items not individually indexable
10. No geo-specific landing pages for surrounding cities (Round Rock, Cedar Park, Georgetown, etc.)
11. `generateMetadata()` in `[slug]/page.tsx` uses a hardcoded map — won't scale and misses dynamic content
12. Project schema in Sanity has no description field for SEO copy

---

## SEO Improvement Plan

Tasks are ordered by impact-to-effort ratio. Address them in phase order.

---

## Phase 1 — Technical Fixes (High Impact, Low Effort)

### 1.1 Fix Home Gallery Image Tags
**File**: `app/(site)/Components/Gallery.tsx` (home carousel)
**Problem**: Imports `next/image` but uses raw `<img>` tags, losing lazy loading, format optimization (WebP/AVIF), and LCP improvements.
**Fix**: Replace all `<img>` tags in the home carousel with `<Image>` from `next/image`. Set explicit `width`/`height` or use `fill` with a sized container. Add `priority` to the first carousel slide (it's likely the LCP element).
**Impact**: Core Web Vitals (LCP), bandwidth, crawl signal quality.

### 1.2 Fix Alt Texts
**Files**: `app/(site)/Components/Nav.tsx`, `app/(site)/Components/Footer.tsx`
**Problem**: Logo alt texts are generic (`"Flowbite logo"`, `"wia logo"`).
**Fix**:
- Nav logo: `alt="Wallcoverings By Don Dye logo"`
- Footer WIA badge: `alt="Wallcovering Installers Association member badge"`
**Impact**: Accessibility, image search signals.

### 1.3 Migrate Montserrat to `@next/font`
**File**: `app/globals.css` (remove `@import url(https://fonts.googleapis.com/...)`) and the component that uses it
**Problem**: CSS-based Google Fonts import adds a render-blocking network request to Google's servers.
**Fix**: Add Montserrat to the existing font setup using `@next/font/google` with `subsets: ['latin']` and `display: 'swap'`. Export the className and apply it where Montserrat is currently used.
**Impact**: LCP, CLS, eliminates external font request.

### 1.4 Add `<link rel="preload">` for Hero Background
**File**: `app/(site)/layout.tsx` or the component that renders the hero section
**Problem**: Hero background image is loaded via CSS `url()` — the browser doesn't discover it until CSS is parsed, delaying LCP.
**Fix**: Add a `<link rel="preload" as="image" href="/home-bg.jpg">` tag in the layout `<head>`. Consider converting to a Next.js `<Image>` with `priority` and absolute positioning instead of a CSS background, which would allow Next.js to handle format negotiation and responsive sizing.
**Impact**: LCP (likely the single biggest Core Web Vitals win on the site).

### 1.5 Verify Sitemap Completeness
**File**: `app/sitemap.ts`
**Check**: Confirm the Sanity query in `sitemap.ts` returns all published pages and that `lastModified` reflects actual Sanity document `_updatedAt`. Confirm sitemap is submitted in Google Search Console.
**Fix if needed**: Update the GROQ query to include `_updatedAt` and map it to `lastModified` on each entry.

---

## Phase 2 — Metadata & Structured Data (High Impact, Medium Effort)

### 2.1 Add SEO Fields to Sanity Schemas
**Files**: `sanity/schemas/page-schema.ts`, `sanity/schemas/project-schema.ts`

Add an `seo` object field to both schemas:
```ts
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string', title: 'Meta Title' },
    { name: 'metaDescription', type: 'string', title: 'Meta Description' },
    { name: 'ogImage', type: 'image', title: 'Social Share Image' },
  ]
}
```

Then update `generateMetadata()` in `app/(site)/[slug]/page.tsx` to read from `page.seo.metaTitle`, `page.seo.metaDescription`, and `page.seo.ogImage` instead of the hardcoded map. Fall back to content-derived values if the Sanity SEO fields are empty.

**Impact**: Lets the business owner control per-page SEO without code changes. Makes metadata scale to any future page.

### 2.2 Add Review/Testimonial Structured Data
**File**: Create `app/(site)/Components/ReviewSchema.tsx`

Add a `Review` or `AggregateRating` schema to the `LocalBusiness` JSON-LD block. Even a small set of manually curated reviews structured as JSON-LD can unlock rich result eligibility in local search.

```json
{
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "47",
  "bestRating": "5"
}
```

If reviews live in Sanity, fetch them and render individual `Review` objects. If pulling from Google, use the Google Places API to keep them live.

**Impact**: Star ratings in SERPs — highest CTR improvement available for local service businesses.

### 2.3 Add FAQ Structured Data
**File**: Create `app/(site)/Components/FAQSchema.tsx`, render on home page and/or a dedicated FAQ page

Common wallpaper installer FAQs to target:
- How long does wallpaper installation take?
- How much does professional wallpaper installation cost in Austin?
- Do you remove old wallpaper before installing new?
- What types of wallpaper can you install?
- Do you offer free estimates?

Structure as `FAQPage` JSON-LD. This directly targets People Also Ask boxes in Google — extremely valuable for local service queries.

**Impact**: Qualifies for FAQ rich results, captures PAA real estate.

### 2.4 Add BreadcrumbList Structured Data on Inner Pages
**File**: `app/(site)/[slug]/page.tsx`

Add `BreadcrumbList` JSON-LD on all non-home pages. Example for `/gallery`:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wallcoveringsbydondye.com" },
    { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://www.wallcoveringsbydondye.com/gallery" }
  ]
}
```

**Impact**: Breadcrumbs appear in SERPs, improves click-through rate and crawl understanding.

### 2.5 Enrich LocalBusiness Schema
**File**: `app/(site)/Components/StructuredData.tsx`

Add missing fields to the existing `LocalBusinessSchema`:
- `priceRange`: `"$$"` (or your actual range)
- `image`: URL to a photo of completed work or the business owner
- `url`: canonical business URL
- `email`: contact email if public
- `sameAs`: links to Google Business Profile, Yelp, Houzz, Facebook, etc.
- `hasMap`: Google Maps URL for the service area
- `paymentAccepted`: `"Cash, Check, Credit Card"`

The `sameAs` array is particularly important — it links the structured data entity to external authority sources Google uses to build the Knowledge Panel.

**Impact**: Stronger local entity disambiguation, Knowledge Panel eligibility.

---

## Phase 3 — Content & Local SEO (Medium Effort, Compounding Returns)

### 3.1 Create Individual Project/Portfolio Pages
**Problem**: Gallery items are not individually indexable. Images of completed work are prime content for local image search and long-tail queries like "grasscloth wallpaper installation Austin" or "removable wallpaper bedroom Texas."

**Plan**:
1. Add a `description` (rich text) field and `tags` (array of strings) field to the `project` Sanity schema
2. Create a new route: `app/(site)/gallery/[slug]/page.tsx`
3. Render each project with its name, photos, description, and tags
4. Add `generateStaticParams()` to pre-render all project pages at build time
5. Add `generateMetadata()` that uses the project name and description for page-specific meta
6. Add `CreativeWork` or `ImageObject` JSON-LD for each project page
7. Update the gallery page to link to individual project pages
8. Update `app/sitemap.ts` to include project URLs

**Target queries**: `[wallpaper type] installation Austin TX`, `[room type] wallpaper Austin`

### 3.2 Add Service Area / City Landing Pages
**Problem**: The site serves all of Central Texas but only mentions Austin. Competitors targeting Round Rock, Cedar Park, Georgetown, Pflugerville, Kyle, Buda, and San Marcos will capture those searches.

**Plan**:
1. Create a `serviceArea` Sanity schema or a static config file listing target cities with custom copy
2. Create `app/(site)/service-area/[city]/page.tsx`
3. Each page needs unique, non-duplicate content (not just city name swaps) — at minimum: city-specific intro paragraph, local context, same CTA, and contact form
4. Update `LocalBusinessSchema` `areaServed` to include all cities as individual `City` entries
5. Add city pages to the sitemap

**Target queries**: `wallpaper installation [city] TX`, `wallpaper installer near [city]`

### 3.3 Add a Blog / Resources Section
**Problem**: The site has no blog or educational content, missing top-of-funnel traffic from informational queries.

**High-value content targets**:
- "How to choose wallpaper for a humid bathroom" (high buyer intent, few competitors)
- "Wallpaper vs. paint: pros and cons for Austin homes"
- "How much does wallpaper installation cost in Austin, TX 2025?"
- "Grasscloth wallpaper installation: what you need to know"
- "How to remove old wallpaper without damaging drywall"
- "Best wallpaper trends for Texas homes"

**Plan**:
1. Create a `post` Sanity schema with title, slug, publishedAt, author, body (portable text), mainImage, excerpt, and seo fields
2. Create `app/(site)/blog/page.tsx` (listing) and `app/(site)/blog/[slug]/page.tsx` (article)
3. Add `Article` JSON-LD to blog post pages
4. Add blog posts to the sitemap with `changeFrequency: 'weekly'`

**Impact**: Long-tail traffic, backlink acquisition target, authority signals.

### 3.4 Add a Dedicated Reviews/Testimonials Page
Create a `/reviews` or `/testimonials` page that aggregates customer reviews with:
- Visible star ratings and review text
- Reviewer name and optional location (e.g., "Cedar Park, TX")
- Date of review
- `Review` JSON-LD for each entry

Pull from a Sanity `testimonial` schema so the business owner can manage them in the Studio. This page can rank for `"wallpaper installer reviews Austin"` and related queries.

---

## Phase 3a — Performance & Accessibility Fixes

*Source: Lighthouse audit run 2026-05-03 on localhost — Performance 55/100, Accessibility 86/100.*

### 3a.1 Convert Hero Background to `<Image priority>`
**File**: `app/(site)/page.tsx` (or the hero component)
**Problem**: The LCP element is `div#hero-background`, a CSS-background `div`. Lighthouse confirms `requestDiscoverable: false` and `priorityHinted: false` — the `<link rel="preload">` from task 1.4 exists but doesn't help because the browser can't connect it to this element. LCP is 5.0 s.
**Fix**: Replace the CSS `background-image` div with an absolutely-positioned `<Image fill priority sizes="100vw" src="/home-bg.jpg">` inside a `relative` container. This makes the image fetch discoverable from the HTML immediately with `fetchpriority=high`.
**Impact**: Single biggest LCP win — expected to drop from 5.0 s to < 2.5 s.

### 3a.2 Audit and Code-Split layout.js Bundle
**File**: `app/(site)/layout.tsx`
**Problem**: `layout.js` is 88.6% unused bytes — 1.6 MB wasted out of 1.8 MB total. This is the primary driver of TBT 1,760 ms (score: 0.10) and TTI 30.7 s. The 3.7 s main-thread work breakdown is 1,738 ms script evaluation + 1,419 ms parsing/compilation.
**Fix**:
1. Audit imports in `layout.tsx` to identify which pull in heavy client-side libraries (likely Flowbite, carousel/slider, or icon sets)
2. Convert any client-only components to `dynamic(() => import(...), { ssr: false })` with appropriate loading skeletons
3. Move client components as far down the tree as possible (away from the root layout) so they're not bundled into the layout chunk
4. Run `@next/bundle-analyzer` to visualize what's in the layout chunk
**Impact**: Reduces unused JS by ≥ 2,461 KiB, dramatically lowers TBT and TTI.

### 3a.3 Right-Size and Optimize Images
**Problem**: `home-bg.jpg` serves 186 KB with ~50 KB wasted; `green-wallpaper-bg.webp` serves 75 KB with ~42 KB wasted. Total est. savings: 101 KiB.
**Fix**:
- `home-bg.jpg`: task 3a.1 converts this to `<Image>` which handles automatic WebP/AVIF delivery and responsive sizing via `sizes`
- `green-wallpaper-bg.webp`: audit the display size at each breakpoint and ensure the source file is not larger than the largest display size needed; convert to a Next.js `<Image>` if it's rendered in JSX
**Impact**: 101 KiB payload reduction, improved LCP for secondary images.

### 3a.4 Fix ARIA `role="list"` Missing Child Roles
**File**: `app/(site)/page.tsx` (services section)
**Problem**: A `div` with `role="list"` and `aria-label="Our professional wallcovering services"` has child elements that lack `role="listitem"`, violating WCAG.
**Fix**: Replace the `div[role="list"]` pattern with a semantic `<ul>` and `<li>` elements. Remove the explicit `role` attributes — they're unnecessary on native list elements.
**Impact**: Accessibility score improvement; screen reader users can properly navigate the services list.

### 3a.5 Fix Color Contrast — `text-gray-400`
**Problem**: A `<span class="text-xs text-right text-gray-400">` renders `#9ca3af` on white — contrast ratio 2.53:1, need 4.5:1 for small text.
**Fix**: Change `text-gray-400` to `text-gray-600` (`#4b5563`, ratio ≈ 7:1) or darker. Check for other `gray-400` usages on light backgrounds.
**Impact**: Accessibility score improvement; WCAG 1.4.3 compliance.

### 3a.6 Fix Heading Order
**Problem**: An `<h5>` appears in a context where heading levels are skipped, failing sequential heading order (WCAG 1.3.1).
**Selector**: `<h5 class="mb-2.5 font-bold text-neutral-800">`
**Fix**: Change to the correct level in the document outline (likely `<h3>` or `<h4>`), or restructure the section so heading levels are sequential.
**Impact**: Accessibility score improvement; correct heading semantics aid screen reader navigation.

### 3a.7 Fix Accessible Name Mismatch on CTA Link
**Problem**: A contact `<a>` has `aria-label="Contact Wallcoverings By Don Dye for a free estimate…"` but the visible link text differs — fails WCAG 2.5.3 Label in Name.
**File**: `app/(site)/page.tsx` or CTA component
**Fix**: Either (a) remove the `aria-label` if visible text is already descriptive enough, or (b) ensure the `aria-label` starts with the exact visible text string. Option (a) is usually simpler and less error-prone.
**Impact**: Accessibility score improvement; prevents confusing screen reader users.

### 3a.8 Fix "Read More" Non-Descriptive Link Text
**Problem**: Lighthouse SEO audit flags `<a href="/about">Read More</a>` as non-descriptive (score impact on SEO, currently 92/100).
**Fix**: Change to "Learn more about Don Dye" or "About Wallcoverings By Don Dye" — text that describes the link destination without surrounding context.
**Impact**: SEO score improvement (potentially 92 → 100); accessibility improvement.

### 3a.9 Increase Touch Target Sizes
**Problem**: Multiple interactive elements fail the 44 × 44 px minimum touch target size (WCAG 2.5.5).
**Fix**: Audit nav links, CTA buttons, and carousel controls on mobile viewport. Add padding to small interactive elements to reach the 44 px minimum. Tailwind utility: `min-h-[44px] min-w-[44px]` or equivalent padding.
**Impact**: Accessibility score improvement; mobile usability improvement.

---

## Phase 3b — Performance Follow-up

*Source: Lighthouse audit run 2026-05-03 on localhost — Performance 75/100 (up from 55/100 after Phase 3a).*
*These audits were run on the Next.js **development server**. Run `npm run build && npm start` for an accurate production baseline — minification and tree-shaking in the prod build will change several numbers.*

### 3b.1 Establish Production Build Baseline
**Action**: Run `npm run build && npm start`, then re-run Lighthouse on `http://localhost:3000/`.
**Why**: The dev server disables minification, ships inline source maps, and includes React DevTools overhead. Several current audit findings are dev artifacts: "Minify JavaScript" (5 KB savings on webpack.js), "Minify CSS" (3 KB), and "Missing source maps for large JS files" are all irrelevant in production.
**Impact**: Accurate baseline before investing effort in the tasks below; expected TBT improvement from minification alone is 200–400 ms.

### 3b.2 Replace Flowbite Carousel with Lightweight Alternative
**File**: `app/(site)/Components/Gallery.tsx`
**Problem**: `page.js` is 1.7 MB and produces a 1,092 ms long task — the single largest TBT contributor. The Flowbite Carousel accounts for the bulk of this weight. Wrapping it in `dynamic(() => import(...), { ssr: false })` split it into its own chunk, but the chunk still loads eagerly on hydration, so the long task remains.
**Fix**: Replace Flowbite Carousel with `embla-carousel-react` (< 10 KB gzipped) or a hand-rolled CSS `scroll-snap` carousel with no JS library at all.
- Remove `flowbite-react` from `package.json` if it is no longer used anywhere after this change
- The `dynamic()` wrapper in `page.tsx` can be simplified back to a direct import once Flowbite is gone
**Impact**: Expected to cut the page.js long task from 1,092 ms to < 100 ms; primary fix for TBT → < 200 ms and TTI → < 5 s.

### 3b.3 Purge Unused CSS from layout.css
**Problem**: `layout.css` is 17 KB total, 91% unused (15.8 KB) on the home page. It is render-blocking, adding ~300 ms to FCP.
**Fix**:
1. Verify `tailwind.config.js` `content` glob covers all route files: `app/**/*.{ts,tsx}`, `sanity/**/*.{ts,tsx}`, `types/**/*.ts`
2. Check for leftover Flowbite CSS imported globally in `layout.tsx` or `globals.css` — remove after task 3b.2
3. Re-measure `layout.css` size after Flowbite removal
**Impact**: Removes render-blocking penalty (~300 ms FCP savings); reduces total CSS payload by ~15 KB.

### 3b.4 Replace Nav Header CSS Background Image — ❌ WILL NOT DO (inverted by 3d.11)

> **Do not action.** Phase 3d.11 went the opposite way: `PageHero` now uses the *same* `bg-site-bg-image`
> CSS background as the nav, because the source is a repeating 200×200 tile and `<Image fill>` +
> `object-cover` scales a single tile instead of tiling it. The tile is 14 KB and shared across every
> route, so the 47 KiB gap below no longer exists. Original text kept for context only.

**File**: `app/(site)/Components/Nav.tsx` (or `tailwind.config.js` `bg-site-bg-image` class)
**Problem**: `header.sticky` uses `bg-site-bg-image`, a Tailwind custom utility pointing to `green-wallpaper-bg.webp` as a CSS `background-image`. Lighthouse still reports 47 KiB of image delivery savings across three elements — the nav header background is one of them. CSS backgrounds bypass Next.js image optimization (no WebP/AVIF negotiation, no responsive sizes).
**Fix**: Convert to an absolutely-positioned `<Image fill sizes="100vw">` inside the header, similar to the hero image fix in 3a.1. Remove the `bg-site-bg-image` Tailwind class and the corresponding config entry.
**Impact**: Closes the remaining 47 KiB image delivery gap; consistent format negotiation via Next.js optimizer.

### 3b.5 Update Browserslist Targets
**Problem**: `@babel/plugin-transform-classes` in `main-app.js` adds 9 KB of legacy polyfills targeting old browsers that represent a negligible share of modern traffic.
**Fix**: Add to `package.json`:
```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions",
  "last 2 Edge versions"
]
```
Or, if using SWC instead of Babel, set in `next.config.js`:
```js
experimental: { browsersListForSwc: true }
```
**Impact**: Removes unnecessary transforms; small zero-effort payload reduction (~9 KB savings).

### 3b.6 Fix Remaining Touch Target Spacing
**File**: `app/(site)/page.tsx`
**Problem**: `<a href="/gallery">` and `<a href="/about">` are still flagged in the touch-target audit after Phase 3a.9. Both elements have adequate height (48 px) but Lighthouse requires a minimum 12 px gap between adjacent targets when targets are less than 44 px wide. The two CTA links sit too close together.
**Fix**: Add `mb-3` or `gap-3` between the adjacent CTA links in the home page action row.
**Impact**: Closes the remaining touch-target accessibility violation; mobile usability improvement.

---

## Phase 3c — Gallery Page Performance

*Source: Lighthouse audit run 2026-05-03 on `http://localhost:3000/gallery` — Performance 74/100.*
*Core Web Vitals: LCP 10.8 s (failing), TTI 11.2 s (failing), TBT 0 ms (passing), FCP 1.7 s (passing).*

### 3c.1 Add `priority` to First Gallery Grid Image
**File**: `app/(site)/[slug]/Gallery.tsx`
**Problem**: The LCP element is the first `<Image>` rendered in the projects map (selector: `div.max-w-3xl > div.min-h-screen > a > img.object-cover`). It has `loading="lazy"` (default when `priority` is absent), which defers the browser's discovery and fetch of the image until layout is complete — causing LCP of 10.8 s. Lighthouse confirms `priorityHinted: false`.
**Fix**: Change the `.map()` to `.map((project, index) =>` and add `priority={index === 0}` to the `<Image>` for the first item. Next.js will then emit `fetchpriority="high"` and remove `loading="lazy"` for that element.
**Impact**: Expected LCP drop from 10.8 s to < 2.5 s — the single biggest win on this page.

### 3c.2 Add `sizes` Prop to All Gallery Grid Images
**File**: `app/(site)/[slug]/Gallery.tsx`
**Problem**: Every `<Image>` uses `width={1750} height={1500}` with no `sizes` prop. Without `sizes`, Next.js Image defaults to requesting the `w=3840` viewport-width variant for every image. The gallery grid displays images at ~348 px wide on mobile, ~500 px on tablet, ~400 px on desktop — so `w=3840` wastes between 5× and 11× the necessary bytes per image. Lighthouse reports **2,647 KiB of wasted image bytes** across ~12 gallery images (individual images range from 83 KB–480 KB wasted each).
**Fix**: Add `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"` to every `<Image>` in the gallery grid (grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). This tells Next.js the actual rendered width at each breakpoint so it can serve appropriately-sized variants.
**Impact**: ~2,647 KiB payload reduction; TTI improvement; the single largest byte savings available on this route.

### 3c.3 Fix Render-Blocking Flowbite CSS on Gallery Route
**Problem**: `_next/static/css/39836f2bd97f14ff.css` (14 KB, 92% unused) is render-blocking on `/gallery` for 611 ms. This is the leftover Flowbite global CSS import identified in task 3b.3.
**Fix**: Completing tasks 3b.2 (remove Flowbite Carousel) and 3b.3 (purge the global CSS import) will eliminate this file. Verify after 3b.2/3b.3 that the CSS file no longer appears in the network waterfall for `/gallery`.
**Impact**: Removes ~300 ms render-blocking penalty on FCP for the gallery route.

### 3c.4 Fix Heading Order on Gallery Page
**Problem**: Lighthouse flags a heading-order violation on `/gallery` at `div.container > div.grid > div.mb-6 > h3.mb-2.5` (footer). The gallery content area renders no `<h1>` or `<h2>` visible to the accessibility tree before the footer's `<h3>` elements appear. The `<Header>` component for the gallery page may not render an `<h1>`.
**Fix**: Verify that `app/(site)/[slug]/Components/Header.tsx` renders an `<h1>` for the gallery page title. If it does, investigate whether the gallery grid content needs an `<h2>` subheading before the footer `<h3>` elements. Ensure heading levels are sequential: `h1` → `h2` → `h3`.
**Impact**: Accessibility score improvement; consistent heading semantics across all routes.

---

## Phase 4 — Off-Page & Authority (Ongoing)

### 4.1 Google Business Profile Optimization
This is the highest-leverage local SEO action and costs nothing. Ensure:
- All business info matches the website exactly (NAP consistency: Name, Address, Phone)
- Phone number matches the schema: `(832)788-3667`
- Business category: "Wallpaper installer" (primary) + "Interior decorator" (secondary)
- 10+ high-quality photos of completed projects uploaded
- Business description uses local keywords naturally
- Hours match the schema: Monday–Friday 8am–5pm
- Products/Services section lists all service types
- Q&A section seeded with common questions

### 4.2 NAP Consistency Audit
Ensure the business name, address, and phone are identical across:
- Website (all pages and schema)
- Google Business Profile
- Yelp, Houzz, Angi (formerly Angie's List), HomeAdvisor, Thumbtack
- Facebook Business Page
- Wallcovering Installers Association directory
- BBB (if listed)
- Any local Austin business directories

Inconsistent NAP is a common local ranking suppressor.

### 4.3 Backlink Acquisition
Priority link targets for a wallpaper installer:
- Interior design blogs in Austin (offer a "projects" feature or expert quote)
- Austin home improvement publications and local lifestyle magazines
- Real estate agent referral pages (high-value backlink + referral traffic)
- Austin-area home stagers (complementary service, natural partnership)
- Wallcovering Installers Association member page (verify the link exists and is dofollow)
- Houzz professional profile (strong domain authority, relevant)

---

## Phase 5 — Measurement & Iteration

### 5.1 Google Search Console
- Verify sitemap is submitted and indexed
- Monitor Coverage report for crawl errors
- Track Performance report for query impressions and clicks
- Check Core Web Vitals report for LCP/CLS/INP issues

### 5.2 Core Web Vitals Targets
Using Vercel Analytics + Google PageSpeed Insights:
- **LCP**: < 2.5s (primary fix: hero background image preload + next/image on carousel)
- **CLS**: < 0.1 (ensure images have explicit dimensions, no font FOUT)
- **INP**: < 200ms (minimize client component size, defer non-critical JS)

### 5.3 Rank Tracking
Monitor monthly rankings for:
- `wallpaper installation Austin TX`
- `wallpaper installer Austin`
- `professional wallpaper installation Austin`
- `wallpaper removal Austin TX`
- `wallcovering installation Austin`
- `wallpaper installer [surrounding city] TX`

---

## Implementation Priority Summary

| Priority | Task | Effort | Expected Impact |
|----------|------|--------|-----------------|
| P0 | ~~Fix hero background image loading (1.4)~~ | ~~Low~~ | ~~LCP improvement~~ |
| P0 | ~~Convert hero to `<Image priority>` (3a.1)~~ | ~~Low~~ | ~~LCP 5.0 s → < 2.5 s~~ |
| P0 | ~~Code-split layout.js bundle (3a.2)~~ | ~~High~~ | ~~TBT 1,760 ms → < 200 ms; TTI 30.7 s → < 5 s~~ |
| P0 | ~~Fix home gallery `<img>` → `<Image>` (1.1)~~ | ~~Low~~ | ~~LCP + CWV~~ |
| P0 | ~~Fix logo alt texts (1.2)~~ | ~~Trivial~~ | ~~Image search~~ |
| P0 | ~~Layout & visual system redesign (Phase 3d)~~ | ~~High~~ | ~~Homepage page JS 1.7 MB → 188 B and now `○ Static`; hero image 186 KB → 14 KB~~ |
| P0 | Re-run Lighthouse on a prod build, all 4 routes (3d.10) | Low | Phase 3b/3c numbers are stale after the redesign |
| P0 | Run production build baseline (3b.1) | Trivial | Accurate audit; dev overhead gone |
| P0 | Replace Flowbite Carousel (3b.2) | Medium | page.js 1,092 ms long task → < 100 ms; TBT → < 200 ms; TTI → < 5 s |
| P0 | Add `sizes` to gallery grid images (3c.2) | Low | 2,647 KiB payload reduction on /gallery; TTI improvement |
| P0 | Add `priority` to first gallery image (3c.1) | Trivial | Gallery LCP 10.8 s → < 2.5 s |
| P1 | Right-size `green-wallpaper-bg.webp` (3a.3) | Low | ~42 KiB savings (home-bg done via next/image) |
| P1 | Purge unused CSS from layout.css (3b.3) | Low | Removes 300 ms render-blocking on home + 611 ms on /gallery; ~15 KB savings |
| P1 | Fix render-blocking CSS on gallery (3c.3) | Low | Blocked by 3b.2+3b.3; verify after Flowbite removal |
| P1 | Fix heading order on gallery page (3c.4) | Low | Accessibility; consistent across all routes |
| ❌ | ~~Replace nav header CSS background (3b.4)~~ | — | Will not do — inverted by 3d.11; tile must stay a CSS background |
| P1 | Update browserslist targets (3b.5) | Trivial | 9 KB legacy JS savings |
| P1 | Fix touch target spacing (3b.6) | Trivial | Closes remaining accessibility violation |
| P1 | ~~Fix "Read More" link text (3a.8)~~ | ~~Trivial~~ | ~~SEO 92 → 100~~ |
| P1 | ~~Fix ARIA role="list" (3a.4)~~ | ~~Low~~ | ~~Accessibility~~ |
| P1 | ~~Fix color contrast gray-400 (3a.5)~~ | ~~Trivial~~ | ~~Accessibility~~ |
| P1 | ~~Fix heading order (3a.6)~~ | ~~Low~~ | ~~Accessibility~~ |
| P1 | ~~Fix label/name mismatch (3a.7)~~ | ~~Low~~ | ~~Accessibility~~ |
| P1 | ~~Fix touch target sizes (3a.9)~~ | ~~Low~~ | ~~Mobile usability~~ |
| P1 | ~~Add SEO fields to Sanity schemas (2.1)~~ | ~~Medium~~ | ~~Scalable metadata~~ |
| P1 | ~~Add review structured data (2.2)~~ | ~~Medium~~ | ~~SERP star ratings~~ |
| P1 | ~~Enrich LocalBusiness schema `sameAs` (2.5)~~ | ~~Low~~ | ~~Knowledge Panel~~ |
| P1 | ~~Add FAQ structured data (2.3)~~ | ~~Medium~~ | ~~PAA rich results~~ |
| P2 | ~~Migrate Montserrat font to `@next/font` (1.3)~~ | ~~Low~~ | ~~LCP~~ |
| P2 | Individual project pages (3.1) | High | Long-tail image search |
| P2 | Blog section (3.3) | High | Top-of-funnel traffic |
| P3 | City landing pages (3.2) | High | Geographic expansion |
| P3 | Reviews page (3.4) | Medium | Conversion + ranking |
| Ongoing | Google Business Profile optimization (4.1) | Low | Local pack ranking |
| Ongoing | NAP consistency audit (4.2) | Low | Local ranking factor |
| Ongoing | Backlink acquisition (4.3) | High | Domain authority |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/(site)/layout.tsx` | Root metadata, structured data, `bg-cream` body, font variables |
| `app/(site)/fonts.ts` | Single place all three fonts are instantiated |
| `app/(site)/Components/PageHero.tsx` | Shared bounded hero band (`size="lg"` / `"sm"`) — carries the `<h1>`; tiled `bg-site-bg-image` + cream scrim |
| `app/(site)/Components/Section.tsx` | Shared vertical rhythm + width + `tint` band |
| `app/(site)/page.tsx` | Home page — PageHero → Recent Work grid → About |
| `app/(site)/[slug]/page.tsx` | Dynamic pages — `generateMetadata()` lives here |
| `app/(site)/Components/StructuredData.tsx` | JSON-LD schemas (LocalBusiness, Service) |
| `app/(site)/Components/Gallery.tsx` | Homepage "Recent Work" static grid — server component, no carousel |
| `app/(site)/[slug]/Gallery.tsx` | Gallery page grid — `priority` on index 0, `sizes` on all images |
| `app/(site)/Components/Nav.tsx` | Custom Tailwind nav — no Flowbite; hamburger via useState; `bg-site-bg-image` tile (shared with PageHero); not sticky |
| `app/(site)/Components/Footer.tsx` | Footer with WIA badge, `bg-cream-deep`; section headings are `<h3>`; copyright bar currently commented out |
| `tailwind.config.js` | `colors.cream` / `cream.deep` palette + `bg-site-bg-image` tile — the shared design tokens |
| `app/sitemap.ts` | Dynamic sitemap generation |
| `app/robots.ts` | Crawler directives |
| `sanity/schemas/page-schema.ts` | CMS page type — has SEO fields |
| `sanity/schemas/project-schema.ts` | CMS project type — SEO fields + `featured` / `featuredOrder` for the homepage grid |
| `sanity/sanity-utils.ts` | GROQ queries — `getFeaturedProjects()` drives the homepage grid |
