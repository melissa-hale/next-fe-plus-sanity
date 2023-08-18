import { getPage } from '@/sanity/sanity-utils'
import Header from './Components/Header'
import ContactForm from './ContactForm'
import Gallery from './Gallery'
import About from './About'

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug)

  return (
    <div>
      <Header title={page.title} id={page._id}>
        {page.slug == 'gallery' && <Gallery content={page.content} />}
        {page.slug == 'contact' && <ContactForm content={page.content} />}
        {page.slug == 'about' && <About content={page.content} />}
      </Header>
    </div>
  )
}
