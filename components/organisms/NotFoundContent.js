import styles from "./NotFoundContent.module.css";

const copy = {
  es: {
    label: "ERROR 404 · PÁGINA NO ENCONTRADA",
    title: "Este enlace se salió de ruta.",
    description: "La página que buscás no existe o cambió de dirección. Pero estás a un clic de volver a encontrarnos.",
    home: "Volver al inicio",
    services: "Conocer nuestros servicios",
    note: "Sigamos haciendo crecer tu marca.",
    logo: "KLIV — Ir al inicio",
  },
  en: {
    label: "ERROR 404 · PAGE NOT FOUND",
    title: "This link took a wrong turn.",
    description: "The page you’re looking for doesn’t exist or has moved. You’re just one click away from finding us again.",
    home: "Back to home",
    services: "Explore our services",
    note: "Let’s keep growing your brand.",
    logo: "KLIV — Go to homepage",
  },
};

export default function NotFoundContent({ locale = "es", embedded = false }) {
  const language = locale === "en" ? "en" : "es";
  const text = copy[language];
  const home = `/${language}/`;

  return (
    <main className={`${styles.page} ${embedded ? styles.embedded : ""}`}>
      <div className={styles.content}>
        {!embedded && (
          <a className={styles.brand} href={home} aria-label={text.logo}>
            {/* A plain image also works outside the locale layout. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kliv-logo.svg" alt="KLIV" width="112" height="40" />
          </a>
        )}
        <p className={styles.code} aria-hidden="true">404<span className={styles.spark}>✳</span></p>
        <p className={styles.label}>{text.label}</p>
        <h1 className={styles.title}>{text.title}</h1>
        <p className={styles.description}>{text.description}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={home}>{text.home}<span aria-hidden="true"> →</span></a>
          <a className={styles.secondary} href={`${home}#servicios`}>{text.services}</a>
        </div>
        <p className={styles.note}>{text.note}</p>
      </div>
    </main>
  );
}
