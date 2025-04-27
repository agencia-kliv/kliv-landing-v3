import RowItem from "./RowItem";
import { FeaturesHeaderGrid, FeaturesRowGrid } from "./TarifasSection";

const BillingFeatures = ({
  billingFeatures,
  onlyKey,
  showOnlyStrongItems,
  showAllItems,
  cols,
  billingItems,
  t,
}) => {
  const parsedItemsKeys = billingItems?.map((item) => item.id);

  return (
    <tbody>
      {billingFeatures
        .filter((item) => {
          if (showOnlyStrongItems) {
            if (showAllItems) {
              return true;
            }

            return item.strong;
          }
          return true;
        })
        .map((item, index) => {
          return (
            <tr className={`grid ${cols}`} key={item.id}>
              <FeaturesHeaderGrid
                isStrong={item.strong}
                description={t ? t(`${item.id}.description`) : "no encontrado"}
              >
                {t ? t(`${item.id}.name`) : "no encontrado"}
              </FeaturesHeaderGrid>

              {parsedItemsKeys?.map((keyFeature) => {
                const itemFeature = item.features[keyFeature];

                if (onlyKey && onlyKey !== keyFeature) return null;

                return (
                  <FeaturesRowGrid key={index}>
                    <div className="flex flex-col gap-[4px] items-center text-center">
                      {itemFeature?.map((item, index) => (
                        <RowItem
                          key={index}
                          content={item.content}
                          type={item.type}
                        />
                      ))}
                    </div>
                  </FeaturesRowGrid>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
};

export default BillingFeatures;
