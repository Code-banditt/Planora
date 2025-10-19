// /app/api/appointments/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import { Appointment } from "@/models/AppointmentModel";
import { getServerSession } from "next-auth/next"; // App Router compatible
import { authOptions } from "@/libs/authOptions";
import { sendEmail } from "@/app/lib/email";

import User from "@/models/userModel";
import {
  appointmentHtml,
  professionalNotificationHtml,
} from "@/app/_Components/emailTemplate";

export async function BookAppointment(req: Request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      professional,
      service,
      date,
      notes,
      type,
      location,
      meetingLink,
      payment,
    } = body;

    if (!professional || !service || !date) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await Appointment.create({
      client: session.user.id,
      professional: professional,
      service,
      date: new Date(date),
      notes,
      type,
      location,
      meetingLink,
      payment,
    });

    if (!session.user?.email) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    const professionalDoc = await User.findById(professional);
    if (!professionalDoc) {
      return NextResponse.json(
        { message: "Professional not found" },
        { status: 404 }
      );
    }
    // session.user.email is guaranteed to be defined here
    await sendEmail({
      to: session.user.email,
      subject: `✅ Appointment with ${professionalDoc.name} confirmed`,
      text: `Your appointment with ${professionalDoc.name} on ${new Date(
        date
      ).toLocaleString()} is confirmed.`,
      html: appointmentHtml(
        professionalDoc.name,
        new Date(date).toLocaleString(),
        type,
        location,
        meetingLink
      ),
    });

    await sendEmail({
      to: professionalDoc.email, // <-- make sure your professional model has email
      subject: `📅 New booking from ${session.user.name}`,
      text: `You have a new appointment with ${session.user.name} on ${new Date(
        date
      ).toLocaleString()}.`,
      html: professionalNotificationHtml(
        session.user.name || "A client",
        professionalDoc.name,
        appointment.service,
        new Date(date).toLocaleString(),
        type,
        location,
        meetingLink
      ),
    });

    await fetch("http://localhost:4000/notify/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientId: professional,
        message: `${session.user.name} booked an appointment!`,
      }),
    });

    await fetch(`${process.env.NEXTAUTH_URL}/api/Notification/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientId: professional,
        senderId: session.user.id,
        message: `${session.user.name} booked an appointment!`,
        type: "booking",
      }),
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Appointment creation failed:", error.message);
    } else {
      console.error("Appointment creation failed:", error);
    }

    return NextResponse.json(
      { message: "Failed to create appointment", error },
      { status: 400 }
    );
  }
}
