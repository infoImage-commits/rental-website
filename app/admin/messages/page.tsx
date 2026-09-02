import type { Metadata } from "next";
import MessagesContent from "../../../components/MessagesContent";

export const metadata: Metadata = {
  title: "Contact Messages | Admin",
  description: "Review and manage contact messages from website visitors.",
};

export default function MessagesPage() {
  return <MessagesContent />;
}
