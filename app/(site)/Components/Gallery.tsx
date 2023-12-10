'use client'

import { Carousel, Flowbite } from 'flowbite-react'
import Image from 'next/image'

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
  return (
    <Flowbite
      theme={{
        theme: {
          carousel: {
            scrollContainer: {
              base:
                'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-auto rounded-lg',
            },
          },
        },
      }}
    >
      <div className="max-w-screen mx-auto min-h-600">
        <div className="max-w-3xl mx-auto">
          {/* <div className="p-5">
            <h1 className=" text-green-900 text-5xl drop-shadow font-extrabold">
              Gallery
            </h1> */}
          {/* <div className="text-lg drop-shadow-md text-gray-800">
            <p className='drop-shadow font-semibold'>hi</p>
          </div> */}
          {/* </div> */}
          <div className="h-128 p-3">
            <Carousel slideInterval={5000}>
              {projects.map((project) => (
                <img
                  src={project.image}
                  alt={project.name}
                  key={project._id}
                  onError={() =>
                    console.error(`Failed to load image: ${project.image}`)
                  }
                />
              ))}
            </Carousel>
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
    </Flowbite>
  )
}