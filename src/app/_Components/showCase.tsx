"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import image1 from "/public/imgs/lawyer.png";
import { ArrowRight } from "lucide-react";

export default function ShowCase() {
  const badges = [
    {
      name: "Sophia",
      profession: "Hair Stylist",
      pfp: image1,
      rating: 4.8,
      position: "absolute -top-6 -left-16",
    },
    {
      name: "David",
      profession: "Plumber",
      pfp: image1,
      rating: 4.6,
      position: "absolute top-12 -right-20",
    },
    {
      name: "Amira",
      profession: "Personal Trainer",
      pfp: image1,
      rating: 5.0,
      position: "absolute bottom-10 -left-12",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12 text-black mt-18 ">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          There’s no profession you can’t find on Planora
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-lg leading-relaxed">
          Explore a wide range of professionals ready to assist you. From beauty
          and wellness to home services and more, Planora connects you with the
          best in the business.
        </p>
      </div>

      {/* Floating Cards Around Image */}
      <div className="mt-16 relative w-fit mx-auto">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            className={`${badge.position}  items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-200 hidden md:flex`}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            {/* Profile picture */}
            <Image
              src={badge.pfp}
              alt={badge.name}
              width={40}
              height={40}
              className="rounded-full border border-gray-300"
            />

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {badge.name}
              </span>
              <span className="text-xs text-gray-500">{badge.profession}</span>
              <div className="flex items-center text-yellow-500 text-xs">
                {"⭐".repeat(Math.round(badge.rating))}
                <span className="ml-1 text-gray-600">
                  {badge.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Main image */}
        <Image
          src={image1}
          alt="Featured Professional"
          width={384}
          height={216}
          className="rounded-2xl shadow-2xl border border-white/10"
        />
      </div>
    </section>
  );
}
