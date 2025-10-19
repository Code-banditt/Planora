import { NextRequest } from "next/server";
import { ResetPW } from "@/Controller/resetPasswordController";

export async function POST(req: NextRequest) {
  return ResetPW(req);
}
