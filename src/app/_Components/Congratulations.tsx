"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AppointmentSuccessModal({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    setModalOpen(false);
  };
  const handleView = () => {
    router.push("/Dashboard/appointment");
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white/85 fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
        {/* Animated Success Icon */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mt-4">
          Appointment Booked!
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mt-2">
          Your appointment has been successfully booked.
        </p>

        {/* Actions */}
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            onClick={handleView}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
