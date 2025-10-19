"use client";

import React from "react";
import { Popconfirm, Button, Tag } from "antd";
import { AppointmentType } from "@/app/types";

type Props = {
  appt: AppointmentType;
  onConfirm: (appt: AppointmentType, status: string) => void;
  isLoading: boolean;
};

const statusColors: Record<string, string> = {
  pending: "gold",
  accepted: "green",
  rejected: "red",
  rescheduled: "blue",
  completed: "geekblue",
  cancelled: "volcano",
};

const AppointmentCard = ({ appt, onConfirm, isLoading }: Props) => {
  return (
    <div className="bg-white rounded-md shadow-md max-w-md w-full p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <svg
          className="w-6 h-6 text-red-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6h4"
          />
        </svg>
        <h1 className="text-red-700 font-semibold text-lg">
          {appt.service} <span className="font-normal">Booking</span>
        </h1>
      </div>

      {/* Status */}
      <div className="mb-3 flex items-center space-x-2 text-sm font-medium">
        <Tag color={statusColors[appt.status]}>{appt.status.toUpperCase()}</Tag>
        {appt.status === "accepted" && (
          <span className="text-green-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Appointment confirmed
          </span>
        )}
      </div>

      {/* Professional */}
      <h2 className="text-xl font-semibold mb-1">Appointment scheduled</h2>
      <div className="flex items-center space-x-2 text-gray-600 mb-4 text-sm">
        <img
          className="w-6 h-6 rounded-full"
          src={"https://randomuser.me/api/portraits/men/34.jpg"}
          alt={
            typeof appt.professional === "object" && appt.professional !== null
              ? appt.professional.name
              : "Professional"
          }
        />
        <span>
          with{" "}
          {typeof appt.professional === "object" && appt.professional !== null
            ? appt.professional.name
            : appt.professional}
        </span>
      </div>

      {/* Location */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-800">Location</p>
        <p className="text-gray-600 text-sm">
          {appt?.location || "To be shared"}
        </p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center bg-gray-100 rounded-md p-3 text-gray-700 text-sm mb-6 space-x-3">
        <div className="bg-blue-200 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <p className="uppercase text-xs text-gray-400 font-semibold">
            Date & Time
          </p>
          <p>
            {new Date(appt.date).toLocaleDateString()}{" "}
            <span className="mx-2">•</span>
            {new Date(appt.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Popconfirm
          title="Complete this appointment?"
          onConfirm={() => onConfirm(appt, "completed")}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" loading={isLoading}>
            Complete
          </Button>
        </Popconfirm>

        <Popconfirm
          title="Cancel this appointment?"
          onConfirm={() => onConfirm(appt, "cancelled")}
          okText="Yes"
          cancelText="No"
        >
          <Button danger loading={isLoading}>
            Cancel
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default AppointmentCard;
