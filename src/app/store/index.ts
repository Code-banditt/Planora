import { configureStore } from "@reduxjs/toolkit";
import { appointmentsSlice } from "./appointmentSlice";

export const store = configureStore({
  reducer: {
    appointments: appointmentsSlice.reducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
