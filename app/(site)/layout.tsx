import '../globals.css'
import type { Metadata } from 'next'

import Footer from './Components/Sections/Footer'
import Nav from './Components/Sections/Nav'

export const metadata: Metadata = {
  title: 'Wall Coverings By Don Dye',
  description: 'Professional Wallpaper Installation Specialist, Don Dye',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="mx-auto">
        <Nav />
        <div id="hero-background"></div>  
        <main className="mx-auto">{children}</main>
        <a href="https://www.freepik.com/free-vector/diamond-shape-golden-pattern-vector-background_2395263.htm#query=geometric%20pattern&position=8&from_view=keyword&track=ais">
          <span className="block text-xs text-right text-gray-400">
            Background Image by starline on Freepik
          </span>
        </a>
        <Footer />
      </body>
    </html>
  )
}
