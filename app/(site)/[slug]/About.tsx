import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'

type Props = {
  content: PortableTextBlock[]
}

export default async function About({ content }: Props) {
  
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
    <div className="min-h-screen">
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={content} components={serializer} />
      </div>
    </div>
  )
}
