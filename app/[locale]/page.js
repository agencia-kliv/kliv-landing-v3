import LandingPage from "@/components/pages/LandingPage";
import HomeTracking from "@/components/organisms/HomeTracking";
import { getMessages } from "@/lib/metadata";
import { homeStructuredData, serializeStructuredData } from "@/lib/structured-data";

export default async function Home({ params: { locale } }) {
  const messages = await getMessages(locale);
  return (
    <>
      <script
        id="kliv-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(homeStructuredData(locale, messages)),
        }}
      />
      <LandingPage />
      {/* <WhatsappCTA /> */}
      <HomeTracking />
    </>
  );
}
