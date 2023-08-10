import Link from 'next/link'
import Image from 'next/image'

import wialogo from '../../../../public/wialogo.jpg'

export default async function Footer() {
  return (
    // <!-- Footer container -->
    <footer className="bg-neutral-100 text-center lg:text-left">
      <div className="container p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {/* <!--First links section--> */}
          <div className="mb-6">
            <h5 className="mb-2.5 font-bold text-neutral-800">
              Business Hours
            </h5>

            <ul className="mb-0 list-none">
              <li className="text-neutral-800">
                <p>Monday thru Friday,</p>
                <p>8a-5p</p>
              </li>
            </ul>
          </div>

          {/* <!--Second links section--> */}
          <div className="mb-6">
            <h5 className="mb-2.5 font-bold text-neutral-800">
              Contact
            </h5>

            <ul className="mb-0 list-none">
              <li className="text-neutral-800">
                <p>(713)999-0000</p>
              </li>
              <li className="text-neutral-800">
                <Link href="/contact">Contact Form</Link>
              </li>
            </ul>
          </div>

          {/* <!--Third links section--> */}
          <div className="mb-6">
            <h5 className="mb-2.5 font-bold text-neutral-800">
              Accreditations
            </h5>

            <ul className="mb-0 list-none">
              <li>
                <Link href="https://www.wallcoveringinstallers.org/">
                  <Image src={wialogo} alt="wia logo" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-neutral-200 p-4 text-center text-neutral-700">
        © 2023 Copyright: Wallcoverings By Don Dye
      </div>
    </footer>
  )
}
