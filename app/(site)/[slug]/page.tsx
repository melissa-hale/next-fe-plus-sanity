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
      <Header slug={params.slug} />
      {page.title == 'Gallery' && <Gallery />}
      {page.title == 'Contact' && <ContactForm />}
      {page.title == 'About' && <About />}
    </div>
  )
}