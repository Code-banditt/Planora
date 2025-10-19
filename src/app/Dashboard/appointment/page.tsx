"use client";

import { useSession } from "next-auth/react";

import ProAppointment from "../appointments/proAppoint";
import UserAppointment from "../appointments/userAppointment";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      {session?.user.role === "professional" && <ProAppointment />}
      {session?.user.role === "client" && <UserAppointment />}
    </div>
  );
}
