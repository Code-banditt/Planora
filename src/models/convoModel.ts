import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [String], // Array of user IDs
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

// Ensure unique conversation between two users
conversationSchema.index({ participants: 1 }, { unique: false });

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);
