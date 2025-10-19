// src/app/api/auth/Signup/route.ts
import { signupUser } from "@/Controller/signupController";

export async function POST(request: Request) {
  return signupUser(request);
}
