"use client";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ProfessionalData } from "../types";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

export default function ProfessionalCard({ pro }: { pro: ProfessionalData }) {
  const router = useRouter();

  return (
    <div className="max-w-sm w-full bg-white shadow-md overflow-hidden border text-gray-800">
      {/* Cover images (static placeholders for now) */}
      <div className="h-28 w-full">
        <Image
          src={pro?.professional.avatar}
          alt={pro?.professional.name || "Professional avatar"}
          width={1200}
          height={200}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Profile section */}
      <div className="relative px-6 pb-6">
        {/* Profile avatar */}
        <div className="flex justify-center -mt-16">
          <Image
            src={pro?.professional.avatar}
            alt={pro?.professional.name}
            width={96}
            height={96}
            className="w-24 h-24 border-4 border-white object-cover shadow-md rounded-full"
            priority
          />
        </div>

        {/* Name + Title + Location */}
        <div className="text-center mt-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {pro?.professional.name}
          </h2>
          <p className="text-sm text-blue-900 font-medium">
            {pro?.professional.title}
          </p>
          <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
            <MapPinIcon className="w-4 h-4 mr-1" />
            {pro?.professional.location ?? "Unknown"}
          </div>
          <span className="inline-block mt-2 text-pink-600 text-sm font-medium border border-pink-500 px-3 py-0.5">
            Freelance
          </span>
        </div>

        {/* Stats (rating + appreciations + project views) */}
        <div className="flex justify-around mt-5 text-center">
          <div>
            <p className="font-semibold text-gray-800">
              ⭐ {pro?.professional.references[0]?.rating ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {pro?.professional.references[0]?.rating ?? 0}
            </p>
            <p className="text-xs text-gray-500">Appreciations</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {pro?.professional.references[0]?.rating ?? 0}
            </p>
            <p className="text-xs text-gray-500">Project Views</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => router.push(`/profilePage/${pro._id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 flex items-center justify-center gap-2"
          >
            <Info className="w-5 h-5" /> Info
          </button>
          <button
            onClick={() => router.push(`/Appointment/${pro._id}`)}
            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
