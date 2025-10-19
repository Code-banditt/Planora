import GetNotifications from "@/Controller/notificationsContoller";

export async function GET(request: Request) {
  return await GetNotifications(request);
}
