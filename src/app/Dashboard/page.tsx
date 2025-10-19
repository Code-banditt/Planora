"use client";

import ProfboardPage from "./dashboard/professional";
import UserProfilePage from "./dashboard/userDashboard";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.role === "professional" && <ProfboardPage />}
      {session?.user?.role === "client" && <UserProfilePage />}
    </div>
  );
}
