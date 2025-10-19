"use client";

import { useSession } from "next-auth/react";
import { ProfTransactionsTable } from "../transacted/profTransactions";
import { UserTransactionsTable } from "../transacted/userTransction";
import { useRouter } from "next/navigation";
import ProgressBar from "@/app/_Components/loadingProgress";

export default function TransactionsPage() {
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
      {session?.user?.role === "professional" && <ProfTransactionsTable />}
      {session?.user?.role === "client" && <UserTransactionsTable />}
    </div>
  );
}
