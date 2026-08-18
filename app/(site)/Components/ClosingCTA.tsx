import Link from 'next/link'
import Section from './Section'

const PHONE_DISPLAY = '(832) 788-3667'
const PHONE_HREF = 'tel:+18327883667'

type Props = {
  heading?: string
  /** One sentence under the heading. */
  body?: string
  /** Darker ground, for closing a page whose last section was untinted. */
  tint?: boolean
}

/**
 * The block a page ends on: one green primary CTA into the contact form, with
 * the phone repeated below as a plain text link rather than a second button.
 *
 * Shared by the home page and /service-area so the two cannot drift. Only the
 * heading and the one line above the button change between them — if a third
 * caller needs more than that, give it children rather than another prop.
 *
 * The button carries the primary/conversion CTA string from CLAUDE.md 3d.8
 * verbatim; the phone stays a text link so the page ends on a single ask.
 */
export default function ClosingCTA({
  heading = 'Ready to get started?',
  body = "",
  tint = false,
}: Props = {}) {
  return (
    <Section width="narrow" tint={tint}>
      <div className="text-center">
        <h2 className="font-headers text-2xl font-bold text-green-900 md:text-3xl">
          {heading}
        </h2>
        {body && (
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-gray-700">
            {body}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 text-center text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Get in touch today!
          </Link>
        </div>

        <p className="mt-5 text-base text-gray-700">
          Or call{' '}
          <a href={PHONE_HREF} className="text-green-900 hover:underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </Section>
  )
}
