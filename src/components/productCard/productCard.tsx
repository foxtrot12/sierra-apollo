import { memo } from "react";
import TextCase from "../textCase";
import PriceTag, { PriceTagParams } from "./priceTag";

export interface ProductCardParams extends PriceTagParams {
  id: string;
  name: string;
  imageUrl: string;
  brand: string;
  swipeDirection?: "left" | "right" | "up";
}

function ProductCard(props: ProductCardParams) {
  return (
    <div className="flex w-full h-5/6 flex-col relative pt-1">
      <img
        src={props.imageUrl}
        className="h-full border-transparent border-2 rounded-2xl"
      />
      <div className="flex justify-between">
        <div></div>
        <div></div>
      </div>
      <div>
        <div
          className="flex flex-col w-full absolute bottom-0 p-2 font-bold 
        bg-gradient-to-t from-primary to-transparent"
        >
          <div className="text-4xl text-secondary">
            <TextCase mode={"capitalize"}>{props.name}</TextCase>
          </div>
          <div className="text-2xl items-end text-secondary flex flex-col">
            <div className="flex flex-col">
              <span className="text-accent -translate-x-5">By</span>
              <TextCase mode={"capitalize"}>{props.brand}</TextCase>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <PriceTag
            originalPrice={props.originalPrice}
            discountPercentage={props.discountPercentage}
            price={props.price}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
