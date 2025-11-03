import Image from "next/image";
import Link from "next/link";

import image2 from "/public/imgs/freepik1.jpeg";
import PlanoraHeader from "./userheader";
import { motion } from "framer-motion";

export default function LandingHero() {
  return (
    <div className="bg-blue-950">
      <PlanoraHeader />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-white text-white bg-opacity-30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-12 h-full">
            {/* Left Text */}

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="text-center lg:text-left flex flex-col justify-center h-full">
                <p className="text-base font-semibold tracking-wider text-blue-900 uppercase">
                  Book your Appointments
                </p>
                <h1 className="mt-4 text-4xl font-bold lg:mt-8 sm:text-6xl xl:text-8xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Connect & Find Pros Online
                </h1>
                <p className="mt-4 text-base bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent lg:mt-8 sm:text-xl">
                  To solve your needs and Perform Tasks For you.
                </p>

                <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                  <Link
                    href="/findProfessional"
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold !text-black transition-all duration-200 !bg-yellow-300 rounded-full hover:bg-yellow-400 focus:bg-yellow-400"
                    role="button"
                  >
                    Find A Pro
                    <svg
                      className="w-6 h-6 ml-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                </div>

                <p className="!mt-3 text-blue-950">
                  Or do you wanna be a pro?{" "}
                  <Link
                    href="/FormPage"
                    className="!text-blue-900 font-semibold hover:underline"
                  >
                    Become a Pro
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end h-full">
              <Image
                src={image2}
                alt="Hero illustration"
                width={600}
                height={500}
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
