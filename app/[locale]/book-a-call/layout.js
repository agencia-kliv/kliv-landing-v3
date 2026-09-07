import { getMessages, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params: { locale } }) {
  const { bookACall } = await getMessages(locale);
  return pageMetadata({
    locale,
    path: "book-a-call",
    title: bookACall.title,
    description: bookACall.text1,
  });
}

export default function BookACallLayout({ children }) {
  return children;
}
