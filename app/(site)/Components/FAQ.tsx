import Link from 'next/link'
import Section from './Section'

export type Faq = {
  question: string
  /**
   * Plain text, no markup. This string is what goes into the JSON-LD, and
   * structured data wants prose rather than HTML. For a link, use `link` below
   * instead of writing an anchor in here.
   */
  answer: string
  /**
   * Optional link rendered after the answer. Visible only — it is navigation
   * rather than part of the answer, so it stays out of the JSON-LD and the
   * schema still carries the complete spoken answer on its own. Which means
   * `answer` has to make sense without it.
   */
  link?: { href: string; label: string }
}

/**
 * The site's FAQ content. **Edit here and nowhere else.**
 *
 * This one array drives both the visible list and the FAQPage JSON-LD below,
 * so the two cannot drift. That was the reason for merging the old
 * FAQSchema.tsx and FAQList.tsx into this file on 2026-08-17: they were
 * separate components paired by a comment telling the caller to pass the same
 * array to both, which is a convention someone eventually forgets.
 *
 * Answers must not introduce facts published nowhere else on the site — no
 * price figures, no booking lead times, no response times. See the copy rules
 * in CLAUDE.md § Phase 7.
 */
export const homeFaqs: Faq[] = [
  {
    question: 'How long does professional wallpaper installation take?',
    answer:
      'Project time is completely dependent on size, wall condition, and wallpaper type. I will give you a projected timeline as part of the estimate.',
  },
  {
    question: 'How much does professional wallpaper installation cost in Austin?',
    answer:
      'Pricing depends on the room size, number of walls, wallpaper type, and any removal needed. Contact me for a free estimate tailored to your project.',
  },
  {
    question: 'Do you remove old wallpaper before installing new?',
    answer:
      'Yes. I offer wallpaper removal as part of the installation process. Proper removal and wall preparation are essential for a smooth, long-lasting result.',
  },
  {
    question: 'What types of wallpaper can you install?',
    answer:
      'I install all types of residential and commercial wallcoverings, including grasscloth, vinyl, fabric-backed, peel-and-stick, hand-printed, and specialty textured wallpapers.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes. Contact me through the website or call (832) 788-3667 to schedule an estimate for your project.',
  },
  {
    question: 'Do you serve areas outside of Austin?',
    answer:
      'Yes. I work throughout Central Texas, including Round Rock, Cedar Park, Georgetown, Leander, Pflugerville, Kyle, Buda, and San Marcos.',
    link: { href: '/service-area', label: 'See the full service area' },
  },
]

type Props = {
  /** Defaults to the set above. */
  faqs?: Faq[]
  heading?: string
}

/**
 * Renders the FAQ twice over: once as a visible disclosure list for people, and
 * once as FAQPage JSON-LD for crawlers. Both read the same `faqs` array.
 *
 * Native <details>/<summary> — keyboard accessible, screen reader accessible,
 * zero JS.
 *
 * A note on what the JSON-LD is actually worth: since August 2023 Google shows
 * FAQ rich results only for authoritative government and health sites, so this
 * markup will not produce the expandable SERP dropdowns the original plan
 * assumed (docs/service-area-redesign.md §6.5 and CLAUDE.md 2.3 both still
 * describe that payoff — it is stale). It is kept because it is accurate,
 * costs nothing, and still helps machines parse what the business does. The
 * visible list is the part that earns its place: it answers real buyer
 * questions on the page.
 */
export default function FAQ({ faqs = homeFaqs, heading = 'Common questions' }: Props = {}) {
  if (faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return (
    <Section width="narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h2 className="mb-8 font-headers text-3xl font-bold text-green-900 md:text-4xl">
        {heading}
      </h2>

      <div className="divide-y divide-amber-200 border-y border-amber-200">
        {faqs.map(({ question, answer, link }) => (
          <details key={question} className="group py-1">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-green-900 marker:content-none hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700">
              {question}
              {/* aria-hidden: the disclosure state is already announced by <details>. */}
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none text-green-800 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-4 pr-8 text-base leading-relaxed text-gray-700">
              {answer}
              {link && (
                <>
                  {' '}
                  {/* Underlined, not colour alone — an inline link in body copy
                      has to be distinguishable without relying on hue. */}
                  <Link
                    href={link.href}
                    className="font-medium text-green-800 underline underline-offset-2 hover:text-green-700"
                  >
                    {link.label}
                  </Link>
                </>
              )}
            </p>
          </details>
        ))}
      </div>
    </Section>
  )
}
