import UserDetails from "@/components/onboarding/user-details";

export default function FirstStepOnboarding() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Tell us about yourself</h1>
      <UserDetails />
    </div>
  );
}
