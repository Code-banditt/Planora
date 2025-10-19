import { createNotification } from "@/Controller/CreateNotification";

export async function POST(req: Request) {
  return createNotification(req);
}
