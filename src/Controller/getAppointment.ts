// app/api/appointments/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Appointment } from "@/models/AppointmentModel";
import connectDB from "@/libs/mongodb";
import { authOptions } from "@/libs/authOptions";

export async function GetAppointment() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userId = session.user.id;
    const role = session.user.role;

    console.log("Session:", session);

    const filter =
      role === "professional" ? { professional: userId } : { client: userId };

    const appointments = await Appointment.find(filter)
      .populate("client")
      .populate("professional", "name ")
      .sort({ date: 1 });

    console.log(appointments);

    return NextResponse.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
