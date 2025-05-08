import React, { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TextCase from "../textCase";
import ProductCard, { Product } from "./productCard";

export type SwipeDirection = "left" | "right" | "up";

export interface SwipeableProductCardProps extends Product {
  /** Distance (px) before swipe start is recognized */
  swipeStartThreshold: number;
  /** Distance (px) before swipe completion is recognized */
  swipeReleaseThreshold: number;
  /** Called once when the swipe start threshold is crossed */
  onSwipeStart?: (direction: SwipeDirection) => void;
  /** Called once when the swipe release threshold is exceeded */
  onSwipeComplete?: (direction: SwipeDirection) => void;
}

function SwipeableProductCard({
  swipeStartThreshold,
  swipeReleaseThreshold,
  onSwipeStart,
  onSwipeComplete,
  ...cardProps
}: SwipeableProductCardProps) {
  const { t } = useTranslation();

  const initialPointerPos = useRef<{ x: number; y: number } | null>(null);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  const [currentDirection, setCurrentDirection] =
    useState<SwipeDirection | null>(null);

  const isPointerDown = useRef(false);
  const hasStartedSwipe = useRef(false);
  const hasCommittedSwipe = useRef(false);

  const detectCommitDirection = (): SwipeDirection | null => {
    const { x, y } = translation;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > absY && absX > swipeReleaseThreshold) {
      return x > 0 ? "right" : "left";
    }
    if (absY > absX && absY > swipeReleaseThreshold && y < 0) {
      return "up";
    }
    return null;
  };

  const commitSwipe = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: SwipeDirection
  ) => {
    hasCommittedSwipe.current = true;
    onSwipeComplete?.(direction);

    const multiplier = 3;
    const flyX =
      direction === "left" || direction === "right"
        ? translation.x * multiplier
        : translation.x;
    const flyY =
      direction === "up" ? translation.y * multiplier : translation.y;

    setTranslation({ x: flyX, y: flyY });
    isPointerDown.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (hasCommittedSwipe.current) return;

    initialPointerPos.current = { x: event.clientX, y: event.clientY };
    isPointerDown.current = true;
    hasStartedSwipe.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !isPointerDown.current ||
      !initialPointerPos.current ||
      hasCommittedSwipe.current
    )
      return;

    const dx = event.clientX - initialPointerPos.current.x;
    const dy = event.clientY - initialPointerPos.current.y;
    setTranslation({ x: dx, y: dy });

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    let liveDirection: SwipeDirection | null = null;

    if (absDx > absDy && absDx > swipeStartThreshold) {
      liveDirection = dx > 0 ? "right" : "left";
    } else if (absDy > absDx && dy < -swipeStartThreshold) {
      liveDirection = "up";
    }

    setCurrentDirection(liveDirection);

    if (liveDirection && !hasStartedSwipe.current) {
      hasStartedSwipe.current = true;
      onSwipeStart?.(liveDirection);
    }

    const commitDir = detectCommitDirection();
    if (commitDir) {
      commitSwipe(event, commitDir);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;

    // Reset if swipe hasn't committed
    setTranslation({ x: 0, y: 0 });
    setCurrentDirection(null);
    initialPointerPos.current = null;
    isPointerDown.current = false;
    hasStartedSwipe.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  // rotation based on horizontal displacement
  const rawRotation = (translation.x / swipeStartThreshold) * 15;
  const rotationAngle = Math.max(-15, Math.min(15, rawRotation));

  // determine transition classes
  const isFlyingAway = hasCommittedSwipe.current;
  const transitionClass = isPointerDown.current
    ? "transition-none cursor-grabbing"
    : isFlyingAway
    ? "transition-transform duration-500 ease-out pointer-events-none"
    : "transition-transform duration-300 ease cursor-grab";

  return (
    <div
      className={`
        relative flex w-full h-full touch-none transform origin-bottom
        ${transitionClass}
      `}
      style={{
        transform: `translate(${translation.x}px, ${translation.y}px) rotate(${rotationAngle}deg)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <ProductCard {...cardProps} />

      <div className="absolute inset-0 flex items-center justify-between px-5 text-accent font-cursive font-extrabold text-6xl">
        <div
          className={`bg-secondary border-primary border-2 p-1.5 rounded-2xl transition-opacity duration-100  ${
            currentDirection === "right"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <TextCase mode="capitalize">{t("save")}</TextCase>
        </div>

        <div className="flex items-end h-full pt-2 pb-20">
          <div
            className={`h-fit text-center bg-secondary border-primary border-2 p-1.5 rounded-2xl transition-opacity duration-100  ${
              currentDirection === "up"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <TextCase mode="capitalize">{t("cart")}</TextCase>
          </div>
        </div>

        <div
          className={`h-fit bg-secondary border-primary border-2 p-1.5 rounded-2xl transition-opacity duration-100  ${
            currentDirection === "left"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <TextCase mode="capitalize">{t("pass")}</TextCase>
        </div>
      </div>
    </div>
  );
}

export default memo(SwipeableProductCard);
