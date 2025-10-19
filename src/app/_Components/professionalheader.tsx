"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import App from "./Drawer";

export default function PlanoraHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "About Us", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <header className="bg-white w-full top-0 left-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-2xl text-blue-900">Planora</div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex space-x-8 items-center  relative">
          {navLinks.map((link) => {
            if (link.name === "Find Professional") {
              return (
                <div key={link.name} className="relative">
                  <a
                    href={link.href}
                    className="!text-gray-700 hover:text-blue-600 transition !font-bold cursor-pointer"
                  >
                    {link.name}
                  </a>
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                className="!text-gray-700 !hover:text-blue-600 transition font-semibold"
              >
                {link.name}
              </a>
            );
          })}

          {/* Show login/register if no session */}
          {!user ? (
            <>
              <Link
                href="/Signup"
                className="ml-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border border-blue-900 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 flex items-center justify-center bg-blue-900 text-white rounded-full font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 text-sm">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
          <App />
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {!user ? (
            <>
              <Link
                href="/Signup"
                className="w-full mt-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="w-full mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-full font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut();
                }}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
          <App />
        </nav>
      )}
    </header>
  );
}
