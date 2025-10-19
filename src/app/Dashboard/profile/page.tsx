"use client";

import { useSession } from "next-auth/react";
import PProfessionalProfile from "../profiles/professionalProfile";
import UserProfile from "../profiles/userprofile";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user.role === "professional" && <PProfessionalProfile />}
      {session?.user.role === "client" && <UserProfile />}
    </div>
  );
}
