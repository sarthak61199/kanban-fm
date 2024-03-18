import { getOnboardingType } from "@/actions/onboarding";
import JoinOrganisation from "@/components/onboarding/join-organisation";
import OrganisationDetails from "@/components/onboarding/organisation-details";

const OBSC = {
  USER: <JoinOrganisation />,
  ORGANISATION: <OrganisationDetails />,
};

export default async function SecondStepOnboarding() {
  const onboardingType = await getOnboardingType();

  return (
    <div className="flex-1 flex items-center justify-center">
      {OBSC[onboardingType!]}
    </div>
  );
}
