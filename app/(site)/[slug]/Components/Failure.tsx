"use client";

import { Ibarra_Real_Nova } from "@next/font/google";
import Image from "next/image";

const headerFont = Ibarra_Real_Nova({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export default function Failure() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-amber-100 bg-opacity-80 flex flex-col justify-center items-center">
      <Image src="/failed.png" width={200} height={200} alt="Failure" />
      <h1
        className={`${headerFont.variable} font-headers text-red-900 text-3xl drop-shadow font-extrabold`}
      >
        Oops.
      </h1>
      <p>Your message failed to send.</p>
      <p>Our site administrators have been notified.</p>
      <p>
        In the meantime, please feel free to send me a text at (832)788-3667
      </p>
    </div>
  );
}
