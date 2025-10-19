import connectDB from "@/libs/mongodb";
import Notification from "@/models/notificationModel";
import { NextResponse } from "next/server";

export async function createNotification(req: Request) {
  try {
    await connectDB();
    const { recipientId, senderId, message, type } = await req.json();

    const notification = await Notification.create({
      recipientId,
      senderId,
      message,
      type,
    });

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
