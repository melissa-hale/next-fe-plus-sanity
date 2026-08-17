import Link from "next/link";
import Image from "next/image";

import wialogo from "../../../public/wialogo.jpg";
import { serviceAreas } from "../service-area/cities";

export default async function Footer() {
  return (
    // <!-- Footer container -->
    <footer className="bg-cream-deep text-center lg:text-left border-4 border-double border-t-amber-400">
      <div className="container pt-12 p-6 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* <!--First links section--> */}
          <div className="mb-6">
            <h3 className="mb-2.5 font-bold text-neutral-800">
              Wallcoverings by Don Dye
            </h3>

            <p>Professional Wallpaper Installation in Central Texas</p>
          </div>

          {/* <!--Second links section--> */}
          <div className="mb-6">
            <h3 className="mb-2.5 font-bold text-neutral-800">Contact</h3>

            <ul className="mb-0 list-none">
              <li className="text-neutral-800">
                <p className="text-gray-700 text-base">
                  
                  <a
                    href="tel:+18327883667"
                    className="text-gray-700 hover:text-green-700"
                  >
                    (832) 788-3667
                  </a>
                </p>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-700"
                >
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

          {/* <!--Third links section--> */}
          <div className="mb-6">
            <h3 className="mb-2.5 font-bold text-neutral-800">
              Accreditations
            </h3>

            <ul className="mb-0 list-none">
              <li>
                <Link
                  href="https://www.wallcoveringinstallers.org/"
                  className="block w-[180px] lg:w-[200px] mx-auto lg:mx-0"
                  target="_blank"
                >
                  <Image
                    src={wialogo}
                    alt="Wallcovering Installers Association member badge"
                    sizes="200px"
                    className="h-auto w-full"
                  />
                </Link>
              </li>
            </ul>
          </div>

          {/* <!--Service Areas section--> */}
          <div className="mb-6">
            <h3 className="mb-2.5 font-bold text-neutral-800">
              <Link
                href="/service-area"
                className="text-neutral-800 hover:text-green-700"
              >
                Service Areas
              </Link>
            </h3>

            {/* Plain text, not links. Each town used to link to its own page;
                those were consolidated into /service-area on 2026-08-17, so
                thirteen footer links would now all point at the same URL — the
                heading above already goes there. Driven by the shared config so
                this can't drift from the page. See ../service-area/cities.ts */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {serviceAreas.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      {/* <div className="bg-neutral-200 p-4 text-center text-neutral-700">
        <p>© 2026 Copyright: Wallcoverings By Don Dye</p>
      </div> */}
    </footer>
  );
}
