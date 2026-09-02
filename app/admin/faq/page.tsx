import type { Metadata } from "next";
import FaqContent from "../../../components/FaqContent";

export const metadata: Metadata = {
  title: "FAQ Management | Admin",
  description: "Create, edit, publish and delete frequently asked questions.",
};

export default function FaqPage() {
  return <FaqContent />;
}
