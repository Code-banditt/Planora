"use client";

import React, { useState, useEffect } from "react";
import ProfessionalCard from "@/app/_Components/ProfessionalCard";
import { fetchUsers } from "../lib/fetchPros";
import { useQuery } from "@tanstack/react-query";
import { Filter, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const PROFESSIONS = [
  "Doctor",
  "Nurse",
  "Dentist",
  "Therapist",
  "Personal Trainer",
  "Nutritionist",
  "Barber",
  "Makeup Artist",
  "Photographer",
  "Videographer",
  "Graphic Designer",
  "Web Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Digital Marketer",
  "SEO Specialist",
  "Content Writer",
  "Social Media Manager",
  "Lawyer",
  "Accountant",
  "Real Estate Agent",
  "Teacher",
  "Event Planner",
  "Plumber",
  "Electrician",
  "Other",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ProfessionalsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: pros = [], isLoading } = useQuery({
    queryKey: ["pros"],
    queryFn: fetchUsers,
  });

  // Disable background scroll when sidebar is open (mobile only)
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isFilterOpen]);

  // Filtering
  const filteredPros = pros
    .filter((pro) =>
      filter
        ? pro.professional?.title?.toLowerCase().includes(filter.toLowerCase())
        : true
    )
    .filter((pro) =>
      selectedDays.length > 0
        ? selectedDays.some((day) =>
            pro.professional?.availability?.some((a) => a.day.includes(day))
          )
        : true
    )
    .filter((pro) =>
      searchTerm
        ? (pro.professional?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          pro.professional?.services?.some((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true
    );

  // Sorting
  const sortedPros = filteredPros.sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return (a.professional?.name || "").localeCompare(
          b.professional?.name || ""
        );
      case "name-desc":
        return (b.professional?.name || "").localeCompare(
          a.professional?.name || ""
        );
      case "profession-asc":
        return (a.professional?.title || "").localeCompare(
          b.professional?.title || ""
        );
      case "profession-desc":
        return (b.professional?.title || "").localeCompare(
          a.professional?.title || ""
        );
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPros.length / itemsPerPage);
  const paginatedPros = sortedPros.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const clearFilters = () => {
    setFilter("");
    setSelectedDays([]);
    setSearchTerm("");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Overlay (Mobile Only) */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
    ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0`}
      >
        <div className="p-6 overflow-y-auto h-full relative">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Filters</h2>

          {/* Profession Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profession
            </label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Professions</option>
              {PROFESSIONS.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>

          {/* Days Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Days Available
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {DAYS.map((day) => (
                <label key={day} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => {
                      toggleDay(day);
                      setCurrentPage(1);
                    }}
                    className="form-checkbox rounded text-blue-600"
                  />
                  <span className="text-sm">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={clearFilters}
              className="flex-1 bg-red-500 text-white py-2 rounded-md"
            >
              Clear
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md"
            >
              Apply
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 lg:ml-72">
        <div className="relative mb-10 rounded-xl overflow-hidden shadow-md">
          <Image
            src="https://pikaso.cdnpk.net/private/production/2476468763/render.png?preview=true&token=exp=1761935425~hmac=03967a6094c9002d68a5513303f6806890c03cdb1fc6cbe11ecb312efbcb635d&size=300"
            alt="Promotional Banner"
            width={1600}
            height={400}
            className="w-full h-52 lg:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Find the Right Professional for You
            </h2>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Professionals</h1>
            <p className="text-gray-600 mt-2">
              Discover experts across multiple domains
            </p>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="flex space-x-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="profession-asc">Profession A-Z</option>
            <option value="profession-desc">Profession Z-A</option>
          </select>
        </div>

        {/* Professionals Grid */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-52 bg-gray-300 rounded-lg animate-pulse shadow-md"
              />
            ))}
          </div>
        ) : paginatedPros.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedPros.map((pro, i) => (
              <ProfessionalCard key={pro._id || i} pro={pro} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg font-medium">
            No professionals found matching your criteria.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white shadow disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full shadow ${
                    pageNum === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white shadow disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </main>

      {/* Floating Filter Button (Mobile & Tablet Only) */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
      >
        <Filter className="w-5 h-5" />
      </button>
    </div>
  );
}
