import mongoose, { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String, // e.g. "booking", "cancellation", etc.
      default: "general",
    },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;
