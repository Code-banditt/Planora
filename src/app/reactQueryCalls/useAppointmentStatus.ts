// src/app/reactQueryCalls/useAppointmentStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      status,
      date,
    }: {
      appointmentId: string;
      status: string;
      date: string;
    }) => {
      const res = await fetch("/api/Appointment/UpdateStatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, status, date }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update appointment");
      }

      return res.json();
    },
    onSuccess: () => {
      // invalidate appointments so UI updates
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
