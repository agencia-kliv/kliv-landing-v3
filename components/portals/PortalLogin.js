import Image from "next/image";
import styles from "./PortalLogin.module.css";

export default function PortalLogin({ client, hasError }) {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.brandPanel}>
          <Image src="/kliv-logo-blanco.png" width={154} height={58} alt="Agencia KLIV" priority />
          <div>
            <p className={styles.eyebrowLight}>PORTAL DE CLIENTES</p>
            <h1>
              <span>Escalamos tus</span>
              <span>ventas de manera</span>
              <span>rentable.</span>
            </h1>
          </div>
          <span className={styles.privateNote}>Acceso privado y protegido</span>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.mobileLogo}>
            <Image src="/kliv-logo.svg" width={128} height={48} alt="Agencia KLIV" priority />
          </div>
          <p className={styles.eyebrow}>BIENVENIDO</p>
          <h2>Portal de {client}</h2>
          <p className={styles.intro}>Ingresa la contraseña proporcionada por KLIV para continuar.</p>

          <form action="/api/client-portal/login/" method="post" className={styles.form}>
            <input type="hidden" name="client" value={client.toLowerCase()} />
            <label htmlFor="portal-password">Contraseña</label>
            <input
              id="portal-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              required
              aria-describedby={hasError ? "password-error" : undefined}
            />
            {hasError && (
              <p className={styles.error} id="password-error">
                La contraseña no es correcta. Inténtalo nuevamente.
              </p>
            )}
            <button type="submit">
              Ingresar al portal <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className={styles.help}>¿Necesitas ayuda? Contacta a tu responsable de cuenta en KLIV.</p>
        </div>
      </section>
    </main>
  );
}
