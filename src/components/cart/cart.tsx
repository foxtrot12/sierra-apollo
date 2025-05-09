import { memo } from "react";
import { useProductContext } from "../../contexts/productStateContext";
import TextCase from "../textCase";
import { useTranslation } from "react-i18next";
import ProductTile from "./productTile";
import { Link } from "react-router-dom";
import { MoveLeftIcon } from "lucide-react";
import { RoutesList } from "../../routes";

function Cart() {
  const { cartProducts, savedProducts, removeCartProduct, removeSavedProduct } =
    useProductContext();

  const { t } = useTranslation();

  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price, 0);
  const totalOriginal = cartProducts.reduce(
    (sum, p) => sum + p.originalPrice,
    0
  );
  const totalDiscountPercent =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalPrice) / totalOriginal) * 100)
      : 0;

  return (
    <div className="bg-primary text-secondary p-6 flex flex-col gap-4">
      <Link
        aria-label={t("goBack")}
        className="bg-secondary rounded-xl text-accent w-1/8 flex justify-center"
        to={RoutesList.home}
      >
        <MoveLeftIcon />
      </Link>
      <h2 className="text-2xl font-bold mb-4">
        <TextCase mode={"capitalize"}>{t("shoppingCart")}</TextCase>
      </h2>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              onRemove={removeCartProduct}
            />
          ))}
          <div className="flex justify-around gap-2 items-center mt-4 bg-secondary text-primary p-4 rounded-xl">
            <span className="font-bold text-lg flex gap-2">
              <div className="flex items-center">
                {" "}
                <TextCase mode={"capitalize"}>{t("total")}</TextCase>:
              </div>
              <div className="flex flex-col">
                <span className="line-through opacity-60">
                  ₹{totalOriginal.toFixed(2)}
                </span>
                <div>₹{totalPrice.toFixed(2)}</div>
              </div>
            </span>

            <span className="text-accent ml-4">
              {totalDiscountPercent}%{" "}
              <TextCase mode={"upper"}>{t("off")}</TextCase>
            </span>
          </div>
        </>
      ) : (
        <p>
          <TextCase mode={"capitalize"}>{t("yourCartIsEmpty")}</TextCase>
        </p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">
        {" "}
        <TextCase mode={"capitalize"}>{t("savedForLater")}</TextCase>
      </h2>
      {savedProducts.length > 0 ? (
        savedProducts.map((product) => (
          <ProductTile
            key={product.id}
            product={product}
            onRemove={removeSavedProduct}
          />
        ))
      ) : (
        <p>No products saved for later.</p>
      )}
    </div>
  );
}

export default memo(Cart);
