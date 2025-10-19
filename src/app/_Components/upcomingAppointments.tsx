"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { CalendarDays } from "lucide-react";

export default function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      client: "John Doe",
      service: "Haircut",
      date: "2025-08-12",
      time: "10:00 AM",
    },
    {
      id: 2,
      client: "Sarah Smith",
      service: "Shave",
      date: "2025-08-12",
      time: "1:30 PM",
    },
    {
      id: 3,
      client: "Michael Brown",
      service: "Hair Color",
      date: "2025-08-13",
      time: "9:00 AM",
    },
    {
      id: 4,
      client: "Emily White",
      service: "Facial",
      date: "2025-08-14",
      time: "3:00 PM",
    },
  ];

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  return (
    <div className="relative z-10 w-11/12 max-w-6xl mx-auto rounded-2xl p-6 bg-white/90 backdrop-blur-md shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-gray-900  text-xl">Upcoming Appointments</h2>
        </div>
      </div>

      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="keen-slider__slide rounded-xl shadow-md bg-gradient-to-tr from-blue-50 to-indigo-100 border border-gray-200 p-6 flex flex-col justify-between transform transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {appt.client}
              </p>
              <p className="text-sm text-indigo-600">{appt.service}</p>
            </div>
            <div className="text-right mt-4">
              <p className="text-sm font-medium text-gray-800">{appt.date}</p>
              <p className="text-xs text-gray-600">{appt.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
