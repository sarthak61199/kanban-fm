import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-10">
      <p className="text-3xl text-center font-bold">
        You can register either as a User and join an Organisation or you can
        register yourself as an Organisation.
      </p>
      <div className="flex flex-col self-center gap-4">
        <Button asChild size="lg">
          <Link href="/onboard/1">Start Onboarding</Link>
        </Button>
      </div>
    </div>
  );
}
