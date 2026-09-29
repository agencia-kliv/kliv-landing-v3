import ServiceLanding, { landingMetadata } from "@/components/pages/ServiceLanding";

export const generateMetadata = ({ params: { locale } }) => landingMetadata("metaads", locale);

export default function Page({ params: { locale } }) {
  return <ServiceLanding slug="metaads" locale={locale} />;
}
