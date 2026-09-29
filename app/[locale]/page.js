import HomeContent from "@/components/pages/HomeContent";
import { getMessages } from "@/lib/metadata";

export default async function Home({ params: { locale } }) {
  const messages = await getMessages(locale);
  return <HomeContent locale={locale} messages={messages} />;
}
