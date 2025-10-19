import { signInUser } from "@/Controller/signinController";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  return signInUser(email, password);
}
