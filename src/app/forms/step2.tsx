import Image from "next/image";
import { FormData } from "../types";

type StepProps = {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep?: () => void;
};

export default function Step2SkillsTools({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: StepProps) {
  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      updateFormData({ skills: [...formData.skills, skill.trim()] });
    }
  };

  const removeSkill = (skill: string) => {
    updateFormData({
      skills: formData.skills.filter((s: string) => s !== skill),
    });
  };

  const addTool = (tool: string) => {
    if (tool.trim() && !formData.tools.includes(tool.trim())) {
      updateFormData({ tools: [...formData.tools, tool.trim()] });
    }
  };

  const removeTool = (tool: string) => {
    updateFormData({
      tools: formData.tools.filter((t: string) => t !== tool),
    });
  };

  return (
    <div className="bg-white text-black rounded-lg overflow-hidden max-w-5xl mx-auto p-6 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">Skills & Tools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT - Form */}
        <div className="flex flex-col gap-6">
          {/* Skills Section */}
          <label className="font-semibold block mb-2">Skills</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Example: shaving, crafting, checking blood sugar"
              className="border rounded p-3 text-base w-full"
              id="skillInput"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(
                  "skillInput"
                ) as HTMLInputElement;
                addSkill(input.value);
                input.value = "";
              }}
              className="bg-blue-950 text-white px-6 py-3 rounded hover:bg-teal-600 w-full sm:w-auto"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Tools Section */}
          <label className="font-semibold block mt-4 mb-2">Tools</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Example: clippers, BP machine, sewing machines"
              className="border rounded p-3 text-base w-full"
              id="toolInput"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(
                  "toolInput"
                ) as HTMLInputElement;
                addTool(input.value);
                input.value = "";
              }}
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-teal-600 w-full sm:w-auto"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tools.map((tool: string, idx: number) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(tool)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 w-full sm:w-auto"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-950 text-white px-6 py-3 rounded hover:bg-teal-600 w-full sm:w-auto"
            >
              Continue
            </button>
          </div>
        </div>

        {/* RIGHT - Image */}
        <div className="hidden md:block">
          <Image
            width={400}
            height={400}
            src="https://images.unsplash.com/photo-1600697395543-ef3ee6e9af7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Skills and Tools"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
