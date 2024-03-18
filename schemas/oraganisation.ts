import { z } from "zod";

export const createOrganisationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
});

export const joinOrganisationSchema = z.object({
  code: z.string().min(6, "Invite Code is required").max(6).trim(),
  organisationId: z.string().uuid("Organisation is required").trim(),
});

export type CreateOrganisationType = z.infer<typeof createOrganisationSchema>;
export type JoinOrganisationType = z.infer<typeof joinOrganisationSchema>;
