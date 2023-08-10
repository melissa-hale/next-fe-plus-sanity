import { getPage } from '@/sanity/sanity-utils'
import SectionHeader from '../SectionHeader'

export default async function About() {
  
    return (
      <div className='min-h-screen'>
        <SectionHeader slug="about" />
      </div>
    )
  }