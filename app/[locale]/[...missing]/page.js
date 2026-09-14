import { notFound } from "next/navigation";

export const metadata = {
  title: "404 | KLIV",
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: null },
};

export default function MissingPage() {
  notFound();
}
