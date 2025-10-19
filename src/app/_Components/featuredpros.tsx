"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { fetchUsers } from "../lib/fetchPros";
import { useQuery } from "@tanstack/react-query";

const Feauture = () => {
  const { data: pros = [], isLoading } = useQuery({
    queryKey: ["pros"],
    queryFn: fetchUsers,
  });

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Featured Professionals
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Browse some of the most trusted professionals on our platform.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-3">
            {pros.slice(0, 3).map((pro, i) => (
              <div key={i} className="relative group">
                <div className="overflow-hidden rounded-xl relative w-full h-64 md:h-56 lg:h-80">
                  <Image
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src={
                      pro.professional.avatar ||
                      "https://via.placeholder.com/400"
                    }
                    alt={pro.professional.name}
                  />

                  {/* Hover Book Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                    <Link
                      href={`/Appointment/${pro._id}`}
                      className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="flex items-start justify-between mt-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {pro.professional.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {pro.professional.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-900">
                      ⭐ {pro.professional.references[0]?.rating || "4.5"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feauture;
