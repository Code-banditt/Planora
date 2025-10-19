"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  Settings,
  User,
  MessageSquare,
  Calendar,
  CreditCard,
  Shield,
  Menu,
  ChevronLeft,
  X,
} from "lucide-react";

// SidebarLink Component
function SidebarLink({ href, icon: Icon, label, collapsed, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
        ${
          isActive
            ? "!bg-indigo-600 !text-white"
            : "!text-gray-900 hover:!bg-indigo-600 hover:!text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span className="ml-4">{label}</span>}
    </Link>
  );
}

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [mobileOpen]);

  const navItems = [
    { href: "/Dashboard", label: "Home", icon: Home },
    { href: "/Dashboard/appointment", label: "Appointments", icon: Calendar },
    {
      href: "/Dashboard/Transactions",
      label: "Transactions",
      icon: CreditCard,
    },
    { href: "/Dashboard/profile", label: "Profile", icon: User },
    { href: "/Dashboard/chats", label: "Chats", icon: MessageSquare },
    { href: "/Dashboard/Settings", label: "Settings", icon: Settings },
    { href: "/Dashboard/admin", label: "Admin", icon: Shield },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-40
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            {!collapsed && (
              <Link href="/" className="text-xl font-bold text-black">
                Planora
              </Link>
            )}
            <button
              onClick={() =>
                mobileOpen ? setMobileOpen(false) : setCollapsed(!collapsed)
              }
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileOpen ? (
                <X size={20} />
              ) : collapsed ? (
                <Menu size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Search */}
          {!collapsed && (
            <div className="px-4 mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search here"
                  className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="px-4 mt-6">
            <hr className="border-gray-200" />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col flex-1 px-2 mt-6 space-y-2">
            {navItems.map((item) => (
              <SidebarLink
                key={item.href}
                {...item}
                collapsed={collapsed}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="pb-6 px-4 border-t border-gray-200">
            <button
              type="button"
              className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
            >
              <img
                className="flex-shrink-0 object-cover w-8 h-8 rounded-full"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
                alt="User avatar"
              />
              {!collapsed && (
                <>
                  <span className="ml-3">Jacob Jones</span>
                  <ChevronLeft className="ml-auto w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar (Mobile only) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-sm z-20 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        } ${mobileOpen ? "overflow-hidden" : ""}`}
      >
        <main className="pt-14 lg:pt-0">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
              </ThemeProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
