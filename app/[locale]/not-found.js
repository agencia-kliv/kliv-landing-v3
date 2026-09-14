"use client";

import { useLocale } from "next-intl";
import NotFoundContent from "@/components/organisms/NotFoundContent";

export default function NotFound() {
  const locale = useLocale();
  return <NotFoundContent locale={locale} embedded />;
}
