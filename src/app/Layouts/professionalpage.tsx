import Image from "next/image";
import image1 from "/public/imgs/designer2.png";
import { motion } from "framer-motion";

import PlanoraHead from "../_Components/professionalheader";

import ProFeatures from "../_Components/stepsProf";
import TestimonialCarousel from "../_Components/testimonial";
import Link from "next/link";
import Footer from "../_Components/whychoose";

export default function ProfessionalPage() {
  return (
    <>
      <main className="min-h-screen relative bg-white flex flex-col py-4">
        {/* Header */}
        <PlanoraHead />

        {/* Hero section */}
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
                    Manage Appointments
                  </p>
                  <h1 className="mt-4 text-4xl font-bold lg:mt-8 sm:text-6xl xl:text-8xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    Control Your Schedule
                  </h1>
                  <p className="mt-4 text-base bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent lg:mt-8 sm:text-xl">
                    Accept, edit, reschedule, Reject Appointments to your liking
                  </p>

                  <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                    <Link
                      href="/Dashboard"
                      className="inline-flex items-center px-6 py-4 mt-8 !font-semibold !text-black transition-all duration-200 !bg-yellow-300 rounded-full !hover:bg-yellow-400 !focus:bg-yellow-400"
                      role="button"
                    >
                      View Dashboard
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
                </div>
              </motion.div>

              {/* Right Image */}
              <div className="flex justify-center lg:justify-end h-full">
                <Image
                  src={image1}
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

        {/* Upcoming Appointments with negative margin to overlap */}

        {/* Steps section */}
        <div className="max-w-7xl mx-auto px-12 py-10">
          <ProFeatures />
        </div>

        {/* Steps for Professionals */}
        <TestimonialCarousel />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="container mx-auto px-8  flex flex-col justify-center items-center leading-relaxed"
        >
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
