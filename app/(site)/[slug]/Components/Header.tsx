import { Ibarra_Real_Nova } from '@next/font/google'

const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  variable: '--font-dancing'
})

type Props = {
    title: string
    id: string
    children?: React.ReactNode
  }  

export default async function Header({ title, id, children }: Props) {

  return (
    <div key={id} className='max-w-3xl mx-auto min-h-screen p-8 bg-amber-100 bg-opacity-80'>
      <h1 className={`${headerFont.variable} font-headers text-green-900 text-5xl drop-shadow font-extrabold`}>
        {title}
      </h1>
      {children}
    </div>
  )
}
