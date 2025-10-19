"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, Spin, Empty } from "antd";
import { Bell } from "lucide-react";

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

const NotificationsDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/Notification/get");
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
      console.log(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const openDrawer = async () => {
    setOpen(true);
    await fetchNotifications();
  };

  const refresh = async () => {
    await fetchNotifications();
  };

  const unreadCount = notifications.length;

  return (
    <>
      {/* 🔔 Bell Icon with Notification Badge */}
      <div className="relative inline-block">
        <Button
          type="text"
          onClick={openDrawer}
          className="relative !p-0 !m-0 flex items-center justify-center"
        >
          <Bell className="h-6 w-6 !text-blue-800" />
        </Button>

        {/* 🔴 Notification Count Badge */}
        {unreadCount > 0 && (
          <span
            className="
              absolute -top-1 -right-1 
              bg-red-500 text-white text-[10px] font-bold 
              w-4 h-4 flex items-center justify-center 
              rounded-full border border-white shadow-md
            "
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>

      <Drawer
        title={
          <p className="font-semibold text-lg text-blue-900">Notifications</p>
        }
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin tip="Loading notifications..." />
          </div>
        ) : notifications.length === 0 ? (
          <Empty description="No notifications yet" />
        ) : (
          <div className="space-y-3">
            <Button
              type="primary"
              onClick={refresh}
              className="!bg-blue-900 hover:!bg-blue-900 !mb-3"
              block
            >
              Refresh
            </Button>

            {notifications.map((note) => (
              <div
                key={note._id}
                className="border border-gray-200  p-3 bg-white hover:bg-gray-50 transition"
              >
                <h4 className="font-semibold text-blue-900">{note.title}</h4>
                <p className="text-gray-600 text-sm">{note.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default NotificationsDrawer;
