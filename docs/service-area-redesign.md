# Service Area Pages

> Companion to `CLAUDE.md`. Follows the same conventions: check boxes as work lands, append a dated note describing what changed.

---

## ⚠️ Phase 7 — Consolidation (2026-08-17) — READ THIS FIRST

**Everything in Phase 6 below is historical. Do not action any unchecked box in it, and do not use its
copy guidance.** The 13 per-city landing pages it built no longer exist.

### What changed

Phase 6's central content strategy — §6.0, "anchor each city's paragraph in a real local condition" — was
rejected on review. The paragraphs it produced characterised each town's building stock and construction
era in a voice of assumed authority that Don does not have and would not claim:

- Austin — *"was built before drywall, which means you are hanging paper on plaster… Don has worked these walls for decades and can tell you which ones need repair first"*
- Round Rock — *"Most of Round Rock went up between the mid-1990s and the mid-2000s"*
- Manor — *"Manor and Hutto are almost entirely new construction"*
- Lakeway — *"Lakeway and Bee Cave houses are built tall"*

Riding along with it was a second problem the phase never flagged: repeated digs at other installers
(*"the step quietly dropped from cheaper bids"*, *"most competing bids quietly omit it"*, and the same
line in `ProcessSteps.tsx`). Both are gone.

Removing the invented expertise left 13 pages with nothing to distinguish them — which is the doorway-page
pattern §6.0 existed to avoid — so they were consolidated rather than rewritten.

### As shipped

| File | Change |
|------|--------|
| `app/(site)/service-area/[city]/page.tsx` | **Deleted.** All 13 routes gone. |
| `next.config.js` | `/service-area/:city` → `/service-area`, `permanent: true` (308 in dev, 301 in prod). One segment deep, so the hub is untouched. |
| `app/(site)/service-area/cities.ts` | Reduced from a `CityData` record (intro, headline, metaDescription, neighborhoods, nearby, faqs) to `serviceAreas: string[]` — 15 town names, nothing else. |
| `app/(site)/service-area/page.tsx` | The one surviving page. Two-column layout (copy + CTAs left, one 4:3 photo right) replacing the full-width 16:9 hero band. Plain copy, town list, `ProcessSteps`. Added the `twitter` metadata block it never had. |
| `app/(site)/Components/ProcessSteps.tsx` | Competitor comparisons removed from steps 2 and 4. |
| `app/(site)/Components/Footer.tsx` | Town names are now plain text, not 13 links to one URL. Heading still links to the hub. |
| `app/sitemap.ts` | 14 service-area routes → 1. Redirecting URLs must not reappear here. |
| `sanity/sanity-utils.ts` | `getProjectsForCity(cityIndex, count)` → `getGalleryProjects(count)`; the per-city rotation went with the pages. |

### Standing rules that survive Phase 6

These were right and still bind:

1. **No invented local detail.** Extended: no characterising a town's construction era, wall material, or
   building stock. Don's authority is the work, not local architectural history.
2. **No claim that a photo was taken anywhere.** The gallery carries no location data. Headings, captions,
   alt text, and structured data must all stay on the right side of this.
3. **No comparisons to other installers.** Describe the work; do not assert what competitors omit.
4. **No invented numbers** — pricing, lead times, response times, review counts.

### Still open

- **6.10 photo capture habit** (below) is now the *only* thing that would justify per-town pages again.
  Real photos of real jobs with the city logged is honest local content; nothing else here was.
- **Phase 4.1 / 4.2 in `CLAUDE.md`** — Google Business Profile and NAP consistency, both untouched. For a
  solo trade business these outrank city landing pages by a wide margin and are where the effort belongs.
- ~~`app/(site)/Components/FAQList.tsx` is now unused~~ — **resolved 2026-08-17 (CLAUDE.md 7.5).**
  `FAQList.tsx` and `FAQSchema.tsx` were merged into `Components/FAQ.tsx`, which owns the `homeFaqs`
  array and renders both the visible list and the JSON-LD from it. Now rendered on the home page, which
  also fixes the older problem of `FAQPage` markup with no visible answers.

  **Note for §6.5 below:** its "eligible for FAQ rich results per city" impact claim is **stale**. Google
  restricted FAQ rich results to authoritative government and health sites in August 2023. The markup is
  still worth keeping; the SERP dropdowns it was chasing are not available to this site.
- `[slug]/ContactForm.tsx` still reads `?city=` (6.4a). Nothing links with that param any more. Harmless
  and defensive, so it was left; delete it if the prefill is never wired up again.

---

## Phase 6 — Service Area Page Redesign (historical)

> **Superseded by Phase 7 above.** Retained as the record of what was built and why, and — for §6.0 in
> particular — as a record of an approach that was tried and rejected. Do not action from here.
>
> **Original scope**: `app/(site)/service-area/[city]/page.tsx` and its static `cities` config. Task 3.2 shipped these pages and they were rank-eligible but did not convert — they read as templated SEO filler. This phase aimed to fix engagement without losing the local-SEO value.

---

## Status at a glance (historical — superseded by Phase 7)

> The table below described the state on the morning of 2026-08-17, before consolidation. Every task in it
> targeted `[city]/page.tsx`, which no longer exists. The "Open questions for Don" section it points to is
> also moot for this phase — questions 1, 2, and 4 were answered by deleting the pages.

