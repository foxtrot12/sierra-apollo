import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../components/productCard/productCard";

interface ProductContextType {
  savedProducts: Product[];
  passedProducts: Product[];
  cartProducts: Product[];
  addSavedProduct: (product: Product) => void;
  removeSavedProduct: (id: string | number) => void;
  addPassedProduct: (product: Product) => void;
  removePassedProduct: (id: string | number) => void;
  addCartProduct: (product: Product) => void;
  removeCartProduct: (id: string | number) => void;
  clearCart: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [passedProducts, setPassedProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const removeSavedProduct = (id: string | number) =>
    setSavedProducts((prev) => {
      if (!prev.some((p) => p.id === id)) return prev;
      return prev.filter((p) => p.id !== id);
    });

  const removePassedProduct = (id: string | number) =>
    setPassedProducts((prev) => {
      if (!prev.some((p) => p.id === id)) return prev;
      return prev.filter((p) => p.id !== id);
    });

  const removeCartProduct = (id: string | number) =>
    setCartProducts((prev) => {
      if (!prev.some((p) => p.id === id)) return prev;
      return prev.filter((p) => p.id !== id);
    });

  const addSavedProduct = (product: Product) => {
    removePassedProduct(product.id);
    removeCartProduct(product.id);

    setSavedProducts((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const addPassedProduct = (product: Product) => {
    removeSavedProduct(product.id);
    removeCartProduct(product.id);

    setPassedProducts((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const addCartProduct = (product: Product) => {
    removeSavedProduct(product.id);
    removePassedProduct(product.id);

    setCartProducts((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const clearCart = () => setCartProducts([]);

  return (
    <ProductContext.Provider
      value={{
        savedProducts,
        passedProducts,
        cartProducts,
        addSavedProduct,
        removeSavedProduct,
        addPassedProduct,
        removePassedProduct,
        addCartProduct,
        removeCartProduct,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
