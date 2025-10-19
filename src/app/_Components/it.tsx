"use client";

import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-blue-900 sm:text-4xl lg:text-5xl">
            How does Planora work?
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Planora makes it simple to connect with trusted professionals for
            any service you need — from doctors and trainers to designers and
            photographers.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="steps line"
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            {/* Step 1 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-blue-200 rounded-full shadow">
                <span className="text-xl font-semibold text-blue-900"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Sign Up for Free
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Create your free Planora account in just a few seconds and get
                access to a wide range of professionals across industries.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-blue-200 rounded-full shadow">
                <span className="text-xl font-semibold text-blue-900"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Find Professionals
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Browse, search, and filter professionals that fit your exact
                needs — from healthcare to creative services and beyond.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-blue-200 rounded-full shadow">
                <span className="text-xl font-semibold text-blue-900"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Book & Connect
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Schedule appointments or services directly through Planora and
                connect with trusted professionals easily and securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
