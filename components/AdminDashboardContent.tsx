"use client";

import Link from "next/link";
import { useProfile } from "@/lib/hooks/useAuth";

const quickActions = [
  { label: "Bookings", href: "/admin/bookings", helper: "Review rental bookings" },
  { label: "Transfer Bookings", href: "/admin/transfer-bookings", helper: "Track transfer reservations" },
  { label: "Rent Properties", href: "/admin/properties", helper: "Manage rental listings" },
  { label: "Buy Properties", href: "/admin/property-buyings", helper: "Manage sale listings" },
  { label: "Messages", href: "/admin/messages", helper: "Read customer messages" },
];

export default function AdminDashboardContent() {
  const { data: profile, isLoading } = useProfile();
  const firstName = profile?.firstName || "Admin";

  return (
    <div className="w-full max-w-[335px] min-w-0 overflow-hidden sm:max-w-none">
      <header className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">Dashboard</p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[36px]">
          Welcome back, {isLoading ? "..." : firstName}
        </h1>
        <p className="mt-2 max-w-full break-words text-[14px] leading-6 text-[#667c74] lg:max-w-2xl">
          Use the quick links below to manage bookings, listings, transfers, messages, and content.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-[18px] font-semibold leading-7 text-[#183c2f] lg:text-[20px]">
          Quick Actions
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_10px_30px_rgba(31,77,61,0.04)] transition hover:border-[#2e6f57] hover:shadow-[0_14px_36px_rgba(31,77,61,0.08)]"
            >
              <span className="text-[15px] font-semibold text-[#183c2f] transition group-hover:text-[#2e6f57]">
                {action.label}
              </span>
              <span className="mt-2 block text-[13px] leading-5 text-[#667c74]">{action.helper}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 w-full min-w-0 rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_10px_30px_rgba(31,77,61,0.04)] lg:p-8">
        <h2 className="mb-4 text-[18px] font-semibold leading-7 text-[#183c2f] lg:text-[20px]">
          My Profile Details
        </h2>
        {isLoading ? (
          <p className="text-sm text-[#667c74]">Loading profile data...</p>
        ) : profile ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            <ProfileField label="Full Name" value={`${profile.firstName} ${profile.lastName}`} />
            <ProfileField label="Username" value={profile.userName} />
            <ProfileField label="Email" value={profile.email} />
            <ProfileField label="Phone Number" value={profile.phoneNumber || "N/A"} />
            <ProfileField label="Role" value={profile.roles?.[0] || "User"} />
            <div>
              <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">Status</p>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  profile.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {profile.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#667c74]">Failed to load profile data.</p>
        )}
      </section>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">{label}</p>
      <p className="break-words font-medium text-[#183c2f]">{value}</p>
    </div>
  );
}
