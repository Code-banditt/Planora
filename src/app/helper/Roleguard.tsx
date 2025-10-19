"use client";
import { useSession } from "next-auth/react";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>You must be logged in.</p>;

  if (
    typeof session.user.role !== "string" ||
    !allowedRoles.includes(session.user.role)
  ) {
    return <p>Access Denied</p>;
  }

  return children;
}
