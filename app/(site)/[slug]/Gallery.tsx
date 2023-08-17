import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'

export default async function Gallery() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Image
          src={project.image}
          alt={project.name}
          width={750}
          height={300}
          key={project._id}
          className="object-cover rounded-sm border border-gray-500"
        />
        
      ))}
    </div>
  )
}

//https://youtu.be/OcTPaUfay5I?t=7048 .. checkout tailwind pros and tailwind topography plugins
