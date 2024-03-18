"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  CreateOrganisationType,
  JoinOrganisationType,
  createOrganisationSchema,
  joinOrganisationSchema,
} from "@/schemas/oraganisation";
import { redirect } from "next/navigation";
import otpGenerator from "otp-generator";

export const getAllOrganisations = async () => {
  try {
    const organisations = await db.organisation.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return organisations;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createOrganisation = async (data: CreateOrganisationType) => {
  const validation = createOrganisationSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Please enter valid values");
  }

  const { name } = validation.data;

  try {
    const session = await auth();
    if (!session) {
      throw new Error("You are unauthorized");
    }

    const userId = session?.user?.id;

    const org = await db.organisation.create({
      data: {
        name,
        userId,
        invitecode: otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        }),
      },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isOnboardingComplete: true,
        onboardingStep: 2,
        organisations: {
          connect: {
            id: org.id,
          },
        },
      },
    });

    redirect("/onboard/completed");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const joinOrganisation = async (data: JoinOrganisationType) => {
  const validation = joinOrganisationSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Please enter valid values");
  }

  const { code, organisationId } = validation.data;

  try {
    const session = await auth();
    if (!session) {
      throw new Error("You are unauthorized");
    }

    const userId = session?.user?.id;

    const organisation = await db.organisation.findUnique({
      where: {
        id: organisationId,
      },
      select: {
        invitecode: true,
      },
    });

    if (!organisation) {
      throw new Error("Organisation not found");
    }

    if (code !== organisation.invitecode) {
      throw new Error("Invalid invite code");
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        unapprovedOrganisationUsers: {
          connect: {
            id: organisationId,
          },
        },
        onboardingStep: 2,
        isOnboardingComplete: true,
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
