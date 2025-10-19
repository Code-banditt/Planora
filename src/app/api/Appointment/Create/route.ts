import { BookAppointment } from "@/Controller/BookAppointment";

export async function POST(req: Request) {
  return BookAppointment(req); // BookAppointment must return a NextResponse
}
