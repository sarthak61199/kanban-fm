"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getOnboardingType = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("You are unauthorized");
    }

    const userId = session?.user?.id;

    const step = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        onboardingType: true,
      },
    });

    return step?.onboardingType;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
