import PageHero from '../../Components/PageHero'
import Section from '../../Components/Section'

type Props = {
  title: string
  id: string
  /** `wide` for the gallery grid; `narrow` for reading copy and the contact form. */
  width?: 'narrow' | 'wide'
  children?: React.ReactNode
}

// Shared shell for every inner page: a short patterned hero band carrying the
// <h1>, then content on solid cream with the standard section rhythm.
export default async function Header({ title, id, width = 'narrow', children }: Props) {
  return (
    <div key={id}>
      <PageHero size="sm" width={width}>
        <h1 className="font-headers text-4xl font-extrabold text-green-900 md:text-5xl">
          {title}
        </h1>
      </PageHero>
      <Section width={width} spacing="tight">
        {children}
      </Section>
    </div>
  )
}
