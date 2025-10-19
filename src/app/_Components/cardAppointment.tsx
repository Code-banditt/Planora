"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Appointment {
  id: number;
  name: string;
  profilePic: string;
  date: string;
}

interface Props {
  appointments: Appointment[];
}

export default function UpcomingAppointments({ appointments }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? appointments.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === appointments.length - 1 ? 0 : prev + 1
    );
  };

  const currentAppointment = appointments[currentIndex];

  return (
    <div className="lg:col-span-7 mt-6 bg-white h-[300px] px-6 py-3 rounded-lg flex flex-col gap-4">
      <span className="text-md font-semibold flex justify-between">
        <h2>Upcoming Appointments</h2>
        <div className="flex gap-2">
          <button onClick={handlePrev} className="bg-gray-200 p-1 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNext} className="bg-gray-200 p-1 rounded-full">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </span>

      <div className="flex flex-col items-center justify-center flex-1"></div>
    </div>
  );
}
