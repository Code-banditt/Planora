// src/app/api/user/[id]/route.ts
import GetUser from "@/Controller/getUserController";
import RolePatch from "@/Controller/roleController";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ async params
) {
  return GetUser(req, context);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ async params
) {
  return RolePatch(req, context);
}
