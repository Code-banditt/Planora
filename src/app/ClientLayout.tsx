"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "antd/dist/reset.css";
import { App } from "antd";
import { SocketProvider } from "@/libs/socketContext";
import { NotificationProvider } from "./_Components/AlertDis";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <NotificationProvider>
              <ThemeProvider>
                <App>
                  {children}
                  <Toaster position="top-right" reverseOrder={false} />
                </App>
              </ThemeProvider>
            </NotificationProvider>
          </SocketProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
