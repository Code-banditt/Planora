"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppointments } from "../reactQueryCalls/useAppointments";
import CalendarApptModal from "./calendarModal";
import { Card, Avatar, Tag, Button } from "antd";

export default function AppointmentCalendar() {
  const { data } = useAppointments();
  interface Appointment {
    _id: string;
    status: string;
    client: {
      name: string;
      email: string;
      avatar?: string;
    };
    service: string;
    type: string;
    date: string | Date;
    // Add other fields as needed
  }

  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [view, setView] = useState<"calendar" | "cards">("calendar"); // ✅ toggle

  // Map to FullCalendar events
  const events = data?.map((appt) => {
    let color = "";
    switch (appt.status) {
      case "accepted":
        color = "green";
        break;
      case "pending":
        color = "gold";
        break;
      case "rejected":
        color = "red";
        break;
      case "completed":
        color = "blue";
        break;
      case "cancelled":
        color = "gray";
        break;
      default:
        color = "black";
    }

    return {
      id: appt._id,
      title: `${appt.status}: ${appt.client.name}`,
      start: new Date(appt.date).toISOString(),
      color,
      extendedProps: appt,
    };
  });

  return (
    <div className="p-4">
      {/* ✅ Toggle buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 ml-auto">
          <Button
            type={view === "calendar" ? "primary" : "default"}
            onClick={() => setView("calendar")}
          >
            Calendar View
          </Button>
          <Button
            type={view === "cards" ? "primary" : "default"}
            onClick={() => setView("cards")}
          >
            Card View
          </Button>
        </div>
      </div>

      {/* ✅ Legend */}
      {view === "calendar" && (
        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          <LegendItem color="green" label="Accepted" />
          <LegendItem color="gold" label="Pending" />
          <LegendItem color="red" label="Rejected" />
          <LegendItem color="blue" label="Completed" />
          <LegendItem color="gray" label="Cancelled" />
        </div>
      )}

      {/* ✅ Calendar View */}
      {view === "calendar" && (
        <FullCalendar
          eventColor="black"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          selectable={true}
          height="auto"
          eventClick={(info) => {
            setSelectedAppt(info.event.extendedProps as Appointment);
          }}
        />
      )}

      {/* ✅ Card View */}
      {view === "cards" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((appt) => (
            <Card
              key={appt._id}
              title={appt.service}
              extra={<Tag color="blue">{appt.type}</Tag>}
              actions={[
                <Button
                  type="link"
                  onClick={() => setSelectedAppt(appt)}
                  key="view"
                >
                  View
                </Button>,
              ]}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar>{appt.client.name.charAt(0)}</Avatar>
                <div>
                  <p className="font-semibold">{appt.client.name}</p>
                  <p className="text-gray-500 text-sm">{appt.client.email}</p>
                </div>
              </div>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(appt.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Tag
                color={
                  appt.status === "accepted"
                    ? "green"
                    : appt.status === "pending"
                    ? "gold"
                    : appt.status === "rejected"
                    ? "red"
                    : appt.status === "completed"
                    ? "blue"
                    : "gray"
                }
              >
                {appt.status.toUpperCase()}
              </Tag>
            </Card>
          ))}
        </div>
      )}

      {/* ✅ Modal */}
      {selectedAppt && (
        <CalendarApptModal
          appointment={selectedAppt}
          onClose={() => setSelectedAppt(null)}
        />
      )}
    </div>
  );
}

// ✅ Legend
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}
