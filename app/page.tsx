import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";

export const metadata: Metadata = {
  title: { absolute: "Wayne Citadel — Engineering what comes next" },
  description:
    "Wayne Citadel explores software engineering, cloud infrastructure and cybersecurity. Discover our engineering approach and the early development of Wayne Cloud Infrastructure.",
};
export default function HomePage() {
  return <HomePageContent />;
}
