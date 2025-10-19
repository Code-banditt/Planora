"use client";

import React from "react";
import Image from "next/image";

const Reviews = () => {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 font-pj">
              Reviews from our users
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              What clients say about Planora
            </h2>
          </div>

          <div className="mt-8 text-center md:mt-16 md:order-3">
            <a
              href="#"
              className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
            >
              Read all 2,157 reviews
            </a>
          </div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"></div>
            </div>

            {/* Reviews Grid */}
            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {/* Review 1 */}
              <div className="flex flex-col overflow-hidden shadow-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-blue-950 lg:py-8 lg:px-7 text-white">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-[#FDB241]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>

                    <blockquote className="flex-1 mt-8">
                      <p className="text-lg leading-relaxed text-white font-pj">
                        “Booking a fitness coach through Planora was seamless. I
                        scheduled my sessions in minutes and the experience has
                        been fantastic.”
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-8">
                    <Image
                      className="rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                      alt="reviewer"
                      width={44}
                      height={44}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-white font-pj">
                        Leslie Alexander
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-white">
                        Fitness Enthusiast
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="flex flex-col overflow-hidden shadow-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-blue-950 lg:py-8 lg:px-7 text-white">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-[#FDB241]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>

                    <blockquote className="flex-1 mt-8">
                      <p className="text-lg leading-relaxed text-white font-pj">
                        “I found a great dentist on Planora. The reviews were
                        accurate, and booking my appointment was effortless.”
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-8">
                    <Image
                      className="rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                      alt="reviewer"
                      width={44}
                      height={44}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-white font-pj">
                        Jacob Jones
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-white">
                        Marketing Professional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="flex flex-col overflow-hidden shadow-xl">
                <div className="flex flex-col justify-between flex-1 p-6 bg-blue-950 lg:py-8 lg:px-7 text-white">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-[#FDB241]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>

                    <blockquote className="flex-1 mt-8">
                      <p className="text-lg leading-relaxed text-white font-pj">
                        “As a photographer, I love using Planora to connect with
                        clients. It’s simple, professional, and helps me grow my
                        business.”
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-8">
                    <Image
                      className="rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                      alt="reviewer"
                      width={44}
                      height={44}
                    />
                    <div className="ml-4">
                      <p className="text-base font-bold text-white font-pj">
                        Jenny Wilson
                      </p>
                      <p className="mt-0.5 text-sm font-pj text-white">
                        Professional Photographer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Review */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
