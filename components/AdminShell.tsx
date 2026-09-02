"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password";

  if (isAuthPage) {
    return <div className="min-h-screen bg-[#f5f7f6] font-[var(--font-poppins)]">{children}</div>;
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f7f6] font-[var(--font-poppins)] text-[#183c2f] lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <div className="lg:hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dfe8e4] bg-white px-5">
          <button
            type="button"
            aria-label="Open admin navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-[#dfe8e4] text-[#183c2f]"
          >
            <span className="grid gap-1">
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
            </span>
          </button>
          <span className="text-[16px] font-semibold text-[#183c2f]">Dashboard</span>
          <span className="size-10" />
        </header>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40">
            <button
              type="button"
              aria-label="Close admin navigation"
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[280px]">
              <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>

      <main className="box-border w-full max-w-full min-w-0 overflow-hidden px-5 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
