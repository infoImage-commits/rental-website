import type { Metadata } from "next";
import LandmarksContent from "@/components/LandmarksContent";

export const metadata: Metadata = {
  title: "Landmarks | Admin",
  description: "Manage nearby landmarks for rental properties.",
};

export default function LandmarksPage() {
  return <LandmarksContent />;
}
