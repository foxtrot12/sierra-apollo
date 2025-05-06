import { memo, useState } from "react";
import { ProductCardParams } from "./productCard/productCard";
import SwipableProductCard from "./productCard/swipableProductCard";

interface ProductCardCarouselParams {
  products: ProductCardParams[];
  onSwipe?: (
    product: ProductCardParams,
    direction: "left" | "right" | "up"
  ) => void;
  swipeThreshold?: number;
  swipeTransitionDuration?: number;
}

function ProductCardCarousel(props: ProductCardCarouselParams) {
  const [currentProduct, setCurrentProduct] = useState(0);

  return (
    <div className="flex w-full h-full">
      {props.products.map((product, index) => (
        <div
          key={product.id}
          className={`${currentProduct === index ? "" : "hidden"}`}
        >
          <SwipableProductCard threshold={50} {...product} />
        </div>
      ))}
    </div>
  );
}

export default memo(ProductCardCarousel);
