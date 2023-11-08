"use client";

import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import Success from "./Components/Success";
import Failure from "./Components/Failure";

type Props = {
  content: PortableTextBlock[];
};

interface IFormInput {
  fName: string;
  lName: string;
  em: string;
  phn: string;
  adr: string;
  cty: string;
  st: string;
  zp: string;
  comments: string;
}

export default function ContactForm({ content }: Props) {
  const [loading, setLoading] = useState(false);
  // Enum for our statuses
  const contactStatuses = {
    loading: "loading",
    submitted: "submitted",
    error: "error",
  };
  // Status of what's happening or happened in the component
  const [status, setStatus] = useState<string | undefined>();

  const formOptions = {
    mode: "onBlur" as const,
    reValidateMode: "onBlur" as const,
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>(formOptions);

  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    // Used to Abort a long running fetch.
    const abortLongFetch = new AbortController();
    // Abort after 7 seconds.
    const abortTimeoutId = setTimeout(() => abortLongFetch.abort(), 7000);

    // Don't want to actually submit the form
    e?.preventDefault();

    // console.log(data);
    setStatus(contactStatuses.loading);
    fetch("/api/contact", {
      signal: abortLongFetch.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          // If we got an 'ok' response from fetch,
          // clear the AbortController timeout
          clearTimeout(abortTimeoutId);
          return res.json();
        }
        console.log("errorrrrr:", res);
        throw new Error("Whoops! Error sending email.");
      })
      .then((res) => {
        // On a successful search, set the status to 'submitted' and
        // reset the fields
        setStatus(contactStatuses.submitted);
        reset();
      })
      .catch((err) => {
        // There was an error, catch it and set the status to 'error'
        console.log("this is the erro:", err);
        setStatus(contactStatuses.error);
      });
  };

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === "") {
          return <br />;
        }
        return <p>{value.children[0].text}</p>;
      },
    },
  };

  return (
    <div className="min-h-screen">
      {(() => {
        if (status === contactStatuses.error) {
          return <Failure />;
        } else if (status === contactStatuses.submitted) {
          return <Success />;
        } else {
          return (
            <>
              <div className="text-lg text-gray-700 mt-7 mb-7 text-center">
                <PortableText value={content} components={serializer} />
              </div>
              <form
                className="w-full center max-w-lg mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      {...register("fName", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      aria-invalid={errors.fName ? "true" : "false"}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      autoComplete="off"
                    />
                    {errors.fName?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * First name is required
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      {...register("lName", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      aria-invalid={errors.lName ? "true" : "false"}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      autoComplete="off"
                    />
                    {errors.lName?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * Last name is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      {...register("em", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      })}
                      aria-invalid={errors.em ? "true" : "false"}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-email"
                      type="text"
                      placeholder="Jane@email.com"
                      autoComplete="off"
                    />
                    {errors.em?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * Email is required
                      </p>
                    )}
                    {errors.em?.type === "pattern" && (
                      <p className="text-red-500" role="alert">
                        * Please enter a valid email address
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-phone"
                    >
                      Phone
                    </label>
                    <input
                      {...register("phn", {
                        required: true,
                        maxLength: 20,
                      })}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phone"
                      type="text"
                      placeholder="(555)555-5555"
                      autoComplete="off"
                    />
                    {errors.phn?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * Phone is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-address"
                    >
                      Address
                    </label>
                    <input
                      {...register("adr", {
                        required: true,
                        maxLength: 40,
                      })}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-address"
                      type="text"
                      placeholder="123 Main Street"
                      autoComplete="off"
                    />
                    {errors.adr?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * Address is required
                      </p>
                    )}
                    {/* <p className="text-gray-600 text-xs italic">
                                  Make it as long and as crazy as you'd like
                                </p> */}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      {...register("cty", { required: true, maxLength: 20 })}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Austin"
                      autoComplete="off"
                    />
                    {errors.cty?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * City is required
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        {...register("st")}
                        className="placeholder-gray-300 block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        <option>Texas</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Zip Code
                    </label>
                    <input
                      {...register("zp", {
                        required: true,
                        maxLength: 5,
                        minLength: 5,
                      })}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="78758"
                      autoComplete="off"
                    />
                    {errors.zp?.type === "required" && (
                      <p className="text-red-500" role="alert">
                        * Zip Code is required
                      </p>
                    )}
                    {errors.zp?.type === "maxLength" && (
                      <p className="text-red-500" role="alert">
                        * Please enter a valid 5 digit zip code
                      </p>
                    )}
                    {errors.zp?.type === "minLength" && (
                      <p className="text-red-500" role="alert">
                        * Please enter a valid 5 digit zip code
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-comments"
                    >
                      Comments
                    </label>
                    <textarea
                      {...register("comments", { maxLength: 200 })}
                      className="placeholder-gray-300 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-comments"
                      rows={4}
                      placeholder="Additional Comments"
                    />
                    {/* <p className="text-gray-600 text-xs italic">
                                  Make it as long and as crazy as you'd like
                                </p> */}
                  </div>
                </div>
                {/* <div className="md:w-1/3"></div> */}
                <div className="md:w-2/3">
                  <button
                    className="text-gray-600 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center shadow"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          );
        }
      })()}
    </div>
  );
}
