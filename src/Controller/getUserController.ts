import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { authOptions } from "@/libs/authOptions";
import connectDB from "@/libs/mongodb";
import { getServerSession } from "next-auth";

export default async function GetUser(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ make params async
) {
  const { id } = await params; // ✅ await here
  const session = await getServerSession(authOptions);

  await connectDB();

  try {
    const user = await User.findById(id).select("-password").lean();
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
