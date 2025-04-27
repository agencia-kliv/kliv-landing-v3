"use client";

import LabelButton from "@/components/atoms/LabelButton";
import {
  getBackupPackagesBillingData,
  updatePackagesBillingData,
} from "@/firebase/Client";
import { useState } from "react";
import PanelLoginForm from "./PanelLoginForm";
import PartnersImages from "./partnersImages/PartnersImages";
import PricingPanel from "./pricingPanel/PricingPanel";

const TABS = {
  IMAGES: 1,
  PRICING: 2,
};

const PanelPage = () => {
  const [isLogged, setIsLogged] = useState(false);

  const [tab, setTab] = useState(undefined);

  const goBackToPanel = () => {
    setTab(undefined);
  };

  if (!isLogged) {
    return (
      <PanelLoginForm
        onLogin={() => {
          setIsLogged(true);
        }}
      />
    );
  }

  const handleBackup = async () => {
    const data = await getBackupPackagesBillingData();

    updatePackagesBillingData(data);
  };

  return (
    <main className="w-full flex flex-col gap-[40px]">
      <header className="flex flex-col gap-[5px] items-start">
        <h1 className="head-h2">Panel de administración</h1>
        {tab && (
          <LabelButton
            onClick={goBackToPanel}
            className="text-[20px] hover:underline"
          >
            Volver al menú
          </LabelButton>
        )}
      </header>

      {/* <Button onClick={handleBackup}>Volver a Backup</Button> */}

      {!tab && (
        <section className="w-full grid grid-cols-5 gap-[20px]">
          <div
            onClick={() => {
              setTab(TABS.IMAGES);
            }}
            className="bg-kliv-text-6 p-[20px] rounded-[10px] text-center text-base font-[500] hover:bg-kliv-text-5 cursor-pointer transition-colors transition-[200ms]"
          >
            Imágenes de socios
          </div>
          <div
            onClick={() => {
              setTab(TABS.PRICING);
            }}
            className="bg-kliv-text-6 p-[20px] rounded-[10px] text-center text-base font-[500] hover:bg-kliv-text-5 cursor-pointer transition-colors transition-[200ms]"
          >
            Modelo de pricing
          </div>
        </section>
      )}

      {tab === TABS.IMAGES && <PartnersImages />}
      {tab === TABS.PRICING && <PricingPanel />}
    </main>
  );
};

export default PanelPage;
