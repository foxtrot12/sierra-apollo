import { memo } from "react";
import TextCase from "../textCase";
import PriceTag, { PriceTagParams } from "./priceTag";
import { useTranslation } from "react-i18next";

export interface Product extends PriceTagParams {
  id: string | number;
  name: string;
  imageUrl: string;
  brand: string;
}

function ProductCard({
  imageUrl,
  name,
  brand,
  price,
  originalPrice,
  discountPercentage,
}: Product) {
  const { t } = useTranslation();
  return (
    <div className="flex w-full h-full flex-col relative pt-1">
      <img
        src={imageUrl}
        className="h-full border-transparent border-2 rounded-2xl"
      />
      <div>
        <div
          className="flex flex-col w-full absolute bottom-0 
          px-2 pb-2 pt-6 font-bold bg-gradient-to-t from-primary
           to-transparent"
        >
          <div className="flex justify-between"></div>
          <div className="text-2xl text-secondary">
            <TextCase mode={"capitalize"}>{name}</TextCase>
          </div>

          <div className="text-lg items-end text-secondary flex flex-col">
            <div className="flex flex-col">
              <span className="text-accent -translate-x-5">
                <TextCase mode={"capitalize"}>{t("by")}</TextCase>
              </span>
              <TextCase mode={"capitalize"}>{brand}</TextCase>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <PriceTag
            originalPrice={originalPrice}
            discountPercentage={discountPercentage}
            price={price}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
