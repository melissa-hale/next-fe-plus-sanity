import { getPage, getProjects } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import Gallery from './Gallery'
import ContactForm from './ContactForm'

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug)

  const projects = await getProjects()

  return (
    <div>
      <h1 className="bg-gradient-to-r from-sky-700 to-blue-500 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={page.content} />
      </div>
      {page.title == 'Gallery' && <Gallery />}
      {page.title == 'Contact' && <ContactForm />}
    </div>
  )
}

//https://youtu.be/OcTPaUfay5I?t=7048 .. checkout tailwind pros and tailwind topography plugins