"use client";

import { useParams } from "next/navigation";
import { useUser } from "@/app/reactQueryCalls/useGetUsers";
import { useState } from "react";
import AppointmentForm from "@/app/_Components/appointmentForm";
import LoadingDots from "@/app/_Components/loading";
import ProgressBar from "@/app/_Components/loadingProgress";
import {
  CheckBadgeIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import AppointmentSuccessModal from "@/app/_Components/Congratulations";
import base64url from "base64url";

export default function ProfessionalProfilePage() {
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const params = useParams();
  const encodedId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = encodedId ? base64url.decode(encodedId) : undefined; // Decode only if available

  const { data: user, error, isLoading } = useUser(id ?? "");

  if (isLoading) {
    return (
      <>
        <ProgressBar />
        <div className="min-h-screen flex items-center justify-center bg-blue-950">
          <LoadingDots />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700">
        Failed to load profile.
      </div>
    );
  }

  const professional = user?.professional;

  if (!professional) {
    return <div className="text-center py-12">No professional data found.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="h-40 w-full"
        style={{
          background:
            "linear-gradient(90deg, #ffb347 0%, #ffcc33 25%, #33ccff 50%, #ff66cc 75%, #33ffcc 100%)",
        }}
      />

      {/* Profile */}
      <div className="px-8 -mt-20 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Avatar + Info */}
        <div className="flex items-center space-x-6">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="w-28 h-28 rounded-full ring-4 ring-white object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {professional.name}
              {professional.email && (
                <CheckBadgeIcon className="w-7 h-7 text-blue-600" />
              )}
            </h1>
            <p className="text-gray-500">{professional.title}</p>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {professional.location || "Unknown"}
            </p>
            <div className="flex items-center mt-2 text-yellow-500">
              <StarIcon className="w-5 h-5" />
              <span className="ml-1 font-medium">4.5</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 sm:mt-0 flex space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 !text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-gray-700 transition"
          >
            Book Appointment
          </button>
          <button className="border border-gray-900 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
            Settings
          </button>
        </div>
      </div>

      {/* Role + Skills */}
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-sm">Current role:</span>
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
            {professional.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
          <span className="text-gray-400 text-sm mr-2">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {professional.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Availability & Services */}
      <div className="px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Availability */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-900 font-semibold mb-4">Availability</h3>
          <div className="flex flex-wrap gap-3">
            {professional.availability?.map((slot, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {slot.day.join(", ")}{" "}
                <span className="text-gray-500">
                  ({slot.from} - {slot.to})
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-900 font-semibold mb-4">Services</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {professional.services?.map((service, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <h4 className="text-gray-900 font-medium text-lg">
                  {service.name}
                </h4>
                <p className="text-gray-500 text-sm mt-1">
                  {service.name || "Professional service"}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-blue-600 font-bold">
                    ${service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          identity={user}
          professional={{ ...professional }}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            console.log("Appointment booked:", data);
            setShowForm(false);
          }}
          setModalOpen={setModalOpen}
        />
      )}
      {modalOpen && <AppointmentSuccessModal setModalOpen={setModalOpen} />}
    </main>
  );
}
