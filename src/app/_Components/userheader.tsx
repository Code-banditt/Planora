"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button, Drawer, Divider } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import App from "./Drawer";

export default function PlanoraHeader() {
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Find Professional", href: "/findProfessional" },
    { name: "About Us", href: "#" },
    { name: "Become a Professional", href: "/FormPage" },
    { name: "Contact Us", href: "#" },
  ];

  const toggleDrawer = () => setOpen(!open);
  const toggleUserDropdown = () => setUserDropdown(!userDropdown);

  return (
    <header className="bg-white w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="!text-2xl font-bold !bg-gradient-to-r !from-green-400 !to-cyan-400 !bg-clip-text !text-transparent cursor-pointer"
        >
          Planora
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="!text-blue-900 !hover:text-blue-600 transition font-semibold"
            >
              {link.name}
            </a>
          ))}

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
                className="px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-100 transition font-semibold"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="w-9 h-9 flex items-center justify-center bg-blue-900 !text-white rounded-full font-bold"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown */}
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold text-blue-900">{user.name}</p>
                    <p className="text-gray-500 text-xs flex flex-wrap">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <App />
        </nav>

        {/* Mobile Drawer Button */}
        <div className="block lg:hidden">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22, color: "#1e3a8a" }} />}
            onClick={toggleDrawer}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title="Planora Menu"
          placement="right"
          width={320}
          onClose={toggleDrawer}
          open={open}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                type="text"
                block
                className="text-left !text-blue-900 hover:!text-blue-600 font-medium"
                onClick={toggleDrawer}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}

            <Divider />

            {!user ? (
              <>
                <Link href="/Signup" onClick={toggleDrawer}>
                  <Button
                    type="primary"
                    block
                    className="bg-blue-900 hover:bg-blue-700 font-semibold"
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/login" onClick={toggleDrawer}>
                  <Button block className="border-blue-900 text-blue-900">
                    Login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-900 text-white rounded-full font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="!text-blue-900 font-semibold">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </div>

                <Button
                  danger
                  block
                  onClick={() => {
                    toggleDrawer();
                    signOut();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </Drawer>
      </div>
    </header>
  );
}
