"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import ProgressBar from "@/app/_Components/loadingProgress";

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: appointments, isLoading } = useAppointments();

  if (isLoading) return <ProgressBar />;

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "No email",
  };

  const vitalsData = [
    { label: "Total Appointments", value: appointments?.length || 0, unit: "" },
    {
      label: "Month's Expenditure",
      value:
        appointments?.reduce((sum, a) => sum + (a.payment?.amount || 0), 0) ||
        0,
      unit: "$",
    },
    {
      label: "Completed",
      value: appointments?.filter((a) => a.status === "completed").length || 0,
      unit: "",
    },
    {
      label: "Pending",
      value: appointments?.filter((a) => a.status === "pending").length || 0,
      unit: "",
    },
  ];

  const appointmentsData =
    appointments?.map((appt) => ({
      doctor:
        typeof appt.professional === "object" && appt.professional
          ? appt.professional.name
          : typeof appt.professional === "string"
          ? appt.professional
          : "N/A",
      specification: appt.service || "Service",
      date: new Date(appt.date).toLocaleDateString(),
      time: new Date(appt.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: appt.status,
      statusColor:
        appt.status === "completed"
          ? "bg-green-400"
          : appt.status === "pending"
          ? "bg-yellow-400"
          : appt.status === "cancelled"
          ? "bg-red-400"
          : "bg-gray-400",
    })) || [];

  const reportsData =
    appointments?.slice(0, 5).map((appt) => ({
      name: appt.service,
      date: new Date(appt.date).toLocaleDateString(),
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here’s your activity overview and appointment history
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 group cursor-pointer">
            <img
              src="/imgs/barber.png"
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium group-hover:text-blue-600 transition">
              {user.name}
            </span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-blue-600 rounded-xl p-6 flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Manage your appointments with ease
              </h2>
              <p>Track history, monitor spending, and stay on schedule.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {vitalsData.map(({ label, value, unit }) => (
              <div key={label} className="flex flex-col">
                <p className="text-gray-500">{label}</p>
                <p className="text-xl font-semibold mt-1">
                  {value} <span className="text-sm text-gray-400">{unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Appointments</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-2">Professional</th>
                  <th className="py-3 px-2">Service</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Time</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsData.map((a, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 flex items-center space-x-3">
                      <img
                        src="/imgs/barber.png"
                        alt={a.doctor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{a.doctor}</span>
                    </td>
                    <td className="py-3 px-2">{a.specification}</td>
                    <td className="py-3 px-2">{a.date}</td>
                    <td className="py-3 px-2">{a.time}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${a.statusColor}`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Services</h3>
            <ul className="space-y-3">
              {reportsData.map(({ name, date }) => (
                <li
                  key={name + date}
                  className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-none"
                >
                  <span className="text-gray-700">{name}</span>
                  <span className="text-gray-400 text-sm">{date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Next Appointment</h3>
            {appointments?.[0] ? (
              <div className="mt-2 bg-blue-600 text-white rounded-xl p-4">
                <div className="font-semibold">
                  {new Date(appointments[0].date).toDateString()}
                </div>
                <div className="text-sm opacity-80">
                  {appointments[0].service}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming appointments</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
