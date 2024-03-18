"use client";

import { usePathname } from "next/navigation";
import { Stepper as StepperComponent } from "react-form-stepper";

export default function Stepper({ steps }: { steps: { label: string }[] }) {
  const pathname = usePathname();

  return (
    <div>
      <StepperComponent
        steps={steps}
        activeStep={Number(pathname[pathname.length - 1]) - 1}
        // @ts-ignore
        styleConfig={{
          activeBgColor: "#0f172a",
          completedBgColor: "#0f172a",
          activeTextColor: "#f8fafc",
          completedTextColor: "#f8fafc",
          inactiveBgColor: "#f8fafc",
          inactiveTextColor: "#0f172a",
          fontWeight: "600",
        }}
      />
    </div>
  );
}
