// Single place the site's fonts are instantiated. All three CSS variables are
// applied to <body> in layout.tsx, so components only need the Tailwind family
// classes (`font-sans`, `font-headers`, `font-montserrat`) — no per-component
// font loader calls.
import { Catamaran, Ibarra_Real_Nova, Montserrat } from '@next/font/google'

export const bodyFont = Catamaran({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})
