/**
 * The single source of truth for the service area list.
 *
 * A plain list of towns Don covers, and nothing else. There is deliberately no
 * per-town copy, headline, metadata, or neighborhood list here.
 *
 * This file used to carry a `CityData` record driving 13 individual city
 * landing pages. Those pages were removed on 2026-08-17: their copy made
 * claims about each town's building stock and construction era ("built before
 * drywall", "almost entirely new construction") that Don does not make and
 * would not make. Stripping the claims left 13 near-identical pages with
 * nothing to say, so they were consolidated into the single hub at
 * /service-area and 301'd there in next.config.js.
 *
 * See docs/service-area-redesign.md § Phase 7.
 *
 * Consumers: app/(site)/service-area/page.tsx, Components/Footer.tsx, and
 * app/sitemap.ts. Add a town here and it appears in all three.
 *
 * Austin leads because it is the primary market; the rest are alphabetical, so
 * there is no ordering judgement to maintain.
 */
export const serviceAreas: string[] = [
  'Austin',
  'Bee Cave',
  'Buda',
  'Cedar Park',
  'Dripping Springs',
  'Georgetown',
  'Hutto',
  'Kyle',
  'Lakeway',
  'Leander',
  'Manor',
  'Pflugerville',
  'Round Rock',
  'San Marcos',
  'Westlake Hills',
]
