// lib/api/appointments.ts
import { AppointmentType } from "../types";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentType["status"]
): Promise<AppointmentType> {
  const res = await fetch(`/api/Appointment/UpdateStatus`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update appointment status");
  }

  return res.json();
}
