"use client";

import Link from "next-intl/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

// Invitación al quiz para quien ya leyó un rato. Es una tarjeta al pie, no un
// popup a pantalla completa: Google penaliza en móvil los intersticiales que
// tapan el contenido, y el blog es la entrada orgánica del sitio.
//
// Solo cuenta el tiempo con la pestaña visible, así una pestaña olvidada no
// dispara la tarjeta. Se muestra una vez por sesión y, si la persona la cierra
// o entra al quiz, no vuelve a aparecer en ese navegador por SNOOZE_DAYS.
const DELAY_MS = 3 * 60 * 1000;
const SNOOZE_DAYS = 7;
const SNOOZE_KEY = "kliv:blogQuizPrompt:snoozedAt";
const SESSION_KEY = "kliv:blogQuizPrompt:shown";

const COPY = {
  es: {
    eyebrow: "Evaluación de Potencial Publicitario",
    title: "¿Tu empresa está lista para escalar ventas con publicidad?",
    text: "Respondé un breve cuestionario y descubrí si tu negocio tiene lo necesario para crecer con performance marketing.",
    cta: "Hacer la evaluación",
    close: "Cerrar",
  },
  en: {
    eyebrow: "Advertising Potential Assessment",
    title: "Is your business ready to scale sales with advertising?",
    text: "Answer a short questionnaire and find out whether your business has what it takes to grow with performance marketing.",
    cta: "Take the assessment",
    close: "Close",
  },
};

// localStorage/sessionStorage pueden no existir o lanzar (modo privado,
// cookies bloqueadas). En ese caso la tarjeta funciona igual, sin recordar.
function readStorage(storage, key) {
  try {
    return window[storage].getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    window[storage].setItem(key, value);
  } catch {}
}

function isSnoozed() {
  const snoozedAt = Number(readStorage("localStorage", SNOOZE_KEY));
  return snoozedAt > 0 && Date.now() - snoozedAt < SNOOZE_DAYS * 24 * 60 * 60 * 1000;
}

function track(name, article) {
  window.gtag?.("event", name, { article });
}

export default function BlogQuizPrompt({ article, locale = "es" }) {
  const copy = COPY[locale] || COPY.es;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSnoozed() || readStorage("sessionStorage", SESSION_KEY)) return;

    let elapsed = 0;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      elapsed += 1000;
      if (elapsed < DELAY_MS) return;

      clearInterval(timer);
      writeStorage("sessionStorage", SESSION_KEY, "1");
      setOpen(true);
      track("blog_quiz_prompt_view", article);
    }, 1000);

    return () => clearInterval(timer);
  }, [article]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const dismiss = () => {
    writeStorage("localStorage", SNOOZE_KEY, String(Date.now()));
    setOpen(false);
    track("blog_quiz_prompt_dismiss", article);
  };

  const accept = () => {
    writeStorage("localStorage", SNOOZE_KEY, String(Date.now()));
    track("blog_quiz_prompt_click", article);
  };

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="blog-quiz-prompt-title"
      className="fixed bottom-[16px] left-[16px] right-[16px] sm:left-auto sm:right-[24px] sm:bottom-[24px] sm:w-[380px] z-[90] rounded-[20px] bg-kliv-secondary text-white p-[20px] sm:p-[24px] shadow-[0_18px_50px_rgba(0,54,41,0.35)] motion-safe:animate-fade-in"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.close}
        className="absolute top-[12px] right-[12px] grid place-items-center w-[36px] h-[36px] rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <FiX size={20} aria-hidden="true" />
      </button>
      <p className="pr-[36px] mb-[10px] text-[12px] font-bold uppercase tracking-[.12em] text-[#8ddcca]">
        {copy.eyebrow}
      </p>
      <p id="blog-quiz-prompt-title" className="mb-[16px] sm:mb-[10px] text-[18px] sm:text-[20px] font-bold leading-[1.25] tracking-[-.02em]">
        {copy.title}
      </p>
      <p className="hidden sm:block mb-[20px] text-[15px] leading-[1.6] text-white/85">{copy.text}</p>
      <Link
        href="/quiz/"
        onClick={accept}
        className="inline-flex items-center gap-[8px] rounded-full bg-kliv-tertiary hover:bg-kliv-tertiary-hover px-[20px] py-[12px] font-bold text-kliv-secondary transition-colors"
      >
        {copy.cta} <FiArrowUpRight aria-hidden="true" />
      </Link>
    </aside>
  );
}
