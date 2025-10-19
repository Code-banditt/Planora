"use client";

import { useState } from "react";
import { Card, Avatar, Button, Modal, Empty, notification } from "antd";

import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useUpdateAppointmentStatus } from "@/app/reactQueryCalls/useAppointmentStatus";
import { AppointmentType } from "@/app/types";

import ProgressBar from "@/app/_Components/loadingProgress";
import UserAppointmentCalendar from "@/app/_Components/userReacrCalendar";
import AppointmentCard from "@/app/_Components/userapptcard";

const { Meta } = Card;

export default function ProAppointment() {
  const { data, isLoading: fetching } = useAppointments();
  const loading = useSelector((state: RootState) => state.appointments.loading);
  const { mutate, isPending } = useUpdateAppointmentStatus();
  const [notify] = notification.useNotification();

  const [selectedClient, setSelectedClient] = useState<
    AppointmentType["professional"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showProfileModal = (professional: AppointmentType["professional"]) => {
    setSelectedClient(professional);
    setIsModalOpen(true);
  };

  if (isPending) {
    return <ProgressBar />;
  }

  // ✅ Handle action with confirm & feedback
  const handleAction = (data: AppointmentType, status: string) => {
    mutate(
      { appointmentId: data._id, status, date: data.date },
      {
        onSuccess: () => {
          notify.success({ message: `Appointment ${status}` });
        },
        onError: () => {
          notify.error({ message: `Failed to ${status} appointment` });
        },
      }
    );
  };

  // ✅ Status colors

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Appointments & Calendar
        </h1>
        <p className="mt-1 text-base text-gray-600">
          Manage your schedule — accept, reject, or reschedule with ease.
        </p>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-sm text-gray-900 mb-4">
          Recent Appointments
        </h2>

        {fetching ? (
          <ProgressBar />
        ) : data && data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data
              .filter(
                (appt: AppointmentType) =>
                  appt.status !== "completed" && appt.status !== "rejected"
              )
              .map((appt: AppointmentType) => (
                <AppointmentCard
                  key={appt._id}
                  appt={appt}
                  onConfirm={handleAction}
                  isLoading={isPending}
                />
              ))}
          </div>
        ) : (
          <Empty description="No appointments yet" />
        )}
      </div>

      {/* ✅ Improved Profile Modal */}
      <Modal
        title={null} // remove default title for cleaner design
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {selectedClient && (
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            {/* Avatar */}
            <Avatar size={96}>
              {!(
                selectedClient &&
                typeof selectedClient === "object" &&
                "avatar" in selectedClient &&
                selectedClient.avatar
              ) &&
              selectedClient &&
              typeof selectedClient === "object" &&
              "name" in selectedClient &&
              selectedClient.name
                ? selectedClient.name.charAt(0).toUpperCase()
                : null}
            </Avatar>

            {/* Name & Email */}
            <div>
              <h2 className="text-xl font-semibold">
                {typeof selectedClient === "object" && "name" in selectedClient
                  ? selectedClient.name
                  : ""}
              </h2>
              <p className="text-gray-500">
                {typeof selectedClient === "object" && "email" in selectedClient
                  ? String(selectedClient.email)
                  : ""}
              </p>
            </div>

            {/* Quick Stats (Optional: you can add appointments count, status etc.) */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="font-bold">12</p>
                <p className="text-xs text-gray-500">Appointments</p>
              </div>
              <div className="text-center">
                <p className="font-bold">5</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-4">
              <Button type="primary">View Details</Button>
              <Button>Message</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ✅ Calendar  */}
      <div className="p-2 mt-6">
        <UserAppointmentCalendar />
      </div>
    </div>
  );
}
