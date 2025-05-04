import { memo } from "react";
import TextCase from "../textCase";

export interface ProductCardParams {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  brand: string;
}

function ProductCard(props: ProductCardParams) {
  return (
    <div className="flex w-full h-5/6 flex-col relative pt-1">
      <img
        src={props.imageUrl}
        className="h-full border-transparent border-2 rounded-2xl"
      />
      <div>
        <div
          className="flex flex-col w-full absolute bottom-0 p-2 text-secondary font-bold 
        bg-gradient-to-t from-primary to-transparent"
        >
          <div className="text-4xl ">
            <TextCase mode={"capitalize"}>{props.name}</TextCase>
          </div>
          <div className="text-2xl">
            <TextCase mode={"capitalize"}>{props.brand}</TextCase>
          </div>
          <div className="text-2xl">₹{props.originalPrice}</div>
          <div className="text-2xl">₹{props.price}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
