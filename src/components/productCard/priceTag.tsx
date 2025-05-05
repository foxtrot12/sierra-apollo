import { memo } from "react";

export interface PriceTagParams {
  price: number;
  originalPrice: number;
  discountPercentage: number;
}

function PriceTag(props: PriceTagParams) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex bg-accent py-4 font-bold text-secondary 
      justify-center rounded-t-lg">{`${props.discountPercentage}% off`}</div>
      <div className="flex bg-primary flex-col p-2.5 items-center rounded-b-2xl">
        <div className="text-secondary justify-center opacity-85 text-lg line-through">
          ₹{props.originalPrice}
        </div>
        <div className="text-secondary justify-center font-bold text-xl">
          ₹{props.price}
        </div>
      </div>
    </div>
  );
}

export default memo(PriceTag);
