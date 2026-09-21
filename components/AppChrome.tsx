"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Header from "./Header";
import { stripLocale } from "@/lib/i18n/config";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicPathname = stripLocale(pathname);
  const isAdminRoute = pathname.startsWith("/admin");
  const isSinglePropertyRoute = publicPathname.startsWith("/rent/") && publicPathname !== "/rent";

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Header />
      {children}
      {!isSinglePropertyRoute && <FloatingWhatsApp />}
      <Footer />
    </>
  );
}
