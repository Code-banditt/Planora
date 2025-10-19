"use client";

import { motion } from "framer-motion";
import Steps from "../_Components/it";
import ShowCase from "../_Components/showCase";

import LandingHero from "../_Components/hero";
import BackgroundBlogCard from "../_Components/use";
import Reviews from "../_Components/testimonial";
import Footer from "../_Components/whychoose";
import Feauture from "../_Components/featuredpros";

export default function UserLayout() {
  return (
    <main className="min-h-screen relative bg-white flex flex-col">
      {/* Header */}

      {/* New Hero Section */}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <LandingHero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <Feauture />
      </motion.div>

      {/* Steps Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <Steps />
      </motion.div>

      {/* Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
      >
        <ShowCase />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="container mx-auto px-8 py-2 flex flex-col justify-center items-center leading-relaxed"
      >
        <Reviews />
      </motion.div>

      {/* Blog Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="container mx-auto px-8  flex flex-col justify-center items-center leading-relaxed"
      >
        <BackgroundBlogCard />
      </motion.div>

      {/* Blog Section */}
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
  );
}
