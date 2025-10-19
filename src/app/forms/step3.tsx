import Image from "next/image";
import { FormData } from "../types";

type StepProps = {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep?: () => void;
};

export default function Step3ExperienceReferences({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  type experiences = {
    role: string;
    company: string;
    date: string;
    location: string;
    description: string;
  };

  const addExperience = () => {
    updateFormData({
      experiences: [
        ...formData.experiences,
        { role: "", company: "", date: "", location: "", description: "" },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updated = [...formData.experiences];
    updated.splice(index, 1);
    updateFormData({ experiences: updated });
  };

  const updateExperience = (
    index: number,
    field: keyof experiences,
    value: string
  ) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    updateFormData({ experiences: updated });
  };

  return (
    <div className="bg-white text-black rounded-lg overflow-hidden max-w-5xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">Work Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT - Form */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-2">
            {formData.name || "Your"} Professional Journey
          </h2>
          <p className="text-gray-600 mb-6">
            Tell us about your past roles and responsibilities
          </p>

          {formData.experiences.map((exp: experiences, index: number) => (
            <div
              key={index}
              className="mb-6 border p-4 rounded flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(index, "role", e.target.value)
                }
                className="border rounded p-3 w-full text-base"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="border rounded p-3 w-full text-base"
              />
              <input
                type="text"
                placeholder="Date"
                value={exp.date}
                onChange={(e) =>
                  updateExperience(index, "date", e.target.value)
                }
                className="border rounded p-3 w-full text-base"
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) =>
                  updateExperience(index, "location", e.target.value)
                }
                className="border rounded p-3 w-full text-base"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="border rounded p-3 w-full text-base resize-y"
                rows={4}
              />
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="bg-blue-900 text-white px-6 py-3 rounded w-full sm:w-auto mb-4"
          >
            + Add Experience
          </button>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            {prevStep && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-3 rounded w-full sm:w-auto"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-900 text-white px-6 py-3 rounded w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT - Image */}
        <div className="hidden md:block">
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1744686909434-fd158fca1c35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Work Experience"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
