"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { CreateUserType, createUserSchema } from "@/schemas/user";
import bcrypt from "bcrypt";

export const createUser = async (data: CreateUserType) => {
  const validation = createUserSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Please enter valid values");
  }

  const { name, email, password, confirmPassword, onboardingType } =
    validation.data;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error("User already exists with the given Email");
    }

    if (confirmPassword !== password) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isOnboardingComplete: false,
        onboardingStep: 1,
        onboardingType,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/onboard/2",
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
