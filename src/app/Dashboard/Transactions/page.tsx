"use client";

import { useSession } from "next-auth/react";
import { ProfTransactionsTable } from "../transacted/profTransactions";
import { UserTransactionsTable } from "../transacted/userTransction";

export default function TransactionsPage() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.role === "professional" && <ProfTransactionsTable />}
      {session?.user?.role === "client" && <UserTransactionsTable />}
    </div>
  );
}
