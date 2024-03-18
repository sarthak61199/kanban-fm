import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./logo";
import LogoutButton from "./logout-button";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="pt-8 pb-12 flex justify-between items-center">
      <Logo href="/" />
      <div className="flex gap-4">
        {!session ? (
          <>
            <Button asChild>
              <Link href="/get-started">Get Started</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/sign-in">Login</Link>
            </Button>
          </>
        ) : (
          <LogoutButton />
        )}
      </div>
    </header>
  );
}
