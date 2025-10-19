"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import clsx from "clsx";

// Badge styling for appointment status
const statusStyles: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700 animate-pulse",
  canceled: "bg-red-100 text-red-700",
  completed: "bg-gray-100 text-gray-600",
};

export default function UserProfile() {
  const { data: session } = useSession();
  const { data: appointments, isLoading } = useAppointments();
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading appointments...</div>;
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Image
          src="/imgs/empty.png"
          alt="No appointments"
          width={200}
          height={200}
          className="opacity-70"
        />
        <p className="mt-4 text-gray-500">No appointments found.</p>
        <button className="mt-6 px-4 py-2 bg-blue-900 text-white rounded-lg">
          Book your first appointment
        </button>
      </div>
    );
  }

  // Group appointment history by month
  const groupedHistory = appointments.reduce((acc, app) => {
    const month = new Date(app.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = acc[month] ? [...acc[month], app] : [app];
    return acc;
  }, {} as Record<string, typeof appointments>);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-blue-900 !text-white relative p-8 rounded-t-2xl">
          {/* Avatar */}
          <div className="absolute -bottom-10 left-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            <span className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-700">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Nav & Tabs */}
          <nav className="flex items-center justify-between mb-12">
            <span className="font-bold text-xl select-none">
              {session?.user?.name}
            </span>

            <ul className="hidden sm:flex space-x-6 text-sm font-semibold !text-black select-none">
              {["overview", "accounts", "activities", "spending"].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "cursor-pointer px-3 py-1 rounded-full",
                    activeTab === tab
                      ? "bg-white !text-black"
                      : "hover:text-black"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full hover:bg-gray-100 transition !text-black">
                <MessageSquare size={16} /> Chats
              </button>
              <button className="flex items-center gap-2 text-sm bg-white px-3 py-1 rounded-full hover:bg-gray-100 transition !text-black">
                <Calendar size={16} /> Appointments
              </button>
            </div>
          </nav>

          {/* Profile Info */}
          <div className="ml-36 pt-4">
            <p className="text-sm !text-white">{session?.user?.email}</p>
            <p className="mt-1 text-xs bg-white/50 px-2 py-0.5 rounded-full inline-block">
              {session?.user?.role || "Member"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {activeTab === "overview" && (
            <>
              {/* Appointment History */}
              <section className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-4 !text-black">
                  Appointment History
                </h3>
                <div className="space-y-4">
                  {Object.entries(groupedHistory).map(([month, apps]) => (
                    <div key={month}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        {month}
                      </h4>
                      <ul className="space-y-2">
                        {apps.map((app) => (
                          <li
                            key={app._id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>
                              {app.service} with{" "}
                              {typeof app.professional === "object" &&
                              app.professional?.name
                                ? app.professional.name
                                : typeof app.professional === "string"
                                ? app.professional
                                : ""}
                            </span>
                            <span
                              className={clsx(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                statusStyles[app.status] || "bg-gray-200"
                              )}
                            >
                              {app.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Associated People */}
              <section className="bg-white rounded-xl p-6">
                <h3 className="font-semibold mb-4 text-gray-900">
                  Associated People
                </h3>
                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div key={app._id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                        {typeof app.professional === "object" &&
                        app.professional?.name
                          ? app.professional.name.charAt(0)
                          : typeof app.professional === "string" &&
                            app.professional
                          ? app.professional.charAt(0)
                          : "?"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {typeof app.professional === "object" &&
                          app.professional?.name
                            ? app.professional.name
                            : typeof app.professional === "string"
                            ? app.professional
                            : ""}
                        </p>
                        <p className="text-xs text-gray-500">{app.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab !== "overview" && (
            <section className="bg-white rounded-xl p-6">
              <p className="text-gray-500">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content
                coming soon...
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
