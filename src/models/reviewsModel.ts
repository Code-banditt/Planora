import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  appointment: mongoose.Types.ObjectId; // Reference to the appointment
  reviewer: mongoose.Types.ObjectId; // User (client) who wrote the review
  professional: mongoose.Types.ObjectId; // User (provider) being reviewed
  rating: number; // 1–5 star rating
  comment?: string; // Optional written review
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
