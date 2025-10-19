"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "react-phone-input-2";
import Select from "react-select";
// @ts-expect-error - No type definitions for this package
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { FormData } from "../types";

type StepProps = {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep?: () => void;
};

export default function Step1Personal({
  formData,
  updateFormData,
  nextStep,
}: StepProps) {
  type options = {
    value: string;
    label: string;
  };
  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <Link href={"/"} className="hover:cursor-pointer mb-4 inline-block">
        <ArrowLeft className="text-black w-6 h-6" />
      </Link>

      <div className="bg-white text-black rounded-lg overflow-hidden max-w-5xl mx-auto p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6">Personal Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT - Form */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2">
              Hi, {formData.name || "there"}!
            </h2>
            <p className="text-gray-600 mb-6">
              We’re excited to start the onboarding
            </p>

            <input
              required
              type="text"
              placeholder="Full legal name"
              value={formData.name || ""}
              onChange={(e) => updateFormData({ name: e.target.value })}
              className="border rounded p-3 text-base w-full"
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="border rounded p-3 text-base w-full"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                options={options}
                value={options.find(
                  (c: options) => c.value === formData.location
                )}
                onChange={(val) => updateFormData({ location: val?.value })}
                className="w-full"
              />

              <input
                required
                type="tel"
                placeholder="+49 (30) 12345678"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="border rounded p-3 text-base w-full"
              />
            </div>

            <select
              value={formData.title || ""}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="border rounded p-3 text-base w-full"
              required
            >
              <option value="">Select Profession</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Dentist">Dentist</option>
              <option value="Therapist">Therapist</option>
              <option value="Personal Trainer">Personal Trainer</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Barber">Barber</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="Photographer">Photographer</option>
              <option value="Videographer">Videographer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Mobile App Developer">Mobile App Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="SEO Specialist">SEO Specialist</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Social Media Manager">Social Media Manager</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Accountant">Accountant</option>
              <option value="Real Estate Agent">Real Estate Agent</option>
              <option value="Teacher">Teacher</option>
              <option value="Event Planner">Event Planner</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Other">Other</option>
            </select>

            {formData.title === "Other" && (
              <input
                type="text"
                placeholder="Enter your profession"
                className="border rounded p-3 text-base w-full"
                onChange={(e) => updateFormData({ title: e.target.value })}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              {formData.avatar && (
                <div className="mb-3">
                  <Image
                    src={formData.avatar}
                    alt="Profile Preview"
                    width={120}
                    height={120}
                    className="rounded-full object-cover border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateFormData({ avatar: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 cursor-pointer"
              />
            </div>

            <textarea
              required
              placeholder="About"
              value={formData.about || ""}
              onChange={(e) => updateFormData({ about: e.target.value })}
              className="border rounded p-3 text-base w-full resize-y"
              rows={6}
            />
            <p className="text-xs text-gray-500">
              Data will be securely stored in Google Drive
            </p>

            <button
              onClick={nextStep}
              className="mt-4 w-full bg-blue-950 !text-white py-3 rounded text-lg hover:bg-teal-600"
            >
              Next Step
            </button>
          </div>

          {/* RIGHT - Image */}
          <div className="hidden md:block">
            <Image
              width={400}
              height={400}
              src="https://images.unsplash.com/photo-1550682290-d071c75759f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Onboarding"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
