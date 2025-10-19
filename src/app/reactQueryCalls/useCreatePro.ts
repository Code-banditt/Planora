// hooks/useCreateAppointment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createAppointment from "../lib/bookPros";
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

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<AppointmentType, Error, CreateAppointmentBody>({
    mutationFn: (body) => createAppointment(body),
    onSuccess: (appointment) => {
      // Optionally refetch appointment list
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      console.log("Appointment created:", appointment);
    },
    onError: (error) => {
      console.error("Error creating appointment:", error.message);
    },
  });
};
