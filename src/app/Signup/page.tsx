"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import ProgressBar from "../_Components/loadingProgress";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (e.target.value.length < 8) {
      setError("Password must be at least 8 characters");
    } else {
      setError("");
    }
  };

  const router = useRouter();

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/auth/Signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("✅ User registered successfully");
      setIsLoading(false);
      router.push("/login");
    } else if (response.status === 409) {
      toast.error("❌ Email already in use");
    } else {
      const errorData = await response.json();
      toast.error("❌ Error:", errorData.error || "Error registering user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <ProgressBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Signup Form */}
      <div className="flex flex-col justify-center px-10 md:px-20 w-full md:w-1/2 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Planora
          </h1>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Sign up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Create a password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black pr-12"
                required
              />

              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  // Eye open
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 4.5c-4.63 0-8 4-8 5.5s3.37 5.5 8 5.5 8-4 8-5.5-3.37-5.5-8-5.5zm0 9a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                    <path d="M10 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
                  </svg>
                ) : (
                  // Eye closed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0110 19c-4.63 0-8-4-8-5.5 0-.438.138-1.07.382-1.675M4.8 4.8l14.4 14.4M19.618 17.325A10.05 10.05 0 0022 13.5c0-1.5-3.37-5.5-8-5.5a10.05 10.05 0 00-3.875.675"
                    />
                  </svg>
                )}
              </button>

              {/* Error message */}
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              {!error && (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-700 !text-white font-semibold py-3 rounded-lg shadow-md transition"
              disabled={isLoading}
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-900 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://cdn.pixabay.com/photo/2023/12/15/19/33/ai-generated-8451341_1280.png"
          alt="Signup background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
