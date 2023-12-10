import { getProjects } from '@/sanity/sanity-utils'
// import { useState } from 'react';
import Image from 'next/image'
import { PortableTextBlock } from 'sanity'
import { PortableText } from '@portabletext/react'

type Props = {
  content: PortableTextBlock[]
}

export default async function Gallery({ content }: Props) {
  const projects = await getProjects();
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [isModalOpen, setModalOpen] = useState(false);


  // // Open modal with the clicked image
  // const openModal = (image) => {
  //   setSelectedImage(image);
  //   setModalOpen(true);
  // };

  // // Close modal
  // const closeModal = () => {
  //   setSelectedImage(null);
  //   setModalOpen(false);
  // };

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
    <div className="min-h-screen mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={content} components={serializer} />
      </div>
      {projects.map((project) => (
        // <div key={project._id} onClick={() => openModal(project.image)}>
          <div>
        <Image
          src={project.image}
          alt={project.name}
          width={1750}
          height={1500}
          className="object-cover rounded-sm border border-gray-500 cursor-pointer"
        />
      </div>
        
      ))}
    </div>
  )
}

