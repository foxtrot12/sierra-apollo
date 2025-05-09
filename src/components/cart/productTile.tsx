import { useTranslation } from "react-i18next";
import { Product } from "../productCard/productCard";
import TextCase from "../textCase";
import { memo } from "react";

interface ProductTileProps {
  product: Product;
  onRemove: (id: number | string) => void;
}

function ProductTile({ product, onRemove }: ProductTileProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between bg-secondary text-primary bg-opacity-10 p-4 mb-4 rounded-xl">
      <div className="flex items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-20 h-20 rounded object-contain"
        />
        <div className="ml-4">
          <h3 className="font-semibold">
            {" "}
            <TextCase mode={"capitalize"}>{product.name}</TextCase>
          </h3>
          <p className="font-cursive font-bold text-2xl">
            {<TextCase mode={"capitalize"}>{product.brand}</TextCase>}
          </p>
          <span className="font-bold mt-2">₹{product.price.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(product.id)}
        className="px-3 py-1 border border-accent text-accent hover:bg-accent hover:text-primary rounded-xl"
      >
        <TextCase mode={"capitalize"}>{t("remove")}</TextCase>
      </button>
    </div>
  );
}

export default memo(ProductTile);
