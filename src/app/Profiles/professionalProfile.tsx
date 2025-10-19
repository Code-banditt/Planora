"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Menu } from "lucide-react";

import Link from "next/link";
import { useUser } from "../reactQueryCalls/useGetUsers";
import { useParams, useRouter } from "next/navigation";
import ProgressBar from "../_Components/loadingProgress";
import base64url from "base64url";

export default function PlanoraProfessionalProfile() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  const params = useParams();
  const encodedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = encodedId ? base64url.decode(encodedId) : undefined; // Decode only if available

  const { data: user, error, isLoading } = useUser(id ?? "");

  if (isLoading) {
    return (
      <>
        <ProgressBar />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-sm flex items-center gap-2  font-bold text-blue-900 cursor-pointer"
              >
                <ArrowLeft /> Back
              </button>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                <Link href="#" className="hover:text-blue-700">
                  Profile
                </Link>
                <Link href="#" className="hover:text-blue-700">
                  Settings
                </Link>
              </nav>

              <button
                className="hidden md:inline-block px-3 py-1.5 rounded-md bg-blue-900 text-white text-sm font-semibold"
                aria-label="Book"
              >
                Book
              </button>

              <button
                className="md:hidden p-2 rounded-md"
                onClick={() => setMobileNavOpen((s) => !s)}
                aria-label="Toggle"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-2">
              <a href="#" className="block text-gray-700">
                Jobs
              </a>
              <a href="#" className="block text-gray-700">
                Resume
              </a>
              <a href="#" className="block text-gray-700">
                Profile
              </a>
              <a href="#" className="block text-gray-700">
                Settings
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - 2 cols on lg */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
              <div className="p-6 flex flex-col items-start gap-4">
                <div className="w-full flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={user?.professional.avatar ?? "/avatar"}
                      alt={user?.professional.name ?? "avatar"}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {user?.professional.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.professional.title}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-sm text-gray-800">
                    {user?.professional.email}
                  </div>
                  <div className="text-sm text-gray-800">
                    {user?.professional.phone}
                  </div>
                </div>

                <div className="w-full">
                  <button className="w-full px-3 py-2 bg-blue-900 text-white rounded-md text-sm font-semibold">
                    Message
                  </button>
                </div>

                <div className="w-full">
                  <button className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white flex items-center justify-center gap-2">
                    <Calendar />
                    <span>View calendar</span>
                  </button>
                </div>

                <div className="pt-4 w-full border-t">
                  <nav className="flex flex-col space-y-2 text-sm">
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      Overview
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      Services
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      Reviews
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-700">
                      Gallery
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content - 7 cols on lg */}
          <section className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user?.professional.name}
                  </h1>
                  <div className="text-sm text-gray-500">
                    Professional {user?.professional.title}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    {user?.professional.location}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm font-semibold">
                    Book
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Message
                  </button>
                </div>
              </div>

              {/* Status cards */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-xs text-red-500">Urgent</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-xs text-yellow-500">Pending</div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-xs text-green-500">Completed</div>
                </div>
              </div>

              {/* About */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <p className="text-sm text-gray-700 mt-2">
                  {user?.professional.about}
                </p>
              </div>

              {/* Experience */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience
                </h3>
                <div className="mt-4 space-y-3">
                  {user?.professional?.experiences?.length ? (
                    user.professional.experiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="border rounded-md p-4 bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold">{exp.role}</div>
                            <div className="text-sm text-gray-500">
                              {exp.company}
                            </div>
                            <div className="text-xs text-gray-400">
                              {exp.date} • {exp.location}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {/* actions */}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          {exp.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No experiences added yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Skills & Tools */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(user?.professional?.skills ?? []).map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 border text-gray-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Tools
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {user?.professional.tools.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 border text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Projects (placeholder) */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Projects
                  </h3>
                  <div className="mt-3 space-y-3">
                    <div className="p-4 border rounded-md bg-gray-50">
                      <div className="font-semibold">
                        SaaS Analytics of Apio.io
                      </div>
                      <div className="text-sm text-gray-500">
                        Contract • Remote
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right sidebar - 3 cols on lg */}
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6  top-6">
                <h4 className="font-semibold text-gray-900">References</h4>
                <div className="mt-4 space-y-3">
                  {user?.professional.references.map((r, i) => (
                    <div key={i} className="p-3 border rounded-md bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-black">
                          {r.name}
                        </div>
                        <div className="text-xs text-yellow-600">
                          {r.rating}★
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">{r.role}</div>
                      <p className="text-sm text-gray-700 mt-2">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h4 className="font-semibold text-gray-900">Services</h4>
                <div className="mt-4 space-y-4">
                  {user?.professional.services.map((service, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ⏱ {service.duration} mins
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-bold text-blue-900">
                          ${service.price}
                        </div>
                        <button className="mt-2 px-3 py-1 text-xs rounded-md bg-blue-900 text-white hover:bg-blue-800">
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
