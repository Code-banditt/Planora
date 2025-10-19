"use client";

import { useState } from "react";
import Step3ExperienceReferences from "../forms/step3";
import Step2SkillsTools from "../forms/step2";
import Step1Personal from "../forms/step1";
import { useSession } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Step4ReferencesServicesAvailability from "../forms/step4";
import { useRouter } from "next/navigation";

export default function ProfessionalForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    avatar: "",
    location: "",
    email: "",
    phone: "",
    about: "",
    skills: [] as string[],
    tools: [] as string[],
    experiences: [
      {
        role: "",
        company: "",
        date: "",
        location: "",
        description: "",
      },
    ] as {
      role: string;
      company: string;
      date: string;
      location: string;
      description: string;
    }[],
    references: [
      {
        name: "",
        role: "",
        text: "",
        rating: 0,
      },
    ] as {
      name: string;
      role: string;
      text: string;
      rating: number;
    }[],
    services: [
      {
        name: "",
        duration: 0,
        price: 0,
      },
    ] as {
      name: string;
      duration: number;
      price: number;
    }[],
    availability: [
      {
        day: [] as string[],
        from: "",
        to: "",
        slots: [] as string[],
      },
    ] as {
      day: string[];
      from: string;
      to: string;
      slots: string[];
    }[],
  });
  const router = useRouter();
  const { data: session } = useSession();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error("No user session found");
      return;
    }

    if (
      !formData.title ||
      !formData.email ||
      !formData.about ||
      !formData.location ||
      !formData.phone ||
      !formData.about
    ) {
      toast.error("Please fill out all personal information");
      return;
    }

    if (session?.user.role === "professional") {
      toast.error("this user is already a professional");
    }

    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "professional", // upgrade role
          professional: formData, // save everything in `professional` subdoc
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Update failed:", data.message || data.error);
        return;
      }

      if (session?.user.role === "professional") {
        toast.error("this user is already a professional");
      }

      toast.success("Profile updated:", data.user);
      router.push("/");

      // maybe redirect or show success message
    } catch (err: unknown) {
      let message = "Error updating profile";

      if (err instanceof Error) {
        message = err.message; // extract the error message
      } else if (typeof err === "string") {
        message = err;
      }

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white p-10 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Step1Personal
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <Step2SkillsTools
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <Step3ExperienceReferences
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 4 && (
            <Step4ReferencesServicesAvailability
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
            />
          )}

          {step === 4 && (
            <div>
              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-blue-900 text-white rounded-lg cursor-pointer hover:bg-blue-700"
              >
                Submit
              </button>
              <p className="text-sm text-black mt-2 flex items-center gap-2">
                <AlertCircle />
                Make sure you review your information before submitting, and you
                will need to logout and login for changes to take effect
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
