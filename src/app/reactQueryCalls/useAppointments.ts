import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAppointments, setLoading } from "../store/appointmentSlice";
import { AppointmentType } from "../types";

export const useAppointments = () => {
  const dispatch = useDispatch();

  return useQuery<AppointmentType[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      dispatch(setLoading(true));
      const res = await axios.get("/api/Appointment/Get");
      dispatch(setAppointments(res.data));
      dispatch(setLoading(false));
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute caching
  });
};
