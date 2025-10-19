import { ProfessionalData } from "../types";

export const fetchUser = async (id: string): Promise<ProfessionalData> => {
  const res = await fetch(`/api/user/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch user");
  }

  const data = await res.json();
  return data.user; // should match FormData
};
