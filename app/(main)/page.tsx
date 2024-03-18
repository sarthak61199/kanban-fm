import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center">
        <p className="text-6xl text-center">
          Revolutionize Your Productivity with Kanban.
        </p>
        <p className="w-[700px] text-center">
          Unlock Efficiency and Power with Kanban. Seamlessly organize tasks,
          track progress, and propel your team towards success with our
          intuitive Kanban board solution.
        </p>
        <Button asChild size="lg">
          <Link href="/get-started">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
