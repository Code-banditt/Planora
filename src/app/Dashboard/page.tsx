"use client";

import ProfboardPage from "./dashboard/professional";
import UserProfilePage from "./dashboard/userDashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProgressBar from "../_Components/loadingProgress";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ⏳ While checking auth
  if (status === "loading") return <ProgressBar />;

  // 🧠 If not logged in (during render fallback)
  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Login Required</h2>
          <p className="text-gray-500">
            Please{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 underline"
            >
              log in
            </button>{" "}
            to view your dashboard.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      {session?.user?.role === "professional" && <ProfboardPage />}
      {session?.user?.role === "client" && <UserProfilePage />}
    </div>
  );
}
