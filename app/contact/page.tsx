import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
	title: "Contact",
	description: "Start a conversation about Wayne Cloud Infrastructure.",
};

export default function ContactPage() {
	return <ContactSection />;
}
