import { getMessages, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params: { locale } }) {
  const { thankYou } = await getMessages(locale);
  return pageMetadata({
    locale,
    path: "thank-you",
    // El título trae un salto de línea para el diseño; en el <title> no va.
    title: thankYou.title.replace(/\s*\n\s*/g, " "),
    description: thankYou.subtitle,
    noIndex: true,
  });
}

export default function ThankYouLayout({ children }) {
  return children;
}
