"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProgressBar from "../_Components/loadingProgress";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = async () => {
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) router.push("/login");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full p-2 rounded mb-4"
      />
      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ProgressBar />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
