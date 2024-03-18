import { cn } from "@/lib/utils";
import { Lato } from "next/font/google";
import Link from "next/link";

const lato = Lato({
  subsets: ["latin"],
  weight: ["900"],
});

export default function Logo({ href }: { href: string }) {
  return (
    <Link href={href}>
      <p
        className={cn(lato.className, "text-4xl font-extrabold tracking-wider")}
      >
        KANBAN
      </p>
    </Link>
  );
}
