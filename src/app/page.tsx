"use client";

import UserLayout from "./Layouts/userpage";
import ProfessionalPage from "./Layouts/professionalpage";
import { useSession } from "next-auth/react";
import AuthLoader from "./_Components/authenticating";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <AuthLoader />;
  }

  return (
    <div>
      {status === "unauthenticated" && <UserLayout />}
      {session?.user?.role === "client" && <UserLayout />}
      {session?.user?.role === "professional" && <ProfessionalPage />}
    </div>
  );
}
