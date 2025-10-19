import { GetAppointment } from "@/Controller/getAppointment";

export async function GET() {
  return GetAppointment();
}
