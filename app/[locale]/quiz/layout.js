import { getMessages, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params: { locale } }) {
  const { quiz } = await getMessages(locale);
  return pageMetadata({
    locale,
    path: "quiz",
    title: quiz.title,
    description: quiz.question,
  });
}

export default function QuizLayout({ children }) {
  return children;
}
