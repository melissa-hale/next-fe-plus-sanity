import Image from 'next/image'
import Link from 'next/link'
import Section from './Section'
import { Project } from '@/types/Project'

type Props = {
  projects: Project[]
}

// Static grid, rendered on the server. Replaced the auto-advancing carousel:
// nothing moves on its own, so it can't fight a manual scroll, and every image
// is a real crawlable link to its project page.
export default function Gallery({ projects }: Props) {
  if (projects.length === 0) return null

  return (
    <Section>
      <div className="mb-10 text-center">
        <h2 className="font-headers text-3xl font-extrabold text-green-900 md:text-4xl">
          Recent Work
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-700">
          A selection of recent wallcovering installations across Austin and Central Texas.
        </p>
      </div>

      <ul className="grid list-none grid-cols-1 gap-5 pl-0 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project._id}>
            <Link
              href={`/gallery/${project.slug}`}
              className="group block overflow-hidden rounded-lg bg-white/70 shadow-sm transition-shadow duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt ?? project.name}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <span className="block px-4 py-3 text-sm font-medium text-green-900">
                {project.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          href="/gallery"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 font-medium text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          View My Work
        </Link>
      </div>
    </Section>
  )
}
