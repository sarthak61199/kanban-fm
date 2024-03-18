import { ReactNode } from "react";
import dynamic from "next/dynamic";

const StepperComponent = dynamic(() => import("@/components/shared/stepper"), {
  ssr: false,
});

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <StepperComponent
        steps={[{ label: "User Details" }, { label: "Organisation Details" }]}
      />
      {children}
    </div>
  );
}
