import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import User from "@/models/userModel";

export default async function AllPros(req: Request) {
  await connectDB();
  try {
    const Pros = await User.find({ role: "professional" }).select(
      "_id professional"
    );
    if (Pros.length === 0) {
      return NextResponse.json(
        { message: "No professionals found" },
        { status: 404 }
      );
    }

    console.log(Pros);

    return NextResponse.json({ Pros }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
