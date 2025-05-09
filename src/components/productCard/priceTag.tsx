import { memo } from "react";
import { useTranslation } from "react-i18next";

export interface PriceTagParams {
  price: number;
  originalPrice: number;
  discountPercentage: number;
}

function PriceTag({
  discountPercentage,
  originalPrice,
  price,
}: PriceTagParams) {
  const { t } = useTranslation();
  const isDiscounted = discountPercentage !== 0;
  return (
    <div className="flex flex-col h-full w-full">
      {isDiscounted && (
        <div
          className="flex bg-accent py-4 font-bold text-secondary 
      justify-center rounded-t-lg"
        >{`${discountPercentage}% ${t("off")}`}</div>
      )}
      <div
        className={`flex bg-primary flex-col p-2.5 items-center ${
          isDiscounted ? "rounded-b-2xl" : "rounded-2xl"
        }`}
      >
        {isDiscounted && (
          <div className="text-secondary justify-center opacity-85 text-lg line-through">
            ₹{originalPrice}
          </div>
        )}
        <div className="text-secondary justify-center font-bold text-xl">
          ₹{price}
        </div>
      </div>
    </div>
  );
}

export default memo(PriceTag);
