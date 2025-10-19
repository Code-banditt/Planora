// lib/bookPros.ts
import { AppointmentType } from "../types";

type CreateAppointmentBody = {
  client: string;
  professional: string;
  service: string;
  date: string; // better to send as ISO string
  notes?: string;
  type: "in-person" | "online";
  location?: string;
  meetingLink?: string;
  payment: {
    amount: number;
    currency?: string; // let backend default to USD
    status?: "pending" | "completed" | "failed" | "refunded"; // let backend default to pending
    method: "card" | "paypal" | "cash" | "other";
    transactionId?: string;
    receiptUrl?: string;
  };
};

export default async function createAppointment(
  body: CreateAppointmentBody
): Promise<AppointmentType> {
  const res = await fetch("/api/Appointment/Create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}
