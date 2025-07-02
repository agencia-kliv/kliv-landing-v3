"use client";
import LandingPage from "@/components/pages/LandingPage";
import { LinkedInInsightTag } from "nextjs-linkedin-insight-tag";

export default function Home() {
  return (
    <>
      <LandingPage />
      {/* <WhatsappCTA /> */}
      <LinkedInInsightTag />
    </>
  );
}
