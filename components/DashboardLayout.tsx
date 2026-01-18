"use client";

import { ReactNode } from "react";



export default function DashboardLayout({ children }: { children: ReactNode }) {
 
  return (
    <div >
   
   
      {/* Main Content */}
      <main >
        {children}
      </main>
    </div>
  );
}
