// app/layout.tsx (SERVER COMPONENT — no "use client")

import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Planora",
  description: "Smart appointment and scheduling dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
