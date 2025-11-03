"use client";

import { ReactNode } from "react";
import { Home, Lightbulb, Settings, Coins } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-6 top-24 bottom-6 w-64 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md flex flex-col justify-between"
      >
        <div>
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">IdeaCoach</h1>
            <p className="text-sm text-gray-500">Your smart project hub</p>
          </div>

          <nav className="mt-6 space-y-1 px-3">
             <SidebarLink
              icon={<Lightbulb className="h-4 w-4" />}
              label="IdeaSwipe"
              href="/IdeaSwipe"
              active={pathname === "/IdeaSwipe"}
            />
            <SidebarLink
              icon={<Lightbulb className="h-4 w-4" />}
              label="Generate Ideas"
              href="/ideas"
              active={pathname === "/ideas"}
            />
            <SidebarLink
              icon={<Home className="h-4 w-4" />}
              label="Saved Ideas"
              href="/saved-ideas"
              active={pathname === "/saved-ideas"}
            />
            <SidebarLink
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              href="/settings"
              active={pathname === "/settings"}
            />
          </nav>
        </div>

        <div className="p-5 border-t border-gray-100">
          <div className="flex flex-col gap-4">
            <SidebarLink
              icon={<Coins className="h-4 w-4" />}
              label="Credits - 100"
              href="/credits"
              active={pathname === "/credits"}
            />
            <Button
              className="w-full bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl"
            >
              Buy Credits 
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-[20rem] p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  href,
  active,
}: {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
        ${
          active
            ? "bg-green-50 text-green-700 border border-green-200 shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      <div
        className={`p-2 rounded-md ${
          active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
}
