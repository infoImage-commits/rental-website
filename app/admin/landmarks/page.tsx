import type { Metadata } from "next";
import LandmarksContent from "@/components/LandmarksContent";

export const metadata: Metadata = {
  title: "Info Area | Admin",
  description: "Manage nearby info areas for rental properties.",
};

export default function LandmarksPage() {
  return <LandmarksContent />;
}
