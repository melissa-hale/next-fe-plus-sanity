import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import { PortableTextBlock } from 'sanity'
import { PortableText } from '@portabletext/react'

type Props = {
  content: PortableTextBlock[]
}

export default async function Gallery({ content }: Props) {
  const projects = await getProjects()

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return <br />
        }
        return <p className="mb-4">{value.children[0].text}</p>
      },
    },
  }

  return (
    <>
      {/* Intro copy sits above the grid — it used to be rendered as the first
          grid cell, which pushed the images out of alignment. */}
      <div className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-gray-800">
        <PortableText value={content} components={serializer} />
      </div>

      <h2 className="sr-only">Our Work</h2>
      <ul className="grid list-none grid-cols-1 gap-5 pl-0 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project._id}>
            <Link
              href={`/gallery/${project.slug}`}
              title={project.name}
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
    </>
  )
}
