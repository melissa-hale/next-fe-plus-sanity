import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '../SectionHeader'


export default async function Gallery() {
  const projects = await getProjects()

  return (
    <div className='min-h-screen'>
      <SectionHeader slug="gallery" />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            // href={`/projects/${project.slug}`}
            href={'#'}
            key={project._id}
            className="hover:scale-105 hover:border-blue-500 transition"
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.name}
                width={750}
                height={300}
                className="object-cover rounded-lg border border-gray-500"
              />
            )}
            {/* <div className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
              {project.name}
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  )
}

//https://youtu.be/OcTPaUfay5I?t=7048 .. checkout tailwind pros and tailwind topography plugins