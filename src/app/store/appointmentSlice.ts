import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentType } from "../types";

interface AppointmentsState {
  appointments: AppointmentType[];
  loading: boolean;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<AppointmentType[]>) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAppointments, setLoading } = appointmentsSlice.actions;
