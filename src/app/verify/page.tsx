"use client";

import { useState } from "react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit verification code we sent to your email.
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          maxLength={6}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest text-black"
        />

        <button className="mt-6 w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Verify
        </button>

        <p className="text-gray-500 text-sm text-center mt-4">
          Didn’t receive the code?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
}
