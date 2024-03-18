import { Onboarding } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required")
    .trim(),
  password: z.string().min(1, "Password is required").trim(),
  confirmPassword: z.string().min(1, "Confirm password is required").trim(),
  onboardingType: z.nativeEnum(Onboarding, {
    required_error: "Onboarding Type is required",
  }),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
