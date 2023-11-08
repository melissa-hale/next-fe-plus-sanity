"use client";

import Image from "next/image";
import { Ibarra_Real_Nova } from "@next/font/google";

const headerFont = Ibarra_Real_Nova({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export default function Success() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-amber-100 bg-opacity-80 flex flex-col justify-center items-center">
      <Image src="/check-mark.png" width={200} height={200} alt="Check mark" />
      <h1
        className={`${headerFont.variable} font-headers text-green-900 text-3xl drop-shadow font-extrabold text-center`}
      >
        Your Message Was Sent!
      </h1>
      <p className="text-center">We will be in touch soon.</p>
    </div>
  );
}
