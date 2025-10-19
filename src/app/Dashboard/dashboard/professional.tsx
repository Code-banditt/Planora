"use client";

import dynamic from "next/dynamic";
import { ArrowUp } from "lucide-react";

import UpcomingAppointments from "@/app/_Components/cardAppointment";

const Example = dynamic(() => import("@/app/_Components/pieCharts"), {
  ssr: false,
});
const BarExample = dynamic(() => import("@/app/_Components/reactFlow"), {
  ssr: false,
});
import { List } from "@/app/_Components/list";
import { useSession } from "next-auth/react";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";

import ProgressBar from "@/app/_Components/loadingProgress";

export default function ProfboardPage() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useAppointments();

  if (isLoading) {
    return <ProgressBar />;
  }

  // Calculate total appointments
  const totalAppointments = data ? data.length : 0;

  // Calculate upcoming appointments (assuming 'upcoming' means future dates)
  const upcomingAppointments = data
    ? data.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const now = new Date();
        return appointmentDate > now;
      })
    : [];

  //calculate revenue
  const totalPayment = data?.reduce(
    (sum, appt) => sum + (appt.payment?.amount || 0),
    0
  );

  return (
    <div className="h-full p-4 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="flex items-center gap-2 mt-2 text-gray-700">
          <strong className="bg-black text-white px-4 py-2 rounded-full text-2xl">
            {session?.user.name?.charAt(0).toUpperCase()}
          </strong>
          <span>
            <strong>{session?.user?.name}</strong>, welcome to your dashboard!
          </span>
        </span>
      </div>

      {/* FIRST ROW - Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gross Revenue */}
        <div className="bg-gray-950 text-white rounded-lg p-6 flex flex-col gap-3">
          <span className="flex justify-between items-center text-md font-semibold">
            <h2>Gross Revenue</h2>
            <ArrowUp className="bg-gray-200 rounded-2xl text-black" />
          </span>
          <span className="text-4xl font-bold border-b pb-4">
            {`$${totalPayment?.toFixed(2) || "0.00"}`}
          </span>
          <p className="text-sm text-gray-400">From last month, Dec</p>
        </div>

        {/* Total Appointments */}
        <div className="bg-white rounded-lg p-6 flex flex-col gap-3">
          <span className="flex justify-between items-center text-md font-semibold">
            <h2>Total Appointments</h2>
            <ArrowUp className="bg-gray-200 rounded-2xl text-black" />
          </span>
          <span className="text-4xl font-bold border-b pb-4">
            {totalAppointments}
          </span>
          <p className="text-sm text-gray-500">From last month, Dec</p>
        </div>

        {/* Month Revenue */}
        <div className="bg-white rounded-lg p-6 flex flex-col gap-3">
          <span className="flex justify-between items-center text-md font-semibold">
            <h2>Month’s Revenue</h2>
            <ArrowUp className="bg-gray-200 rounded-2xl text-black" />
          </span>
          <span className="flex items-baseline gap-2 text-4xl font-bold border-b pb-4">
            {`$${(totalPayment ? totalPayment * 0.09 : 0).toFixed(2)}`}
            <p className="text-xl font-medium text-gray-500">.09</p>
          </span>
          <p className="text-sm text-gray-500">From last month, Dec</p>
        </div>
      </div>

      {/* SECOND ROW - Chart & List */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Chart */}
        <div className="lg:col-span-6 bg-white rounded-lg p-4">
          <Example />
        </div>
        {/* Appointment List */}
        <div className="lg:col-span-4 bg-white rounded-lg p-4">
          <List data={data} />
        </div>
      </div>

      {/* THIRD ROW - Bar chart & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <BarExample />
        </div>
        <div className="bg-white rounded-lg p-4">
          <UpcomingAppointments appointments={[]} />
        </div>
      </div>
    </div>
  );
}
