
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full hover:opacity-90"
      >
        <Image
          src={user.image || "/default-avatar.png"}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-popover shadow-lg">
          <div className="px-3 py-2 text-sm text-popover-foreground border-b border-border">
            {user.name ?? user.email}
          </div>
          <button
            onClick={() => signOut()}
            className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
