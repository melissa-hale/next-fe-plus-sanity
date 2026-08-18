/**
 * A quiet proof line for the hero: five stars, the rating, and a link out to the
 * Google Business Profile so the claim is checkable.
 *
 * Deliberately NOT a CTA. It uses the text-link treatment (underline on hover,
 * green on hover) rather than the amber lift from CLAUDE.md 3d.8 — it sits
 * directly under the green primary button and must not compete with it.
 *
 * No review count, by design. A hardcoded count goes stale as reviews arrive,
 * and Phase 7 copy rule 4 forbids inventing one. The rating alone never rots.
 *
 * There is deliberately no AggregateRating JSON-LD to match this — see the note
 * in CLAUDE.md 2.2. Google's structured data guidelines disallow self-serving
 * review markup on a LocalBusiness (ratings the business publishes about
 * itself), and ratings collected by Google cannot be re-emitted as your own
 * structured data. The visible link is the honest version of this signal.
 */

/**
 * TODO: swap for the canonical Google Business Profile short link (g.page/... or
 * the Maps place URL with its CID) once it's to hand. This query URL resolves to
 * the profile today and is the same one `StructuredData.tsx` uses for `hasMap`,
 * but a place-ID URL is stable where a name search is not.
 */
const GOOGLE_PROFILE_URL =
  'https://maps.google.com/?q=Wallcoverings+By+Don+Dye+Austin+TX'

const RATING = '5.0'

function Star() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L10 1.5z" />
    </svg>
  )
}

export default function GoogleRating() {
  return (
    <a
      href={GOOGLE_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      // min-h-[44px] keeps this off the target-size audit; Accessibility is 100
      // on all five routes (Phase 8) and a bare text link here would break it.
      className="inline-flex min-h-[44px] items-center gap-2 rounded-sm text-sm text-gray-700 transition-colors hover:text-green-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    >
      {/* Decorative: the rating is stated in the text beside them, so the stars
          would only repeat it to a screen reader. */}
      <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </span>
      <span>{RATING} on Google</span>
      {/* Appended rather than set as aria-label so the accessible name still
          begins with the visible text — WCAG 2.5.3 Label in Name, the same rule
          that took the aria-label off the hero CTA in 3a.7. */}
      <span className="sr-only">
        {' '}
        — read our reviews on Google (opens in a new tab)
      </span>
    </a>
  )
}
