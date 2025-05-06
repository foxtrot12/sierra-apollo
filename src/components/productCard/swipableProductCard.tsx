import React, { memo, useEffect, useRef, useState } from "react";
import ProductCard, { ProductCardParams } from "./productCard";
import { useTranslation } from "react-i18next";
import TextCase from "../textCase";

export interface SwipableProductCardParams extends ProductCardParams {
  threshold: number;
  onSwipe?: (direction: "left" | "right" | "up") => void;
}

function SwipableProductCard({
  onSwipe,
  threshold,
  ...productCardProps
}: SwipableProductCardParams) {
  const { t } = useTranslation();
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [direction, setDirection] = useState<"left" | "right" | "up" | null>(
    null
  );
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !startPos.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({ x: dx, y: dy });

    let dir: "left" | "right" | "up" | null = null;
    if (Math.abs(dx) > Math.abs(dy) && dx > threshold) dir = "right";
    else if (Math.abs(dx) > Math.abs(dy) && dx < -threshold) dir = "left";
    else if (Math.abs(dy) > Math.abs(dx) && dy < -threshold) dir = "up";

    setDirection(dir);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      if (direction && onSwipe) {
        onSwipe(direction);
      }
      setOffset({ x: 0, y: 0 });
      setDirection(null);
      startPos.current = null;
      isDragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  useEffect(() => {
    console.log(direction);
  }, [direction]);

  return (
    <div
      className="flex w-full h-full touch-none"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isDragging.current ? "none" : "transform 0.3s ease",
        cursor: isDragging.current ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="flex items-center px-5 text-primary font-cursive 
      font-extrabold text-6xl justify-between absolute 
      h-full w-full"
      >
        <div
          className={`h-fit bg-secondary p-1.5 rounded-2xl
           transition-opacity duration-700  ${
             direction === "left"
               ? "opacity-100"
               : "opacity-0 pointer-events-none"
           }`}
        >
          <TextCase mode={"capitalize"}>{t("pass")}</TextCase>
        </div>
        <div className="h-full pt-2">
          <div
            className={`h-fit text-center bg-secondary p-1.5 
            rounded-2xl transition-opacity duration-700  ${
              direction === "up"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <TextCase mode={"capitalize"}>{t("cart")}</TextCase>
          </div>
        </div>
        <div
          className={`h-fit bg-secondary p-1.5 rounded-2xl
           transition-opacity duration-700  ${
             direction === "right"
               ? "opacity-100"
               : "opacity-0 pointer-events-none"
           }`}
        >
          <TextCase mode={"capitalize"}>{t("save")}</TextCase>
        </div>
      </div>
      <ProductCard {...productCardProps} />
    </div>
  );
}

export default memo(SwipableProductCard);
