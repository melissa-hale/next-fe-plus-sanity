// app/(site)/layout.tsx
import '../globals.css'
import type { Metadata } from 'next'
import { Catamaran, Montserrat } from '@next/font/google'
import Image from 'next/image'

import Footer from './Components/Footer'
import Nav from './Components/Nav'
import { LocalBusinessSchema, ServiceSchema } from './Components/StructuredData' // ADD THIS IMPORT
import { Analytics } from '@vercel/analytics/react';

const bodyFont = Catamaran({
  subsets: ['latin'],
  variable: '--font-inter'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

// REPLACE YOUR EXISTING METADATA WITH THIS ENHANCED VERSION
export const metadata: Metadata = {
  metadataBase: new URL('https://www.wallcoveringsbydondye.com'), // UPDATE WITH YOUR ACTUAL DOMAIN
  title: {
    default: 'Wallcoverings By Don Dye | Professional Wallpaper Installation Austin, TX',
    template: '%s | Wallcoverings By Don Dye'
  },
  description: 'Professional wallpaper installation specialist serving Austin and Central Texas. Expert wallcovering services with over 40 years of experience. Free estimates available.',
  keywords: [
    'wallpaper installation',
    'wallcovering',
    'Austin Texas',
    'Central Texas',
    'professional wallpaper installer',
    'wall covering installation',
    'wallpaper removal',
    'custom wall treatments'
  ],
  authors: [{ name: 'Don Dye' }],
  creator: 'Wallcoverings By Don Dye',
  publisher: 'Wallcoverings By Don Dye',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.wallcoveringsbydondye.com', // UPDATE WITH YOUR ACTUAL DOMAIN
    siteName: 'Wallcoverings By Don Dye',
    title: 'Professional Wallpaper Installation Austin, TX | Wallcoverings By Don Dye',
    description: 'Expert wallpaper installation services in Austin and Central Texas. Professional wallcovering specialist with over 40 years of experience.',
    images: [
      {
        url: '/og-image.jpg', // We'll create this in a later step
        width: 1200,
        height: 630,
        alt: 'Wallcoverings By Don Dye - Professional Wallpaper Installation Austin TX'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Wallpaper Installation Austin, TX | Wallcoverings By Don Dye',
    description: 'Expert wallpaper installation services in Austin and Central Texas. Professional wallcovering specialist with over 40 years of experience.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification=Cv4dbMzaNqMPQtXiv4jqwwwMr_W2eXovin0V9HkVpto'
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
        <ServiceSchema />
      </head>
      <body className={`mx-auto ${bodyFont.variable} ${montserrat.variable} font-sans`}>
        <Nav />
        <div className="fixed inset-0 -z-10 opacity-70">
          <Image src="/home-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <main className="mx-auto">{children}</main>
        <a href="https://www.freepik.com/free-vector/diamond-shape-golden-pattern-vector-background_2395263.htm#query=geometric%20pattern&position=8&from_view=keyword&track=ais">
          <span className="block text-xs text-right text-gray-600">
            Background Image by starline on Freepik
          </span>
        </a>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}