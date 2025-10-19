// src/Controller/AcceptAppointment.ts
import connectDB from "@/libs/mongodb";
import { Appointment } from "@/models/AppointmentModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const StatusUpdate = async (req: Request) => {
  await connectDB();

  const { appointmentId, status, date } = await req.json();

  console.log("📥 Received data in StatusUpdate:", {
    appointmentId,
    status,
    date,
  });

  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    interface UpdateData {
      status: string;
      date?: Date;
    }

    const updateData: UpdateData = {
      status,
      date: date ? new Date(date) : undefined,
    };

    if (date) {
      updateData.date = new Date(date);
    }

    console.log("🛠 Updating with:", updateData);

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        $set: updateData,
        $push: {
          statusHistory: {
            status,
            changedAt: new Date(),
            changedBy: session.user?.id || "000000000000000000000000", // fallback ObjectId
          },
        },
      },
      { new: true }
    ).populate("client professional", "name email role");

    console.log("✅ Updated Appointment:", updatedAppointment);

    if (!updatedAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAppointment);
  } catch (err: unknown) {
    console.error("❌ Update error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
