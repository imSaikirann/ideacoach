import { useMutation } from "@tanstack/react-query";

type Payload = {
  email: string;
  feedback?: string;
};

export function useProInterest() {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const res = await fetch("/api/users/pro-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      return res.json();
    },
  });
}
