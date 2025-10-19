import { ProfessionalData } from "../types";

export const fetchUsers = async (): Promise<ProfessionalData[]> => {
  // fix 1
  const res = await fetch(`/api/user/pros`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch user");
  }

  const data = await res.json();
  return data.Pros; // fix 2: this must match what your API returns
};
