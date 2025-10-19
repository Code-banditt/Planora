import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/libs/mongodb";

export async function signInUser(email: string, password: string) {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "Sign in successful" }, { status: 200 });
}
