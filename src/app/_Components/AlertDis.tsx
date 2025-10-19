"use client";

import { createContext, useMemo, useEffect } from "react";
import { notification } from "antd";
import { useSocket } from "@/libs/socketContext";

// Since AntD v5 doesn't export NotificationApi type publicly, infer from the hook
type NotificationContextType = {
  api: ReturnType<typeof notification.useNotification>[0];
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [api, contextHolder] = notification.useNotification();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data) => {
      api.info({
        message: "📢 New Notification",
        description: data.message,
        placement: "topRight",
        duration: 10000,
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, api]);

  const contextValue = useMemo(() => ({ api }), [api]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
