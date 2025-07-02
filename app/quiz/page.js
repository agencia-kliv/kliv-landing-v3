// app/quiz/page.jsx
import { redirect } from "next/navigation";

export default function QuizRedirect() {
  // redirigimos en server-side a /es/quiz
  redirect("/es/quiz");
}
