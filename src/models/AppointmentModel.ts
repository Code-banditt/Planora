import { Schema, model, models, Types } from "mongoose";

export interface IAppointment {
  client: Types.ObjectId;
  professional: Types.ObjectId;
  service: string;
  date: Date;
  type: "in-person" | "online";
  location?: string;
  meetingLink?: string;
  notes?: string;
  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "rescheduled"
    | "completed"
    | "cancelled";

  statusHistory: {
    status: string;
    changedAt: Date;
    changedBy: Types.ObjectId;
  }[];

  payment: {
    amount: number;
    currency: string;
    status: "pending" | "completed" | "failed" | "refunded";
    method: "card" | "paypal" | "cash" | "other";
    transactionId?: string;
    receiptUrl?: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    professional: { type: Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ["in-person", "online"], required: true },
    location: { type: String },
    meetingLink: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "rescheduled", // 👈 new
        "completed", // 👈 new
        "cancelled", // 👈 new
      ],
      default: "pending",
    },
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    payment: {
      amount: { type: Number },
      currency: { type: String, default: "USD" },
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      method: {
        type: String,
        enum: ["card", "paypal", "cash", "other"],
      },
      transactionId: { type: String },
      receiptUrl: { type: String },
    },
  },
  { timestamps: true }
);

// Prevent model overwrite errors in Next.js
export const Appointment =
  models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
