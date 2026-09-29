import ServiceLanding, { landingMetadata } from "@/components/pages/ServiceLanding";

export const generateMetadata = ({ params: { locale } }) => landingMetadata("cordoba", locale);

export default function Page({ params: { locale } }) {
  return <ServiceLanding slug="cordoba" locale={locale} />;
}
