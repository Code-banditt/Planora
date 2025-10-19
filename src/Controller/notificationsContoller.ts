import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import Notification from "@/models/notificationModel";
import connectDB from "@/libs/mongodb";

export default async function GetNotifications(req: Request) {
  const { method } = req;

  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.id;
  if (!userId) {
    return NextResponse.json({ message: "User ID not found" }, { status: 400 });
  }

  if (method === "GET") {
    const notifications = await Notification.find({ recipientId: userId }).sort(
      {
        createdAt: -1,
      }
    );

    return NextResponse.json({ notifications }, { status: 200 });
  }

  if (method === "POST") {
    const body = await req.json();
    const newNotification = await Notification.create(body);
    return NextResponse.json(
      { notification: newNotification },
      { status: 201 }
    );
  }

  if (method === "DELETE") {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Notification ID required" },
        { status: 400 }
      );
    }

    await Notification.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Notification deleted" },
      { status: 200 }
    );
  }

  if (method === "PATCH") {
    const { id, ...updateData } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Notification ID required" },
        { status: 400 }
      );
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedNotification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { notification: updatedNotification },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
