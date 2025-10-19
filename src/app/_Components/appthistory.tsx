"use client";

import { useState, useMemo } from "react";
import { Calendar, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import ProgressBar from "@/app/_Components/loadingProgress";

export default function AppointmentHistory() {
  const { data: session } = useSession();
  const { data, isLoading } = useAppointments();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // FILTER + SEARCH
  const filtered = useMemo(() => {
    return data
      ?.filter((appt) =>
        statusFilter === "all" ? true : appt.status === statusFilter
      )
      .filter(
        (appt) =>
          appt.service.toLowerCase().includes(search.toLowerCase()) ||
          (typeof appt.professional === "string"
            ? appt.professional.toLowerCase().includes(search.toLowerCase())
            : appt.professional?.name
                .toLowerCase()
                .includes(search.toLowerCase()))
      );
  }, [data, search, statusFilter]);

  if (isLoading) return <ProgressBar />;

  // PAGINATION
  const totalPages = Math.ceil((filtered?.length || 0) / rowsPerPage);
  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <Calendar />
          <h2 className="font-semibold text-lg">Appointment History</h2>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search service or professional..."
              className="pl-8 pr-3 py-2 rounded-lg border text-sm w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              size={16}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-3">Service</th>
              <th className="p-3">Professional</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated?.length ? (
              paginated.map((appt, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{appt.service}</td>
                  <td className="p-3">
                    {typeof appt.professional === "string"
                      ? appt.professional
                      : appt.professional?.name}
                  </td>
                  <td className="p-3">
                    {new Date(appt.date).toLocaleDateString()} •{" "}
                    {new Date(appt.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appt.status === "accepted"
                          ? "bg-green-100 text-green-600"
                          : appt.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 text-sm"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
