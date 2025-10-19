"use client";

import { useState } from "react";
import { FormData } from "../types";

type StepProps = {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  prevStep: () => void;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

export default function Step4ReferencesServicesAvailability({
  formData,
  updateFormData,
  prevStep,
}: StepProps) {
  // Local states to track newly added items in this step
  const [references, setReferences] = useState(formData.references || []);
  const [services, setServices] = useState(formData.services || []);
  const [availabilityList, setAvailabilityList] = useState(
    formData.availability || []
  );

  const [newReference, setNewReference] = useState({
    name: "",
    role: "",
    text: "",
    rating: 0,
  });

  const [newService, setNewService] = useState({
    name: "",
    duration: 0,
    price: 0,
  });

  const [newAvailability, setNewAvailability] = useState({
    day: [] as string[],
    from: "",
    to: "",
    slots: [] as string[],
  });

  /** References */
  const addReference = () => {
    if (!newReference.name) return; // prevent empty entries
    const updated = [...references, newReference];
    setReferences(updated);
    updateFormData({ references: updated });
    setNewReference({ name: "", role: "", text: "", rating: 0 });
  };

  const deleteReference = (idx: number) => {
    const updated = references.filter((_, i) => i !== idx);
    setReferences(updated);
    updateFormData({ references: updated });
  };

  /** Services */
  const addService = () => {
    if (!newService.name) return;
    const updated = [...services, newService];
    setServices(updated);
    updateFormData({ services: updated });
    setNewService({ name: "", duration: 0, price: 0 });
  };

  const deleteService = (idx: number) => {
    const updated = services.filter((_, i) => i !== idx);
    setServices(updated);
    updateFormData({ services: updated });
  };

  /** Availability */
  const addAvailability = () => {
    if (
      newAvailability.day.length === 0 ||
      !newAvailability.from ||
      !newAvailability.to
    )
      return;
    const updated = [...availabilityList, newAvailability];
    setAvailabilityList(updated);
    updateFormData({ availability: updated });
    setNewAvailability({ day: [], from: "", to: "", slots: [] });
  };

  const deleteAvailability = (idx: number) => {
    const updated = availabilityList.filter((_, i) => i !== idx);
    setAvailabilityList(updated);
    updateFormData({ availability: updated });
  };

  const toggleDay = (day: string) => {
    setNewAvailability((prev) => ({
      ...prev,
      day: prev.day.includes(day)
        ? prev.day.filter((d) => d !== day)
        : [...prev.day, day],
    }));
  };

  return (
    <div className="space-y-8 text-black">
      <h2 className="text-2xl font-bold mb-4">
        References, Services & Availability{" "}
        <p className="text-sm text-gray-600">
          delete all references before submitting
        </p>
      </h2>
      {/* References */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newReference.name}
            onChange={(e) =>
              setNewReference({ ...newReference, name: e.target.value })
            }
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Role"
            value={newReference.role}
            onChange={(e) =>
              setNewReference({ ...newReference, role: e.target.value })
            }
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Text"
            value={newReference.text}
            onChange={(e) =>
              setNewReference({ ...newReference, text: e.target.value })
            }
            className="border p-3 rounded w-full sm:col-span-2"
          />
          <input
            type="number"
            placeholder="Rating"
            value={newReference.rating}
            onChange={(e) =>
              setNewReference({
                ...newReference,
                rating: Number(e.target.value),
              })
            }
            className="border p-3 rounded w-full sm:w-1/2"
          />
          <button
            type="button"
            onClick={addReference}
            className="bg-blue-950 text-white px-4 py-3 rounded w-full sm:w-auto sm:col-span-2"
          >
            Add Reference
          </button>
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <p className="text-xs mb-3 text-red-600">
          Example: Service Name: therapy, minutes: 30, pay per 30 minutes: $15
        </p>
        <div className="grid gap-2 mb-4">
          <input
            type="text"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={newService.duration}
            onChange={(e) =>
              setNewService({
                ...newService,
                duration: Number(e.target.value),
              })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={addService}
            className="bg-blue-950 !text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        </div>

        {/* Preview Services */}
        {services.length > 0 && (
          <ul className="space-y-2">
            {services.map((srv, idx) => (
              <li
                key={idx}
                className="border rounded p-2 bg-gray-50 text-sm flex justify-between items-center"
              >
                <span>
                  <strong>{srv.name}</strong> — {srv.duration} min — $
                  {srv.price}
                </span>
                <button
                  type="button"
                  onClick={() => deleteService(idx)}
                  className="bg-blue-950 !text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Availability */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Availability</h2>
        <p className="text-xs mb-3 text-red-600">
          Add the days and times you are available to clients
        </p>
        <div className="grid gap-4 mb-4">
          {/* Day selection */}
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`flex-1 sm:flex-auto text-center px-2 py-1 rounded-full border text-sm ${
                  newAvailability.day.includes(day)
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time selection */}
          <div className="flex items-center gap-4">
            <select
              value={newAvailability.from}
              onChange={(e) =>
                setNewAvailability({ ...newAvailability, from: e.target.value })
              }
              className="border p-2 rounded w-40"
            >
              <option value="">From</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              value={newAvailability.to}
              onChange={(e) =>
                setNewAvailability({ ...newAvailability, to: e.target.value })
              }
              className="border p-2 rounded w-40"
            >
              <option value="">To</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={addAvailability}
            className="bg-blue-950 text-white px-4 py-2 rounded w-full sm:w-auto mt-2"
          >
            Add Availability
          </button>
        </div>

        {/* Preview Availability */}
        {availabilityList.length > 0 && (
          <ul className="space-y-2">
            {availabilityList.map((avail, idx) => (
              <li
                key={idx}
                className="border rounded p-2 bg-gray-50 text-sm flex justify-between items-center"
              >
                <span>
                  <strong>{avail.day.join(", ")}</strong> — {avail.from} to{" "}
                  {avail.to}
                </span>
                <button
                  type="button"
                  onClick={() => deleteAvailability(idx)}
                  className="bg-blue-950 !text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Prev Button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={prevStep}
          className="bg-blue-950 !text-white px-6 py-2 rounded !mb-4"
        >
          Prev
        </button>
      </div>
    </div>
  );
}