Sequencing items **1–13 have shipped** — every code task in this phase is done. Read the Implementation
logs under [Sequencing](#sequencing) for the full record; this is the short version.

| | |
|---|---|
| **Done** | 6.B1 · 6.0 (10 of 13) · 6.1 · 6.2 · 6.3 · 6.4 · 6.4a · 6.5 (shared set) · 6.8 · 6.B2 · 6.B3 · 6.B4 |
| **Blocked on Don** | 6.0 for Pflugerville / San Marcos / Dripping Springs · 6.6 testimonials · 6.7 pricing · the per-city FAQ questions · the CTA response-time line |
| **Not a code task** | 6.10 photo capture habit |
| **Deferred** | 6.11 reusable contact form |

**The critical path is now [Open questions for Don](#open-questions-for-don), and only that.** There is no
remaining unblocked code work in this phase — everything left is waiting on a fact only Don has. The
deliberate rule throughout: *no invented local detail, no invented numbers, no invented quotes* — a
question is left unanswered rather than answered vaguely.

---

## Diagnosis

Reviewed `/service-area/austin`, `/service-area/pflugerville`, `/service-area/lakeway` (2026-08-16).

> **Historical snapshot — do not action from this list.** It records the state *before* the 2026-08-16
> pass. Status appended to each item; work from the checkboxes below instead.

Page structure was: headline → hero image → two prose paragraphs → keyword list → phone number → link chips. Problems, in order of severity:

1. **Zero proof on the page.** No project photos, no before/after, no reviews, no pricing signal. A visitor arriving from "wallpaper installer Pflugerville" wants to see finished walls. They get three paragraphs about surface prep. — *Partly fixed: a hero photo and a three-thumbnail work strip landed (6.1/6.2). Reviews (6.6) and pricing (6.7) are still absent.*
2. **Identical hero image on all 13 pages.** `/home-bg.jpg` is hardcoded in the page component. It is the first thing above the fold and the clearest signal that the page is a template. — *Premise was already stale when written; see the note under 6.1. Fixed — 13 distinct heroes.*
3. **Generic copy with a city name substituted in.** "Decades of experience," "proper surface prep," "we work with grasscloth, vinyl, fabric-backed." Every competitor page says this. Nothing on the Lakeway page could only have been written by someone who actually works in Lakeway. This is also the exact profile Google's helpful-content systems target. — *Fixed for 10 of 13 cities (6.0).*
4. **The CTA sends people away.** "Use the contact form" links to `/contact`, where the visitor loses context and re-enters it manually. Measurable drop-off point. — *Fixed: dual tap-to-call / estimate buttons, and `?city=` now carries the context across (6.4/6.4a).*
5. **Visible SEO plumbing.** The "Other service areas" chip list is 12 links rendered directly above a footer that repeats the same 13 links verbatim. — *Not fixed. Still 12 chips; this is 6.8.*
6. **Thin body content.** ~150 words of prose per page across 13 near-identical pages. — *Fixed: prose is now one ~80-word paragraph, but the page carries roughly 700 words total across the process steps and five FAQ answers, plus four linked photos.*

---

## Content direction

### 6.0 Cut to a single paragraph — but add structure ❌ REJECTED

> **This section is the reason Phase 7 happened. Do not write copy from it.** The five "local conditions"
> below read as confident local-architecture expertise, which is not Don's voice and not a claim he makes.
> The paragraphs it produced were deleted on 2026-08-17 along with the pages that carried them. The
> instruction *"confirm each city's specifics with Don before publishing"* at the end of this section was
> the right instinct and was never carried out — ten of thirteen shipped as the plan author's
> characterisation. Kept as a record of a rejected approach.

The two prose paragraphs collapse into **one paragraph, 60–90 words**, doing exactly one job: saying something about wallcovering work in *this specific city* that only a local installer would know.

Total page substance should go **up**, not down. The word count moves out of prose and into content people actually read: FAQ answers, project captions, a testimonial. The page ends up longer overall while reading shorter, because nothing on it is a wall of text.

**Do not** write the paragraph as "we serve [city] and its surrounding neighborhoods." Write it as a local condition and how it's handled. Working examples:

- **Austin (Hyde Park, Clarksville, Travis Heights)** — pre-war homes with plaster walls rather than drywall. Different prep, different adhesive, and removal on plaster goes badly without the right approach.
- **Kyle / Buda / Manor** — near-universal builder-grade orange-peel texture on new construction. Skim coating is mandatory before paper, and most competing bids quietly omit it.
- **Lakeway / Westlake Hills / Bee Cave** — two-story entries and vaulted great rooms requiring scaffolding, plus designer-specified material expensive enough that a single bad seam is a real cost.
- **Georgetown** — split inventory between preserved historic interiors near the Square and new builds in Wolf Ranch / Sun City, requiring two entirely different prep approaches.
- **Round Rock / Cedar Park / Leander** — high volume of 1990s–2000s builds where existing wallpaper is being removed rather than added; drywall repair after removal is the bulk of the job.

This copy is genuinely non-duplicable, reads as expertise, and survives helpful-content filtering in a way the current text does not. Confirm each city's specifics with Don before publishing — invented local detail is worse than generic copy.

- [x] **6.0** Rewrite `intro` for all 13 cities as a single 60–90 word paragraph anchored in a real local condition. Delete the `body` field from `CityData` and the config. *(2026-08-16 — `body` deleted from `CityData` and from all 13 entries. **10 of 13 rewritten** against the five local conditions documented above: austin (plaster); round-rock, cedar-park, leander (1990s–2000s removal + drywall repair); georgetown (split stock); kyle, buda, manor (orange-peel / skim coat); lakeway, westlake-hills (height, scaffolding, designer material). Wording differs city to city so the shared condition doesn't read as duplicate content.*
  *__Still needs Don:__ `pflugerville`, `san-marcos`, `dripping-springs` have no confirmed local condition. Their `intro` is the previous copy condensed to one paragraph — **nothing new is claimed** — and each carries a `TODO(6.0)` comment in the config. Dripping Springs is the least generic of the three, since the vaulted-ceiling / stone / out-of-square detail was already published.)*

---

## Page structure changes

### 6.1 Per-city hero image

**File**: `app/(site)/service-area/[city]/page.tsx`
**Problem**: `src="/home-bg.jpg"` is hardcoded for every city.
**Fix**: Add a `heroImage` field to `CityData`, assigning a different gallery photo to each of the 13 cities. These are not city-specific photos and must not be presented as such — see 6.B4 for alt text. Assignment can be manual (pick the best 13 shots) or derived from the city slug; manual is better since the hero is the first impression. Keep `priority` and the existing `sizes` hint.
**Impact**: Removes the strongest template signal; improves per-page uniqueness for both users and crawlers.

> **Premise was stale (2026-08-16).** The diagnosis above described `src="/home-bg.jpg"` hardcoded in the
> page. That code no longer existed: Phase 3d.11 removed hero images sitewide and replaced them with the
> tiled `bg-site-bg-image` band, so the city pages were rendering **no image at all** above the fold. The
> underlying complaint — nothing visually distinguishes one city page from another — was still valid, so
> 6.1 was implemented as *adding* a hero rather than *replacing* one.

- [x] **6.1** Add `heroImage` to `CityData`; replace hardcoded `/home-bg.jpg`. *(2026-08-16 — implemented **without** a `heroImage` field. A static field would mean pasting 13 Sanity CDN URLs into the config, which breaks whenever a project's asset is replaced. Instead the hero is drawn from the same query that feeds the 6.2 strip: `getProjectsForCity(cityIndex, 4)` returns 4 projects, index 0 becomes the hero (`<Image fill priority sizes="(min-width: 1024px) 1024px, 100vw">`, 16/9, below the `<h1>` band) and 1–3 fill the strip. Verified all 13 heroes are distinct — see the rotation note under 6.2.)*

### 6.2 Recent work strip

**Problem**: Task 3.1 built `/gallery/[slug]` project pages with descriptions and tags. Service area pages don't link to any of them.

**Constraint (2026-08-16)**: There is no per-city photo inventory. All available photos live in the existing gallery and are not attributable to specific cities. The strip therefore **must not** make a geographic claim.

**Fix**:
1. Query 3–4 projects from the existing gallery in `sanity-utils.ts`. ~~Rotate the offset by city slug~~ **rotate by city index — a slug hash collides, see the note under the checkbox** so different cities surface different projects — this keeps pages visually distinct without asserting anything about location. No `project.city` field needed.
2. Heading: **"Recent work"** or **"A look at Don's work"**. Not "Recent work near {city}" and not "Our {city} projects."
3. Alt text describes what is pictured — material, room type, treatment — never a city. `"Grasscloth wallcovering installed in a dining room"`, not `"Wallpaper installation in Pflugerville, TX"`.
4. Link each thumbnail to `/gallery/[slug]`.

**Honesty note**: Showing a portfolio on a service area page is normal and expected. The line is between *"here is our work"* (true) and *"here is our work in Pflugerville"* (not established). Stay on the first side of it in headings, captions, alt text, and any structured data. If a project's location ever *is* known, that project can be labeled specifically — but the default is unlabeled.

**Impact**: Adds proof to the page; creates internal links from city pages into project pages, distributing crawl equity into content that currently has few inbound links. Cheaper than the original plan since it needs no schema change.

- [x] **6.2** Query and render an unlabeled recent-work strip with city-varied offset. *(2026-08-16 — `sanity-utils.ts`: added `getProjectsForCity(cityIndex, count)`. Heading is **"A look at Don's work"** over the subhead **"A few recent wallcovering installations."** — both deliberately free of any geographic claim. Alt text comes from the project's own Sanity `alt`/`name`, so no city name appears anywhere in the strip or the hero. Each thumbnail links to `/gallery/[slug]`.)*

  **Rotation is by city index, not by slug hash.** A hash of the slug was tried first and collided: with 19 projects and 13 cities, three pairs (austin/lakeway, cedar-park/kyle, round-rock/san-marcos) drew the same hero photo. `Object.keys(cities).indexOf(slug)` gives consecutive offsets, so every city gets a different starting photo as long as there are at least as many projects as cities. Verified: 13/13 distinct heroes.

  The GROQ filter is `*[_type == "project" && defined(image.asset)]` — without it, a project published before its photo is uploaded returns an undefined `image` and `next/image` throws on the empty `src`.

### 6.3 "What to expect" process section

*(Replaces the before/after slider from the original draft — no before/after photo pairs exist. See 6.10 for capturing them going forward.)*

**Problem**: Nothing on the page explains what hiring Don actually involves, and the one genuine differentiator already gestured at in the copy — that he does surface prep others skip — is buried in prose.

**Fix**: A four-step horizontal or stacked list, no images required:
1. **Free walk-through and estimate** — Don looks at the actual walls before quoting.
2. **Surface prep** — patching, skim coating, priming. The step most bids leave out and the reason installations fail.
3. **Installation** — precise seam matching, pattern alignment, trim work.
4. **Cleanup** — the site is left finished, not just done.

Keep each step to one sentence. Native markup, no JS.

**Impact**: Adds real depth without photos, makes the prep differentiator visible instead of buried, and answers the "what am I signing up for" question that drives a lot of contractor-page bounces. Lower ceiling than a before/after slider but zero asset dependency.

- [x] **6.3** Build "What to expect" four-step process section. *(2026-08-16 — new `app/(site)/Components/ProcessSteps.tsx`: an `<ol>` of four steps, numbered badge + `<h3>` + one sentence, `sm:grid-cols-2`. No images, no JS, no props — identical on every city page, so it is a plain shared component rather than `CityData` content.*
  *__Not to be confused with `Components/Process.tsx`__, which still exists, is still imported nowhere, still pulls a Sanity `my-process` page, and still contains placeholder copy ("More things get done here"). It was left alone; CLAUDE.md 3d.8 already flags it for deletion.)*

### 6.4 Strengthen the CTA block

**Decision (2026-08-16)**: No inline form on city pages. The rest of the site routes to `/contact`, and breaking that pattern on 13 pages and nowhere else would read as inconsistent. Revisit once the form exists as a reusable component and can be adopted sitewide — see 6.11.

**Problem**: The CTA is currently a sentence with a `tel:` link embedded mid-paragraph, followed by a button labeled "Contact Us." Neither action is visually primary, and "Contact Us" says nothing about what happens next.

**Fix**:
1. Two parallel, equally weighted actions rather than one sentence and one generic button:
   - **Call Don — (832) 788-3667** as a real `tel:` button, not inline text. Phone conversion is high for this trade and it should look tappable.
   - **Request a free {city} estimate** linking to `/contact`. Label states the outcome; "Contact Us" doesn't.
2. Pass the city through: `/contact?city={slug}`. Read it on the contact page to pre-fill or default the location field. Cheap now, and it gives per-city lead attribution immediately — which is the data needed to answer the consolidation question at the bottom of this file.
3. One line of reassurance microcopy under the buttons: free, no obligation, and the actual typical response time.
4. `min-h-[44px]` on both, consistent with 3a.9.

**Impact**: Makes the conversion path unmissable without breaking the site's navigation pattern. The query param also turns "which cities actually produce leads" from guesswork into a number.

- [x] **6.4** Rebuild CTA block: dual tap-to-call / estimate buttons, `?city=` param, reassurance line. *(2026-08-16 — two `flex-1` buttons in a `flex-col sm:flex-row`, both carrying the primary green-900 CTA string from CLAUDE.md 3d.8 and both `min-h-[44px]`: **"Call Don — (832) 788-3667"** (`tel:`) and **"Request a free {city} estimate"** (`/contact?city={slug}`). Equal weight is intentional — both are conversion actions, so neither gets the amber navigational tier.*
  *__Reassurance line is short one fact.__ It reads "Estimates are free and carry no obligation. Don looks at the actual walls before quoting." The doc asked for the **actual typical response time** as well; that number is not established anywhere on the site and was not invented. Add it once Don gives it — see open question 5.)*
- [x] **6.4a** Read `?city=` on `/contact` and pre-fill the location field. *(2026-08-16 — `[slug]/ContactForm.tsx`: `useEffect` reads `window.location.search` and `setValue("cty", …)` with the slug title-cased (`westlake-hills` → `Westlake Hills`; all 13 slugs round-trip correctly).*
  *__Read from `window`, not `useSearchParams()`__ — in Next 13.4 that hook opts the whole route segment out of static rendering unless it is wrapped in a Suspense boundary, and this is only a convenience prefill. The value is validated against `/^[a-z]+(-[a-z]+)*$/i` and capped at 20 chars before use, because it ends up in the notification email and the field's own `maxLength` is 20.)*

### 6.5 Per-city FAQ + `FAQPage` JSON-LD

**Problem**: No FAQ on city pages. `FAQSchema.tsx` (task 2.3) exists but only renders on the home page.
**Fix**: Add a `faqs` field to `CityData`, 3–4 entries per city. Render as an accessible disclosure list (native `<details>`/`<summary>` is fine and costs no JS). Reuse or generalize `FAQSchema.tsx` to accept an FAQ array as a prop and emit `FAQPage` JSON-LD per city.

> **As built (2026-08-16)**: the field is `faqs?: Faq[]`, and `Faq` is `{ question: string; answer: string }`
> exported from `Components/FAQSchema.tsx` — **not** the `{ q, a }` shape sketched above. Entries added
> here are *appended* to the five shared questions in `faqsForCity()`, they do not replace them.

Good city-scoped questions:
- Do you charge extra for travel to {city}? — *not shipped, needs Don*
- How far out are you currently booking? — *not shipped, needs Don (open question 5)*
- Do you work directly with interior designers? — *not shipped as a question; the materials answer mentions designer-supplied material, which is the only form of this claim already published*
- Can you remove existing wallpaper and repair the wall underneath? — ✅ *shipped, in the shared set*
- Roughly what does an accent wall cost? — *not shipped, needs Don (open question 4)*

**Impact**: Restores page depth lost by cutting the second paragraph, with content people actually read. Eligible for FAQ rich results per city.

- [x] **6.5** Add `faqs` to `CityData`; generalize `FAQSchema.tsx`; render FAQ section on city pages. *(2026-08-16 — `FAQSchema.tsx` now exports a `Faq` type and takes an optional `faqs` prop, defaulting to the home-page set, so `<FAQSchema />` on the home page is unchanged. New `Components/FAQList.tsx` renders the visible disclosure list with native `<details>`/`<summary>` — no JS, keyboard and screen-reader accessible, `min-h-[44px]` summaries. Both are driven by one `faqsForCity(city)` call so the markup and the JSON-LD cannot drift; Google only rewards `FAQPage` when the answers are visible on the page.)*

  **Five shared questions, not per-city ones.** Every answer restates a claim already published elsewhere on this site (`Components/FAQSchema.tsx`, the service copy): service area, removal + wall repair, how long a room takes, materials handled, free estimates. The city name and neighborhood list are threaded through where that is factual.

  The genuinely city-scoped questions the plan suggested — **travel charge to {city}**, **current booking lead time**, **roughly what an accent wall costs** — are deliberately **absent rather than answered vaguely**, because the answers are facts only Don has. `CityData.faqs?: Faq[]` exists and is appended to the shared set, so those drop in per city with no further code change. See open questions 4 and 5.

### 6.6 Local testimonial

**Problem**: No social proof anywhere on the page.
**Fix**: One testimonial per city, attributed with a first name and neighborhood ("Sarah M., Rough Hollow"). Add a `testimonial` field to `CityData` as a stopgap; migrate to the `testimonial` Sanity schema when task 3.4 lands. Do **not** add `Review` JSON-LD until real, verifiable reviews exist — the 2.2 note about manual-penalty risk applies here too.

- [ ] **6.6** Add per-city testimonial (visible only, no `Review` markup yet).

### 6.7 Pricing signal

**Problem**: No pricing information anywhere on the site. This is the most common reason visitors leave a contractor page without converting.
**Fix**: Add a short "What projects typically run" block — a range for a powder-room accent wall, a full room, and removal. Even a wide range outperforms silence. `priceRange: '$$'` already exists in the `LocalBusiness` schema; this makes it visible to humans.
**Requires**: numbers from Don.

- [ ] **6.7** Add visible pricing-range block.

### 6.8 Demote the cross-link chips

**Problem**: 12 visible link chips duplicating the footer's 13 links, directly above that footer.
**Fix**: Either (a) reduce to the 3–4 geographically nearest cities with a "See all service areas" link, or (b) remove entirely and rely on the footer. Option (a) is preferable — proximity links are more useful to users and read as navigation rather than plumbing.

- [x] **6.8** Reduce cross-links to nearest cities or remove. *(2026-08-17 — took option (a). `CityData` gained a `nearby: string[]` field, 3–4 slugs nearest-first, rendered under the heading **"Also serving near {city}"** followed by a **"See all service areas →"** link. In-body service-area links per city page: **12 → 5**. Proximity is plain geography, not a claim about where Don has worked, so it needs no confirmation from Don.)*

  **This required building `/service-area`, which did not exist.** Option (a)'s "See all" link needs a
  destination, and — separately — the `BreadcrumbList` JSON-LD shipped on all 13 city pages had been
  pointing at `${BASE_URL}/service-area` since task 3.2. That URL returned a 404 the whole time, so every
  city page was emitting a breadcrumb whose middle item did not resolve. The new hub fixes both. See
  §6.12.

### 6.9 Proposed final section order

| # | Section | `Section` props | Status |
|---|---------|-----------------|--------|
| 1 | `<h1>` headline | `PageHero size="sm"` | ✅ |
| 2 | Per-city hero image (6.1) | `width="wide"` | ✅ shares one `Section` with #3 |
| 3 | Single paragraph, 60–90 words (6.0) | ↑ same, `mx-auto max-w-3xl` | ✅ |
| 4 | Recent work — 3–4 thumbnails, no geographic label (6.2) | `width="wide" tint` | ✅ |
| 5 | What to expect — four-step process (6.3) | `width="wide"` | ✅ |
| 6 | Testimonial (6.6) | — | ☐ **not built** |
| 7 | Neighborhoods served (existing block, kept) | `width="narrow" tint` | ✅ shares one `Section` with #9 |
| 8 | Pricing ranges (6.7) | — | ☐ **not built** |
| 9 | FAQ (6.5) | ↑ same tinted `Section` | ✅ |
| 10 | Get a free estimate — tap-to-call + estimate button (6.4) | `width="narrow"` | ✅ |
| 11 | Nearest service areas (6.8) | inside #10 | ✅ 4 nearest + "See all" |

**Two deviations, both deliberate:**

- **The hero photo and the paragraph share one `Section`, as do Neighborhoods and the FAQ.** Giving each
  its own would have stacked seven `Section`s at `py-14 md:py-20`, which read as dead air rather than
  rhythm. The tint alternation still lands correctly: cream → deep → cream → deep → cream.
- **#6 and #8 are simply absent**, not stubbed. When 6.6 and 6.7 land, slot the testimonial in after the
  work strip and pricing before the FAQ heading inside the existing tinted `Section`.

---

## Bugs found during review (2026-08-16)

### 6.B1 Duplicated brand suffix in `<title>` — all 13 city pages

**File**: `app/(site)/service-area/[city]/page.tsx`
**Observed**:
```
Professional Wallpaper Installation in Austin, TX | Wallcoverings By Don Dye | Wallcoverings By Don Dye
```
**Cause**: `generateMetadata()` returns `` title: `${city.headline} | Wallcoverings By Don Dye` `` while the root layout's `title.template` appends the brand a second time.
**Fix**: One of —
- `title: { absolute: \`${city.headline} | Wallcoverings By Don Dye\` }`, or
- drop the suffix from the city string and let the template supply it (preferred — keeps one source of truth for the suffix).

Also audit `openGraph.title` and `twitter.title` in the same file; they carry the suffix explicitly and don't go through the template, so removing it from the base string means adding it back in those two spots or accepting shorter social titles.

**Impact**: Titles are ~30 characters over the SERP truncation point purely from the repeat. Check `[slug]/page.tsx` and `gallery/[slug]/page.tsx` for the same pattern.

- [x] **6.B1** Fix duplicated title suffix on city pages; audit other routes for the same bug. *(2026-08-16 — took the preferred option: `generateMetadata()` now returns `title: city.headline` and lets the root template supply the suffix. `openGraph.title` and `twitter.title` bypass the template, so both use an explicit `socialTitle` const carrying the suffix once. Verified live: `<title>Professional Wallpaper Installation in Austin, TX | Wallcoverings By Don Dye</title>` — brand appears once.)*

  **Audit of the other routes:**
  - `[slug]/page.tsx` — the **generic fallback** had the same bug (`` `${page.title} | Wallcoverings By Don Dye` `` + template). Fixed to `page.title`. It only fires for a Sanity page outside the hardcoded map, which is why it went unnoticed.
  - `[slug]/page.tsx` — the `contact` map entry read `"Contact Wallcoverings By Don Dye | Free Estimates Austin, TX"`, rendering the brand twice once the template appended it. Shortened to `"Contact Don Dye | …"`.
  - `gallery/[slug]/page.tsx` — **no duplication**; left alone.
  - **Not fixed, flagged:** `/about` renders 86 chars and `/gallery` 78 after the template, both past the ~60-char SERP truncation point. Neither repeats the brand, so this is a copywriting call on the site's three main pages rather than the 6.B1 bug — trimming them would change titles that are already indexed. Worth a decision.

### 6.B2 Generic `og:image` on every city page

**File**: `app/(site)/service-area/[city]/page.tsx`
**Problem**: All 13 pages emit `/og-image.jpg`. Shares of any city page look identical.
**Fix**: ~~Once 6.1 lands, reuse `city.heroImage` as the `openGraph.images` entry.~~ Verify final asset is 1200×630 and that the declared `width`/`height` match the actual file.

> **Unblocked, but the approach changed (2026-08-16).** 6.1 shipped **without** a `city.heroImage` field —
> the hero comes from `getProjectsForCity()` at render time, so there is no static URL for
> `generateMetadata()` to read. To do this, call the same helper from `generateMetadata()`:
>
> ```ts
> const [hero] = await getProjectsForCity(Object.keys(cities).indexOf(city.slug), 1)
> ```
>
> That is a second Sanity fetch, but it is the *same* query — `sanity-utils.ts` sets
> `next: { revalidate: 60 }`, so Next's Data Cache dedupes it and the page still renders one request.
> Because the offset is a pure function of the city index, the og:image is guaranteed to be the same
> photo the visitor sees at the top of the page.
>
> **Caveat**: these are raw Sanity CDN assets at arbitrary aspect ratios (960×1280 portrait through
> 3264×2448 landscape), *not* 1200×630. Declaring `width: 1200, height: 630` against them would be a
> lie and social cards would crop unpredictably. Either run them through the Sanity image pipeline
> (`?w=1200&h=630&fit=crop`) and declare that, or declare each asset's real dimensions.

- [x] **6.B2** Use per-city hero as `og:image`. *(2026-08-17 — `generateMetadata()` now calls `getProjectsForCity(citySlugs.indexOf(city.slug), 1)`, exactly as sketched above, and feeds the result through a local `socialCardUrl()` helper. Verified all 13: every `og:image` is distinct **and** is the same asset as that page's own visible hero.)*

  **The aspect-ratio caveat is resolved by cropping, not by lying.** `socialCardUrl()` appends
  `?w=1200&h=630&fit=crop&fm=jpg`, so the declared `width: 1200, height: 630` describes the file that is
  actually served. Confirmed by fetching a transformed URL directly: `JPEG image data … 1200x630`, ~130 KB.

  **`fm=jpg`, not `auto=format`.** `auto` negotiates on the caller's `Accept` header and social scrapers
  vary in whether they claim WebP support; a share card should be one deterministic file every crawler
  can read. `twitter.images` was also added — it previously fell through to the root layout's
  `/og-image.png`, so the Twitter card and the OG card disagreed on every city page.

  `og:image:alt` is `hero.alt ?? hero.name`, straight from Sanity, so the §6.B4 no-city-names-in-alt rule
  extends to the social card. Verified: no city name in any `alt` on any of the 13 pages.

### 6.B3 Redundant `meta-keywords`

**Problem**: Every city page emits the same `keywords` meta tag, Austin-centric regardless of city. Google has ignored this tag for over a decade.
**Fix**: Either drop `keywords` entirely (recommended — it's dead weight and slightly leaks targeting intent to competitors) or make it city-specific. Not urgent; no ranking impact either way.

> **Confirmed still present (2026-08-16)**, verified on `/service-area/kyle`:
> `<meta name="keywords" content="wallpaper installation,wallcovering,Austin Texas,…"/>`
>
> **The tag is not set in the city page** — it is inherited from the root `layout.tsx` `metadata.keywords`,
> which Next applies to every segment that doesn't override it. So this is **not a city-page fix**: deleting
> the `keywords` array from `app/(site)/layout.tsx` removes it sitewide in one edit. Overriding per city
> would mean adding `keywords` to every route that currently inherits it, which is the wrong direction.

- [x] **6.B3** Remove or localize `keywords` meta. *(2026-08-17 — took the recommended option: the `keywords` array is deleted from `app/(site)/layout.tsx`, with a comment recording why so it doesn't get added back. One edit, removed sitewide. Verified absent on `/`, `/service-area`, `/service-area/austin`, and `/gallery`.)*

### 6.B4 Hero `alt` text asserts a location that isn't true

**Problem**: `alt={\`Wallpaper installation in ${city.name}, TX\`}` describes one shared image file as thirteen different cities. Two issues: it's a quality signal problem for image search, and it's an accuracy problem — the photo was not taken in Pflugerville, or in twelve other places simultaneously.
**Fix**: Rewrite alt to describe what is actually pictured — material, room, treatment. `"Grasscloth wallcovering installed in a dining room"`. No city name in hero alt anywhere. Same rule applies to the 6.2 project thumbnails.

This is the general principle for the whole phase: the page can say Don serves Pflugerville (true) without saying any given photo was taken there (not established).

- [x] **6.B4** Rewrite hero alt to describe the image, not the city. *(2026-08-16 — the offending `alt={\`Wallpaper installation in ${city.name}, TX\`}` no longer existed; it went out with the hero image in Phase 3d.11. The rule was applied to the hero and strip added in 6.1/6.2 instead: alt is `project.alt ?? project.name`, straight from Sanity, so it describes the room and material. Verified across all 13 pages — **no city name appears in any `alt` on any service area page**. Sample heroes: "Powder Room", "Phillip Jeffries Woven Grass Accent in Entryway", "Cole & Sons Clouds in Breakfast Room".*
  *__Standing constraint for the Studio:__ these alt strings are editor-controlled. If a project's alt is ever set to a city name it will surface on a service area page as a location claim about a photo whose location isn't established.)*

---

## Sequencing

| Order | Task | Effort | Blocked by | Expected impact | Status |
|-------|------|--------|-----------|-----------------|--------|
| 1 | 6.B1 title suffix | Trivial | — | SERP title truncation, all city pages | ✅ 2026-08-16 |
| 2 | 6.0 single-paragraph rewrite | Medium (copy) | Don's input | Core of the "boring" complaint | ⚠️ 10/13 — 3 need Don |
| 3 | 6.1 per-city hero | Low | image sourcing | Removes template signal above fold | ✅ 2026-08-16 |
| 4 | 6.4 CTA block + `?city=` param | Low | — | Clearer conversion path; lead attribution | ✅ 2026-08-16 |
| 5 | 6.5 FAQ + JSON-LD | Medium | copy | Restores depth; FAQ rich results | ✅ shared set; per-city Qs need Don |
| 6 | 6.B4 hero + thumbnail alt | Trivial | — | Accuracy; image search | ✅ 2026-08-16 |
| 7 | 6.2 recent work strip | Low | — | Proof + internal linking | ✅ 2026-08-16 |
| 8 | 6.3 process section | Low | — | Depth without photos | ✅ 2026-08-16 |
| 9 | 6.8 demote cross-links | Trivial | — | Removes visible plumbing | ✅ 2026-08-17 |
| 10 | 6.6 testimonial | Low | real reviews | Social proof | ☐ blocked on Don (q3) |
| 11 | 6.7 pricing block | Low | Don's numbers | Reduces bounce | ☐ blocked on Don (q4) |
| 12 | 6.B2 per-city og:image | Trivial | 6.1 | Social sharing | ✅ 2026-08-17 |
| 13 | 6.B3 keywords meta | Trivial | — | Cleanup only | ✅ 2026-08-17 |
| — | 6.12 `/service-area` hub | Low | — | Fixes a live breadcrumb 404; target for 6.8 | ✅ 2026-08-17 |
| 14 | 6.10 photo capture habit | Ongoing | Don | Unlocks before/after later | ☐ not a code task |
| — | 6.11 reusable form | Medium | deferred | Revisit after 6.4a attribution data | ☐ deferred |

### Implementation log — 2026-08-16 (sequencing items 1–8)

**Files changed**
| File | Change |
|------|--------|
| `app/(site)/service-area/[city]/page.tsx` | Rewritten. Now `async`. `body` deleted from `CityData`; `faqs?` added. New section order per §6.9. |
| `sanity/sanity-utils.ts` | Added `getProjectsForCity(cityIndex, count)`. |
| `app/(site)/Components/FAQSchema.tsx` | Exports `Faq`; takes optional `faqs` prop, defaults to the home set. |
| `app/(site)/Components/FAQList.tsx` | **New** — visible `<details>` disclosure list. |
| `app/(site)/Components/ProcessSteps.tsx` | **New** — "What to expect", four steps, no props. |
| `app/(site)/[slug]/ContactForm.tsx` | Reads `?city=` and prefills the city field. |
| `app/(site)/[slug]/page.tsx` | 6.B1 audit fixes (generic fallback + `contact` map entry). |

**Section order as shipped** — see the table in §6.9, which now records props and status per section.

**Verified**: `tsc --noEmit` clean, `next lint` clean, all 13 routes HTTP 200 on the dev server, `FAQPage` JSON-LD present on each, 13/13 distinct hero photos, zero city names in image alt text.

**Not verified**: no production build — a dev server was running on :3000 and `next dev`/`next start` share `.next` (CLAUDE.md 3d.10). Worth folding these routes into that pending Lighthouse pass, since each city page now loads four Sanity images where it previously loaded none.

#### Noted while working — ~~not actioned~~ all three cleared 2026-08-17

- ~~**`app/sitemap.ts` duplicates the city list.**~~ **Fixed** — and it was worse than recorded: the list
  existed in *three* places, the page config, `CITY_SLUGS` in `app/sitemap.ts`, and a third hardcoded
  array in `Components/Footer.tsx`. All three now read `app/(site)/service-area/cities.ts`.
- ~~**Sitemap `lastModified` for city routes is the frozen literal `new Date('2026-05-02')`.**~~ **Fixed** —
  replaced with a named `CITY_PAGES_UPDATED` constant (currently `2026-08-17`) and a comment saying to
  bump it when the shared city template or its copy changes materially.
- ~~**`Components/Process.tsx` is still dead code.**~~ **Deleted.** Confirmed zero importers first. The live
  component is `ProcessSteps.tsx`; the confusable neighbour is gone. This also closes the deletion that
  CLAUDE.md 3d.8 had been flagging.

### Implementation log — 2026-08-17 (sequencing items 9, 12, 13 + the three cleanups)

Closes every remaining unblocked code task in this phase.

**Files changed**
| File | Change |
|------|--------|
| `app/(site)/service-area/cities.ts` | **New** — the extracted single source of truth. `CityData` + all 13 entries, moved verbatim, plus `nearby` (6.8) and an optional `listName`. Exports `citySlugs`, `cityLabel()`, `nearbyCities()`. |
| `app/(site)/service-area/page.tsx` | **New** — the `/service-area` hub (§6.12). |
| `app/(site)/service-area/[city]/page.tsx` | Config moved out to `../cities`. 6.B2 og:image + `socialCardUrl()`. 6.8 cross-link row. |
| `app/(site)/layout.tsx` | 6.B3 — `keywords` deleted. |
| `app/sitemap.ts` | Imports `citySlugs`; `CITY_PAGES_UPDATED`; adds the `/service-area` hub route. |
| `app/(site)/Components/Footer.tsx` | Third copy of the city list replaced with the shared config; section heading now links to the hub. |
| `app/(site)/Components/Process.tsx` | **Deleted** — dead code, zero importers. |

**Verified**: `tsc --noEmit` clean, `next lint` clean. All 13 city routes plus `/service-area`, `/`,
`/about`, `/gallery`, `/contact` return 200. 13/13 `og:image` distinct and each matches its own page's
visible hero; a transformed URL fetched directly returns `1200x630`. No `keywords` meta on any route
sampled. No city name in any `alt` on any city page. Cross-links down from 12 to 5 per page. Sitemap
carries 14 service-area routes with a current `lastmod`.

**Not verified**: still no production build — a dev server was running on :3000 and `next dev`/`next start`
share `.next` (CLAUDE.md 3d.10), so building would have clobbered it. All checks above ran against that
dev server. CLAUDE.md 3d.10 is still open and should now cover `/service-area` as a fifth route.

**One judgement call worth knowing about**: the footer label for Lakeway changed from `Lakeway` to
`Lakeway & Bee Cave`. The shared config carries a `listName` for the two entries whose page covers two
towns; `manor` already displayed as `Manor & Hutto` in the footer, and Lakeway's own `headline` has always
read "Lakeway & Bee Cave", so this makes the footer consistent with both. Revert by dropping `listName`
from the `lakeway` entry if the shorter label is preferred.

### 6.12 `/service-area` hub page

Not in the original plan; built because 6.8 needs a "See all service areas" destination and because the
`BreadcrumbList` JSON-LD on all 13 city pages had been pointing at `/service-area` since task 3.2, where
it returned **404**. Every city page was emitting a breadcrumb trail whose middle item did not resolve.

Deliberately kept text-only — 13 cards, each the city label plus its `neighborhoods` line, linking to the
city page. No images: thirteen Sanity photos on one hub page is a payload problem, and the page's job is
routing, not proof. Carries its own `BreadcrumbList` (Home → Service Areas), a canonical, and the standard
two-button CTA. Title is held to 30 chars before the template appends the 27-char brand suffix, landing at
**57** — the long first draft rendered at 87 and would have truncated.

- [x] **6.12** Build the `/service-area` hub. *(2026-08-17)*

---

### 6.10 Start capturing before/after and location data

Not a code task — a habit worth starting now, because it unlocks the highest-value content this phase had to drop.

**On every job going forward:**
- One wide shot of the wall *before* anything is touched, from roughly where the finished shot will be taken. Phone camera is fine; matching the angle is what matters.
- The matching *after* shot from the same position.
- The city, logged with the photos.
- A close-up of a seam or inside corner — craft proof, and useful on its own.

Six months of this yields a real before/after slider, genuinely city-labeled project photos, and per-city hero images. Revisit the slider (original 6.3) once 3–4 usable pairs exist; the implementation note still holds — build it by hand as a draggable divider over two stacked `next/image` fills rather than pulling in a library, so the bundle work from 3a.2 and 3b.2 isn't undone.

- [ ] **6.10** Set up a photo capture routine with Don (before/after pairs + city logging).

### 6.11 Deferred — reusable contact form

Explicitly deferred, not dropped. If the inline form is revisited, it should be a **sitewide** decision rather than a city-page exception.

**When it makes sense**: after `?city=` attribution (6.4a) has run long enough to show whether city-page visitors are converting, and if the answer is "they land, read, and leave."

**Approach if adopted**:
1. Extract the existing `react-hook-form` + Nodemailer form into a reusable component.
2. Adopt it consistently — city pages, project pages, and anywhere else with a CTA — so it reads as a site pattern.
3. `dynamic()` the import so it lands in its own chunk; the layout bundle work in 3a.2 and 3b.2 shouldn't be undone for a form.
4. Pre-fill location from the same city value already threaded through in 6.4.

- [ ] **6.11** *(deferred)* Extract contact form to reusable component; decide on sitewide adoption.

---

## Open questions for Don

Content in 6.0, 6.6, and 6.7 can't be written without these. **These are now the critical path** — after the 2026-08-16 pass, every remaining task except 6.8, 6.B2, and 6.B3 is waiting on an answer here.

1. What actually differs about wallcovering work in each of these cities? Wall construction, common textures, typical project type, access challenges? — **Ten cities are now written from the five conditions in §6.0. Three still need an answer: Pflugerville, San Marcos, Dripping Springs.** Also worth confirming the ten are actually right; they are currently the plan author's characterization, not Don's.
2. Which cities generate real volume? If several are speculative, consider consolidating — six strong pages outperform thirteen thin ones.
3. Any customers who'd agree to be quoted by first name and neighborhood?
4. Rough price ranges: powder-room accent wall, full room, removal per room. — *blocks 6.7 and the "what does an accent wall cost" FAQ.*
5. Current booking lead time (for the FAQ). — *also blocks the reassurance line under the CTA, which currently promises free and no-obligation but not a response time.*
6. Are any existing gallery photos of jobs in known cities? Even a handful would allow honest per-city labeling on those specific projects.

---

## Note on consolidation

Thirteen city pages at ~150 words each is a pattern Google's helpful-content systems are specifically tuned against. The work in this phase mitigates that, but it's worth asking whether every city earns a page. If Manor, Buda, and San Marcos produce no leads, folding them into a single "Greater Austin area" page and investing the effort in six strong city pages is likely the better trade. Check Search Console impressions per city URL before deciding.