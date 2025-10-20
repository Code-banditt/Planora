"use client";

import { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Modal,
  Tag,
  Popconfirm,
  Empty,
  notification,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAppointments } from "@/app/reactQueryCalls/useAppointments";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useUpdateAppointmentStatus } from "@/app/reactQueryCalls/useAppointmentStatus";
import { AppointmentType } from "@/app/types";
import AppointmentCalendar from "@/app/_Components/reactCalendar";
import ProgressBar from "@/app/_Components/loadingProgress";

const { Meta } = Card;

export default function ProAppointment() {
  const { data, isLoading: fetching } = useAppointments();
  const loading = useSelector((state: RootState) => state.appointments.loading);
  const { mutate, isPending } = useUpdateAppointmentStatus();
  const [notify] = notification.useNotification();

  const [selectedClient, setSelectedClient] = useState<
    AppointmentType["client"] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showProfileModal = (client: AppointmentType["client"]) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  if (isPending) {
    return <ProgressBar />;
  }

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

  const pendingAppointments =
    data?.filter((appt: AppointmentType) => appt.status === "pending") || [];

  const statusColors: Record<string, string> = {
    pending: "gold",
    accepted: "green",
    rejected: "red",
    rescheduled: "blue",
    completed: "geekblue",
    cancelled: "volcano",
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 pb-8">
      {/* Header */}
      <div className="mt-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Appointments & Calendar
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Manage your schedule — accept, reject, or reschedule with ease.
        </p>
      </div>

      {/* Appointments Section */}
      <div>
        <h2 className="font-semibold text-sm sm:text-base text-gray-900 mb-4">
          Incoming Appointment Requests
        </h2>

        {fetching ? (
          <ProgressBar />
        ) : pendingAppointments.length === 0 ? (
          <Empty description="No pending appointments" />
        ) : (
          // ✅ Responsive Grid instead of Flex
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data
              ?.filter((appt: AppointmentType) => appt.status === "pending")
              .map((appt: AppointmentType) => (
                <Card
                  key={appt._id}
                  loading={loading}
                  className="w-full"
                  actions={[
                    <EditOutlined key="edit" />,
                    <SettingOutlined key="setting" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar
                        style={{ cursor: "pointer" }}
                        onClick={() => showProfileModal(appt.client)}
                      >
                        {appt.client.name
                          ? appt.client.name.charAt(0).toUpperCase()
                          : null}
                      </Avatar>
                    }
                    title={`${appt.client.name} • ${appt.service}`}
                    description={
                      <div className="space-y-1">
                        <p>
                          <strong>Date —</strong>{" "}
                          {new Date(appt.date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Time —</strong>{" "}
                          {new Date(appt.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>
                          <strong>Type —</strong> {appt.type}
                        </p>

                        <Tag color={statusColors[appt.status]}>
                          {appt.status.toUpperCase()}
                        </Tag>

                        {appt.status === "pending" && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Popconfirm
                              title="Accept this appointment?"
                              onConfirm={() => handleAction(appt, "accepted")}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                type="primary"
                                size="small"
                                loading={isPending}
                              >
                                Accept
                              </Button>
                            </Popconfirm>

                            <Popconfirm
                              title="Reject this appointment?"
                              onConfirm={() => handleAction(appt, "rejected")}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger size="small" loading={isPending}>
                                Reject
                              </Button>
                            </Popconfirm>
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              ))}
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={320}
        className="max-w-[90vw]"
      >
        {selectedClient && (
          <div className="flex flex-col items-center text-center space-y-4 p-4">
            <Avatar size={96}>
              {selectedClient.name
                ? selectedClient.name.charAt(0).toUpperCase()
                : null}
            </Avatar>

            <div>
              <h2 className="text-lg font-semibold">{selectedClient.name}</h2>
              <p className="text-gray-500 text-sm">{selectedClient.email}</p>
            </div>

            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="font-bold text-base">12</p>
                <p className="text-xs text-gray-500">Appointments</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-base">5</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button type="primary" size="small">
                View Details
              </Button>
              <Button size="small">Message</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Calendar Section */}
      <div className="mt-6">
        <AppointmentCalendar />
      </div>
    </div>
  );
}
