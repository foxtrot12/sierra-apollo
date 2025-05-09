import { memo, useCallback, useState } from "react";
import SwipableProductCard, {
  SwipeDirection,
} from "./productCard/swipableProductCard";
import { useProductContext } from "../contexts/productStateContext";
import { Product } from "./productCard/productCard";
import { useTranslation } from "react-i18next";
import TextCase from "./textCase";

function ProductCardCarousel({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addCartProduct, addPassedProduct, addSavedProduct } =
    useProductContext();
  const [productsFinished, setProductsFinished] = useState(false);
  const { t } = useTranslation();

  const goToFirst = () => {
    setActiveIndex(0);
    setProductsFinished(false);
  };

  const goToNext = useCallback(() => {
    setActiveIndex((idx) => {
      const nextIndex = idx + 1;
      if (nextIndex >= products.length) {
        setProductsFinished(true);
        return idx;
      }
      return nextIndex;
    });
  }, [products.length]);

  const handleSave = useCallback(() => {
    const current = products[activeIndex];
    addSavedProduct(current);
    goToNext();
    console.log("Saved product", current);
  }, [activeIndex, products, addSavedProduct, goToNext]);

  const handleAddToCart = useCallback(() => {
    const current = products[activeIndex];
    addCartProduct(current);
    goToNext();
    console.log("Added to cart", current);
  }, [activeIndex, products, addCartProduct, goToNext]);

  const handlePass = useCallback(() => {
    const current = products[activeIndex];
    addPassedProduct(current);
    goToNext();
    console.log("Passed product", current);
  }, [activeIndex, products, addPassedProduct, goToNext]);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (direction === "right") handleSave();
      else if (direction === "up") handleAddToCart();
      else if (direction === "left") handlePass();
    },
    [handleSave, handleAddToCart, handlePass]
  );

  return (
    <div
      className={`relative w-full h-full ${
        productsFinished ? "content-center" : ""
      }`}
    >
      {productsFinished ? (
        <div className="flex flex-col gap-8 font-cursive">
          <div
            className="bg-secondary justify-between 
      items-center px-4 py-8 rounded-xl border-3 border-accent 
      text-primary mx-4 text-center font-semibold text-7xl"
          >
            <TextCase mode={"sentence"}>{t("productsEndMessage")}</TextCase>
          </div>
          <button
          onClick={goToFirst}
            className="border-2 border-accent bg-secondary
           text-4xl font-bold rounded-xl px-4 py-2 mx-auto cursor-pointer"
          >
            <TextCase mode={"capitalize"}>{t("startOver")}</TextCase>
          </button>
        </div>
      ) : (
        <>
          {products.map((product, idx) => {
            const isCurrent = idx === activeIndex;
            const isNext = idx === activeIndex + 1;
            if (!isCurrent && !isNext) return null;

            const positionClass = isNext
              ? "absolute top-0 left-0"
              : "relative z-10";
            return (
              <div
                key={product.id}
                className={`${positionClass} w-full h-full`}
              >
                <SwipableProductCard
                  {...product}
                  swipeStartThreshold={75}
                  swipeReleaseThreshold={180}
                  onSwipeComplete={handleSwipe}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default memo(ProductCardCarousel);
