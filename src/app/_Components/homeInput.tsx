"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function HomeInput() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full  p-6 text-white bg-blue-950 shadow-xl rounded-4xl">
      {/* Wrapper with max width */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Header with title and burger button on small */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-gray-100 font-bold text-xl">
            Find a Professional
          </h2>
          <button
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle search form"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6 text-gray-100"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-100"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Form */}
        <form
          className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-x-2 gap-y-4 items-end w-full ${
            isOpen ? "block" : "hidden"
          } md:grid`}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-white mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full rounded-xl border-2 border-gray-300 px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-white mb-1">
              Category
            </label>
            <select className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
              <option>Select category</option>
              <option>General Practitioner</option>
              <option>Dentist</option>
              <option>Pediatrician</option>
              <option>Dermatologist</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transition flex items-center justify-center"
            >
              <Search />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
