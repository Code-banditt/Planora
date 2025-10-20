"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ProgressBar from "../_Components/loadingProgress";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 added state
  const router = useRouter();

  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // start loading

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("logged in");
      setIsLoading(false); // stop loading
      router.push("/");
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
    <>
      <div className="h-screen w-screen flex">
        {/* Left Section */}
        <div className="relative hidden lg:flex w-1/2 items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1624969862293-b749659ccc4e?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Travel background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-lg px-8 text-white">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              EXPLORE PLANORA
            </h1>
            <p className="text-lg">
              Where Your Dream Appointments Become Reality.
            </p>
            <p className="mt-2 text-sm text-gray-200">
              Embark on a journey where every professional in the world is
              within your reach.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 !mt-6 ">
              Sign In
            </h2>

            <form onSubmit={handlelogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
                />
              </div>

              {/* Password with toggle */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-black pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
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
                <Link
                  href="/forgotpassword"
                  className="text-sm !text-blue-900 !hover:underline absolute right-0 bottom-[-1.75rem]"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-700 !text-white py-3 rounded-lg font-semibold shadow-md transition !mt-4 cursor-pointer"
                disabled={isLoading}
              >
                SIGN IN
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-gray-700">Sign in with Google</span>
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Are you new?{" "}
              <Link href="/Signup" className="text-blue-900 hover:underline">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
