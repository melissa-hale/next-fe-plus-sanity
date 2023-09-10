"use client";

import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";
import { PatternFormat } from "react-number-format";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  content: PortableTextBlock[];
};

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  comments: string;
}

export default function ContactForm({ content }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
      <div className="text-lg text-gray-700 mt-7 mb-7">
        <PortableText value={content} components={serializer} />
      </div>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.firstName ? "true" : "false"}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            {errors.firstName?.type === "required" && (
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
              {...register("lastName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              aria-invalid={errors.lastName ? "true" : "false"}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
            {errors.lastName?.type === "required" && (
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
              {...register("email", {
                required: true,
                maxLength: 20,
                pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="text"
              placeholder="Jane@email.com"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500" role="alert">
                * Email is required
              </p>
            )}
            {errors.email?.type === "pattern" && (
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
              {...register("phone", {
                required: true,
                maxLength: 20
              })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-phone"
              type="text"
              placeholder="(555)555-5555"
            />
            {errors.phone?.type === "required" && (
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
              {...register("address", { required: true, maxLength: 40 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              placeholder="123 Main Street"
            />
            {errors.address?.type === "required" && (
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
              {...register("city", { required: true, maxLength: 20 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Austin"
            />
            {errors.city?.type === "required" && (
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
                {...register("state")}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>Texas</option>
              </select>
              {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div> */}
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
              {...register("zipcode", { required: true, maxLength: 5, minLength: 5 })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="78758"
            />
            {errors.zipcode?.type === "required" && (
              <p className="text-red-500" role="alert">
                * Zip Code is required
              </p>
            )}
            {errors.zipcode?.type === "maxLength" && (
              <p className="text-red-500" role="alert">
                * Please enter a valid 5 digit zip code
              </p>
            )}
            {errors.zipcode?.type === "minLength" && (
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
    </div>
  );
}

//https://youtu.be/OcTPaUfay5I?t=7048 .. checkout tailwind pros and tailwind topography plugins
