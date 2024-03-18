"use client";

import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const onClick = () => {
    logout();
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      Logout
    </Button>
  );
}
