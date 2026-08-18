import Section from './Section'

// "What to expect" — the four steps of a job, one sentence each. No images and
// no JS.
//
// Kept free of comparisons to other installers. Step 2 previously read "the
// step most bids leave out and the reason installations fail", and similar
// lines ran through the city page copy; all of it was removed on 2026-08-17.
// Describe the work, not what other people supposedly get wrong.
const steps = [
  {
    title: 'Intro and estimate',
    body: 'I begin the engagement with an intro call. After that, I visit the property to consult, measure, and provide an estimate.',
  },
  {
    title: 'Surface prep',
    body: 'The first phase of work is prepping the walls for the installation. This is a crucial step to ensure optimal, lasting results.',
  },
  {
    title: 'Installation',
    body: 'Precise seam matching, pattern alignment, and clean work into corners and around trim.',
  },
  {
    title: 'Cleanup',
    body: 'Tools out, walls wiped down, and the room left ready to enjoy.',
  },
]

// Renders its own Section, like the other home page blocks (Gallery, About,
// FAQ), so page.tsx just stacks components. Moved here from /service-area on
// 2026-08-18 — the steps describe working with Don, which is a home page
// question, not a "do you cover my town" one.
export default function ProcessSteps() {
  return (
    <Section width="wide">
      <h2 className="mb-4 font-headers text-3xl font-bold text-green-900 md:text-4xl">
        What to expect
      </h2>
      <p className="mb-8 text-base text-gray-700">
        When booking with me, the process goes as follows:
      </p>

      <ol className="grid list-none grid-cols-1 gap-10 pl-0 sm:grid-cols-2">
        {steps.map(({ title, body }, index) => (
          <li key={title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-900 font-headers text-base font-bold text-amber-200"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="mb-1 font-semibold text-green-900">{title}</h3>
              <p className="text-base leading-relaxed text-gray-700">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
