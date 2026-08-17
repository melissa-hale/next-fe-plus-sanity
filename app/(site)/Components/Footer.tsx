import Link from "next/link";
import Image from "next/image";

import wialogo from "../../../public/wialogo.jpg";

export default async function Footer() {
  return (
    // <!-- Footer container -->
    <footer className="bg-cream-deep text-center lg:text-left border-4 border-double border-t-amber-400">
      <div className="container pt-12 p-6 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* <!--First links section--> */}
          <div className="mb-6">
            <h3 className="mb-2.5 font-bold text-neutral-800">
              Business Hours
            </h3>

            <ul className="mb-0 list-none">
              <li className="text-neutral-800">
                <p>Monday through Friday,</p>
                <p>8a-5p</p>
              </li>
            </ul>
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
            <h3 className="mb-2.5 font-bold text-neutral-800">Service Areas</h3>

            <p className="text-sm text-neutral-800 leading-relaxed">
              {[
                { name: "Austin", slug: "austin" },
                { name: "Round Rock", slug: "round-rock" },
                { name: "Cedar Park", slug: "cedar-park" },
                { name: "Georgetown", slug: "georgetown" },
                { name: "Pflugerville", slug: "pflugerville" },
                { name: "Kyle", slug: "kyle" },
                { name: "Buda", slug: "buda" },
                { name: "San Marcos", slug: "san-marcos" },
                { name: "Lakeway", slug: "lakeway" },
                { name: "Dripping Springs", slug: "dripping-springs" },
                { name: "Leander", slug: "leander" },
                { name: "Manor & Hutto", slug: "manor" },
                { name: "Westlake Hills", slug: "westlake-hills" },
              ].map(({ name, slug }, i, arr) => (
                <span key={slug}>
                  <Link
                    href={`/service-area/${slug}`}
                    className="text-gray-700 hover:text-green-700"
                  >
                    {name}
                  </Link>
                  {i < arr.length - 1 && ", "}
                </span>
              ))}
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
