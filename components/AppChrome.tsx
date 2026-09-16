"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Header from "./Header";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isSinglePropertyRoute = pathname.startsWith("/rent/") && pathname !== "/rent";

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
