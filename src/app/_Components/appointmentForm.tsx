"use client";

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { useCreateAppointment } from "../reactQueryCalls/useCreatePro";
import { ProfessionalData } from "../types";
import { toast } from "react-hot-toast";
import { useAppointments } from "../reactQueryCalls/useAppointments";
import { setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";

interface Payment {
  amount: number;
  currency: string;
  method: "card" | "paypal" | "cash" | "other";
  transactionId?: string;
  receiptUrl?: string;
  status?: "pending" | "completed" | "failed" | "refunded";
}

interface AppointmentFormProps {
  professional: ProfessionalData["professional"];
  identity: ProfessionalData;
  onClose: () => void;
  onSubmit: (data: {
    date: string;
    service: string;
    notes: string;
    type: "in-person" | "online";
    location?: string;
    meetingLink?: string;
    payment: Payment;
  }) => void;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AppointmentForm({
  professional,
  identity,
  onClose,
  onSubmit,
  setModalOpen,
}: AppointmentFormProps) {
  const { data: session } = useSession();
  const { mutate: bookAppointment } = useCreateAppointment();
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: number;
  } | null>(null);
  const [notes, setNotes] = useState("");
  const [type, setType] = useState<"in-person" | "online">("in-person");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [payment, setPayment] = useState<Payment>({
    amount: 0,
    currency: "USD",
    method: "card",
    status: "pending",
  });

  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const { data } = useAppointments();
  console.log("Appointments data:", data);
  const bookedSlots =
    data?.filter(
      (a) => a.professional.toString() === identity._id.toString()
    ) ?? [];

  const bookedDates = bookedSlots.map((a) => new Date(a.date));

  // Update bookedDates when data changes

  function generateExcludedTimesForDay(
    availability: {
      day: string[];
      from: string;
      to: string;
      slots: string[];
    }[],
    selectedDate: Date | null
  ): Date[] {
    if (!selectedDate) return []; // avoid null crash

    const excluded: Date[] = [];
    const weekday = selectedDate
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    // find the availability range for this weekday
    const dayAvail = availability.find((a) =>
      a.day.some((d) => d.toLowerCase() === weekday)
    );

    // loop through every half-hour in the day
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const slot = setHours(setMinutes(new Date(selectedDate), m), h);

        let isAvailable = false;

        if (dayAvail) {
          // convert "09:00" -> [9, 0]
          const [startH, startM] = dayAvail.from.split(":").map(Number);
          const [endH, endM] = dayAvail.to.split(":").map(Number);

          const startTime = setHours(
            setMinutes(new Date(selectedDate), startM),
            startH
          );
          const endTime = setHours(
            setMinutes(new Date(selectedDate), endM),
            endH
          );

          isAvailable = slot >= startTime && slot <= endTime;
        }

        if (!isAvailable) excluded.push(slot);
      }
    }

    return excluded;
  }

  // Update payment amount when selectedService changes
  useEffect(() => {
    if (selectedService) {
      setPayment((prev) => ({ ...prev, amount: selectedService.price }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please log in to book an appointment.");
      router.push("/login"); // change '/login' to your actual login route
      return;
    }

    if (!date || !selectedService || !session?.user.id) return;

    const payload = {
      client: session.user.id,
      professional: identity._id,
      service: selectedService.name, // ✅ must be string
      date: date.toISOString(), // ✅ send string
      notes,
      type,
      location: type === "in-person" ? location : undefined,
      meetingLink: type === "online" ? meetingLink : undefined,
      payment: {
        amount: payment.amount,
        method: payment.method,
        currency: payment.currency ?? "USD",
        status: payment.status ?? "pending",
      },
    };

    console.log("Payload sent to server:", payload);
    toast.success("Appointment booked successfully!");
    setModalOpen(true);
    bookAppointment(payload);
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2">
      <div className="bg-white text-black rounded-2xl shadow-xl w-full max-w-3xl md:grid md:grid-cols-2 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          <h2 className="text-xl font-bold mb-2 sm:mb-4">Book Appointment</h2>

          <div>
            <label className="block font-medium">Select Date & Time</label>
            <DatePicker
              className="w-64 border rounded-lg px-3 py-2 mt-1"
              selected={date}
              onChange={(d) => setDate(d!)}
              showTimeSelect
              filterDate={(d) =>
                professional.availability
                  .flatMap((a) => a.day)
                  .some((name) => dayMap[name.toLowerCase()] === d.getDay())
              }
              filterTime={(time) => {
                return !bookedDates.some(
                  (booked) =>
                    booked.toDateString() === time.toDateString() &&
                    booked.getHours() === time.getHours() &&
                    booked.getMinutes() === time.getMinutes()
                );
              }}
              minDate={new Date()}
              placeholderText="Pick a date and time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>

          <div>
            <label className="block font-medium">Service</label>
            <select
              value={selectedService?.name || ""}
              onChange={(e) => {
                const service = professional.services?.find(
                  (s) => s.name === e.target.value
                );
                if (service)
                  setSelectedService({
                    name: service.name,
                    price: service.price,
                  });
              }}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            >
              <option value="">Select a service...</option>
              {professional.services?.map((srv, i) => (
                <option key={i} value={srv.name}>
                  {srv.name} ({srv.duration} min · ${srv.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Appointment Type</label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "in-person" | "online")
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="in-person">In-Person</option>
              <option value="online">Online</option>
            </select>
          </div>

          {type === "in-person" && (
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                placeholder="Enter location..."
                required
              />
            </div>
          )}

          {type === "online" && (
            <div>
              <label className="block font-medium">Meeting Link</label>
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1"
                placeholder="Enter meeting link..."
                required
              />
            </div>
          )}

          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Optional notes..."
            />
          </div>

          <div>
            <label className="block font-medium">Payment Amount</label>
            <input
              type="number"
              disabled
              value={selectedService?.price || 0}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              value={payment.method}
              onChange={(e) =>
                setPayment({
                  ...payment,
                  method: e.target.value as
                    | "card"
                    | "paypal"
                    | "cash"
                    | "other",
                })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="card">Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded-lg"
            >
              {type === "in-person" ? "Book Appointment" : "Proceed to Payment"}
            </button>
          </div>
        </form>

        {/* Right: professional profile */}
        <div
          className="flex flex-col justify-center items-center p-6 text-center bg-cover bg-center rounded-b-2xl md:rounded-r-xl md:rounded-b-none"
          style={{ backgroundImage: `url(${professional.avatar})` }}
        >
          <div className="bg-black/40 p-4 rounded-xl">
            <h2 className="text-2xl font-semibold text-white">
              {professional.name}
            </h2>
            {professional.title && (
              <p className="text-sm text-gray-200">{professional.title}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
