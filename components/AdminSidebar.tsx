"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile, useLogout } from "@/lib/hooks/useAuth";

const mainNavItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
  { label: "Bookings", href: "/admin/bookings", icon: "clipboard" },
  { label: "Transfer Bookings", href: "/admin/transfer-bookings", icon: "route" },
  { label: "Property Locations", href: "/admin/properties-locations", icon: "globe" },
  { label: "Rent Properties", href: "/admin/properties", icon: "home" },
  { label: "Buy Properties", href: "/admin/property-buyings", icon: "building" },
  { label: "Rent Includes Categories", href: "/admin/property-categories", icon: "tag" },
  { label: "Rent Includes Items", href: "/admin/property-items", icon: "list" },
  { label: "Buy Includes Categories", href: "/admin/property-buying-categories", icon: "tag" },
  { label: "Buy Includes Items", href: "/admin/property-buying-items", icon: "list" },
  { label: "Journey Locations", href: "/admin/locations", icon: "map-pin" },
  { label: "Transfer Journeys", href: "/admin/journeys", icon: "route" },
  { label: "Admins", href: "/admin/admins", icon: "users" },
  { label: "Messages", href: "/admin/messages", icon: "mail" },
  { label: "Blog", href: "/admin/blog", icon: "book" },
  { label: "FAQ", href: "/admin/faq", icon: "help" },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { data: profile, isLoading } = useProfile();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Admin";
  const initials = profile 
    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase() 
    : "AD";
  const role = profile?.roles?.[0] || "User";

  return (
    <aside className="flex h-full min-h-screen w-full flex-col bg-[#1b634f] px-4 pb-6 pt-8 text-white shadow-[18px_0_40px_rgba(31,77,61,0.12)]">
      <Link href="/admin/dashboard" onClick={onNavigate} className="ml-7 flex items-center">
        <Image src="/logo-white.png" alt="Logo" width={139} height={60} className="h-16 w-auto lg:h-[70px] object-contain" priority unoptimized />
      </Link>

      <nav className="mt-14 flex flex-1 flex-col overflow-y-auto">
        <NavGroup items={mainNavItems} onNavigate={onNavigate} />
      </nav>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d9a441] text-[12px] font-bold text-white">
            {isLoading ? "..." : initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold leading-4">
              {isLoading ? "Loading..." : fullName}
            </span>
            <span className="block truncate text-[11px] leading-4 text-white/65">
              {isLoading ? "..." : role}
            </span>
          </span>
          <button
            onClick={() => {
              if (onNavigate) onNavigate();
              logout();
            }}
            disabled={isLoggingOut}
            aria-label="Log out"
            className="grid size-8 shrink-0 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <SidebarIcon name="logout" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({
  items,
  onNavigate,
  className = "",
}: {
  items: typeof mainNavItems;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={`grid gap-2 ${className}`}>
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`group flex h-10 items-center gap-3 rounded-full px-5 text-[14px] font-medium transition ${
                isActive
                  ? "bg-[#d9a441] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                  : "text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              <SidebarIcon name={item.icon} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {isActive && (
                <span className="text-[18px] leading-none" aria-hidden="true">
                  &gt;
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SidebarIcon({ name }: { name: string }) {
  const common = {
    className: "size-4 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="1.2" />
          <rect x="14" y="4" width="6" height="6" rx="1.2" />
          <rect x="4" y="14" width="6" height="6" rx="1.2" />
          <path d="M14 17h6M17 14v6" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M5 20V8l7-4 7 4v12" />
          <path d="M9 20v-6h6v6M9 9h.01M12 9h.01M15 9h.01" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 4h6l1 2h3v14H5V6h3l1-2Z" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      );
    case "cleaning":
      return (
        <svg {...common}>
          <path d="m6 21 4-11M9 10l5 2M12 3l5 18M4 21h16" />
          <path d="M16 5h3v4h-3z" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="4" y="7" width="16" height="10" rx="2" />
          <path d="M4 10h16M8 14h3" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="5" height="5" rx="1" />
          <rect x="14" y="5" width="5" height="5" rx="1" />
          <rect x="5" y="14" width="5" height="5" rx="1" />
          <rect x="14" y="14" width="5" height="5" rx="1" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v15H7.5A2.5 2.5 0 0 0 5 20.5v-15Z" />
          <path d="M5 18a2.5 2.5 0 0 1 2.5-2.5H20" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M9.8 9.5a2.4 2.4 0 1 1 3.3 2.2c-.8.4-1.1.9-1.1 1.8M12 17h.01" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4a12 12 0 0 1 0 16M12 4a12 12 0 0 0 0 16" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M10 6H6v12h4M14 8l4 4-4 4M8 12h10" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="19" r="3" />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
          <circle cx="18" cy="5" r="3" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}
