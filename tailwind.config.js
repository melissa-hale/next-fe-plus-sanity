/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{ts,tsx}',
    './types/**/*.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'sans': ['var(--font-inter)'],
        'headers': ['var(--font-dancing)']
      },
      backgroundImage: {
        'site-bg-image': "url('../public/green-wallpaper-bg.webp')",
        'section-bg': "url('../public/section-bg-neutral.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
