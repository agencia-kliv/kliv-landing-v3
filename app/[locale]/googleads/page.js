import ServiceLanding, { landingMetadata } from "@/components/pages/ServiceLanding";

export const generateMetadata = ({ params: { locale } }) => landingMetadata("googleads", locale);

export default function Page({ params: { locale } }) {
  return <ServiceLanding slug="googleads" locale={locale} />;
}
