"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

type SocketType = Socket | null;
export const SocketContext = createContext<SocketType>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<SocketType>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 Connected to socket");
      if (session?.user?.id) {
        newSocket.emit("register", session.user.id);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    // ✅ Return a cleanup function that disconnects socket
    return () => {
      newSocket.disconnect();
    };
  }, [session?.user?.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
