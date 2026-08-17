// "What to expect" — the four steps of a job, one sentence each. No images and
// no JS.
//
// Kept free of comparisons to other installers. Step 2 previously read "the
// step most bids leave out and the reason installations fail", and similar
// lines ran through the city page copy; all of it was removed on 2026-08-17.
// Describe the work, not what other people supposedly get wrong.
const steps = [
  {
    title: 'Walk-through and estimate',
    body: 'I drop in and take a look at the project and provide any consultation before providing an estimate.',
  },
  {
    title: 'Surface prep',
    body: 'First part of the job is to prep the walls for the installation.  This is a crucial step to ensure optimal, lasting results.',
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

export default function ProcessSteps() {
  return (
    <>
      <h2 className="mb-2 font-headers text-2xl font-bold text-green-900 md:text-3xl">
        What to expect
      </h2>
      <p className="mb-8 text-base text-gray-700">
        Every job runs the same four steps, whatever the size of the room.
      </p>

      <ol className="grid list-none grid-cols-1 gap-6 pl-0 sm:grid-cols-2">
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
    </>
  )
}
