import type { Metadata } from "next";
import JourneysContent from "../../../components/JourneysContent";

export const metadata: Metadata = {
  title: "Journeys Management | Admin",
  description: "Create, edit, and manage journeys and route pricing.",
};

export default function JourneysPage() {
  return <JourneysContent />;
}
