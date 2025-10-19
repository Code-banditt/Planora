import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import User from "@/models/userModel";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/email";

export async function ResetPW(req: Request) {
  try {
    const { email } = await req.json(); // ✅ req.body → await req.json()

    if (!email)
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );

    await connectDB();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // ✅ Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    const resetLink = `${process.env.NEXTAUTH_URL}/resetPassword?token=${resetToken}`;

    await user.save();

    // ✅ Send email
    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      text: `Click this link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. It expires in 10 minutes.</p>`,
    });

    return NextResponse.json(
      { message: "Reset link sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Forgot password error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}
