import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Name is required")
    .trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export type LoginType = z.infer<typeof loginSchema>;
