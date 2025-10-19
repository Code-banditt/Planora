"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

import { useSession } from "next-auth/react";
import { useUser } from "@/app/reactQueryCalls/useGetUsers";
import ProgressBar from "@/app/_Components/loadingProgress";

export default function PProfessionalProfile({}) {
  const { data: session, status } = useSession();
  console.log(session);

  const userid = session?.user.id;
  const { data: user, error, isLoading } = useUser(userid ?? "");
  if (isLoading) {
    return <ProgressBar />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
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
                      src={user?.professional.avatar || "/avatar"}
                      alt={user?.professional.title || "professional"}
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
                      Professional {user?.professional.title}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="text-sm text-gray-800">
                    {user?.professional.email}
                  </div>
                  <div className="text-sm text-blue-950 mt-2">
                    {user?.professional.phone}
                  </div>
                </div>

                <div className="w-full">
                  <button className="w-full px-3 py-2 bg-gray-900 text-white rounded-md text-sm font-semibold">
                    View Messages
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
                  <button className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Appointments
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
                  {user?.professional?.experiences?.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border rounded-md p-4 bg-gray-50 text-black"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">
                            {exp.role}
                          </div>
                          <div className="text-sm text-gray-900">
                            {exp.company}
                          </div>
                          <div className="text-xs text-gray-400">
                            {exp.date} • {exp.location}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Tools */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {user?.professional.skills.map((s, i) => (
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
                  <h3 className="text-lg font-semibold text-gray-900">Tools</h3>
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

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L15 12 9.75 7"
                    />
                  </svg>
                  Services
                </h4>

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
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
