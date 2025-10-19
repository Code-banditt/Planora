"use client";

import React, { useState } from "react";
import type { JSX } from "react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import LoadingDots from "@/app/_Components/loading";

// Payment provider logos
const paymentIcons: Record<string, JSX.Element> = {
  Visa: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
      alt="Visa"
      className="w-10 h-6 object-contain"
    />
  ),
  Mastercard: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
      alt="Mastercard"
      className="w-10 h-6 object-contain"
    />
  ),
  GPay: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png"
      alt="GPay"
      className="w-10 h-6 object-contain"
    />
  ),
  Discover: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Discover_Card_logo.svg"
      alt="Discover"
      className="w-10 h-6 object-contain"
    />
  ),
};

// Status badge colors
const statusColors: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-100",
  completed: "text-green-600 bg-green-100",
  rescheduled: "text-blue-600 bg-blue-100",
  cancelled: "text-red-600 bg-red-100",
};

export function UserTransactionsTable() {
  const { data: appointments, isLoading, isError } = useAppointments();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingDots />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load transactions
      </div>
    );
  }

  // Apply search filter
  const filteredAppointments = appointments?.filter(
    (appt) =>
      appt.client?.name.toLowerCase().includes(search.toLowerCase()) ||
      (typeof appt.professional === "object" &&
        appt.professional?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())) ||
      appt.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-12 bg-white rounded-lg shadow-md p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
          Transactions
        </h2>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v1M4 9h16M4 15h16M4 21h16"
              />
            </svg>
            <span>Filters</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold">
            + Add Manually
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search by name, professional, or service"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredAppointments && filteredAppointments.length > 0 ? (
          <table className="min-w-full text-left text-sm font-light">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="pl-4 pr-6 py-3 w-8">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                </th>
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Professional</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr
                  key={appt._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="pl-4 pr-6 py-4">
                    <input
                      type="radio"
                      name="selectTransaction"
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-700">
                    {appt._id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {appt.client?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {typeof appt.professional === "object"
                      ? appt.professional.name
                      : appt.professional}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(appt.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    {appt.payment?.method &&
                    paymentIcons[appt.payment.method] ? (
                      paymentIcons[appt.payment.method]
                    ) : (
                      <span className="text-gray-500">
                        {appt.payment?.method}
                      </span>
                    )}
                    <div className="flex flex-col text-xs text-gray-500 leading-tight">
                      <span>{appt.payment?.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {appt.payment?.amount} {appt.payment?.currency}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-md ${
                        statusColors[appt.status] || "text-gray-600 bg-gray-100"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-4 text-gray-500">
                    <button
                      aria-label="Download"
                      className="hover:text-gray-900 transition"
                    >
                      ⬇️
                    </button>
                    <button
                      aria-label="Delete"
                      className="hover:text-red-600 transition"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No transactions found
          </div>
        )}
      </div>

      {/* Pagination (static for now) */}
      <div className="flex justify-between items-center mt-6 text-gray-600 text-sm">
        <button
          type="button"
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Previous Page"
        >
          ◀
        </button>
        <div className="space-x-2">
          <button className="px-3 py-1 rounded-md bg-gray-200 font-semibold">
            1
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
          <span className="px-3 py-1">...</span>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">7</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">8</button>
        </div>
        <button
          type="button"
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Next Page"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
