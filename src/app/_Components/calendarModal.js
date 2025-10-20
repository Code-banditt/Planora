"use client";

import { useState } from "react";
import { Modal, Button, DatePicker, message, Tag, Timeline } from "antd";
import dayjs from "dayjs";
import { useUpdateAppointmentStatus } from "@/app/reactQueryCalls/useAppointmentStatus";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { Phone } from "lucide-react";
import Avatar from "antd/es/avatar/Avatar";

export default function CalendarApptModal({ appointment, onClose }) {
  const { mutate, isLoading } = useUpdateAppointmentStatus();
  const [rescheduleMode, setRescheduleMode] = useState(false);
  const [newDate, setNewDate] = useState("");

  if (!appointment) return null;

  // ✅ Cancel Appointment
  const handleCancel = () => {
    mutate(
      { appointmentId: appointment._id, status: "cancelled" },
      {
        onSuccess: () => {
          message.success("Appointment cancelled");
          onClose();
        },
        onError: () => {
          message.error("Something went wrong");
        },
      }
    );
  };

  // ✅ Reschedule Appointment
  const handleReschedule = () => {
    if (!newDate) return message.warning("Please pick a new date/time");

    mutate(
      {
        appointmentId: appointment._id,
        status: "rescheduled",
        date: newDate.toISOString(), // 👈 pass date if API supports it
      },
      {
        onSuccess: () => {
          message.success("Appointment rescheduled");
          onClose();
        },
        onError: () => {
          message.error("Something went wrong");
        },
      }
    );
  };

  return (
    <Modal
      open={!!appointment}
      onCancel={onClose}
      footer={null}
      title="Appointment Details"
      centered
    >
      {appointment && (
        <div className="space-y-6">
          {/* Client & Professional */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar style={{ backgroundColor: "#000", color: "#fff" }}>
                {appointment.client?.name?.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <h2 className="font-semibold text-2xl">
                  {appointment.client?.name}
                </h2>
                <p className="text-gray-500 text-xs !-mt-3">
                  {appointment.client?.email}
                </p>
              </div>
            </div>
            <Tag color="blue">{appointment.type.toUpperCase()}</Tag>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-900 !text-white py-2 px-3 rounded !mb-4 cursor-pointer">
              message{" "}
              <ChatBubbleBottomCenterIcon className="inline h-5 w-5 ml-2" />
            </button>

            <button className="bg-gray-900 !text-white py-2 px-3 rounded !mb-4 cursor-pointer">
              call <Phone className="inline h-5 w-5 ml-2" />
            </button>
          </div>

          {/* Service Info */}
          <div className="space-y-1">
            <p>
              <strong>Service:</strong> {appointment.service}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag color="processing">{appointment.status}</Tag>
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {dayjs(appointment.date).format("MMM D, YYYY h:mm A")}
            </p>
            {appointment.meetingLink && (
              <p>
                <strong>Meeting Link:</strong>{" "}
                <a
                  href={appointment.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {appointment.meetingLink}
                </a>
              </p>
            )}
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="p-3 bg-gray-50 rounded-md">
              <strong className="block mb-1">Notes:</strong>
              <p className="text-gray-700">{appointment.notes}</p>
            </div>
          )}

          {/* Payment */}
          <div className="border-t pt-3">
            <h3 className="font-semibold mb-2">Payment Info</h3>
            <p>
              <strong>Amount:</strong> {appointment.payment.amount}{" "}
              {appointment.payment.currency}
            </p>
            <p>
              <strong>Method:</strong> {appointment.payment.method}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  appointment.payment.status === "pending"
                    ? "orange"
                    : appointment.payment.status === "completed"
                    ? "green"
                    : "red"
                }
              >
                {appointment.payment.status}
              </Tag>
            </p>
          </div>

          {/* Status History with Timeline */}
          {appointment.statusHistory && (
            <div className="border-t pt-3">
              <h3 className="font-semibold mb-2">Status History</h3>
              <Timeline mode="left">
                {appointment.statusHistory.map((s, i) => (
                  <Timeline.Item
                    key={i}
                    color={
                      s.status === "accepted"
                        ? "green"
                        : s.status === "rejected"
                        ? "red"
                        : s.status === "rescheduled"
                        ? "blue"
                        : s.status === "completed"
                        ? "purple"
                        : s.status === "cancelled"
                        ? "volcano"
                        : "gray"
                    }
                  >
                    <Tag>{s.status.toUpperCase()}</Tag> —{" "}
                    {dayjs(s.changedAt).format("MMM D, YYYY h:mm A")}
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          )}

          {/* Actions */}
          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            {["completed", "cancelled"].includes(appointment.status) ? (
              <p className="text-gray-500 text-sm text-center w-full sm:w-auto">
                This appointment has been {appointment.status}.
              </p>
            ) : !rescheduleMode ? (
              <>
                <Button
                  danger
                  loading={isLoading}
                  onClick={handleCancel}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() => setRescheduleMode(true)}
                  className="w-full sm:w-auto"
                >
                  Reschedule
                </Button>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <DatePicker
                  showTime
                  onChange={(val) => setNewDate(val)}
                  className="w-full sm:w-auto"
                />
                <Button
                  type="primary"
                  loading={isLoading}
                  onClick={handleReschedule}
                  className="w-full sm:w-auto"
                >
                  Confirm Reschedule
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
