import { getProjects } from '@/sanity/sanity-utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className='`'>
      <h1 className="text-7xl font-extrabold">
        <span className="bg-gradient-to-r from-blue-600 to-sky-900 bg-clip-text text-transparent">
          Professional Wallpaper Installation
        </span>
        
      </h1>
      <p className="mt-3 text-xl text-gray-800 mb-2">
        Fully Insured. Servicing Austin and Central Texas.
      </p>
      <p className="mt-3 text-xl text-gray-800 mb-5">
        Residential & Commercial.
      </p>
      
      

    </div>
  )
}
