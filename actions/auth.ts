"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { LoginType, loginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";

export const login = async (data: LoginType) => {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Please enter valid values");
  }

  const { email, password } = validation.data;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    let redirectTo;
    if (!user.isOnboardingComplete) {
      redirectTo = `/onboard/${
        user.onboardingStep === 2 ? "completed" : user.onboardingStep + 1
      }`;
    } else {
      redirectTo = "/dashboard";
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw e;
  }
};

export const logout = async () => {
  await signOut({
    redirectTo: "/",
  });
};
