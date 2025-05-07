import React, { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TextCase from "../textCase";
import ProductCard, { ProductCardParams } from "./productCard";

export type SwipeDirection = "left" | "right" | "up";

export interface SwipableProductCardParams extends ProductCardParams {
  /** Threshold (px) before onSwipeBegin fires once */
  swipingThreshold: number;
  /** Threshold (px) before onSwipe fires on pointer up */
  swipeThreshold: number;
  /** Called once, when first threshold is crossed */
  onSwipeBegin?: (direction: SwipeDirection) => void;
  /** Called once, on pointer up, if a swipeThreshold direction was exceeded */
  onSwipe?: (direction: SwipeDirection) => void;
}

function SwipableProductCard({
  swipingThreshold,
  swipeThreshold,
  onSwipeBegin,
  onSwipe,
  ...productCardProps
}: SwipableProductCardParams) {
  const { t } = useTranslation();
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<SwipeDirection | null>(null);
  const isDragging = useRef(false);
  const hasSwipeBegin = useRef(false);
  const hasCommitted = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (hasCommitted.current) return;
    startPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = true;
    hasSwipeBegin.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !startPos.current || hasCommitted.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({ x: dx, y: dy });

    // determine live direction
    let liveDir: SwipeDirection | null = null;
    if (Math.abs(dx) > Math.abs(dy) && dx > swipingThreshold) liveDir = "right";
    else if (Math.abs(dx) > Math.abs(dy) && dx < -swipingThreshold) liveDir = "left";
    else if (Math.abs(dy) > Math.abs(dx) && dy < -swipingThreshold) liveDir = "up";
    setDirection(liveDir);

    // fire onSwipeBegin once
    if (liveDir && !hasSwipeBegin.current) {
      hasSwipeBegin.current = true;
      onSwipeBegin?.(liveDir);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const { x, y } = offset;
    let commitDir: SwipeDirection | null = null;
    if (Math.abs(x) > Math.abs(y) && x > swipeThreshold) commitDir = "right";
    else if (Math.abs(x) > Math.abs(y) && x < -swipeThreshold) commitDir = "left";
    else if (Math.abs(y) > Math.abs(x) && y < -swipeThreshold) commitDir = "up";

    if (commitDir) {
      // commit swipe: let card fly off
      hasCommitted.current = true;
      onSwipe?.(commitDir);
      // calculate offscreen offset
      const multiplier = 3;
      if (commitDir === "right" || commitDir === "left") {
        setOffset({ x: offset.x * multiplier, y: offset.y });
      } else if (commitDir === "up") {
        setOffset({ x: offset.x, y: offset.y * multiplier });
      }
      isDragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      return;
    }

    // revert if not committed
    setOffset({ x: 0, y: 0 });
    setDirection(null);
    startPos.current = null;
    isDragging.current = false;
    hasSwipeBegin.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // compute rotation
  const rawRotate = (offset.x / swipingThreshold) * 15;
  const rotate = Math.max(Math.min(rawRotate, 15), -15);

  return (
    <div
      className={`
        flex w-full h-full touch-none transform origin-bottom
        ${hasCommitted.current ? "pointer-events-none" : isDragging.current ? "transition-none cursor-grabbing" : "transition-transform duration-300 ease cursor-grab"}
      `}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <ProductCard {...productCardProps} />

      <div className="flex items-center px-5 text-primary font-cursive font-extrabold text-6xl justify-between absolute h-full w-full">
        <div
          className={`bg-secondary p-1.5 rounded-2xl transition-opacity duration-350  ${
            direction === "right" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <TextCase mode={"capitalize"}>{t("save")}</TextCase>
        </div>

        <div className="h-full pt-2 flex items-end pb-20">
          <div
            className={`h-fit text-center bg-secondary p-1.5 rounded-2xl transition-opacity duration-350  ${
              direction === "up" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <TextCase mode={"capitalize"}>{t("cart")}</TextCase>
          </div>
        </div>

        <div
          className={`h-fit bg-secondary p-1.5 rounded-2xl transition-opacity duration-350  ${
            direction === "left" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <TextCase mode={"capitalize"}>{t("pass")}</TextCase>
        </div>
      </div>
    </div>
  );
}

export default memo(SwipableProductCard);
