import { NextResponse } from "next/server";
import { appointmentHtml } from "@/app/_Components/emailTemplate";

export async function GET() {
  // Dummy data for preview
  const html = appointmentHtml(
    "Dr. Jane Doe", // professional name
    new Date().toLocaleString(), // date
    "online", // type
    "Zoom Meeting", // location
    "https://zoom.us/j/123456789" // meeting link
  );

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
