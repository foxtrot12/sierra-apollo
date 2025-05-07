import { ReactNode, memo, useCallback, useState } from "react";
import ProductCard, { ProductCardParams } from "./productCard/productCard";
import SwipableProductCard, {
  SwipeDirection,
} from "./productCard/swipableProductCard";

interface ProductCardCarouselParams {
  products: ProductCardParams[];
}

function ProductCardCarousel(props: ProductCardCarouselParams) {
  const [currentProduct, setCurrentProduct] = useState(0);

  function goToNextProduct() {
    setCurrentProduct((prev) => {
      return prev + 1 <= props.products.length - 1 ? prev + 1 : prev;
    });
  }

  function saveProduct() {
    goToNextProduct();
  }

  function addProductToCart() {
    goToNextProduct();
  }

  function passProduct() {
    goToNextProduct();
  }

  const onSwipe = useCallback(
    (direction: SwipeDirection) => {
      switch (direction) {
        case "right":
          saveProduct();
          break;
        case "up":
          addProductToCart();
          break;
        case "left":
          passProduct();
          break;
        default:
          break;
      }
    },
    [props.products]
  );

  return (
    <div className="">
      {props.products.map(
        (product, index) =>
          (index === currentProduct ) && (
            <CarouselCard
              position={
                index === currentProduct
                  ? "current"
                  : index === currentProduct + 1
                  ? "next"
                  : null
              }
            >
              {/* <SwipableProductCard
                swipingThreshold={30}
                swipeThreshold={60}
                {...product}
                onSwipe={onSwipe}
              /> */}
              <ProductCard {...product}/>
            </CarouselCard>
          )
      )}
    </div>
  );
}

interface CarouselCardParams {
  children: ReactNode;
  position: "current" | "next" | null;
}

function CarouselCardComp({ children, position }: CarouselCardParams) {
  return (
    <div className={`h-full w-full ${position === "next" ? "absolute top-0" : ""}`}>
      {children}
    </div>
  );
}

const CarouselCard = memo(CarouselCardComp);

export default memo(ProductCardCarousel);
