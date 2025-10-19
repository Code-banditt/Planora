import { StatusUpdate } from "@/Controller/AcceptAppointment";

export async function PATCH(req: Request) {
  return StatusUpdate(req);
}
