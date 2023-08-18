import { getPage } from '@/sanity/sanity-utils'

export default async function Process() {
  const page = await getPage('my-process')

  return (
    <div
      key={page._id}
      className="max-w-3xl p-6 mx-auto min-h-full bg-amber-100 bg-opacity-80"
    >
      <div className="text-xl text-green-900 mb-3 p-10 bg-gray-200 bg-opacity-60 rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <div className="p-6">
          <div className='pb-3'>
            <p className="text-base pl-1 text-gray-800">What to expect</p>
            <h1 className=" text-green-900 text-4xl drop-shadow font-extrabold">
              {page.title}
            </h1>
          </div>
          <div className="text-gray-800 my-5 grid grid-cols-1 sm:grid-cols-3 gap-9">
            <div className="mb-3 flex flex-col items-center">
              <div className="relative w-28 h-28 bg-green-500 rounded-full flex justify-center items-center text-center p-5 shadow-xl mb-3">
                <span className="absolute left-0 top-0 text-gray-800 text-4xl font-bold text-center">
                  1
                </span>
                First contact
              </div>
              <p>Upon initial contact, we&apos;ll set up a time to talk over the phone.</p>
            </div>
            <div className="mb-3 flex flex-col items-center">
            <div className="relative w-28 h-28 bg-green-500 rounded-full flex justify-center items-center text-center p-5 shadow-xl mb-3">
                <span className="absolute left-0 top-0 text-gray-800 text-4xl font-bold text-center">
                  2
                </span>
                Inspection
              </div>
              <p>More things get done here</p>
            </div>
            <div className="mb-3 flex flex-col items-center">
            <div className="relative w-28 h-28 bg-green-500 rounded-full flex justify-center items-center text-center p-5 shadow-xl mb-3">
                <span className="absolute left-0 top-0 text-gray-800 text-4xl font-bold text-center">
                  3
                </span>
                Work begins
              </div>
              <p>this is the last step woo</p>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="/contact">
              <button
                type="button"
                className="text-gray-700 outline-double bg-amber-300 hover:bg-amber-100 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2 text-center mt-3 mr-3 md:mr-0"
              >
                Let&apos;s go!
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
