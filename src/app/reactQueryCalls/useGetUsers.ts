// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../lib/fetchuser";
import { ProfessionalData } from "../types";

export const useUser = (id: string) => {
  return useQuery<ProfessionalData, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id, // only fetch if id exists
  });
};
