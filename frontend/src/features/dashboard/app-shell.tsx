"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { AppSidebar } from "./app-sidebar";

export function AppShell({
  children,
  header,
  noPadding = false,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  noPadding?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-(--background) font-sans">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 border-b border-(--border) bg-(--background) px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer text-(--foreground)"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-(--foreground)">Hone</p>
        </div>

        {header}
        <main className={`flex-1 ${noPadding ? "overflow-hidden" : "overflow-y-auto px-4 py-4 md:px-6 md:py-6"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
