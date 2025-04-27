"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { updatePackagesBillingData } from "@/firebase/Client";
import usePackageBillingData from "@/hooks/usePackageBillingData";
import { useEffect, useState } from "react";

const PricingPanel = () => {
  const { data: packagesBillingData, refetch } = usePackageBillingData();

  const [newPackagesBilling, setNewPackagesBilling] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewPackagesBilling(packagesBillingData);
  }, [packagesBillingData]);

  const handleChangePackageName = (name, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.packages.items[index].name = name;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangePackagePrice = (price, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.packages.items[index].price = price;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeCampaignAmount = (amount, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.campaigns[index].amount = amount;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeCampaignPrice = (price, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.campaigns[index].price = price;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeCampaignOff = (off, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.campaigns[index].off = off;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeAgencyName = (name, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.agencies.items[index].name = name;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeAgencyPrice = (price, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.agencies.items[index].price = price;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeAgencySincePrice = (sincePrice, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.agencies.items[index].sincePrice =
      sincePrice === "since";
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeASName = (name, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.additionalServices[index].name = name;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeASPrice = (price, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.additionalServices[index].price = price;
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleChangeASSincePrice = (sincePrice, index) => {
    const newPackagesBillingCopy = { ...newPackagesBilling };
    newPackagesBillingCopy.additionalServices[index].sincePrice =
      sincePrice === "since";
    setNewPackagesBilling(newPackagesBillingCopy);
  };

  const handleSubmitNewPricing = async () => {
    try {
      setLoading(true);
      await updatePackagesBillingData(newPackagesBilling);
      alert("Cambios guardados correctamente");
      refetch();
      //scroll to top
      window.scrollTo(0, 0);
    } catch (err) {
      alert("Error al guardar cambios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!packagesBillingData) return <main>Cargando...</main>;

  return (
    <main className="flex flex-col gap-[80px]">
      <section className="flex flex-col gap-[40px]">
        <h3 className="head-h5">Paquetes</h3>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Paquete N°1</label>
            <Input
              name="packageName1"
              placeholder={packagesBillingData?.packages?.items[0]?.name}
              value={newPackagesBilling?.packages?.items[0]?.name}
              onChange={(e) => handleChangePackageName(e.target.value, 0)}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Paquete N°1</label>
            <Input
              name="packagePrice1"
              type="number"
              placeholder={packagesBillingData?.packages?.items[0]?.price}
              value={newPackagesBilling?.packages?.items[0]?.price}
              onChange={(e) => handleChangePackagePrice(e.target.value, 0)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Paquete N°2</label>
            <Input
              name="packageName2"
              placeholder={packagesBillingData?.packages?.items[1]?.name}
              value={newPackagesBilling?.packages?.items[1]?.name}
              onChange={(e) => handleChangePackageName(e.target.value, 1)}
            />
          </div>

          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Paquete N°2</label>
            <Input
              name="packagePrice2"
              type="number"
              placeholder={packagesBillingData?.packages?.items[1]?.price}
              value={newPackagesBilling?.packages?.items[1]?.price}
              onChange={(e) => handleChangePackagePrice(e.target.value, 1)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Paquete N°3</label>
            <Input
              name="packageName3"
              placeholder={packagesBillingData?.packages?.items[2]?.name}
              value={newPackagesBilling?.packages?.items[2]?.name}
              onChange={(e) => handleChangePackageName(e.target.value, 2)}
            />
          </div>

          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Paquete N°3</label>
            <Input
              name="packagePrice3"
              placeholder={packagesBillingData?.packages?.items[2]?.price}
              value={newPackagesBilling?.packages?.items[2]?.price}
              onChange={(e) => handleChangePackagePrice(e.target.value, 2)}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[40px]">
        <h3 className="head-h5">Campañas</h3>
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Cantidad de campaña N°1</label>
              <Input
                name="campaignAmount1"
                placeholder={packagesBillingData?.campaigns[0]?.amount}
                value={newPackagesBilling?.campaigns[0]?.amount}
                onChange={(e) => handleChangeCampaignAmount(e.target.value, 0)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Precio de campaña N°1</label>
              <Input
                name="campaignPrice1"
                type="number"
                placeholder={packagesBillingData?.campaigns[0]?.price}
                value={newPackagesBilling?.campaigns[0]?.price}
                onChange={(e) => handleChangeCampaignPrice(e.target.value, 0)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Descuento de campaña N°1</label>
              <Input
                name="campaignOff1"
                type="number"
                placeholder={packagesBillingData?.campaigns[0]?.off}
                value={newPackagesBilling?.campaigns[0]?.off}
                onChange={(e) => handleChangeCampaignOff(e.target.value, 0)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Cantidad de campaña N°2</label>
              <Input
                name="campaignAmount2"
                placeholder={packagesBillingData?.campaigns[1]?.amount}
                value={newPackagesBilling?.campaigns[1]?.amount}
                onChange={(e) => handleChangeCampaignAmount(e.target.value, 1)}
              />
            </div>

            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Precio de campaña N°2</label>
              <Input
                name="campaignPrice2"
                type="number"
                placeholder={packagesBillingData?.campaigns[1]?.price}
                value={newPackagesBilling?.campaigns[1]?.price}
                onChange={(e) => handleChangeCampaignPrice(e.target.value, 1)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Descuento de campaña N°2</label>
              <Input
                name="campaignOff2"
                type="number"
                placeholder={packagesBillingData?.campaigns[1]?.off}
                value={newPackagesBilling?.campaigns[1]?.off}
                onChange={(e) => handleChangeCampaignOff(e.target.value, 1)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Cantidad de campaña N°3</label>

              <Input
                name="campaignAmount3"
                placeholder={packagesBillingData?.campaigns[2]?.amount}
                value={newPackagesBilling?.campaigns[2]?.amount}
                onChange={(e) => handleChangeCampaignAmount(e.target.value, 2)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Precio de campaña N°3</label>
              <Input
                name="campaignPrice3"
                type="number"
                placeholder={packagesBillingData?.campaigns[2]?.price}
                value={newPackagesBilling?.campaigns[2]?.price}
                onChange={(e) => handleChangeCampaignPrice(e.target.value, 2)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Descuento de campaña N°3</label>
              <Input
                name="campaignOff3"
                type="number"
                placeholder={packagesBillingData?.campaigns[2]?.off}
                value={newPackagesBilling?.campaigns[2]?.off}
                onChange={(e) => handleChangeCampaignOff(e.target.value, 2)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Cantidad de campaña N°4</label>
              <Input
                name="campaignAmount4"
                placeholder={packagesBillingData?.campaigns[3]?.amount}
                value={newPackagesBilling?.campaigns[3]?.amount}
                onChange={(e) => handleChangeCampaignAmount(e.target.value, 3)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Precio de campaña N°4</label>
              <Input
                name="campaignPrice4"
                type="number"
                placeholder={packagesBillingData?.campaigns[3]?.price}
                value={newPackagesBilling?.campaigns[3]?.price}
                onChange={(e) => handleChangeCampaignPrice(e.target.value, 3)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Descuento de campaña N°4</label>
              <Input
                name="campaignOff4"
                type="number"
                placeholder={packagesBillingData?.campaigns[3]?.off}
                value={newPackagesBilling?.campaigns[3]?.off}
                onChange={(e) => handleChangeCampaignOff(e.target.value, 3)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Cantidad de campaña N°5</label>

              <Input
                name="campaignAmount5"
                placeholder={packagesBillingData?.campaigns[4]?.amount}
                value={newPackagesBilling?.campaigns[4]?.amount}
                onChange={(e) => handleChangeCampaignAmount(e.target.value, 4)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Precio de campaña N°5</label>
              <Input
                name="campaignPrice5"
                type="number"
                placeholder={packagesBillingData?.campaigns[4]?.price}
                value={newPackagesBilling?.campaigns[4]?.price}
                onChange={(e) => handleChangeCampaignPrice(e.target.value, 4)}
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <label className="w-[250px]">Descuento de campaña N°5</label>
              <Input
                name="campaignOff5"
                type="number"
                value={newPackagesBilling?.campaigns[4]?.off}
                placeholder={packagesBillingData?.campaigns[4]?.off}
                onChange={(e) => handleChangeCampaignOff(e.target.value, 4)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[40px]">
        <h3 className="head-h5">Agencias</h3>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Agencia N°1</label>
            <Input
              name="agencyName1"
              placeholder={packagesBillingData?.agencies.items[0]?.name}
              value={newPackagesBilling?.agencies.items[0]?.name}
              onChange={(e) => handleChangeAgencyName(e.target.value, 0)}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Agencia N°1</label>
            <Input
              name="agencyPrice1"
              type="number"
              placeholder={packagesBillingData?.agencies.items[0]?.price}
              value={newPackagesBilling?.agencies.items[0]?.price}
              onChange={(e) => handleChangeAgencyPrice(e.target.value, 0)}
            />
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[200px]">Tipo de pricing:</span>

            <label
              htmlFor="fixed"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={!newPackagesBilling?.agencies.items[0]?.sincePrice}
                name="agencySince1"
                type="radio"
                value="fixed"
                id="fixedAgencySince1"
                onChange={(e) =>
                  handleChangeAgencySincePrice(e.target.value, 0)
                }
              />
              Fijo
            </label>

            <label
              htmlFor="since"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={newPackagesBilling?.agencies?.items[0]?.sincePrice}
                name="agencySince1"
                type="radio"
                value="since"
                id="sinceAgencySince1"
                onChange={(e) =>
                  handleChangeAgencySincePrice(e.target.value, 0)
                }
              />
              Desde
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Agencia N°2</label>
            <Input
              name="agencyName2"
              placeholder={packagesBillingData?.agencies.items[1]?.name}
              value={newPackagesBilling?.agencies.items[1]?.name}
              onChange={(e) => handleChangeAgencyName(e.target.value, 1)}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Agencia N°2</label>

            <Input
              name="agencyPrice2"
              type="number"
              placeholder={packagesBillingData?.agencies.items[1]?.price}
              value={newPackagesBilling?.agencies.items[1]?.price}
              onChange={(e) => handleChangeAgencyPrice(e.target.value, 1)}
            />
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[200px]">Tipo de pricing:</span>

            <label
              htmlFor="fixed"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={!newPackagesBilling?.agencies.items[1]?.sincePrice}
                name="agencySince2"
                type="radio"
                id="fixedAgencySince2"
                value="fixed"
                onChange={(e) =>
                  handleChangeAgencySincePrice(e.target.value, 1)
                }
              />
              Fijo
            </label>

            <label
              htmlFor="since"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={newPackagesBilling?.agencies.items[1]?.sincePrice}
                name="agencySince2"
                type="radio"
                value="since"
                id="sinceAgencySince2"
                onChange={(e) =>
                  handleChangeAgencySincePrice(e.target.value, 1)
                }
              />
              Desde
            </label>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-[40px]">
        <h3 className="head-h5">Servicios adicionales</h3>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Servicio N°1</label>
            <Input
              name="ASName1"
              placeholder={packagesBillingData?.additionalServices[0]?.name}
              value={newPackagesBilling?.additionalServices[0]?.name}
              onChange={(e) => handleChangeASName(e.target.value, 0)}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Servicio N°1</label>
            <Input
              name="ASPrice1"
              type="number"
              placeholder={packagesBillingData?.additionalServices[0]?.price}
              value={newPackagesBilling?.additionalServices[0]?.price}
              onChange={(e) => handleChangeASPrice(e.target.value, 0)}
            />
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[200px]">Tipo de pricing:</span>

            <label
              htmlFor="fixed"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={!newPackagesBilling?.additionalServices[0]?.sincePrice}
                name="ASSince1"
                type="radio"
                value="fixed"
                id="fixedASSince1"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 0)}
              />
              Fijo
            </label>

            <label
              htmlFor="since"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={newPackagesBilling?.additionalServices[0]?.sincePrice}
                name="ASSince1"
                type="radio"
                value={"since"}
                id="sinceASSince1"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 0)}
              />{" "}
              Desde
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Servicio N°2</label>
            <Input
              name="ASName2"
              placeholder={packagesBillingData?.additionalServices[1]?.name}
              value={newPackagesBilling?.additionalServices[1]?.name}
              onChange={(e) => handleChangeASName(e.target.value, 1)}
            />
          </div>

          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Servicio N°2</label>
            <Input
              name="ASPrice2"
              type="number"
              placeholder={packagesBillingData?.additionalServices[1]?.price}
              value={newPackagesBilling?.additionalServices[1]?.price}
              onChange={(e) => handleChangeASPrice(e.target.value, 1)}
            />
          </div>

          <div className="flex gap-[10px] items-center">
            <span className="w-[200px]">Tipo de pricing:</span>

            <label
              htmlFor="fixed"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={!newPackagesBilling?.additionalServices[1]?.sincePrice}
                name="ASSince2"
                type="radio"
                value="fixed"
                id="fixedASSince2"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 1)}
              />
              Fijo
            </label>

            <label
              htmlFor="since"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={newPackagesBilling?.additionalServices[1]?.sincePrice}
                name="ASSince2"
                type="radio"
                value="since"
                id="sinceASSince2"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 1)}
              />
              Desde
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Nombre Servicio N°3</label>
            <Input
              name="ASName3"
              placeholder={packagesBillingData?.additionalServices[2]?.name}
              value={newPackagesBilling?.additionalServices[2]?.name}
              onChange={(e) => handleChangeASName(e.target.value, 2)}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <label className="w-[250px]">Precio Servicio N°3</label>
            <Input
              name="ASPrice3"
              type="number"
              placeholder={packagesBillingData?.additionalServices[2]?.price}
              value={newPackagesBilling?.additionalServices[2]?.price}
              onChange={(e) => handleChangeASPrice(e.target.value, 2)}
            />
          </div>

          <div className="flex gap-[10px] items-center">
            <span className="w-[200px]">Tipo de pricing:</span>

            <label
              htmlFor="fixed"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={!newPackagesBilling?.additionalServices[2]?.sincePrice}
                name="ASSince3"
                type="radio"
                value="fixed"
                id="fixedASSince3"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 2)}
              />
              Fijo
            </label>

            <label
              htmlFor="since"
              className="flex p-[10px] bg-slate-100 gap-[10px] items-center rounded-md hover:bg-slate-200"
            >
              <input
                checked={newPackagesBilling?.additionalServices[2]?.sincePrice}
                name="ASSince3"
                type="radio"
                value="since"
                id="sinceASSince3"
                onChange={(e) => handleChangeASSincePrice(e.target.value, 2)}
              />
              Desde
            </label>
          </div>
        </div>
      </section>

      <footer className="flex items-end justify-end">
        <Button onClick={handleSubmitNewPricing} loading={loading}>
          Guardar cambios
        </Button>
      </footer>
    </main>
  );
};

export default PricingPanel;
