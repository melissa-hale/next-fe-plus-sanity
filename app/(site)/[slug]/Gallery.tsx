import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import { PortableTextBlock } from 'sanity'
import { PortableText } from '@portabletext/react'

type Props = {
  content: PortableTextBlock[]
}

export default async function Gallery({ content }: Props) {
  const projects = await getProjects();

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return <br />
        }
        return <p>{value.children[0].text}</p>
      },
    },
  }

  return (
    <>
      <h2 className="sr-only">Our Work</h2>
      <div className="min-h-screen mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-lg text-gray-700 mt-7 mb-7">
          <PortableText value={content} components={serializer} />
        </div>
        {projects.map((project, index) => (
          <Link key={project._id} href={`/gallery/${project.slug}`} title={project.name}>
            <Image
              src={project.image}
              alt={project.alt ?? project.name}
              width={1750}
              height={1500}
              priority={index === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover rounded-sm border border-gray-500 cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
        ))}
      </div>
    </>
  )
}

