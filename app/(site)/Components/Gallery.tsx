'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
  projects: Array<{
    image: string
    slug: string
    _id: string
    name: string
    alt: string
  }>
}

export default function Gallery({ projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || projects.length <= 1) return

    const interval = setInterval(() => {
      const next = (indexRef.current + 1) % projects.length
      container.scrollTo({ left: container.offsetWidth * next, behavior: 'smooth' })
      indexRef.current = next
    }, 5000)

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <div className="max-w-screen mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="h-128 p-3">
          <div
            ref={scrollRef}
            className="flex h-full overflow-x-scroll snap-x snap-mandatory rounded-lg"
            style={{ scrollbarWidth: 'none' }}
          >
            {projects.map((project, index) => (
              <div key={project._id} className="relative flex-none w-full h-full snap-start">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover rounded-lg"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center pb-10'>
          <a href="/gallery">
            <button
              type="button"
              className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center mt-3 mr-3 md:mr-0"
            >
              View My Work
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
