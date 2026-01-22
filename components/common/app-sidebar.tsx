"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Lightbulb,
  FolderKanban,
  Settings,
  Zap,
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  creditsLeft: number;
  creditsPerMonth: number;
}

const navItems = [
  { label: "My Ideas", href: "/ideas", icon: Lightbulb },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
];

function CreditsFooter({
  creditsLeft,
  creditsPerMonth,
}: AppSidebarProps) {
  const used = creditsPerMonth - creditsLeft;
  const percentage = Math.round((used / creditsPerMonth) * 100);

  return (
    <div className="rounded-xl border bg-muted/40 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-accent" />
        <span className="text-sm font-medium">Credits</span>
      </div>

      <p className="text-xs text-muted-foreground">
        {creditsLeft} / {creditsPerMonth} remaining
      </p>

      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function SidebarContent({
  creditsLeft,
  creditsPerMonth,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Header / Logo */}
      <div className="h-14 px-6 flex items-center border-b">
        <span className="text-lg font-semibold">YourApp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Credits pinned bottom */}
      <div className="p-4 border-t">
        <CreditsFooter
          creditsLeft={creditsLeft}
          creditsPerMonth={creditsPerMonth}
        />
      </div>
    </div>
  );
}

export function AppSidebar({
  creditsLeft,
  creditsPerMonth,
}: AppSidebarProps) {
  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex h-14 items-center border-b px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <span className="ml-3 font-semibold">YourApp</span>

          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent
              creditsLeft={creditsLeft}
              creditsPerMonth={creditsPerMonth}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-72 h-screen flex-col border-r bg-background">
        <SidebarContent
          creditsLeft={creditsLeft}
          creditsPerMonth={creditsPerMonth}
        />
      </aside>
    </>
  );
}
